const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log("Server Running on Port 5000");
});

io = socket(server);

app.get("/", (req, res) => {
  res.send("hello wrld");
});

io.on("connection", (socket) => {
  console.log("connect");

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER");
  });
});
