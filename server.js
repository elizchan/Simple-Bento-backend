const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db.config')
const cors = require('cors')

const app = express()
app.use(cors())

//parse requests fo content type - application/json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

//set up mongoose
const db = require('./models/index')
const Role = db.role

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Successfully connect to MongoDB")
        initial()
    })
    .catch(err=>{
        console.error("Connection error", err)
        process.exit()
    })

//simple route
app.get('/', (req, res)=>{
    res.json({message: "welcome to the homepage"})
})

// import the routes we wrote
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

//set up port
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})

function initial(){
    Role.estimatedDocumentCount((err, count)=>{
        //if no roles are present, create our new roles (admin, user)
        if(!err && count === 0){
            new Role ({
                name: 'user'
            }).save(err=>{
                if(err) {
                    console.log(err)
                }
                console.log("added users to roles collection")
            })
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log(err)
                }
                console.log("added admin to roles collection")
            })
        }
    })
}