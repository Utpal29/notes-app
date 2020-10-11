const chalk = require('chalk');
const fs = require('fs');

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {

    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);

    console.log(chalk.green.inverse('Note added'));
  } else {
    console.log(chalk.red.inverse('Note title taken!!!'));
  }
};

const removeNote = title => {
  const notes = loadNotes();

  const newNotes = notes.filter(note => note.title !== title);

  if (newNotes.length === notes.length - 1) {
    saveNotes(newNotes);
    console.log(chalk.green.inverse(`note with title ${title} is removed`));
  } else {
    console.log(chalk.red.inverse('title doesn\'t exist'));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.magenta.inverse('Your notes'));

  notes.forEach((note) => {
    console.log(note.title);
  });
}

const readNotes = (title => {
  const notes = loadNotes();

  const found = notes.find(note => note.title === title);

  if (found) {
    console.log(chalk.blue.inverse(found.title));
    console.log(found.body);
  } else {
    console.log(chalk.red.inverse('note not found'));
  }
});

module.exports = {
  addNotes,
  removeNote,
  listNotes,
  readNotes
}