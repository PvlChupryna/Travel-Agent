function multiValidate() {
    function formValidate({ formSelector, rules, onSuccess }) {
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.querySelector(formSelector);
            
            if (!form) {
                console.error(`Form with selector "${formSelector}" not found`);
                return;
            }
    
            const successMessage = form.querySelector('.success-massage');
            const successBtn = form.querySelector('.success-massage__btn');
    
            if (!successMessage || !successBtn) {
                console.error('Success message elements not found');
                return;
            }
    
            // Обработчик для событий 'invalid' на каждом поле
            rules.forEach(({ selector, test }) => {
                const input = form.querySelector(selector);
    
                if (!input) {
                    console.error(`Input with selector "${selector}" not found`);
                    return;
                }
    
                input.addEventListener('invalid', function (e) {
                    e.preventDefault(); // Предотвращаем стандартные сообщения браузера
                    input.classList.add('_error'); // Добавляем класс _error
                });
    
                // Удаляем класс _error при вводе
                input.addEventListener('input', function () {
                    if (input.checkValidity()) {
                        input.classList.remove('_error');
                    }
                });
            });
    
            form.addEventListener('submit', function (e) {
                e.preventDefault(); // Предотвращаем отправку формы по умолчанию
                
                let hasError = false;
    
                // Проверяем каждое поле по заданным правилам
                rules.forEach(({ selector, test }) => {
                    const input = form.querySelector(selector);
                    if (!input) return;
    
                    if (!test(input)) {
                        input.classList.add('_error');
                        hasError = true;
                    } else {
                        input.classList.remove('_error');
                    }
                });
    
                if (!hasError) {
                    // Если нет ошибок, вызываем onSuccess
                    onSuccess(form, successMessage, successBtn);


                    // Закрываем сообщение об отправке
                    successMessage.addEventListener('click', removeActiveClass);
                    successBtn.addEventListener('click', removeActiveClass);

                    function removeActiveClass() {
                        successMessage.classList.remove('success-massage--active');
                        successBtn.classList.remove('success-massage__btn--active');
                    }
                } else {
                    form.reportValidity(); // Показываем стандартные сообщения валидации
                }
            });
        });
    }
    

    // Валидация для формы с дополнительной проверкой email
    formValidate({
        formSelector: '#subscribe-form',
        rules: [
            {
                selector: '#email',
                test: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value), // Проверка email
            },
        ],
        onSuccess: (form, successMessage, successBtn) => {
            successMessage.classList.add('success-massage--active');
            successBtn.classList.add('success-massage__btn--active');
            form.reset();
            console.log('Contact Form submitted successfully!');
        }
    });

   
    
}
export default multiValidate;


