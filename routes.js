const express = require("express");

const router = express.Router(); //creates new router

router.post("/", (req, res) => {
  res.status(200).send("hello from the GET /posts endpoint");
});

router.post("/:id/comments", (req, res) => {
  res.status(200).send("hello from the GET /users/:id endpoint");
});

router.get("/", (req, res) => {
  res.status(200).send("hello from the POST /users endpoint");
});

router.get("/:id", (req, res) => {
  res.status(200).send("hello from the POST /users endpoint");
});

router.get("/:id/comments", (req, res) => {
  res.status(200).send("hello from the POST /users endpoint");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("hello from the POST /users endpoint");
});

router.put("/:id", (req, res) => {
  res.status(200).send("hello from the POST /users endpoint");
});

module.exports = router;
