const db = require('../models/index')

const Recipe = db.recipe;

//add recipe to list of available recipes
exports.addRecipe = (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const dietary = req.body.dietary;
    const recipe = new Recipe({
        name,
        description,
        recipe
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

//edit recipes

//delete recipe