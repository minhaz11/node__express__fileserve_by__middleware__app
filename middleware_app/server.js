const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const port = 3000;

app.use((req,res,next) => {
    console.log('Request date: '+ new Date());
    next();
})

app.use((req,res,next) => {
    const filePath = path.join(__dirname,'static',req.url);
    fs.stat(filePath,(err,fileInfo) => {
        if(err){
            next();
            return;
        }

        if(fileInfo.isFile()){
            res.sendFile(filePath);
        }else{
            next();
        }

    })
})

app.use((req,res) => {
    res.status(404);
    res.send('File not found!');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});