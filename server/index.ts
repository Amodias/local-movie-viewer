import express from "express";
import path from "path";
import multer from "multer";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
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
  // @ts-ignore
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // @ts-ignore
  res.status(200).json({ filePath: `/media/${req.file.filename}` });
});

// Serve static files from the "media" directory
const mediaDirectory = path.join(__dirname, "media");
app.use("/media", express.static(mediaDirectory));

// GET method to retrieve the list of movie files
app.get("/movies", (req, res) => {
  try {
    // Read the contents of the "media" directory
    fs.readdir(mediaDirectory, (err, files) => {
      if (err) {
        console.error("Error reading media directory:", err);
        res.status(500).send("Internal Server Error");
      } else {
        // Filter out only video files
        const movieFiles = files.filter((file) => {
          const fileExtension = path.extname(file).toLowerCase();
          return (
            fileExtension === ".mp4" ||
            fileExtension === ".mov" ||
            fileExtension === ".avi"
          );
        });
        // Send the list of movie files in the response
        res.status(200).json(movieFiles);
      }
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
