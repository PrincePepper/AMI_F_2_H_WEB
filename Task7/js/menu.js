const bgCol = '#383636'
let menu = false;
let value
let X, Y
let name

function start() {
    $(window).on("load", function () {
        $('.loader-container').fadeOut(250);
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    });
    canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        context = canvas.getContext('2d');
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        value = canvas.getBoundingClientRect();
        drawBack(context, bgCol, 0, 0, canvas.width, canvas.height);
        rules(canvas, context)
        button_start(canvas, context)
        check_name()
    }
}

function rules(canvas, context) {
    let rect = {
        x: canvas.width - 300,
        y: 30,
        width: 190,
        height: 100
    };
    context.font = "48px serif";
    context.lineWidth = 5;
    context.fillStyle = 'white';
    context.strokeStyle = 'white';
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.fillText("RULES", rect.x + rect.width / 2 - context.measureText("RULES").width / 2, rect.y + rect.height / 2 + 10);
    context.save();
    canvas.addEventListener("click", function (e) {
        let coord = {
            x: X,
            y: Y
        }
        let state = checkCollision(coord, rect);
        if (state) {
            $('#exampleModal').modal('show')
        }
    })
}

function button_start(canvas, context) {
    let rect = {
        x: canvas.width / 2 - canvas.width / 7,
        y: canvas.height / 2 - canvas.height / 8,
        width: canvas.width - 2 * (canvas.width / 2 - canvas.width / 7),
        height: canvas.height - 2 * (canvas.height / 2 - canvas.height / 8)
    };
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.fillText("START", rect.x + rect.width / 2 - context.measureText("START").width / 2, rect.y + rect.height / 2 + 10);
    canvas.addEventListener("mousemove", function (e) {
        if (menu) return
        let coord = {
            x: X,
            y: Y
        }
        let state = checkCollision(coord, rect);
        context.font = "48px serif";
        context.lineWidth = 5;
        context.clearRect(rect.x, rect.y, rect.width, rect.height)
        drawBack(context, bgCol, rect.x - 10, rect.y - 10, rect.width + 10, rect.height + 10);
        if (state) {
            context.fillStyle = 'red';
            context.strokeStyle = 'red';
        } else {
            context.fillStyle = 'white';
            context.strokeStyle = 'white';
        }
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.fillText("START", rect.x + rect.width / 2 - context.measureText("START").width / 2, rect.y + rect.height / 2 + 10);
    })
    canvas.addEventListener("click", function (e) {
        if (menu) return
        let coord = {
            x: X,
            y: Y
        }
        let state = checkCollision(coord, rect);
        if (state) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            loadgame(context, canvas)
        }
    })
}

function check_name() {
    firstName = prompt('Как Вас зовут?');
    if (Boolean(firstName)) {
        name = firstName;
        alert("Приятной игры, " + firstName)
    } else
        check_name();
}

function drawBack(context, col, x, y, w, h) {
    context.save();
    context.fillStyle = col;
    context.fillRect(x, y, w, h);
    context.restore();
}

function checkCollision(pos, obj) { //Проверяет входит ли точка в обьект
    return pos.x >= obj.x && pos.x <= obj.x + obj.width && pos.y >= obj.y && pos.y <= obj.y + obj.height;
}