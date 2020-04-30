function calculateCir(radius) {
    return Math.PI * radius * radius;
}

function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

function getRandomInt(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


$('#inputraduis').focus();

$("form").submit(function () {
    let c = $('#inputraduis')
    let f = $('#inputfib')
    let i2 = $('#inputminrandom')
    let x = $('#inputmaxrandom')

    let c_v = c.val();
    let f_v = f.val();
    let i_v = i2.val();
    let x_v = x.val();


    const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir1.setAttribute("cx", "500");
    cir1.setAttribute("cy", "500");
    var chbox;
    chbox = document.getElementById('customCheck2');
    if (chbox.checked) {
        if (c_v) alert(calculateCir(c_v));
        else alert(calculateCir(c.attr('placeholder')));
    }
    if (c_v) {
        if (c_v > 500) c_v = 500;
        if (c_v < 0) {
            c_v = 0;
            alert("Ошибка ввода");
        }
        cir1.setAttribute("r", c_v);

        $('.answer-circle').text(calculateCir(c_v));
    } else {
        cir1.setAttribute("r", c.attr('placeholder'));

        $('.answer-circle').text(calculateCir(c.attr('placeholder')));
    }
    cir1.setAttribute("fill", "red");
    // attach container to document
    document.getElementById("svg").appendChild(cir1);

    if (f_v) {
        $('#answer-fib').text(fib(f_v));
    } else $('#answer-fib').text(fib(f.attr('placeholder')));


    let table = $('<table id="tabb"/>')
    let columnsCount = 8;
    let rowsCount = 5;
    for (let i = 0; i < rowsCount; i++) {
        let row = $('<tr/>')
        for (let j = 0; j < columnsCount; j++) {
            let cell = $('<td/>')
            if (i_v) {
                cell.html(getRandomInt(parseInt(i_v), parseInt(x_v)))

            } else {
                cell.html(getRandomInt(parseInt(i2.attr('placeholder')), parseInt(x.attr('placeholder'))))
            }

        }
        table.append(row)
    }
    table.appendTo('#table')

});
