const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/comment', (req, res) => {
    res.send(`
        <h1>Leave a Comment</h1>
        <form action="/comment" method="POST">
            <input type="text" name="comment" placeholder="Enter your comment" />
            <button type="submit">Submit</button>
        </form>
    `);
});


app.post('/comment', (req, res) => {
    const userComment = req.body.comment || 'No comment provided';
    
    res.send(`
        <h1>Your Comment</h1>
        <p id="user-comment" data-comment="${userComment}">Comment: ${userComment}</p>
        <script>
            const comment = document.getElementById('user-comment').getAttribute('data-comment');
            console.log('User comment:', comment);
        </script>
        <a href="/comment">Go back</a>
    `);
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
