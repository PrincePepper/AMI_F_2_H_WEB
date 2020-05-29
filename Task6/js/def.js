let canvas, context, figures, idTimer, n, speed = 10;

const minParameter = 5,
    maxParameter = 100,
    minN = 3,
    maxN = 1000,
    bgCol = '#ffffff',
    count = 10;

const directions = [
    // top
    (x, y) => {
        x += Math.floor(Math.random() * 4) - 2;
        y += Math.floor(Math.random() * 2) - speed;
        return [x, y];
    },
    // bottom
    (x, y) => {
        x += Math.floor(Math.random() * 4) - 2;
        y += Math.floor(Math.random() * 2) + speed;
        return [x, y];
    },
    // left
    (x, y) => {
        x += Math.floor(Math.random() * 2) - speed;
        y += Math.floor(Math.random() * 4) - 2;
        return [x, y];
    },
    // right
    (x, y) => {
        x += Math.floor(Math.random() * 2) + speed;
        y += Math.floor(Math.random() * 4) - 2;
        return [x, y];
    },
    // chaos
    (x, y) => {
        return directions[Math.floor(Math.random() * 4)](x, y);
    }
]

class Tfigure {
    constructor(pX, pY) {
        [this.posX, this.posY] = [pX, pY];
        this.color = this.constructor.getRandomColor();
        this.parameter = this.constructor.getRandomParameter();
        this.direction = Math.floor(Math.random() * 4);
    }

    static getRandomColor() {
        let random = () => {
            return Math.floor(Math.random() * (256 - 10));
        }
        return 'rgb(' + random() + ', ' + random() + ', ' + random() + ')';
    }

    static getRandomParameter() {
        return Math.floor(minParameter + Math.floor(Math.random() * maxParameter));
    }
}

class Tball extends Tfigure {
    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.posX, this.posY, this.parameter, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
    }
}

class Tsquare extends Tfigure {
    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        let [x, y, parameter] = [this.posX, this.posY, this.parameter];
        context.moveTo(x - parameter / 2, y - parameter / 2)
        context.lineTo(x + parameter / 2, y - parameter / 2)
        context.lineTo(x + parameter / 2, y + parameter / 2)
        context.lineTo(x - parameter / 2, y + parameter / 2)
        context.lineTo(x - parameter / 2, y - parameter / 2)
        context.closePath();
        context.fill();
    }

    getPoints() {
        let [x, y, parameter] = [this.posX, this.posY, this.parameter];
        return [
            [x + parameter / 2, y + parameter / 2],
            [x - parameter / 2, y - parameter / 2],
            [x + parameter / 2, y - parameter / 2],
            [x - parameter / 2, y + parameter / 2]];
    }
}

class Ttriangle extends Tfigure {
    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        let [x, y, parameter] = [this.posX, this.posY, this.parameter];
        context.moveTo(x - parameter, y + parameter);
        context.lineTo(x + parameter, y + parameter);
        context.lineTo(x, y - parameter);
        context.closePath();
        context.fill();
    }

    getPoints() {
        let [x, y, parameter] = [this.posX, this.posY, this.parameter];
        return [
            [x - parameter, y + parameter],
            [x + parameter, y + parameter],
            [x, y - parameter]];
    }
}

function drawBack(context, col, w, h) {
    context.save();
    context.fillStyle = col;
    context.fillRect(0, 0, w, h);
    context.restore();
}

let ClassesOfFigures = [Tball, Tsquare, Ttriangle];

function randomFigure() {
    return Math.floor(Math.random() * ClassesOfFigures.length);
}

function randomCoord(parameter) {
    return (minParameter) + Math.floor(Math.random() * (parameter - (maxParameter + minParameter)))
}

function init() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        drawBack(context, bgCol, canvas.width, canvas.height);
        figures = [];
        for (let i = 0; i < count; i++) {
            let item = new ClassesOfFigures[randomFigure()](randomCoord(canvas.width), randomCoord(canvas.height));
            item.draw(context);
            figures.push(item);
        }
    }
}

function goInput(x, y) {
    let item = new ClassesOfFigures[randomFigure()](x, y);
    item.draw(context);
    figures.push(item);
}

function hypotenuse(k1, k2) {
    return Math.floor(Math.sqrt(Math.pow(k1, 2) + Math.pow(k2, 2)));
}

