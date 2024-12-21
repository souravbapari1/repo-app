import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);

    cb(null, "public/files/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
