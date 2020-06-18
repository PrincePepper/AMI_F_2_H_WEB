let timer = 0
let background = new Image(0, 0);
background.src = 'background.png';
let nlo = new Image(0, 0);
nlo.src = 'nlo.svg';
let enem_1 = new Image(0, 0);
enem_1.src = 'monster1.jpg';
let angle = 0
let bullet = 0
let time = 0
let level_map = 1;
let score = 0
let hp = 3
let bullet_list = []
let temp_time=100

Bullet = new Class({
    initialize: function (angle) {
        this.posX = 0;
        this.posY = 0;
        this.speed = 10;
        this.size = 5;
        this.angle = angle;
    },
    fly: function () {
        p1 = this.posX * Math.tan(this.angle);
        p2 = 0.4 * (this.posX ** 2);
        p3 = 2 * (this.speed ** 2) * (Math.cos(this.angle) ** 2);
        this.posY = p1 - (p2 / p3);
        this.posX += this.speed * Math.cos(this.angle) / 5;
    },
    draw: function (ctx) {
        ctx.fillStyle = '#000000';
        ctx.save();
        ctx.translate(X, Y);
        ctx.beginPath();
        ctx.arc(this.posX, -this.posY, this.size + 10, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        this.fly();
    }
})


//Enemies
enemy_list = [{
    size: 100,
    speed: 2 * level_map / 5,
    points: 5,
    img: enem_1
}, {
    size: 150,
    speed: (2 * level_map + 2) / 5,
    points: 10,
    img: enem_1
}, {
    size: 170,
    speed: (2 * level_map + 3) / 5,
    points: 35,
    img: enem_1
}, {
    size: 150,
    speed: (2 * level_map + 4) / 5,
    points: 20,
    img: enem_1
}]

function loadgame(context, canvas) {
    value = canvas.getBoundingClientRect();
    menu = true
    const pattern = trianglify({
        height: window.innerHeight,
        width: window.innerWidth,
        xColors: ['rgb(0, 251, 255)', 'rgb(255, 153, 0)', 'rgb(36, 35, 34)', 'rgb(155, 201, 14)', 'rgb(125, 122, 250)', 'rgb(255, 130, 243)', 'rgb(255,255,255)', 'rgb(247,252,17)', 'rgb(8,255,0)', 'rgb(255,0,0)', 'rgb(0,39,255)', 'rgb(207,0,255)'],
        yColors: 'match',
        cellSize: Math.ceil(window.innerWidth / 25)
    })
    $('#fon').append(pattern.toCanvas())
    let rect = {
        x: canvas.width / 2 - canvas.width / 2.5,
        y: canvas.height / 2 - canvas.height / 2.5,
        width: canvas.width - canvas.width / 5,
        height: canvas.height - canvas.height / 5
    };
    loadmainMenu(context, rect);
    timer = setInterval('startgame(context,canvas);', 10);
}

function loadmainMenu(context, rect) {
    context.fillStyle = 'rgb(92,235,245)';
    context.strokeStyle = 'white';
    context.lineWidth = 10;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    draw_info(context, rect)
    context.save()
    context.restore()
    background.width = rect.width;
    background.height = rect.height;
    context.drawImage(background, rect.x + 5, rect.y, rect.width - 10, rect.height - 5);
    context.save()
    context.restore()
}

function getMousePos(event) {
    X = event.clientX - value.left
    Y = event.clientY - value.top
}

function startgame(context, canvas) {
    let rect = {
        x: canvas.width / 2 - canvas.width / 2.5,
        y: canvas.height / 2 - canvas.height / 2.5,
        width: canvas.width - canvas.width / 5,
        height: canvas.height - canvas.height / 5
    };
    hero(context, canvas, rect)
    play(context, rect)
}

function hero(context, canvas, rect) {
    let img = {
        x: rect.x + canvas.width / 16,
        y: rect.y + canvas.height / 16,
        width: rect.width - canvas.width / 8,
        height: rect.height - canvas.height / 8
    }
    loadmainMenu(context, rect)
    let coord = {
        x: X,
        y: Y
    }
    let state = checkCollision(coord, img);
    if (state) {
        context.drawImage(nlo, X - canvas.width / 16, Y - canvas.height / 16, canvas.width / 8, canvas.height / 8);
    }
}

function draw_info(context, rect) {
    context.fillStyle = "#ff0000";
    context.font = "28px Arial";
    let str = '';
    let i = 0;
    while (i++ < hp) str += '❤';
    while (i++ <= 3) str += '♡';
    context.fillText(str, rect.x + 15, rect.y + 50);
    context.font = "28px Arial";
    context.fillText(score, rect.x + 20, rect.y + 100);
}


function play(context, rect) {
    if (hp > 0) {
        loadmainMenu(context, rect)
        time++;
        level_map = score / 500 + 1;
        let en_amount = 3 + level_map * 2;

        for (i = 0; i < bullet_list.length; i++) {
            if (bullet_list[i].posX + bullet_list[i].size >= canvas.width)
                bullet_list.splice(i--, 1);
        }

        for (i = 0; i < bullet_list.length; i++) {
            for (j = 0; j < enemy_list.length; j++) {
                if (checkCollision(bullet_list[i], enemy_list[j])) {
                    score += enemy_list[j].points;
                    enemy_list.splice(j--, 1);
                }
            }
        }

        for (j = 0; j < enemy_list.length; j++) {
            if (enemy_list[j].posX <= 0) {
                enemy_list.splice(j--, 1);
                hp--;
            }
        }

        for (j = 0; j < enemy_list.length; j++) {
            enemy_list[j].posX -= enemy_list[j].speed;
        }


        while (enemy_list.length < en_amount)
            get_enemy();
    } else {
        end_game();
    }
}

function pausegame() {
    window.onkeydown = function (e) {
        if (e["keyCode"] === 80) {
            clearInterval(timer);
        }
    };
}
function shoot() {
    if (time >= temp_time) {
        time = 0;
        bullet_list.push(new Bullet(angle));
    }
}
function end_game() {
    alert("GAME OVER");
    localStorage.setItem(name, score);
}