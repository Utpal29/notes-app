const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.1.0');

// Create add comand
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});

// Create remove comand
yargs.command({
  command: 'remove',
  describe: "Remove a note",
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// Create list comand
yargs.command({
  command: 'list',
  describe: "list your notes",
  handler() {
    notes.listNotes();
  }
});

// Create read comand
yargs.command({
  command: 'read',
  describe: "read a note",
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNotes(argv.title);
  }
});

yargs.parse();
// console.log(yargs.argv);