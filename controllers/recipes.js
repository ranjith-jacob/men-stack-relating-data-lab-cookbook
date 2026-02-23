const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

// router logic
router.get('/', async (req, res) => {
    const recipes = await Recipe.find().populate("owner");
    console.log("recipes log", recipes);
    res.render('recipes/index.ejs', { recipes: recipes });
});

router.get("/new", async (req, res) => {
    // res.send("New concoctions here");
    const ingredients = await Ingredient.find();
    res.render("recipes/new.ejs", { ingredients: ingredients });
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

router.get("/:recipeId", async (req, res) => {
    try {
        // const populatedRecipe = await Recipe.findOne({
        //     owner: req.session.user._id,
        //     _id: req.params.recipeId
        // }).populate("owner").populate("ingredients");
        // res.render("recipes/show.ejs", {
        //     recipe: populatedRecipe
        // });
         const recipe = await Recipe.findById(req.params.recipeId);
        if (recipe.owner.equals(req.session.user._id)) {
        await recipe.deleteOne();
        res.redirect("/recipes");
        } else {
        res.send("You don't have permission to do that.");
        }
    } catch (error) {
        console.log("Recipe show pg error:", error.message)
    }
})

module.exports = router;