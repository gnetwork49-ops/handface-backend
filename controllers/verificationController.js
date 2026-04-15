const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");

const verificationController = {
  async verify(req, res) {
    try {
      const admin = await userModel.findById(req.user.id);
      if (!admin?.is_admin) {
        return res.status(403).json({ message: "Admin only" });
      }

      await adminModel.verifyUser(req.params.id);
      res.json({ message: "User verified" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async removeVerification(req, res) {
    try {
      const admin = await userModel.findById(req.user.id);
      if (!admin?.is_admin) {
        return res.status(403).json({ message: "Admin only" });
      }

      await adminModel.removeVerification(req.params.id);
      res.json({ message: "Verification removed" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = verificationController;