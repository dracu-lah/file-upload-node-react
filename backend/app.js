const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use(express.json()); // Parse JSON request body

// enable cors
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Define an endpoint for file uploads with description
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const description = req.body.description;

  if (!description) {
    return res.status(400).send("Description is required");
  }

  // Save the description along with the file
  // You can implement your storage logic here

  res.send("File uploaded successfully with description: " + description);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
