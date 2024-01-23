window.onload = function() {
    verificarUsuario();
};

function salvarEmail() {
    const email = document.getElementById('email').value;
    localStorage.setItem('email', email);
    // Redirecionar para a página principal
    window.location.href = 'main.html';
}

function verificarUsuario() {
    const email = localStorage.getItem('email');
    if (email) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('welcomeMessage').style.display = 'block';
        // Redirecionar para a página principal
        window.location.href = 'main.html';
    }
}
