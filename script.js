const telaLogin = document.getElementById('tela-login');
const telaCadastro = document.getElementById('tela-cadastro');
const linkCadastro = document.getElementById('link-cadastro');
const linkLogin = document.getElementById('link-login');

linkCadastro.addEventListener('click', function(evento) {
    evento.preventDefault(); 
    telaLogin.style.display = 'none'; 
    telaCadastro.style.display = 'block'; 
    telaCadastro.classList.add('slide-up-animation'); 
});

linkLogin.addEventListener('click', function(evento) {
    evento.preventDefault(); 
    telaCadastro.style.display = 'none'; 
    telaLogin.style.display = 'block'; 
    telaLogin.classList.add('slide-up-animation'); 
});

const formLogin = telaLogin.querySelector('form');
const formCadastro = telaCadastro.querySelector('form');

formLogin.addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    
    window.location.replace("inicio.html");
});

formCadastro.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    window.location.replace("inicio.html");
});