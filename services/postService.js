const postModel = require("../models/postModel");

const postService = {
  async getFeed(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const posts = await postModel.getFeed(limit, offset);
    return posts;
  },

  async create(userId, data) {
    const { content, media_type, media_url } = data;
    
    if (!content && !media_url) {
      throw new Error("Content or media required");
    }

    const post = await postModel.create(userId, { content, media_type, media_url });
    return post;
  },

  async like(userId, postId) {
    await postModel.like(userId, postId);
    return { message: "Liked" };
  },

  async comment(userId, postId, content) {
    if (!content) {
      throw new Error("Comment content required");
    }

    const comment = await postModel.addComment(userId, postId, content);
    return comment;
  },

  async getById(postId) {
    const post = await postModel.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },

  async delete(userId, postId) {
    const post = await postModel.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.user_id !== userId) {
      throw new Error("Not authorized to delete this post");
    }

    await postModel.delete(postId, userId);
    return { message: "Post deleted" };
  }
};

module.exports = postService;