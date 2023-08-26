const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("my-database.db")
const cors = require("cors")

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
})

app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.get("/", async (req, res) => {
    try {
        res.send("Welcome to the SQLite Server!")
    }
    catch (err) {
        res.status(500).json({
            err: err,
            msg: "Internal Server Error"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

// Close the database connection when the app exits
process.on('SIGINT', () => {
    db.close((err) => {
      if (err) {
        console.error('Error closing the database:', err.message);
      } else {
        console.log('Database closed');
      }
      process.exit(0);
    });
  });

  // Create a new user
    app.post('/create-user', (req, res) => {
    const { name } = req.body;
    console.log(name)
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
  
    db.run('INSERT INTO users (name) VALUES (?)', [name], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create user' });
      }
      
      res.status(201).json({ id: this.lastID, name });
    });
  });
  
  // Get all users
  app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch users' });
      }
      
      res.json(rows);
    });
  });
  
  // Define other routes as needed
  