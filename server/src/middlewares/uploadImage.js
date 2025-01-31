const multer = require("multer");
const path = require("path");
exports.uploadFile = (fileFields) => {
  //path
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  //filter format file image
  const fileFilter = function (req, file, cb) {
    const allowedType =
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf|doc|docx|xls|xlsx)$/;

    if (!file.originalname.match(allowedType)) {
      req.fileValidationError =
        "Only Image,Word Pdf and Excel fles are allowed";
    }

    cb(null, true);
  };

  const sizeMb = 10;
  const maxSize = sizeMb * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields(fileFields);

  return (req, res, next) => {
    upload(req, res, (err) => {
      // console.log(req.files);
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.files["file_identitas"] || !req.files["bukti_peristiwa"])
        return res.status(400).send({
          message: "Please select file  to upload",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size 10Mb",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
