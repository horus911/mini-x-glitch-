const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const app = express();

// Config multer pour l'upload
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB max
});

// Middleware d'optimisation média
async function optimizeMedia(file) {
  if (file.mimetype.includes('image')) {
    return await sharp(file.buffer)
      .resize(800)
      .avif({ quality: 70 })
      .toBuffer();
  }
  return file.buffer;
}

// Route d'upload
app.post('/upload', upload.single('media'), async (req, res) => {
  try {
    const optimizedFile = await optimizeMedia(req.file);
    res.json({ 
      url: `/media/${Date.now()}`, 
      size: `${(optimizedFile.length / 1024).toFixed(1)}KB` 
    });
  } catch (err) {
    res.status(500).send("Erreur d'optimisation");
  }
});

app.use(express.static('public'));
app.listen(3000, () => console.log('Server running'));