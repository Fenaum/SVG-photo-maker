const inquirer = require('inquirer');
const fs = require('fs');
// import inquirer from ('inquirer')
// import fs from ('fs')

async function prompt() {
    const userInput = await inquirer.prompt([
        {
            name: 'text',
            message: 'enter the text (up to three characters) for the logo:',
            validate: (input) => /^[a-zA-Z]{1,3}$/.test(input),
        },
        {
            name: "textColor",
            message: 'Enter the text color (keyword or hexadecimal number):',
        },
        {
            name: 'shape',
            type: 'list',
            message: 'Select a shape for the logo:',
            choices: ['circle', 'triangle', 'square'],
        },
        {
            name: 'shapeColor',
            mesage: 'enter the shape color (keyword or hexadecimal number'
        },
    ])
    return userInput;
};

function generateSVG(text, textColor, shape, shapeColor) {
    let shapeMarkup = "";

    if (shape === "circle") {
    shapeMarkup = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
    } else if (shape === "triangle") {
    shapeMarkup = `<polygon points="150,20 75,180 225,180" fill="${shapeColor}" />`;
    } else if (shape === "square") {
    shapeMarkup = `<rect x="75" y="50" width="150" height="100" fill="${shapeColor}" />`;
    }

    let svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
        ${shapeMarkup}
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" fill="${textColor}" font-size="48">${text}</text>
    </svg>
    `;

    return svg;
}

function saveSVGToFile(filename, svg) {
    fs.writeFile(filename, svg, (err) => {
        if (err) throw err;
        console.log(`Generated ${filename}`);
    });
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

    saveSVGToFile('logo.svg', svg);
    } catch (error) {
    console.error('An error occurred:', error);
    }
}

run();