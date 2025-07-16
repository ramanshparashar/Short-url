const express = require('express');
const path = require('path')
const cookieParser = require("cookie-parser")
const { connectMongoDb } = require('./connect');
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth")

const URL = require("./models/url")

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')

const app = express();
const port = 8001;
connectMongoDb('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('Database connection established !!!'));

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))


// Middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use('/views', express.static(__dirname + '/views'));


app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user",userRoute);
app.use("/", checkAuth, staticRoute);

app.get('/url/:shortId',async(req,res)=>{
    const shortId= req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
          visithistory : {
            timestamp : Date.now(),
          }
        }
    });
    res.redirect(entry.redirectURL);
})

app.listen(port, () => { console.log(`Server started at port ${port}`) });
