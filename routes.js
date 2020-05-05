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
            if (!result === 0) {
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
    db.findById(req.params.id)
    .then(result => {
        if (!result.length === 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
});

router.get("/:id/comments", (req, res) => {
    db.findById(req.params.id)
    .then(result => {
        if (!result.length === 0) {
          db.findPostComments(req.params.id)
          .then(commentResult => {
              res.status(200).json(commentResult)
          })
          .catch(err => {
              res.status(500).json({ error: "The comments information could not be retrieved." })
          })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
});

router.delete("/:id", (req, res) => {
    db.findById(req.params.id)
    .then(result => {
        if (!result.length === 0) {
         db.remove(req.params.id)
         .then(deleteResult => {
             res.status(204).send()
         }  
         )
         .catch(err => {
             res.status(500).json({ error: "The post could not be removed" })
         })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
});

router.put("/:id", (req, res) => {
    const post = req.body
    db.findById(req.params.id)
    .then(result => {
        if (!result.length === 0) {
            if(!post.title || !post.contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
            } else {
                 db.update(req.params.id, post)
                 .then(updateResult => {
                     if (updateResult === 1){
                         res.status(200).json(post)
                     } else {
                         res.status(500).json({ error: "The post information could not be modified." })
                     }
                 })
                 .catch(err => {
                    res.status(500).json({ error: "The post information could not be modified." })
                 })
            }
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
});

module.exports = router;
