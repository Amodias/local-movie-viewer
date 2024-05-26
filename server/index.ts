import express from "express";
import path from "path";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

const app = express();
const PORT = 8000;
const mediaDirectory = path.join(__dirname, "media");
const thumbnailsDirectory = path.join(mediaDirectory, "thumbnails");
const moviesFilePath = path.join(__dirname, "movies.json");
const defaultThumbnail = path.join(thumbnailsDirectory, "default.png");

app.use(cors());

// Ensure media and thumbnails directories exist
if (!fs.existsSync(mediaDirectory)) {
  fs.mkdirSync(mediaDirectory);
}
if (!fs.existsSync(thumbnailsDirectory)) {
  fs.mkdirSync(thumbnailsDirectory);
}

// Initialize movies.json if it doesn't exist
if (!fs.existsSync(moviesFilePath)) {
  fs.writeFileSync(moviesFilePath, JSON.stringify([]));
}

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const videoPath = path.join(mediaDirectory, req.file.filename);
  const thumbnailPath = path.join(
    thumbnailsDirectory,
    `${path.parse(req.file.filename).name}.png`
  );

  // Extract a frame and save it as a thumbnail
  ffmpeg(videoPath)
    .on("end", () => {
      console.log("Thumbnail generated successfully.");

      // Create movie entry
      const movieEntry = {
        id: Date.now(), // Use current timestamp as a unique ID
        // @ts-ignore
        name: req.file.originalname,
        // @ts-ignore
        path: `/media/${req.file.filename}`,
        imagePath: `/media/thumbnails/${
          // @ts-ignore
          path.parse(req.file.filename).name
        }.png`,
      };

      // Read the existing movies file
      fs.readFile(moviesFilePath, (err, data) => {
        if (err) {
          console.error("Error reading movies file:", err);
          return res.status(500).send("Internal Server Error");
        }

        // Parse the JSON file
        const movies = JSON.parse(data.toString());

        // Add the new movie entry
        movies.push(movieEntry);

        // Write the updated movies back to the JSON file
        fs.writeFile(moviesFilePath, JSON.stringify(movies, null, 2), (err) => {
          if (err) {
            console.error("Error writing to movies file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).json({ filePath: movieEntry.path });
        });
      });
    })
    .on("error", (err) => {
      console.error("Error generating thumbnail:", err);

      // Create movie entry with default thumbnail
      const movieEntry = {
        id: Date.now(),
        // @ts-ignore
        name: req.file.originalname,
        // @ts-ignore
        path: `/media/${req.file.filename}`,
        imagePath: `/media/thumbnails/default.png`,
      };

      // Read the existing movies file
      fs.readFile(moviesFilePath, (err, data) => {
        if (err) {
          console.error("Error reading movies file:", err);
          return res.status(500).send("Internal Server Error");
        }

        // Parse the JSON file
        const movies = JSON.parse(data.toString());

        // Add the new movie entry
        movies.push(movieEntry);

        // Write the updated movies back to the JSON file
        fs.writeFile(moviesFilePath, JSON.stringify(movies, null, 2), (err) => {
          if (err) {
            console.error("Error writing to movies file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).json({ filePath: movieEntry.path });
        });
      });
    })
    .screenshots({
      count: 1,
      folder: thumbnailsDirectory,
      filename: `${path.parse(req.file.filename).name}.png`,
      size: "320x240", // Set the desired size for the thumbnail
    });
});

// Serve static files from the "media" directory
app.use("/media", express.static(mediaDirectory));

// GET method to retrieve the list of movie files
app.get("/movies", (req, res) => {
  try {
    // Read the movies.json file
    fs.readFile(moviesFilePath, (err, data) => {
      if (err) {
        console.error("Error reading movies file:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Send the list of movies in the response
      const movies = JSON.parse(data.toString());
      res.status(200).json(movies);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE method to remove a movie by ID
app.delete("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id, 10);

  // Read the existing movies file
  fs.readFile(moviesFilePath, (err, data) => {
    if (err) {
      console.error("Error reading movies file:", err);
      return res.status(500).send("Internal Server Error");
    }

    const movies = JSON.parse(data.toString());

    // Find the movie to delete
    const movieIndex = movies.findIndex((movie: any) => movie.id === movieId);
    if (movieIndex === -1) {
      return res.status(404).send("Movie not found.");
    }

    const [movieToDelete] = movies.splice(movieIndex, 1);

    // Delete the video file
    fs.unlink(path.join(__dirname, movieToDelete.path), (err) => {
      if (err) {
        console.error("Error deleting video file:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Delete the thumbnail file
      fs.unlink(path.join(__dirname, movieToDelete.imagePath), (err) => {
        if (err) {
          console.error("Error deleting thumbnail file:", err);
          return res.status(500).send("Internal Server Error");
        }

        // Write the updated movies list back to the JSON file
        fs.writeFile(moviesFilePath, JSON.stringify(movies, null, 2), (err) => {
          if (err) {
            console.error("Error writing to movies file:", err);
            return res.status(500).send("Internal Server Error");
          }

          res.status(200).send("Movie deleted successfully.");
        });
      });
    });
  });
});

// Listen on a specific IP address of the local network
const ipAddress = process.env.HOST || "127.0.0.1";
app.listen(PORT, ipAddress, () => {
  console.log(`Server is running on ${ipAddress}:${PORT}`);
});
