const { Users } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await Users.findOne({
      where: {
        username: req.body.username,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "unregistered account",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "password invalid",
      });
    }

    const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY);

    return res.status(200).send({
      status: "success",
      message: "Login Success",
      data: {
        user: {
          id: userExist.id,
          username: userExist.username,
          level: userExist.level,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;
    console.log("i", id);
    const dataUser = await Users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    if (!dataUser) {
      return res.status(404).send({
        status: "Failed!! error data user",
      });
    }

    res.send({
      status: "success",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
