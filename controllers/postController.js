const postService = require("../services/postService");

const postController = {
  async getFeed(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const posts = await postService.getFeed(req.user.id, page, limit);
      res.json(posts);
    } catch (err) {
      console.error("Get feed error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  async create(req, res) {
    try {
      const { content, media_type, media_url } = req.body;
      const post = await postService.create(req.user.id, { content, media_type, media_url });
      req.app.get("io").emit("new_post", post);
      res.status(201).json(post);
    } catch (err) {
      console.error("Create post error:", err);
      res.status(400).json({ message: err.message });
    }
  },

  async like(req, res) {
    try {
      await postService.like(req.user.id, req.params.id);
      res.json({ message: "Liked" });
    } catch (err) {
      console.error("Like post error:", err);
      res.status(400).json({ message: err.message });
    }
  },

  async comment(req, res) {
    try {
      const { content } = req.body;
      const comment = await postService.comment(req.user.id, req.params.id, content);
      res.status(201).json(comment);
    } catch (err) {
      console.error("Comment error:", err);
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = postController;