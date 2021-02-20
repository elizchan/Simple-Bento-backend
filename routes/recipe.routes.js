// import isAdmin
const controller = require('../controllers/recipes.controller')

module.exports = function(app) {
    // app.get("/api/recipes", [isAdmin()], controller.displayRecipes)
    app.get("/api/recipes", controller.displayRecipes)
    app.post("/api/recipes", controller.addRecipe)
    app.get("/api/recipes/:id", controller.getRecipe)
    app.put("/api/recipes/:id", controller.editRecipe)
    app.delete("/api/recipes/:id", controller.deleteRecipe)
}