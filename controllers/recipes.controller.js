const db = require('../models/index')

const Recipe = db.recipe;

//add recipe to list of available recipes
exports.addRecipe = (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const dietary = req.body.dietary;
    const photo = req.body.photo;
    const recipe = new Recipe({
        name,
        description,
        dietary,
        photo
    });
    recipe.save((err, recipe)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        } else {
            res.send({
                message: "recipe was successfully created"
            })
        }
    })
}

//display all recipes
exports.displayRecipes = (req, res) => {
    Recipe.find({})
}

//edit recipes
exports.editRecipe = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const dietary = req.body.dietary;
    Recipe.findByIdAndUpdate(id, {name: name, description: description, dietary: dietary})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:
                err.message || "some error occurred while trying to update the recipe"
        })
    })
}

//delete recipe
exports.deleteRecipe = (req, res) => {
    const id = req.params.id
    // Recipe.findByIdAndDelete()
    Recipe.findByIdAndRemove(id, {useFindAndModify: false})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        console.log(err)
    })
}