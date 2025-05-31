const multer = require('multer');
const path = require('path');
const fs = require('fs');


const BASE_UPLOAD_DIR = path.join(__dirname, './../public/storage');


const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // Determine type: video or image
    const isVideo = ['.mp4', '.mov', '.avi', '.mkv', '.webm'].includes(ext);
    const folder = isVideo ? 'videos' : 'images';

    const uploadDir = path.join(BASE_UPLOAD_DIR, folder);

    ensureDir(uploadDir); 

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;
