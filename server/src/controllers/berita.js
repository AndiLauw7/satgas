const { Berita } = require("../../models");

exports.addBerita = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const { tittle, content_berita, tgl } = req.body;

    if (!tittle || !content_berita || !tgl || !image) {
      return res.status(400).json({ message: "Semua field harus di isi" });
    }

    const berita = await Berita.create({
      tittle,
      content_berita,
      tgl,
      image,
    });
    res.status(201).json({
      message: "Data Berita berhasil ditambahkan",
      data: berita,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Data berita gagal ditambahkan karena kesalahan dari Server",
      error: error.message,
    });
  }
};

exports.updateBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const { tittle, content_berita, tgl } = req.body;
    const berita = Berita.findByPk(id);
    if (!berita) {
      return res.status(400).json({ message: "Id Tidak ditemukan" });
    }

    let image = req.file;
    if (req.file) {
      image = req.file.filename;
    }
    const dataUpdate = await Berita.update(
      {
        tittle: tittle,
        content_berita: content_berita,
        tgl: tgl,
        image: image,
      },
      {
        where: { id: id },
      }
    );
    res.status(201).json({
      message: "Data Berita Berhasil update",
      data: dataUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Data berita gagal diupdate karena kesalahan dari Server",
      error: error.message,
    });
  }
};

exports.deleteBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const berita = await Berita.findByPk(id);
    if (!berita || berita.length === 0 || JSON.stringify(berita) === "[]") {
      return res.status(201).json({
        success: true,
        message: `data dengan id ${id} tidak ada`,
        berita: [],
      });
    }
    const newBerita = berita;
    await newBerita.destroy();
    return res.status(200).json({ message: "Data Berita berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Kesalahan pada server" });
  }
};

exports.getBerita = async (req, res) => {
  try {
    const berita = await Berita.findAll();

    if (!berita || berita.length === 0 || JSON.stringify(berita) === "[]") {
      return res.status(200).json({
        success: true,
        message: "Data Berita Belum Tersedia",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data Berita berhasil di get",
      data: berita,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error saat mencari data pada server",
    });
  }
};

exports.getBeritaById = async (req, res) => {
  try {
    const { id } = req.params;

    const berita = await Berita.findByPk(id);
    if (!berita || berita.length === 0 || JSON.stringify(berita) === "[]") {
      return res.status(200).json({
        success: true,
        message: `Data berita by id ${id} = ${berita}`,
        data: [],
      });
    }
    const newBeritaId = berita;
    return res.status(200).json({
      success: true,
      data: newBeritaId,
      message: `Data berita by id = ${id}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error get data by id ${id} karena masalah pada server`,
    });
  }
};
