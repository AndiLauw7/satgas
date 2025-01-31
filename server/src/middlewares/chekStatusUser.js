const pelapor = require("../../models");

const checkAdminPermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { force } = req.query;

    if (!req.user) {
      return res.status(401).json({ message: "User tidak terautentikasi" });
    }
    const pelaporData = await pelapor.Pelapor.findByPk(id);

    if (!pelaporData) {
      return res.status(404).json({ message: "Data Pelapor tidak ditemukan" });
    }

    // if (pelaporData.created_by === null) {
    //   return res.status(403).json({
    //     message:
    //       "Data ini ditambahkan oleh pelapor bukan oeh admin, tidak dapat dihapus",
    //   });
    // }
    if (pelaporData.created_by === null) {
      if (req.method === "DELETE") {
        return res.status(403).json({
          message:
            "Data ini ditambahkan oleh pelapor bukan oeh admin, tidak dapat dihapus",
        });
      } else if (req.method === "PATCH") {
        return res.status(403).json({
          message:
            "Data ini ditambahkan oleh pelapor bukan oeh admin, tidak dapat diubah",
        });
      }
    }

    if (req.user.level === "admin") {
      return next();
    }

    if (req.user.id !== pelaporData.created_by) {
      return res.status(403).json({
        message: "Anda tidak memiliki izin untuk menghapus data ini",
      });
    }

    // if (req.user.level !== "admin" && req.user.id !== pelaporData.created_by) {
    //   return res.status(403).json({
    //     message:
    //       "Anda tidak memiliki izin untuk mengubah atau menghapus data ini",
    //   });
    // }
    // if (pelaporData.created_by === null) {
    //   if (req.user.level === "admin" && force === "true") {
    //     next();
    //   } else {
    //     return res.status(403).json({
    //       message: "Access Denied - Data ini ditambahkan oleh useranonim",
    //     });
    //   }
    // } else {
    //   if (
    //     req.user.level !== "admin" &&
    //     req.user.id !== pelaporData.created_by
    //   ) {
    //     return res.status(403).json({
    //       message:
    //         "Anda tidak memiliki izin untuk mengubah atau menghapus data ini",
    //     });
    //   }
    // }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Kesalahan pada server" });
  }
};

module.exports = { checkAdminPermission };
