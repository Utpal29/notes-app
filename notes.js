const chalk = require('chalk');
const fs = require('fs');

const getNotes = () => {
  return "Your notes...";
};

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
  const duplicateNotes = notes.filter(note => {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {

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

  const newNotes = notes.filter(note => {
    return note.title !== title;
  });

  if (newNotes.length === notes.length - 1) {
    saveNotes(newNotes);

    console.log(chalk.green.inverse(`note with title ${title} is removed`));
  } else {
    console.log(chalk.red.inverse('title doesn\'t exist'));
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNote: removeNote
}