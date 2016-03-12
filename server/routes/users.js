"use strict";
var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var User = userModel.user;
// GET - show main aritcles page
router.get('/', function (req, res, next) {
    // use the Article model to query the Articles collection
    User.find(function (error, users) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of articles
            res.render('users/index', {
                title: 'Users',
                users: users
            });
        }
    });
});
// GET add page - show the blank form
router.get('/add', function (req, res, next) {
    res.render('users/add', {
        title: 'Add a New User'
    });
});
// POST add page - save the new article
router.post('/add', function (req, res, next) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        repassword: req.body.repassword
    }, function (error, user) {
        // did we get back an error or valid Article object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    });
});
// GET edit page - show the current article in the form
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (error, user) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('users/edit', {
                title: 'users Details',
                user: user
            });
        }
    });
});
// POST edit page - update the selected article
router.post('/:id', function (req, res, next) {
    // grab the id from the url parameter
    var id = req.params.id;
    // create and populate an article object
    var user = new User({
        _id: id,
        username: req.body.username,
        password: req.body.password,
        repassword: req.body.repassword
    });
    // run the update using mongoose and our model
    User.update({ _id: id }, user, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    });
});
// GET delete article
router.get('/delete/:id', function (req, res, next) {
    // get the id from the url
    var id = req.params.id;
    // use the model and delete this record
    User.remove({ _id: id }, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/users');
        }
    });
});
// make this public
module.exports = router;

//# sourceMappingURL=users.js.map
