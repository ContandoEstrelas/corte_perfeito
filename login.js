window.onload = function() {
    verificarUsuario();
};

function salvarEmail() {
    const email = document.getElementById('email').value;
    localStorage.setItem('email', email);
    window.location.href = 'main.html'; // Redirecionar para a página principal
    return false; // Impedir o envio normal do formulário
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
