const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')

const User = mongoose.model("User")




router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all field" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exist with this email" })

            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {

                    const user = new User({
                        email,
                        password: hashedPassword,
                        name

                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })

                })

        })
        .catch(err => {
            console.log(err)
        })

})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ error: "please add email and password both" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({message:"siccessfull logged in"})
                        const { _id, name, email } = savedUser

                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        res.json({ token, user: { _id, name, email, } })
                    }
                    else {
                        return res.status(422).json({ message: "Invalid email or  password" })

                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})
module.exports = router