const controller = require('../controllers/menu.controller')

module.exports = function(app) {
    app.get("/api/menu", controller.displayMenu)
    app.post("/api/menu/:id", controller.addMenu)
    app.put("/api/menu/:id", controller.editMenu)
    app.delete("/api/menu/:id", controller.deleteMenu)
}