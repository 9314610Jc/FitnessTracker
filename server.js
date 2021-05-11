const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

// Connect database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

// Logging
app.use(logger("dev"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static routing
app.use(express.static("public"));

// API routing
app.use("/api", require("./routes/apiRoutes")(db));

// HTML routing
app.use("/", require("./routes/htmlRoutes")());

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});