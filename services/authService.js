const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const authService = {
  async register(username, email, password) {
    if (!username || !email || !password) {
      throw new Error("Username, email, and password are required");
    }

    if (username.length < 3) {
      throw new Error("Username must be at least 3 characters");
    }

    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (!validatePassword(password)) {
      throw new Error("Password must be at least 8 characters");
    }

    const existing = await authModel.findByEmail(email);
    if (existing) {
      throw new Error("Email already exists");
    }

    const existingUsername = await authModel.findByUsername(username);
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await authModel.create(username, email, hashed);
    return user;
  },

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await authModel.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return { token, user: { id: user.id, username: user.username, email: user.email } };
  },

  async getProfile(userId) {
    const user = await authModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
};

module.exports = authService;