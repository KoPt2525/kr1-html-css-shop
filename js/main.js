const orderDialog = document.getElementById('order-dialog');

const orderButtons = document.querySelectorAll('.product-card__button');

const closeDialogButton = document.getElementById('close-order-dialog');

const selectedProductInput = document.getElementById('selected-product');

const dialogProductText = document.getElementById('order-dialog-product');

if (orderDialog) {
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const productName = button.dataset.product;

            selectedProductInput.value = productName;

            dialogProductText.textContent = `Вы заказываете: ${productName}`;

            orderDialog.showModal();
        });
    });

    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });
}

const orderForm = document.getElementById('order-form');

const successMessage = document.getElementById('success-message');

if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formElements = Array.from(orderForm.elements);

        formElements.forEach((element) => {
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }
        });

        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });

            orderForm.reportValidity();
            return;
        }

        successMessage.hidden = false;

        orderForm.reset();

        if (orderDialog) {
            orderDialog.close();
        }

        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    orderForm.addEventListener('reset', () => {
        Array.from(orderForm.elements).forEach((element) => {
            element.removeAttribute('aria-invalid');
        });
    });
}
