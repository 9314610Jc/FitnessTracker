const router = require("express").Router();
const path = require("path");

module.exports = () => {
  // Load exercise page
  router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  // Load stats page
  router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  return router;
}