// функция, которая ищет заданный класс, чтобы выбрать из него по фильтру нужный элемент для нахождения 
// соответствия с картинками-кнопками выбора отзыва (вторая часть нижеследующей функции)
const findBlockByAlias = (alias) => {
    return $('.reviews__unit').filter((ndx, item) => {
        return $(item).attr('data-review-unit') === alias;
    });
};

jQuery(".review__img").click((e) => {
// обрабатываем событие клика по картинке
    // currentTarget указывает на элемент, на котором непосредственно клик
    const $this = jQuery(e.currentTarget);
    // closest ищет родителя $this с классом review__item
    const curItem = $this.closest('.review__item');
    // ставим модификатор элементу по которому кликнули и убираем от соседних
    curItem.addClass('review__item--active').siblings().removeClass('review__item--active');



    // выбираем элемент, на который нажали для переключения отзыва, берем значение data-open
    const target = $this.attr('data-open');
    // передаем этот элемент в функцию
    const itemToShow = findBlockByAlias(target);
    // добавим нужному элементу класс актив
    itemToShow.addClass('reviews__unit--active').siblings().removeClass('reviews__unit--active');
});
