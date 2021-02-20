const db = require('../models/index')

const Recipe = db.recipe;
const Menu = db.menu;

//display menu from mm/dd/yy-mm/dd/yy
exports.displayMenu = (req, res) => {
    Menu.find({})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err)
    })
}
//add Menu
exports.addMenu = (req, res) => {
    const recipe1 = req.body.recipe1
    const recipe2 = req.body.recipe2
    const recipe3 = req.body.recipe3
    const recipe4 = req.body.recipe4
    const price = req.body.price
    const date = req.body.date
    const menu = new Menu({
        recipe1,
        recipe2,
        recipe3,
        recipe4,
        price,
        date
    });
    menu.save((err, menu) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        } else {
            res.send({
                message: "menu was successfully created"
            })
        }
    })
}

//edit menu
exports.editMenu = (req, res) => {
    Menu.findByIdAndUpdate(id, {recipe1: recipe1, recipe2: recipe2, recipe3: recipe3, recipe4: recipe4})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:
                err.message || "some error occurred while trying to update the menu"
        })
    })
}
//delete menu
exports.deleteMenu = (req, res) => {
    Menu.findByIdAndRemove(id, {useFindAndModify: false})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        console.log(err)
    })
}