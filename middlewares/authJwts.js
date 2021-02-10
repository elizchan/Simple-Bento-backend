const jwt = require('jsonwebtoken')
const config = require("../config/auth.config")
const db = require("../models/index")

const User = db.user
const Role = db.role

//function to verify web token
verifyWebToken = (req, res, next) => {
    let token  = req.headers['x-access-token']
    //if no token, respond with error
    if(!token){
        return res.status(403).send({message: "no token provided"})
    }
    //verify token
    jwt.verify(token, config.secret, (err, decoded)=>{
        if (err) {
            return res.status(401).send({message: "Unauthorized"})
        }
        req.userId = decoded.id
        next()
    })
}

//function to verify if admin or not
isAdmin = (req, res, next) => {
    User.findOne({_id: req.userId}).exec((err, user)=>{
        if(err){
            return res.status(500).send({message: err})
        }
        Role.find({
            _id: {$in: user.roles}
        }, (err, roles)=>{
            if (err) {
                return res.status(500).send({message: err})
            }
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === 'admin'){
                    next()
                    return
                }
            }
            res.status(403).send({message: "requires admin role"})
        })
    })
}

const authJwt = {
    verifyWebToken,
    isAdmin
}

module.exports = authJwt