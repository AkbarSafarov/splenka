document.addEventListener('DOMContentLoaded', function () {

    const notifyForm = document.querySelector('.notify-form');

    if (notifyForm) {
        notifyForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput || !emailInput.value.trim()) {
                emailInput && emailInput.classList.add('is-error');
                return;
            }

            console.log('notify:', emailInput.value);
            this.classList.add('is-submitted');
        });
    }
});
