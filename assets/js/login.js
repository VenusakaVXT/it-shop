let isLoggedIn = false;
document.getElementById('js-btn').addEventListener('click', function() {
    var loginUsernameValue = document.querySelector('.input-login-username').value;
    var loginPasswordValue = document.querySelector('.input-login-password').value;

    if (loginUsernameValue === 'admin' && loginPasswordValue === 'admin@123') {
        window.location.href = '../index.html';
        isLoggedIn = true;
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng');
    }
})


