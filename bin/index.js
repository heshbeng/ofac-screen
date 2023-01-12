#!/usr/bin/env node

const screen = require('../main');
const yargs = require('yargs');

const options = yargs
  .option('s', {
    alias: 'subject',
    description: 'Entity name or crypto wallet address to screen against SDN List',
    type: 'string' || 'number',
    demandOption: true
  });
//

const subject = yargs.argv.subject;

const sdnScreen = async () => {
    const results = await screen(subject);

    console.log(results.toString());
}

sdnScreen();
