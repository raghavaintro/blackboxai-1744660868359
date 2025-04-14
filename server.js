const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Ensure games directory exists
const gamesDir = path.join(__dirname, 'games');
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir);
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, gamesDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Serve static files (index.html and others)
app.use(express.static(__dirname));

// Upload endpoint
app.post('/upload', upload.single('gamefile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
