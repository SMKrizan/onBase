const { db, pool } = require('../db/connection');
const inquirer = require('inquirer');
// const viewDepts = require('./viewDepts');

//UPDATE to show list of departments prior to making a selection

function addDept(index) {
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
                    if (err) {
                        console.log('error: ', err);
                    }
                    console.log(`SUCCESS! ${newDept.dept_name} has been added.\n`);
                    index();
                })
        })
        .catch(err => {
            console.log(err);
        });


};

module.exports = addDept;