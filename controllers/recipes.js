const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// router logic
router.get('/', async (req, res) => {
    const recipes = await Recipe.find()
    console.log("recipes log", recipes)
  res.render('recipes/index.ejs', {recipes: recipes});
});

router.get("/new", async (req, res) => {
    // res.send("New concoctions here");
    res.render("recipes/new.ejs");
});

router.post("/", async (req, res) => {
    try {
        console.log("Who is the user", req.session.user._id);
        // req.body.owner = req.session.user._id; // assign signed in user to recipe as owner
        const newRecipe = new Recipe(req.body);
        newRecipe.owner = req.session.user._id;

        console.log("Form data received", req.body);
        // await Recipe.create(req.body);
        await newRecipe.save();
        res.redirect("/recipes");
    } catch (error) {
        console.log("Recipe creation error:", error.message);
        res.redirect('/');
    };
    // console.log("Who is the user", req.session.user._id);
    // req.body.owner = req.session.user._id; // assign signed in user to recipe as owner
    // console.log("Form data received", req.body);
    // await Recipe.create(req.body);
    // res.redirect("/recipes");
});

//! implement 'future access control' during later steps

module.exports = router;