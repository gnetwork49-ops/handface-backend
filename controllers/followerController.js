const followerModel = require("../models/followerModel");

const followerController = {
  async getFollowers(req, res) {
    try {
      const followers = await followerModel.getFollowers(req.user.id);
      res.json(followers);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getFollowing(req, res) {
    try {
      const following = await followerModel.getFollowing(req.user.id);
      res.json(following);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async follow(req, res) {
    try {
      await followerModel.follow(req.user.id, req.params.id);
      res.json({ message: "Followed successfully" });
    } catch (err) {
      if (err.code === "23505") return res.status(400).json({ message: "Already following" });
      res.status(500).json({ message: "Server error" });
    }
  },

  async unfollow(req, res) {
    try {
      await followerModel.unfollow(req.user.id, req.params.id);
      res.json({ message: "Unfollowed successfully" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = followerController;