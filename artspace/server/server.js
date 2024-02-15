const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB 
mongoose.connect("mongodb+srv://dbUser:cBcQAmVg68ttcD9z@artspace.eiouklb.mongodb.net/Messaging", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Message schema
const messageSchema = new mongoose.Schema({
  user: String,
  content: String,
});

const Message = mongoose.model("Message", messageSchema);

// Serve static files (your React build, CSS, images, etc.)
app.use(express.static("public"));

// Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for new messages
  socket.on("chat message", (msg) => {
    const timestamp = new Date();//Get current timestamp
    const newMessage = new Message({ user: "Anonymous", content: msg, timestamp });
   
    newMessage.save().then(() => {
      io.emit("chat message", newMessage);
    });
  });

  // Load chat history
  Message.find().then((messages) => {
    socket.emit("load messages", messages);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});
