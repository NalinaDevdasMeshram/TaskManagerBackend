const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;
const DB_URL = "mongodb://localhost:27017/TaskManagerBackend";

const taskModel = require("./models/task.model");
// console.log(taskModel);
const TaskService = require("./services/task.service");

const TaskServiceInstance = new TaskService();
console.log(
  TaskServiceInstance.find,
  TaskServiceInstance.create,
  TaskServiceInstance.update,
  TaskServiceInstance.delete
);

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("./controllers/task.controller");

console.log(getTasks, createTask, updateTask, deleteTask);

const taskRoutes = require("./routes/task.route");
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("Error in Connecting DB", error));

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Backend listening on the Port ${PORT}!`);
});
