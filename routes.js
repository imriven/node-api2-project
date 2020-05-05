const express = require("express");
const db = require("./data/db")
const router = express.Router(); //creates new router

router.post("/", (req, res) => {
    const post = req.body
    if(!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    } else {
        db.insert(post)
        .then(result => {
            post.id = result.id
        res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
});

router.post("/:id/comments", (req, res) => {
    const comment = req.body
    if (!comment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {

        db.findById(req.params.id)
        .then(result => {
            if (result) {
                db.insertComment(comment)
                .then(commentResult => {
                    comment.id = commentResult.id
                    res.status(201).json(comment)
                })
                .catch(err => {
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
                })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while getting the post id from the database" })
        })
    }
});

router.get("/", (req, res) => {
    db.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }) 
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
