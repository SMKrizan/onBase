const db = require('../db/connection');
const inquirer = require('inquirer');

const viewDepts = require('./viewDepts');

function addDept() {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'dept_name',
                message: "Enter the new department name (required):",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Enter the new department:');
                        return false;
                    }
                }
            },
        ])
        .then(newDept => {
            console.log('Adding new department:');
            db.query(`INSERT INTO departments SET ?`, newDept,
                function (err, res) {
                    if (err) throw err;
                    console.log(`SUCCESS! ${newDept.dept_name} has been added.`)
                    viewDepts();
                });
        });

};

module.exports = addDept;