const express = require("express");

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//Add routes in here
//api/notes
//HTML routes

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
