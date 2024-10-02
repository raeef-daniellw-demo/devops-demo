const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run('CREATE TABLE comments (id INTEGER PRIMARY KEY AUTOINCREMENT, comment TEXT)');

    // Add some initial comments
    const stmt = db.prepare('INSERT INTO comments (comment) VALUES (?)');
    stmt.run('This is a great blog post!');
    stmt.run('Man I hope the scan goes smoothly');
    stmt.run('SQL injections sure are scary');
    stmt.finalize();
});



// Main route to display and submit comments
app.get('/', (req, res) => {
    // Query all comments from the database
    db.all('SELECT * FROM comments', (err, rows) => {
        if (err) {
            return res.status(500).send('An error occurred: ' + err.message);
        }

        // Prepare the HTML for displaying comments
        let commentsHtml = '<h1> Welcome to Rafaels Blog</h1> <p> Lorem Ipsum dolor</p> <h1>Leave a Comment</h1>';
        commentsHtml += `
            <form action="/comment" method="POST">
                <input type="text" name="comment" placeholder="Enter your comment" required/>
                <button type="submit">Submit</button>
            </form>
            <h2>All Comments</h2>
            <ul>`;

        rows.forEach(row => {
            
            commentsHtml += `<li>Comment ID ${row.id}: ${row.comment}</li>`;
        });

        commentsHtml += '</ul>';

        // Render the HTML with the form and the comments
        res.send(commentsHtml);
    });
});



app.post('/comment', (req, res) => {
    const userComment = req.body.comment;

    // This will for sure not be a problem!
    const sql = `INSERT INTO comments (comment) VALUES ('${userComment}')`;
    db.run(sql, function(err) {
        if (err) {
            return res.status(500).send('An error occurred: ' + err.message);
        }
        res.redirect('/');
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
