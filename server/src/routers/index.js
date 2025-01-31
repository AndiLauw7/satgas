const express = require("express");
const { uploadFile } = require("../middlewares/uploadImage");
const router = express.Router();

const { login, checkAuth } = require("../controllers/auth");
const { auth } = require("../middlewares/checkAuth");
const {
  addProfill,
  updateProfil,
  getProfil,
  deleteProfil,
  getProfilbyid,
} = require("../controllers/profil");
const {
  addBerita,
  updateBerita,
  getBerita,
  getBeritaById,
  deleteBerita,
} = require("../controllers/berita");
const {
  addPelapor,
  updatePelapor,
  getAllPelapor,
  deletePelapor,
  getAllPelaporbyId,
} = require("../controllers/pelapor");

const { uploadsFile } = require("../middlewares/uploadMedia");
const { checkAdminPermission } = require("../middlewares/chekStatusUser");
const {
  tindakLanjutStatus,
  addTindakLanjut,
  getAllTindakLanjut,
} = require("../controllers/tindak_lanjut");
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
router.post("/data-profil", uploadsFile("image"), addProfill);
router.patch("/update-profil/:id", uploadsFile("image"), updateProfil);
router.get("/get-data-profil", getProfil);
router.get("/get-data-profilid/:id", getProfilbyid);
router.delete("/delete-profil/:id", deleteProfil);
router.post("/addberita", uploadsFile("image"), addBerita);
router.patch("/update-berita/:id", uploadsFile("image"), updateBerita);
router.get("/get-data-berita", getBerita);
router.get("/getberitaid/:id", getBeritaById);
router.delete("/delete-berita/:id", deleteBerita);
router.post(
  "/addpelapor",
  auth,
  uploadFile([
    { name: "bukti_peristiwa", maxCount: 1 },
    { name: "file_identitas", maxCount: 1 },
  ]),
  addPelapor
);
router.post(
  "/addpelapor-anonim",
  uploadFile([
    { name: "bukti_peristiwa", maxCount: 1 },
    { name: "file_identitas", maxCount: 1 },
  ]),
  addPelapor
);
const uploadFields = [
  { name: "file_identitas", maxCount: 1 },
  { name: "bukti_peristiwa", maxCount: 1 },
];
router.patch(
  "/update-pelapor/:id",
  uploadFile(uploadFields),
  auth,
  checkAdminPermission,
  updatePelapor
);
router.get("/get-all-pelapor", getAllPelapor);
router.get("/pelaporbyid/:id", getAllPelaporbyId);
router.delete("/hapuspelapor/:id", auth, checkAdminPermission, deletePelapor);

router.post("/add-tindaklanjut", addTindakLanjut);
router.get("/getall-tindaklanjut", getAllTindakLanjut);

router.put("/update-tindak-lanjut/:id", tindakLanjutStatus);

router.post("/upload", uploadFile("file"), (req, res) => {
  try {
    res.status(200).json({
      message: "File berhasil diunggah",
      file: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
