import multer, { diskStorage, FileFilterCallback } from "multer";
import path from "path";
import { Request, Response, Router } from "express";
import { existsSync, mkdirSync } from "fs";
import { asyncHandler } from "../utils/asyncHandler";
import { admin, protect } from "../middlewares/authMiddleware";
const uploadRouter = Router();

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
};

const storage = diskStorage({
  destination(req, file, cb) {
    const uploadPath = "uploads/";

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${(Math.random() + 1)
        .toString(36)
        .substring(2)}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

uploadRouter
  .route("/")
  .post(
    asyncHandler(protect),
    asyncHandler(admin),
    upload.single("image"),
    (req: Request, res: Response) => {
      res.send(`/${req.file?.path}`);
    }
  );

export { uploadRouter };
