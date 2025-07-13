const { sendEmail } = require("../../config/email_sent");
const upload = require("../../config/file_upload.config");
const { prisma } = require("../../config/prisma.config");
const { createToken, verifyToken } = require("../helpers/jsonwebtoken");
const { makeHash, compareHash } = require("../helpers/hash");
const { default: axios } = require("axios");

class UserController {
  constructor() {
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  async getUsers(req, res) {
    // If the request has a file, handle it
    try {
      const usersPromise = prisma.user.findMany({
        skip: req.skip,
        take: req.take,
        where: req.where,
        include: req.$expand || {},
        orderBy: { createdAt: "desc" },
      });

      // If count=true, fetch total count as well
      if (req.count) {
        const [users, totalCount] = await Promise.all([
          usersPromise,
          prisma.user.count(),
        ]);
        return res.status(200).json({ users, totalCount });
      }

      const users = await usersPromise;
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id, 10) },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          login_token: true,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createUser(req, res) {
    const { name, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      const hashed = await makeHash(password);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashed,
        },
      });

      this.login(req, res);
      return;
    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // Prisma unique constraint violation on email
        return res.status(400).json({ error: "Email already exists" });
      }

      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          email,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async logOut(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // login user =========================
  async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = await compareHash(password, user.password); // Assuming password is stored in plain text, which is not recommended
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = await createToken({ id: user.id, email: user.email });

      sendEmail(
        user.email,
        "Login Notification",
        `You have successfully logged in at ${new Date().toLocaleString()}. If this wasn't you, please contact support immediately.`
      );

      await prisma.user.update({
        where: { id: user.id },
        data: { login_token: token }, // Update last login time
      });
      res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // create profile =========================

  async createProfile(req, res) {
console.log(req.headers.auth)
    await axios
      .get(`${process.env.APTIGEN_SERVER_URL}/user`, {
        headers: { Authorization: `Bearer ${req.headers.authorization}` },
      })
      .then((res) => {
        console.log(res.data)
        res.status(200).json({ message: "Profile created successfully" });
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
}

module.exports = UserController;
