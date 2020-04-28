function calculateCir(radius) {
    return Math.PI * radius * radius;
}

function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

$('#inputraduis').focus();

$("form").submit(function () {
    let c = $('#inputraduis')
    let f = $('#inputfib')
    let i = $('#inputmin')
    let x = $('#inputmax')

    let c_v = c.val();
    let f_v = f.val();

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


});