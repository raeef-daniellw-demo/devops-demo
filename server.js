const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    
        let commentsHtml = '<h1> Welcome to Rafaels Blog</h1> <p> Lorem Ipsum dolor</p';
        
        res.send(commentsHtml);
   
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
