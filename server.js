require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const server = http.createServer(app);
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
const corsOptions = { origin: allowedOrigins, credentials: true };

const io = new Server(server, { cors: corsOptions });

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.set("io", io);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/public", require("./routes/public"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/followers", require("./routes/follower"));
app.use("/api/messages", require("./routes/message"));
app.use("/api/notifications", require("./routes/notification"));
app.use("/api/videos", require("./routes/video"));
app.use("/api/livestream", require("./routes/livestream"));
app.use("/api/market", require("./routes/market"));
app.use("/api/subscription", require("./routes/subscription"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/verification", require("./routes/verification"));
app.use("/api/admin", require("./routes/admin"));

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_livestream", (livestreamId) => {
    socket.join(`livestream_${livestreamId}`);
  });

  socket.on("leave_livestream", (livestreamId) => {
    socket.leave(`livestream_${livestreamId}`);
  });

  socket.on("livestream_comment", ({ livestreamId, message }) => {
    io.to(`livestream_${livestreamId}`).emit("new_comment", message);
  });

  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));