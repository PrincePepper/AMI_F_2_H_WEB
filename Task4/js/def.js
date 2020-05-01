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


    let table = $('<table class="tabb shadow-lg p-3 mb-5 bg-white rounded"/>')
    let columnsCount = 8;
    let rowsCount = 5;
    let arrmin = new Array(0)
    let arrmax = new Array(0)

    for (var i = 0; i < rowsCount; i++) {
        var row = $('<tr/>')
        for (var j = 0; j < columnsCount; j++) {
            var cell = $('<td />')
            if (i_v) {
                let i_v_2 = getRandomInt(parseInt(i_v), parseInt(x_v))
                cell.html(i_v_2)
                if (i_v_2 >= 0) {
                    arrmax.push(i_v_2)
                } else arrmin.push(i_v_2)
            } else {
                let i_v_3 = getRandomInt(parseInt(i2.attr('placeholder')), parseInt(x.attr('placeholder')))
                cell.html(i_v_3)
                if (i_v_3 >= 0) {
                    arrmax.push(i_v_3)
                } else arrmin.push(i_v_3)
            }
            row.append(cell)
        }
        table.append(row)
    }
    table.appendTo('#table')


    console.log(arrmax)
    console.log(arrmin)
    $('#first').text(arrmax)
    $('#second').text(arrmin)
    return false;
});
