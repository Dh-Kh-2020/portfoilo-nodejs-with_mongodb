const express = require('express');
const multer  = require('multer');
const {default: mongoose} = require('mongoose');
// const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv/config');
const personal_Info = require('./dashboardInfoModule.js');

const app = express();
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('view engine','ejs');

const port = process.env.PORT || 3000;
app.listen(port);

// ============ Connect to your database ============
mongoose.connect('mongodb://localhost:27017/profile_info');

// ==================================================
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        if(file.mimetype == "image/jpg")
            cb(null,upload);    //'public/imgs/'
        else if(file.mimetype == "application/pdf")
            cb(null,upload);    //'public/pdf/'
    },
    filename:(req, file, cb)=>{
        var extension = file.originalname.split('.');
        var ext = extension[extension.length - 1];
        var fileName = file.filename + '-'+ Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
        // var imgName = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname;

        cb(null, fileName);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback)=>{
        if(file.mimetype == "image/png" || file.mimetype == "application/pdf")
            callback(null, true)
        else callback(null, false);
    },
    limits:1024*1024 *5,
});

//============== POST DATA TO MONGODB ===============
app.use(express.urlencoded());
//Post Body Parser

// app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post("/dashboard", upload.fields([{name: "profile_picture"}, {name: "cv"}]), async (req, res)=> {
    const per_info = {
        id:mongoose.Types.ObjectId,
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        profile_picture: {
            data: fs.readFileSync(path.join(__dirname + '/imgs/' + req.file.filename)),
            contentType: 'image/jpg'
        },
        cv:  {
            data: fs.readFileSync(path.join(__dirname + '/pdf/' + req.file.filename)),
            contentType: 'application/pdf'
        }
    }
    await new personal_Info(per_info).save((error, result) => {
        if (error){
            console.log(error.message);
            console.log(req.body);
        }else{
            res.json(result);
        }
    });

    res.redirect("/dashboard");
});
//=================================================== 


// =================== ROUTING ======================
app.get(["/", "/dashboard"], (req, res)=>{
    res.render("dashboard");
});

app.get("*", (req, res) => {
    res.status(404).render('404');
});

console.log("Server Start at port" + port);