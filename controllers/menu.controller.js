const db = require('../models/index')

const Recipe = db.recipe;
const Menu = db.menu;

//display menu from mm/dd/yy-mm/dd/yy
// exports.displayMenu = (req, res) => {
//     const
// }
//add Menu
exports.addMenu = (req, res) => {
    const recipe1 = req.body.recipeId
    const price = req.body.price
    const menu = new Menu({
        recipe1,
        price
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
    Menu.findByIdAndUpdate({})
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