#!/usr/bin/env node
let fs = require('fs');
let path = require('path');
let helpO = require("./commands/help");
let orgO = require("./commands/organize");
let treeO = require("./commands/tree");
let inputArr = process.argv.slice(2);
// console.log(inputArr);
let command = inputArr[0];
switch (command) {
    case 'tree':

        treeO.treeK(inputArr[1]);
        break;
    case 'organize':
        orgO.orgK(inputArr[1]);
        break;
    case 'help':
        helpO.helpKey();
        break;
    default:
        console.log("Please enter right command");
        break;
}