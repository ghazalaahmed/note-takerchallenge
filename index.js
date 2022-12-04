const express = require("express");
const PORT = process.env.PORT || 3001;
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

const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

app.get("/api/notes", (req, res) => {
  res.json(notes);
  console.log(notes);
});

app.post("/api/notes", (req, res) => {
  req.body.id = uuid();
  const note = createNewNote(req.body, notes);
  res.json(note);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;

  const delNote = notes.findIndex((note) => note.id == id);

  notes.splice(delNote, 1);
  return res.send();
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
