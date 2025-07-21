import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const authController = {};

authController.signup = async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).send({ message: "Please provide all required fields!" });
  }

  try {
    const existingUser = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] } 
    });

    if (existingUser) {
      return res.status(400).send({ message: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      });

      await newUser.setRoles(roles);
    } else {
      await newUser.setRoles([1]);
    }

    return res.send({ message: "User registered successfully." });

  } catch (error) {
    return res.status(500).send({
      message: error.message || "Something went wrong while registering a new user",
    });
  }
};

export default authController;
