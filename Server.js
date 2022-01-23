const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool =require("./db");
const app = express();
//Middleware
app.use(express.json());
app.use(cors());

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
//Routes
//get all users
app.get("/users", (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
});

// register and login routes
app.use("/auth", require("./routes/jwtAuth.js"));

app.use('/dashboard', require("./routes/dashboard"));

//Delete a user
app.delete('/users/:id', (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
);
//Update user data
app.put('/users/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const { password, email } = request.body

  pool.query(
    'UPDATE users SET user_name = $1, user_email = $2 WHERE user_id = $3',
    [password, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running  port ${PORT}.`);
});