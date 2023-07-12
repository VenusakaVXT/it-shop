const registerModal = document.querySelector('.js-modal');
const registerBtn = document.querySelector('.js-register-btn');
const cancelBtn = document.querySelector('.js-cancel-btn');
const modalContainer = document.querySelector('.js-modal-container');
const phoneInput = document.getElementById('js-input-phone');
const passInput = document.getElementById('js-input-password');
const passAccuracy = document.getElementById('js-input-password-authentication');
const returnText = document.getElementById('js-paragraph');
const button = document.getElementById('js-btn');

// Show Modal
registerBtn.addEventListener('click', function() {
    if(button.classList.contains('disabled')) {
        return;
    } else {
        registerModal.classList.add('modal');
        registerModal.style.display = 'flex';
    }
});

// Hide Modal
cancelBtn.addEventListener('click', function() {
    registerModal.classList.remove('modal');
    registerModal.style.display = 'none';
});

registerModal.addEventListener('click', function() {
    registerModal.classList.remove('modal');
    registerModal.style.display = 'none';
});

modalContainer.addEventListener('click', function (event) 
{
    event.stopPropagation();
});

// Get Input
returnText.innerHTML = `Mã xác thực OTP sẽ được gửi qua tin nhắn của số điện thoại ${phoneInput}.`;

// Display button
function checkInputs() {
    let phoneValue = phoneInput.value.trim();
    let passValue = passInput.value.trim();
    let passAccuracyValue = passAccuracy.value.trim();

    if ((phoneValue === '' || passValue === '' || passAccuracyValue === '') ||
        (phoneValue === '' && passValue === '' && passAccuracyValue === '')) {
        button.classList.add('disabled');
    } else {
        button.classList.remove('disabled');
    }
}

phoneInput.addEventListener('input', checkInputs);
passInput.addEventListener('input', checkInputs);
passAccuracy.addEventListener('input', checkInputs);