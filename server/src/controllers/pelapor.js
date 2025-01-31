const { Pelapor } = require("../../models");
const { path } = require("path");
exports.addPelapor = async (req, res) => {
  try {
    const {
      nama_pelapor,
      jenis_identitas,
      no_identitas,
      alamat_pelapor,
      no_hp_pelapor,
      email,
      unit_kerja,
      kategori_pelapor,
      status_pelapor,
      tgl_peristiwa,
      lokasi_peristiwa,
      kronologi_peristiwa,
      nama_terlapor,
      no_hp_terlapor,
      status_terlapor,
    } = req.body;

    const userId = req.user ? req.user.id : null;

    // Mengambil file yang diupload
    const file_identitas = req.files["file_identitas"]
      ? req.files["file_identitas"][0].path
      : null;
    const bukti_peristiwa = req.files["bukti_peristiwa"]
      ? req.files["bukti_peristiwa"][0].path
      : null;

    // Menyimpan data ke database
    const newPelapor = await Pelapor.create({
      nama_pelapor,
      jenis_identitas,
      no_identitas,
      file_identitas,
      alamat_pelapor,
      no_hp_pelapor,
      email,
      unit_kerja,
      kategori_pelapor,
      status_pelapor,
      tgl_peristiwa,
      lokasi_peristiwa,
      kronologi_peristiwa,
      bukti_peristiwa,
      nama_terlapor,
      no_hp_terlapor,
      status_terlapor,
      created_by: userId,
    });
    res.status(201).json({
      message: "Data Pelapor Berhasil ditambahkan",
      data: newPelapor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Data Pelapor gagal ditambahkan karena masalah pada server",
    });
  }
};

exports.updatePelapor = async (req, res) => {
  try {
    const { id } = req.params;

    const pelapor = Pelapor.findByPk(id);
    if (!pelapor) {
      res.status(400).json({
        message: "data tidak id ditemukan",
      });
    }

    if (
      !req.files ||
      !req.files["file_identitas"] ||
      !req.files["bukti_peristiwa"]
    ) {
      return res.status(400).json({ message: "File tidak ditemukan!" });
    }
    // const fileIdentitas = req.files["file_identitas"][0].path;
    // const buktiPeristiwa = req.files["bukti_peristiwa"][0].path;
    const fileIdentitas =
      req.files && req.files["file_identitas"]
        ? req.files["file_identitas"][0].path
        : pelapor.file_identitas;

    const buktiPeristiwa =
      req.files && req.files["bukti_peristiwa"]
        ? req.files["bukti_peristiwa"][0].path
        : pelapor.bukti_peristiwa;

    // const file_identitas = req.files["file_identitas"]
    //   ? req.files["file_identitas"][0].path
    //   : pelapor.file_identitas;
    // const bukti_peristiwa = req.files["bukti_peristiwa"]
    //   ? req.files["bukti_peristiwa"][0].path
    //   : pelapor.bukti_peristiwa;
    const datauntukUpdate = {
      nama_pelapor: req.body.nama_pelapor || pelapor.nama_pelapor,
      jenis_identitas: req.body.jenis_identitas || pelapor.jenis_identitas,
      no_identitas: req.body.no_identitas || pelapor.no_identitas,
      file_identitas: fileIdentitas,
      alamat_pelapor: req.body.alamat_pelapor || pelapor.alamat_pelapor,
      no_hp_pelapor: req.body.no_hp_pelapor || pelapor.no_hp_pelapor,
      email: req.body.email || pelapor.email,
      unit_kerja: req.body.unit_kerja || pelapor.unit_kerja,
      kategori_pelapor: req.body.kategori_pelapor || pelapor.kategori_pelapor,
      status_pelapor: req.body.status_pelapor || pelapor.status_pelapor,
      tgl_peristiwa: req.body.tgl_peristiwa || pelapor.tgl_peristiwa,
      lokasi_peristiwa: req.body.lokasi_peristiwa || pelapor.lokasi_peristiwa,
      bukti_peristiwa: buktiPeristiwa,
      kronologi_peristiwa:
        req.body.kronologi_peristiwa || pelapor.kronologi_peristiwa,
    };

    const dataPelapor = await Pelapor.update(datauntukUpdate, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Data berhasil diupdate",
      data: dataPelapor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Data gagal diupdate karena kesalahan dari server",
    });
  }
};

exports.getAllPelapor = async (req, res) => {
  try {
    const pelapor = await Pelapor.findAll();
    if (!pelapor || pelapor.length === 0 || JSON.stringify(pelapor) === "[]") {
      return res.status(200).json({
        success: true,
        message: "Data pelapor tidak ada",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Data terlapor berhasil ditemukan!",
      data: pelapor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data tida berhasil dicari" });
  }
};

exports.getAllPelaporbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const pelapor = await Pelapor.findByPk(id);
    if (!pelapor) {
      return res.status(200).json({
        success: true,
        message: `get pelapor by id = ${id}`,
        data: [],
      });
    }
    // const newPelapor = pelapor;
    return res.status(200).json({
      success: true,
      data: pelapor,
      message: `data pelapor by id = ${id}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error get pelapor by ${id} karena masalah pada server`,
    });
  }
};
exports.deletePelapor = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari data yang akan dihapus
    const pelapor = await Pelapor.findByPk(id);

    if (!pelapor) {
      return res.status(404).json({ message: "Data Pelapor tidak ditemukan" });
    }

    // Hapus data
    await pelapor.destroy();
    res.status(200).json({ message: "Data Pelapor berhasil dihapus" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Kesalahan pada server" });
  }
};
