// добавил еще один класс для изменения направления 
// стрелочки при нажатии на кнопку.'team__name--triangle


const openItem = item => {
    const container = item.closest('.team__item');
    const contentBlock = container.find('.team__content');
    const textBlock = contentBlock.find('.team__content-block');
    const reqHeight = textBlock.height();
// здесь выводим высоту объекта, которую передадим по клику для
// всплытия необходимого элемента (так как скрыто высотой)
    container.addClass('team__content--active');
    contentBlock.height(reqHeight);
};

const closeEveryItem = (container) => {
    const items = container.find('.team__content');
    const itemContainer = container.find('.team__item');

    itemContainer.removeClass('team__content--active');
    items.height(0);
};

// ***********************************************************
// эта функция удаляет класс и приводит все треугольники к первоначальному виду
const removeEveryTriangle = (container) => {
    // const items = container.closest('.team');
    const itemContainer = container.find('.team__name');
    if (itemContainer.hasClass('team__name--triangle')) {
        itemContainer.removeClass('team__name--triangle');
    };
};
// ***********************************************************
jQuery('.team__name').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__item');

    if (elemContainer.hasClass('team__content--active')) {
        closeEveryItem(container);
        removeEveryTriangle(container);
    } else {
        removeEveryTriangle(container);
        $this.addClass('team__name--triangle');
        closeEveryItem(container);
        openItem($this);
    };
// здесь по клику на элемент вызывается функция, которая изменяет высоту
// скрытой части текста, открывая нужный элемент и закрывая все остальные.
});

