const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.get("/allpost", requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name pic")
        .sort("-createdAt")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});
router.get("/postdetails/:id", requireLogin, (req, res) => {
    const postid = req.params.id
    Post.findOne({ _id: postid })
        .populate("postedBy", "_id name ")
        .populate("comments.postedBy", "_id name ")
        .sort("-createdAt")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/allpostview", (req, res) => {
    Post.find()
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name pic")
        .sort("-createdAt")
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/createpost", requireLogin, (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(422).json({ error: "please add all field" });
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        postedBy: req.user,
    });
    post
        .save()
        .then((result) => {
            res.json({ post: result });
        })
        .catch((err) => {
            console.log(err);
        });
});


router.put("/editpost/:id", requireLogin, (req, res) => {
    const { title, body } = req.body;
    const postid = req.params.id
    if (!title || !body) {
        return res.status(422).json({ error: "please add all field" });
    }
    req.user.password = undefined;
    var updatedPost = {
        title,
        body,
        postedBy: req.user,
    };
    Post.update({ _id: postid }, updatedPost, function (err, affected) {
        console.log('affected %d', affected);
        res.send(200, updatedPost);
    });


});

router.put("/like", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: { likes: req.user._id },
        },
        {
            new: true,
        }
    )
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        })
})

router.put("/unlike", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $pull: { likes: req.user._id },
        },
        {
            new: true,
        }
    )
        .populate("postedBy", "_id name pic")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        });
});

router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id,
    };
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: { comments: comment },
        },
        {
            new: true,
        }
    )
        .populate("comments.postedBy", "_id name pic")
        .populate("postedBy", "_id name pic")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        });
});

router.get("/viewcomment/:id", (req, res) => {
    const postid = req.params.id;


    Post.findByIdAndUpdate(
        postid,
        {
            $push: { comments: '' },
        },
        {
            new: true,
        }

    )
        .populate("comments.postedBy", "_id name ")
        .populate("postedBy", "_id name ")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ message: err });
            }
            if (post.postedBy._id.toString() == req.user._id.toString()) {
                post
                    .remove()
                    .then((result) => {
                        res.json(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
});

module.exports = router;
