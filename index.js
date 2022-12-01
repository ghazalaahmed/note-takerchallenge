const express = require("express");
const PORT = process.env.port || 3001;
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const { notes } = require("./db/db");

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

//api routes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// app.post("/api/notes", (req, res) => {
//   req.body.id = uniqueId();
//   const note = createNewNote(req.body, notes);
//   res.json(note);
// });
//HTML routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// //Delete Note
// app.delete("/notes/:id", (req, res) => {
//   deleteNote(notes, req.params.id);
//   res.json(notes);
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
