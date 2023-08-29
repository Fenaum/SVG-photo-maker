const { Circle, Triangle, Square } = require("./shapes.js");

describe("Shape classes", () => {
    test("Circle generates correct SVG markup", () => {
        const circle = new Circle("red");
        expect(circle.generateMarkup()).toBe(
        '<circle cx="150" cy="100" r="50" fill="red" />'
        );
    });

    test("Triangle generates correct SVG markup", () => {
        const triangle = new Triangle("green");
        expect(triangle.generateMarkup()).toBe(
        '<polygon points="150,20 75,180 225,180" fill="green" />'
        );
    });

    test("Square generates correct SVG markup", () => {
        const square = new Square("pink");
        expect(square.generateMarkup()).toBe(
            '<rect x="75" y="50" width="150" height="100" fill="pink" />'
        );
    });
});
