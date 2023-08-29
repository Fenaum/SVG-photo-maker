const inquirer = require('inquirer');
const fs = require('fs').promises;
const { Circle, Triangle, Square} = require('./lib/shapes')
// import inquirer from ('inquirer')
// import fs from ('fs')
// import shapes from shape.js
// I deciided to use fs async to test my async await skills

async function prompt() {
    const userInput = await inquirer.prompt([
        {
            name: "text",
            message: "Enter the text (up to three characters) for the logo:",
            validate: (input) => /^[a-zA-Z]{1,3}$/.test(input),
        },
        {
            name: "textColor",
            message: "Enter the text color (keyword or hexadecimal number):",
        },
        {
            name: "shape",
            type: "list",
            message: "Select a shape for the logo:",
            choices: ["Circle", "Triangle", "Square"],
        },
        {
            name: "shapeColor",
            message: "Enter the shape color (keyword or hexadecimal number):",
        },
    ]);

    return userInput;
}

function generateSVG(text, textColor, shape, shapeColor) {
    let shapeChild;

    if (shape === "Circle") {
        shapeChild = new Circle(shapeColor);
    } else if (shape === "Triangle") {
        shapeChild = new Triangle(shapeColor);
    } else if (shape === "Square") {
        shapeChild = new Square(shapeColor);
    }

    let shapeMarkup = shapeChild.generateMarkup();

    let svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
        ${shapeMarkup}
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" fill="${textColor}" font-size="48">${text}</text>
        </svg>
    `;

    return svg;
}

// used async awwait for fs module for more readable codes
async function saveSVGToFile(filename, svg) {
    try {
        await fs.writeFile(filename, svg);
        console.log(`Generated ${filename}`);
    } catch (err) {
        console.error("Try again, check spelling", err);
    }
}

async function run() {
    try {
        const userInput = await prompt();
        const svg = generateSVG(
            userInput.text,
            userInput.textColor,
            userInput.shape,
            userInput.shapeColor
    );

    saveSVGToFile("logo.svg", svg);
    } catch (error) {
        console.error("Unsucccessful", error);
    }
}   

run();