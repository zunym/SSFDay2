const express = require('express');
const path = require('path');
const app = express();

//route
app.use(express.static(path.join(__dirname, 'public')))

//func
app.use('/images', express.static(path.join(__dirname, 'images')))

const displayImage = (req,resp,next)=> {
    
    var imagesArray = ["dog.jpg", "tiger.jpg", "cat.jpg"];
    var num = Math.floor(Math.random() * imagesArray.length);
    img = imagesArray[num];
    next();
    }

app.use('/random',displayImage,
    (req, resp) => {
        
        resp.status(200);
        resp.type('image/png');
        //resp.sendfile(path.join(__dirname, 'images', `${img}`));
        resp.sendfile(path.join(__dirname, 'images', `${img}`));
    });

//error
app.use((res, resp) => {
    resp.status(200);
    resp.type("text/html");
    resp.redirect("/404.html");
    resp.end();
})

//server
PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
    console.log("Connection %d at %s", PORT, 'public');
})
