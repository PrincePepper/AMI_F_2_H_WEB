function getRandomInt(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

function getArray(n, min, max) {
    let arr = new Array(n)
    for (let i = 0; i < n; i++) {
        arr[i] = getRandomInt(parseInt(min), parseInt(max))
    }
    return arr;
}

function compareNumeric(a, b) {
    return a - b;
    if (a > b) return 1
    if (a === b) return 0
    if (a < b) return -1
}

function getResultArray(mass) {
    if (mass.length > 0) {
        return mass.sort((a, b) => a - b)
    }
}

//----------------------------------------------------------------------------------------------------------------
$("form").submit(function () {
    let n = $('#n').val()
    let max = $('#min')
    let min = $('#max')

    if (n < 0 || max < 0) {
        alert("Ошибка ввода. Повторите ввод");
        return false;
    }

    let aaa = getResultArray(getArray(n * n, min.attr('placeholder'), max.attr('placeholder')))
    console.log(aaa)
    let c = 0;
    let matrix = new Array(n);
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(n)
    }
    console.log(matrix)

    for (let row = 0; row < n; row++) {

        if (row % 2 === 0) {
            for (let i = n - 1; i >= 0; i--) {
                matrix[i][row] = aaa[c++];
            }
        } else {
            for (let i = 0; i < n; i++) {
                matrix[i][row] = aaa[c++];
            }
        }
    }

    let div = $('<div/>')
    let table = $('<table class="tabb shadow-lg p-3 mb-5 bg-white rounded"/>')
    for (let i = 0; i < n; i++) {
        let row = $('<tr/>')
        for (let j = 0; j < n; j++) {
            let colomn = $('<td/>')
            colomn.html(matrix[i][j])
            row.append(colomn)
        }
        table.append(row)
    }
    div.append(table)
    div.appendTo($('#xlop'))

    return false;
});