class Shape {
    constructor(color) {
        this.color = color;
    }
}

class Circle extends Shape {
    constructor(color) {
        super(color);
    }

    generateMarkup() {
        return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
    }
}

class Triangle extends Shape {
    constructor(color) {
        super(color);
    }

    generateMarkup() {
        return `<polygon points="150,20 75,180 225,180" fill="${this.color}" />`;
    }
}

class Square extends Shape {
    constructor(color) {
        super(color);
    }

    generateMarkup() {
        return `<rect x="75" y="50" width="150" height="100" fill="${this.color}" />`;
    }
}

module.exports = { Circle, Triangle, Square }