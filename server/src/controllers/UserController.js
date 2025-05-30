const { prisma } = require("../../config/prisma.config");

class UserController {
  constructor() {
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });
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
        include: {
          posts: true,
          comments: true,
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
    const { name, email } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res.status(201).json(newUser);
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
}

// ✅ Export the class itself
module.exports = UserController;
