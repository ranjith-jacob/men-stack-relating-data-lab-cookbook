const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Ingredient = require('../models/ingredient.js');

// router logic

router.get("/", async (req, res) => {
    const ingredients = await Ingredient.find();
    console.log("ingredients log", ingredients);
    res.render("ingredients/index.ejs", {ingredients: ingredients});
});

router.post("/", async (req, res) => {
    try {
        const newIngredient = new Ingredient(req.body);
        console.log("Ingredient received", req.body);
        await newIngredient.save();
        res.redirect("/ingredients");
    } catch (error) {
        console.log("Ingredient creation error:", error.message)
        res.redirect('/');
    };
});

router.delete("/:ingredientId", async (req, res) => {
    try {
        await Ingredient.findByIdAndDelete(req.params.ingredientId);
        res.redirect("/ingredients");
    } catch (error) {
        console.log("Ingredient deletion error: ", error.message);
        res.redirect("/ingredients");
    }
});

module.exports = router;