let tel = document.querySelector('.tel__input');
tel.addEventListener('keydown', function(event){
    let isDigit = false;
// запрещаем ввод в поле всех значений, кроме:
    if (event.key >=0 || event.key <=9 || event.key == '-' || event.key == 'spase' || event.key == 'Backspace') {
        isDigit = true;
    }
    else if (event.key == 'Delete');
    else if (event.key == 'ArrowLeft');
    else if (event.key == 'ArrowRight');
    
// в этом коде независимо от трю или фолс только при указанных значениях будет выполняться
// действие по умолчанию. Если вводимые значения не в списке указанных, тогда
// значение по умолчанию - ввод - не происходит. также остальные елс иф можно
// внести в иф который чуть выше и код будет работать.
    else {event.preventDefault();
    };
});