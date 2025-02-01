const { tindak_lanjut, Pelapor } = require("../../models");
const { sendEmailKePelapor } = require("../utils/emailService");

exports.addTindakLanjut = async (req, res) => {
  try {
    const { status_laporan, pelapor_id, keterangan, tgl } = req.body;
    if (!status_laporan || !pelapor_id) {
      return res.status(400).json({
        message: "Status laporan dan pelapor_id wajib diisi",
      });
    }

    const pelaporData = await Pelapor.findOne({
      where: { id: pelapor_id },
    });
    if (!pelaporData) {
      return res.status(404).json({ message: "Pelapor tidak ditemukan" });
    }
    const pelaporSudahDitindak = await tindak_lanjut.findOne({
      where: { pelapor_id },
    });

    if (pelaporSudahDitindak) {
      return res.status(400).json({
        message: "Tindak lanjut untuk pelapor ini sudah dibuat.",
      });
    }

    const newTindakLanjut = await tindak_lanjut.create({
      status_laporan,
      pelapor_id,
      keterangan,
      tgl,
    });

    await sendEmailKePelapor(
      pelaporData.email,
      pelaporData.nama_pelapor,
      status_laporan
    );
    return res.status(201).json({
      message: "Data tindak lanjut berhasil ditambahkan",
      data: newTindakLanjut,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat menambahkan data",
      error: error.message,
    });
  }
};

exports.tindakLanjutStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status_laporan, keterangan, tgl } = req.body;

    const validasiStatus = ["Diproses", "Selesai"];

    if (!validasiStatus.includes(status_laporan)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }
    const tindakLanjuts = await tindak_lanjut.findByPk(id, {
      include: [{ model: Pelapor, as: "pelapor" }],
    });
    if (!tindakLanjuts) {
      return res.status(404).json({ message: "Tindak lanjut tidak ditemukan" });
    }

    await tindakLanjuts.update({ status_laporan, tgl, keterangan });

    if (tindakLanjuts.pelapor && tindakLanjuts.pelapor.email) {
      await sendEmailKePelapor(
        tindakLanjuts.pelapor.email,
        tindakLanjuts.pelapor.nama_pelapor,
        status_laporan,
        tgl,
        keterangan
      );
    }

    return res
      .status(200)
      .json({ message: "Status diperbarui & email dikirim", tindakLanjuts });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

exports.getAllTindakLanjut = async (req, res) => {
  try {
    const tindakLanjuts = await tindak_lanjut.findAll({
      include: [
        {
          model: Pelapor,
          as: "pelapor",
          attributes: [
            "id",
            "nama_pelapor",
            "email",
            "status_pelapor",
            "nama_terlapor",
            "status_terlapor",
          ],
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    return res.status(200).json({
      message: "Data tindak lanjut berhasil diambil",
      data: tindakLanjuts,
    });
  } catch (error) {
    console.error("Error saat mengambil data tindak lanjut:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data tindak lanjut",
      error: error.message,
    });
  }
};

