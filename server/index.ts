import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/media", express.static(path.join(__dirname, "../media")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
