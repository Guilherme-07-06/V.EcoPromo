document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. LÓGICA DE LOGIN, CADASTRO E MEMÓRIA
    // ==========================================
    const telaLogin = document.getElementById('tela-login');
    const telaCadastro = document.getElementById('tela-cadastro');
    const linkCadastro = document.getElementById('link-cadastro');
    const linkLogin = document.getElementById('link-login');

    if (linkCadastro && linkLogin && telaLogin && telaCadastro) {
        linkCadastro.addEventListener('click', function(evento) {
            evento.preventDefault(); 
            telaLogin.style.display = 'none'; 
            telaCadastro.style.display = 'block'; 
        });

        linkLogin.addEventListener('click', function(evento) {
            evento.preventDefault(); 
            telaCadastro.style.display = 'none'; 
            telaLogin.style.display = 'block'; 
        });

        const formLogin = telaLogin.querySelector('form');
        const formCadastro = telaCadastro.querySelector('form');

        // Quando o usuário faz LOGIN
        if (formLogin) {
            formLogin.addEventListener('submit', function(evento) {
                evento.preventDefault(); 
                
                const inputs = formLogin.querySelectorAll('input');
                let emailDigitado = "";

                inputs.forEach(input => {
                    if (input.type === 'email' || input.placeholder.toLowerCase().includes('email')) {
                        emailDigitado = input.value;
                    }
                });

                if (emailDigitado) {
                    // Extrai o nome do email (ex: "cleber@gmail.com" vira "Cleber")
                    let nomeExtraido = emailDigitado.split('@')[0];
                    nomeExtraido = nomeExtraido.charAt(0).toUpperCase() + nomeExtraido.slice(1);

                    localStorage.setItem('usuarioNome', nomeExtraido);
                    localStorage.setItem('usuarioEmail', emailDigitado);
                }

                window.location.replace("inicio.html");
            });
        }

        // Quando o usuário faz CADASTRO
        if (formCadastro) {
            formCadastro.addEventListener('submit', function(evento) {
                evento.preventDefault();

                const inputs = formCadastro.querySelectorAll('input');
                let nomeDigitado = "";
                let emailDigitado = "";

                inputs.forEach(input => {
                    const ph = input.placeholder.toLowerCase();
                    if (input.type === 'text' || ph.includes('nome')) {
                        nomeDigitado = input.value;
                    }
                    if (input.type === 'email' || ph.includes('email')) {
                        emailDigitado = input.value;
                    }
                });

                if (nomeDigitado) localStorage.setItem('usuarioNome', nomeDigitado);
                if (emailDigitado) localStorage.setItem('usuarioEmail', emailDigitado);

                window.location.replace("inicio.html");
            });
        }
    }

    // ==========================================
    // 2. CARREGAR DADOS NA PÁGINA DE PERFIL
    // ==========================================
    const perfilNome = document.getElementById('perfilNome');
    const perfilEmail = document.getElementById('perfilEmail');

    if (perfilNome && perfilEmail) {
        const nomeSalvo = localStorage.getItem('usuarioNome');
        const emailSalvo = localStorage.getItem('usuarioEmail');

        if (nomeSalvo) perfilNome.textContent = nomeSalvo;
        if (emailSalvo) perfilEmail.textContent = emailSalvo;
    }

    // ==========================================
    // 3. LÓGICA DA BARRA DE BUSCA
    // ==========================================
    const inputBusca = document.getElementById('inputBusca');

    if (inputBusca) {
        inputBusca.addEventListener('input', function() {
            const termoDigitado = inputBusca.value.toLowerCase().trim();
            const cartoes = document.querySelectorAll('.card-produto, .card-cupom');

            cartoes.forEach(cartao => {
                const textoCartao = cartao.textContent.toLowerCase();
                
                if (textoCartao.includes(termoDigitado)) {
                    cartao.style.display = ''; 
                } else {
                    cartao.style.display = 'none'; 
                }
            });
        });
    }

    // ==========================================
    // 4. LÓGICA DO MODAL QR CODE
    // ==========================================
    const modal = document.getElementById('modalQrCode');
    const fecharModal = document.getElementById('fecharModal');
    const btnsQrCode = document.querySelectorAll('.btn-usar-cupom');

    if (modal && btnsQrCode.length > 0) {
        btnsQrCode.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.card-cupom');
                const titulo = card.querySelector('h3').textContent;
                const loja = card.querySelector('.loja').textContent;
                const codigo = card.querySelector('.codigo-box').textContent;

                document.getElementById('modalTitulo').textContent = titulo;
                document.getElementById('modalLoja').textContent = loja;
                document.getElementById('modalCodigo').textContent = codigo;
                
                document.getElementById('modalImgQr').src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${codigo}`;

                modal.style.display = 'flex';
            });
        });

        if (fecharModal) {
            fecharModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});