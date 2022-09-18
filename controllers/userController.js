const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.addUser = catchAsync(async(req, res) => {
    req.body.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

    let newUser = await User.create(req.body);
    newUser = newUser.toObject();
    delete newUser.password;

    res.status(200).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

exports.getAllUsers = catchAsync(async(req, res) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: users.length,
        data: {
            users,
        },
    });
});

exports.getUserById = catchAsync(async(req, res) => {
    const foundUser = await User.findById(req.params.id);
    if (foundUser) {
        res.status(200).json({
            status: "success",
            data: {
                user: foundUser,
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
});

exports.updateUser = async(req, res) => {
    //Find User and Update

    req.body.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

    User.findByIdAndUpdate(req.body._id, req.body, { new: true },
        function(err, response) {
            if (err) {
                res.status(404).json({
                    status: "Not found"
                })
            } else {
                res.status(200).json({
                    status: "success",
                    message: "User Updated"
                })
            }
        });
};

exports.deleteUserById = async(req, res) => {
    const foundUser = await User.findById(req.params.id);
    console.log(foundUser)
    if (foundUser) {
        User.findByIdAndDelete(req.params.id, function() {});

        res.status(200).json({
            status: "success",
            message: "User Deleted"
        })
    } else {
        res.status(404).json({
            status: "Not Found"
        });
    }
}