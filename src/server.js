"use strict";
// importing..

const express = require("express");
const cors = require("cors");
const v1Route = require("./routes/v1");
const router = require("./routes/v2");
const chatRoute = require("./routes/chat");
const searchRoute = require("./routes/search");
const logger = require("./middleware/logger");
const authRoutes = require("./auth/routes");
const followRoute = require("./routes/follow");
const erorr404 = require("./error-handlers/404");
const erorr500 = require("./error-handlers/500");
const postPageRoute = require("./routes/RequestPhotogrpher/post_page");
const profileRoute = require("./routes/profile");
const { multerRoute } = require("./middleware/multer/multer");
const notifiRoute = require("./routes/notification");
const adminRoute = require("./routes/admin");
const modules = require("./models");
const searchCategoryRoute = require("./routes/searchCategory");
const path = require("path");

const favoritesRoute = require("./routes/favorites");
const { chatCollection } = require("./models");

const app = express();
const {
  getNotificationById,
  updateNotification,
} = require("./middleware/notification/modleHandle");
const deleteRouter = require("./routes/delete.route");

app.use(cors());
app.use(logger);

const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Messages Socket
io.on("connection", (socket) => {
  console.log("connect to the main ", socket.id);

  socket.on("joinRoom", (message) => {
    const room = `room users ${message.room}`;
    socket.join(room);
    console.log(room, " joined");
  });

  let count = 0;
  socket.on("zero", () => {
    count = 0;
  });

  socket.on("message", async (data) => {
    const room = `room users ${data.room}`;
    io.to(room).emit("test", data);

    const result = await chatCollection.create(data);

    console.log(result);

    count++;
    socket.to(room).emit("notificaton", count);
  });
});


// Notification Socket

const notificationName = io.of("/notification");
notificationName.on("connection", (socket) => {
  console.log("((notification)) connected with ID of ", socket.id);
  socket.on("notification", async (payload) => {
    try {
      // Get all notifications for the user ID from the model 'notification'
      const respons = await getNotificationById(payload);
      // Once a new record is created in the notification model, it is sent via emit directly
      const notificationEvent = `notification-${payload}`;
      if (respons.length !== 0) {
        respons.map(async (ele) => {
          socket.emit(notificationEvent, ele);
          socket.on("update", async (payload) => {
            await updateNotification(payload);
          });
        });
      } else {
        socket.emit(notificationEvent, "Notification is Empty");
      }

      await modules.notification.addHook("afterCreate", async (record) => {
        if (record.receiverId === payload) {
          socket.emit(`newRecord-${notificationEvent}`, record);
        }
      });
    } catch (err) {
      console.error("error processing notification:", err);
    }
  });
});

// using in app
app.use(express.json());
app.use(v1Route);
app.use(chatRoute);
app.use(searchRoute);
app.use(authRoutes);
app.use(followRoute);
app.use(postPageRoute);
app.use(deleteRouter);
app.use(router);
app.use(profileRoute);
app.use(multerRoute);
app.use(notifiRoute);
app.use(favoritesRoute);
app.use(adminRoute);
app.use(searchCategoryRoute);

// controller
app.get("/", (req, res, next) => {
  try {
    res.status(200).send("welcome to home page");
  } catch (err) {
    next(err);
  }
});

app.get("/chat_test/:id/:id2", (req, res) => {
  const filePath = path.join(__dirname, "..", "socketAssets", "sender.html");
  res.sendFile(filePath);
});

app.get('/intentionalError', intentionalError);
function intentionalError(req, res, next) {
  req.body = {
    test: 'test'
  }
  next({ message: 'some kind of error :(' });
}




// error handler
app.use("*", erorr404);
app.use(erorr500);

// listing to the server
function start(PORT) {
  server.listen(PORT, () => {
    console.log("running on port", PORT);
  });
}
module.exports = {
  start,
  server,
  app,
};
