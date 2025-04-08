let a = ''; // первое число
let b = ''; // второе число
let sign = ''; // знак операции
let finish = false;

// Массивы допустимых значений
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

// экран
const out = document.querySelector('.calk-screen p');

// Очистка всех переменных
function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = '0';
}

// Назначаем обработчик на кнопку AC
document.querySelector('.ac').onclick = clearAll;

// Обработка нажатий кнопок
document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if (!event.target.classList.contains('btn')) return;

    const key = event.target.textContent;

    // нажата AC
    if (event.target.classList.contains('ac')) {
        clearAll();
        return;
    }

    // +/-: смена знака
    if (event.target.classList.contains('plus-minus')) {
        if (b === '' && sign === '') {
            a = (-a).toString();
            out.textContent = a;
        } else if (a !== '' && b !== '' && !finish) {
            b = (-b).toString();
            out.textContent = b;
        }
        return;
    }

    // %: процент
    if (event.target.classList.contains('percent')) {
        if (b === '' && sign === '') {
            a = (a / 100).toString();
            out.textContent = a;
        } else if (a !== '' && b !== '' && !finish) {
            b = (b / 100).toString();
            out.textContent = b;
        }
        return;
    }

    // нажата цифра или точка
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {
            b += key;
            out.textContent = b;
        }
        return;
    }

    // нажата операция
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        return;
    }

    // нажато "="
    if (key === '=') {
        if (b === '') b = a;

        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break;
            case 'X':
                a = a * b;
                break;
            case '/':
                if (b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }

        finish = true;
        out.textContent = a;
    }
};