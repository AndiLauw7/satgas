const { Profil } = require("../../models");

exports.addProfill = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;

    const { tittle_profil, content_profil, tgl } = req.body;

    if (!tittle_profil || !content_profil || !tgl || !image) {
      return res.status(400).json({ message: "Semua field harus di isi" });
    }

    const profil = await Profil.create(
      {
        tittle_profil,
        content_profil,
        tgl,
        image,
      },
      { returning: true }
    );

    res.status(201).json({
      message: ` Data Profil berhasil ditambahkan`,
      data: profil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateProfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { tittle_profil, content_profil, tgl } = req.body;
    const profil = await Profil.findByPk(id);
    if (!profil) {
      return res.status(404).json({ message: "Profil tidak ditemukan" });
    }
    let image = profil.image;
    if (req.file) {
      image = req.file.filename;
    }

    await Profil.update(
      {
        tittle_profil,
        content_profil,
        tgl,
        image,
      },
      {
        where: { id },
      }
    );
    res.status(200).json({ message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server saat update berita " });
  }
};

exports.deleteProfil = async (req, res) => {
  try {
    const { id } = req.params;
    const profil = await Profil.findByPk(id);
    if (!profil || profil.length === 0 || JSON.stringify(profil) === "[]") {
      return res.status(201).json({
        success: true,
        message: `Profil tidak ditemukan ${id}`,
        profil: [],
      });
    }
    const newDeleteProfil = profil;
    await newDeleteProfil.destroy();
    return res.status(200).json({ message: "Data Berita berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Kesalahan pada server" });
  }
};

exports.getProfil = async (req, res) => {
  try {
    const profil = await Profil.findAll();
    if (!profil || profil.length === 0 || JSON.stringify(profil) === "[]") {
      return res.status(200).json({
        success: true,
        message: "Data Profil tidak ditemukan",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Data profil berhasil ditemukan!",
      data: profil,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "data tidak berhasil dicari" });
  }
};

exports.getProfilbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const profil = await Profil.findByPk(id);
    if (!profil || profil.length === 0 || JSON.stringify(profil) === "[]") {
      return res.status(200).json({
        success: true,
        message: `Data profil by id ${id} = ${profil}`,
        data: [],
      });
    }
    const newProfilid = profil;
    return res.status(200).json({
      success: true,
      data: newProfilid,
      message: `Data berita by id = ${id}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error get data by id ${id} karena masalah pada server`,
    });
  }
};
