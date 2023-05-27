const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach((field) => {
        // выделяем поля красным если не заполнены c помощью класса
        field.removeClass('input-error');
        if (field.val().trim() === '') {
            // трим обрезает пробелы в начале и в конце
            field.addClass('input-error');
        }
    });
    const errorFields = form.find('.input-error');
    return errorFields.length === 0;
};

jQuery('.forms').submit(e => {
    e.preventDefault();
    const forms = $(e.currentTarget);
    const name = forms.find("[name='name']");
    const phone = forms.find("[name='phone']");
    const comment = forms.find("[name='comment']");
    const to = forms.find("[name='to']");
    const modal = $('#modal');
    const content = modal.find('.modal__content');
    modal.removeClass('error-modal');
    const isValid = validateFields(forms, [name, phone, comment, to]);
    if (isValid) {
        // это отправка запроса на сервер
        $.ajax({
            url: 'https://webdev-api.loftschool.com/sendmail',
            method: 'post',
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
            success: data => {
                content.text(data.message)
                new Fancybox([
                    {
                        src: '#modal',
                        type: 'inline',
                        display: 'flex',
                    },
                ]);
            },
            error: (data) => {
                // const message = data.responseJSON.message;
                content.text('Ошибка ввода! Проверьте данные и попробуйте снова!');
                modal.addClass('error-modal')
                new Fancybox([
                    {
                        src: '#modal',
                        type: 'inline',
                        display: 'flex',
                    },
                ]);
            }
        });
    }
});

$('.button--modal').click(e => {
    e.preventDefault();
    Fancybox.close();
});