function inPoly(poly, x, y) {
    let check = 0;
    x = Math.floor(x);
    y = Math.floor(y);

    let xp = [], yp = [];
    for (let point of poly) {
        xp.push(point[0]);
        yp.push(point[1]);
    }
    let polyLength = xp.length;

    for (i = 0, j = polyLength - 1; i < polyLength; i++) {
        if (
            (((yp[i] <= y) && (y < yp[j])) || ((yp[j] <= y) && (y < yp[i])))
            &&
            (x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) {
            check = !check
        }
        j = i;
    }

    return check;
}

function collision(figure) {
    for (let i = 0; i < figures.length; i++) {
        if (figures[i] !== figure) {
            let opponent = figures[i];
            if (opponent instanceof Tball && figure instanceof Tball) {
                let k1 = figure.posX - opponent.posX,
                    k2 = figure.posY - opponent.posY;
                let distance = hypotenuse(k1, k2);
                let sumOfRadius = opponent.parameter + figure.parameter;
                if (distance <= sumOfRadius) {
                    figures.splice(figures.indexOf(figure, 0), 1);
                    figures.splice(figures.indexOf(opponent, 0), 1);
                    return;
                }
            } else if (
                !(opponent instanceof Tball) && !(figure instanceof Tball)
            ) {
                let [pointsFigure, pointsOpponent] = [figure.getPoints(), opponent.getPoints()];
                for (let point of pointsFigure) {
                    if (inPoly(pointsOpponent, point[0], point[1])) {
                        figures.splice(figures.indexOf(figure), 1);
                        figures.splice(figures.indexOf(opponent), 1);
                        return;
                    }
                }
            } else {
                let ball = opponent,
                    poly = figure;
                if (figure instanceof Tball) {
                    [ball, poly] = [figure, opponent];
                }
                let pointsOfpoly = poly.getPoints();

                let distance = hypotenuse(pointsOfpoly[0][0] - ball.posX, pointsOfpoly[0][1] - ball.posY);
                for (let i = 0; i < pointsOfpoly.length; i++) {
                    let tmp = hypotenuse(pointsOfpoly[i][0] - ball.posX, pointsOfpoly[i][1] - ball.posY);
                    distance = tmp < distance ? tmp : distance;
                }
                if (ball.parameter >= distance || inPoly(pointsOfpoly, ball.posX, ball.posY)) {
                    figures.splice(figures.indexOf(poly), 1);
                    figures.splice(figures.indexOf(ball), 1);
                    return;
                }
            }
        }
    }
}

function moveFigure(direction) {
    if (figures.length) {
        drawBack(context, bgCol, canvas.width, canvas.height);
        for (let i = 0; i < figures.length; i) {
            let [x, y] = [figures[i].posX, figures[i].posY];

            figures[i].parameter += 1;
            if (figures[i].parameter >= n) {
                figures.splice(i, 1);
                continue;
            }

            [figures[i].posX, figures[i].posY] = directions[direction === undefined ? figures[i].direction : direction](x, y);

            figures[i].draw(context);

            collision(figures[i]);

            if ((x > canvas.width) || (x < 0) || (y < 0) || (y > canvas.height)) {
                figures.splice(i, 1);
            } else {
                i++;
            }
        }
    } else {
        drawBack(context, bgCol, canvas.width, canvas.height);
        stop();
    }
}

function remove() {
    stop();
    figures = [];
    drawBack(context, bgCol, canvas.width, canvas.height);
}

function toggleEnabled(disabled) {
    document.getElementById('add').disabled = disabled;
    document.getElementById('addFigs').disabled = disabled;
}

function stop() {
    toggleEnabled(false);
    clearInterval(idTimer);
}

function move(direction) {
    stop()
    // toggleEnabled(true);
    n = 300;

    if (direction === undefined) {
        for (let i = 0; i < figures.length; i++)
            figures[i].direction = Math.floor(Math.random() * 4);
    }
    idTimer = setInterval(moveFigure, 100, direction);
}

function faster() {
    if (speed > 100) {
        return;
    }
    speed += 10;
}

function slower() {
    if (speed <= 0) {
        return;
    }
    speed -= 10;
}

function addFigures() {
    let count = Number(document.getElementById('add').value);
    if (count + figures.length > 100) {
        return;
    }
    for (let i = 0; i < count; i++) {
        goInput(randomCoord(canvas.width), randomCoord(canvas.height));
    }
}