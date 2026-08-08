const multer = require("multer");
//Multer is Express middleware used to upload and handle files such as PDFs, images, and documents sent using multipart/form-data.
// cb = callback function.
// Multer kita "next enna panna?" nu solla use pannrom.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;