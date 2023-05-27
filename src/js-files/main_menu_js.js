let main_menu = document.querySelector('.main-menu');
let wrapper = document.querySelector('.wrapper');
// создаю элементы для блокировки враппера и разблокировки меню при нажатии гамбургера
// и наоборот при нажатии крестика


let hamburger__id = document.querySelector('#hamburger__id');
hamburger__id.addEventListener('click', function(event){
    main_menu.style.display = 'flex';
    wrapper.style.display = 'none';
    event.preventDefault();
});

let main_menu__back = document.querySelector('#main_menu__back');
main_menu__back.addEventListener('click', function(){
    main_menu.style.display = 'none';
    wrapper.style.display = 'block';
});