const controller = require('../controllers/recipes.controller')

module.exports = function(app) {
    app.get("/api/recipes", controller.displayRecipes)
    app.post("/api/recipes/:id", controller.addRecipe)
    app.put("/api/recipes/:id", controller.editRecipe)
    app.delete("/api/recipes/:id", controller.deleteRecipe)
    
    }