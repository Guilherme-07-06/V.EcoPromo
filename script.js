document.addEventListener("DOMContentLoaded", function() {

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
                    let nomeExtraido = emailDigitado.split('@')[0];
                    nomeExtraido = nomeExtraido.charAt(0).toUpperCase() + nomeExtraido.slice(1);

                    localStorage.setItem('usuarioNome', nomeExtraido);
                    localStorage.setItem('usuarioEmail', emailDigitado);
                }

                window.location.replace("inicio.html");
            });
        }

       if (formCadastro) {
            formCadastro.addEventListener('submit', function(evento) {
                evento.preventDefault();

                // Agora pegamos cada campo cirurgicamente pelo ID dele!
                const inputNome = document.getElementById('nome-cad');
                const inputEmail = document.getElementById('email-cad');
                const inputTel = document.getElementById('cadTelefone');
                const inputCid = document.getElementById('cadCidade');

                // Salvando no navegador apenas se eles existirem
                if (inputNome && inputNome.value) {
                    localStorage.setItem('usuarioNome', inputNome.value);
                }
                if (inputEmail && inputEmail.value) {
                    localStorage.setItem('usuarioEmail', inputEmail.value);
                }
                if (inputTel && inputTel.value) {
                    localStorage.setItem('usuarioTelefone', inputTel.value);
                }
                if (inputCid && inputCid.value) {
                    localStorage.setItem('usuarioCidade', inputCid.value);
                }

                // Vai para a tela inicial
                window.location.replace("inicio.html");
            });
        }
    }

    const perfilNome = document.getElementById('perfilNome');
    const perfilEmail = document.getElementById('perfilEmail');
    const perfilTelefone = document.getElementById('perfilTelefone');
    const perfilCidade = document.getElementById('perfilCidade');
    const perfilData = document.getElementById('perfilData');
    const btnEditarDados = document.getElementById('btnEditarDados');

    if (perfilNome && perfilEmail) {

        perfilNome.textContent = localStorage.getItem('usuarioNome') || 'Usuário';
        perfilEmail.textContent = localStorage.getItem('usuarioEmail') || 'usuario@email.com';
        if (perfilTelefone) perfilTelefone.textContent = localStorage.getItem('usuarioTelefone') || '(11) 98765-4321';
        if (perfilCidade) perfilCidade.textContent = localStorage.getItem('usuarioCidade') || 'São Paulo, SP';

        if (perfilData) {
            if (!localStorage.getItem('usuarioData')) {
                const hoje = new Date();
                const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                const dataAtual = `${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`;
                localStorage.setItem('usuarioData', dataAtual);
            }
            perfilData.textContent = localStorage.getItem('usuarioData');
        }

        if (btnEditarDados) {
            btnEditarDados.addEventListener('click', function() {
                const novoNome = prompt('Digite seu nome:', perfilNome.textContent);
                const novoTelefone = prompt('Digite seu telefone:', perfilTelefone.textContent);
                const novaCidade = prompt('Digite sua cidade/estado:', perfilCidade.textContent);

                if (novoNome && novoNome.trim() !== '') {
                    localStorage.setItem('usuarioNome', novoNome);
                    perfilNome.textContent = novoNome;
                }
                if (novoTelefone && novoTelefone.trim() !== '') {
                    localStorage.setItem('usuarioTelefone', novoTelefone);
                    perfilTelefone.textContent = novoTelefone;
                }
                if (novaCidade && novaCidade.trim() !== '') {
                    localStorage.setItem('usuarioCidade', novaCidade);
                    perfilCidade.textContent = novaCidade;
                }
            });
        }
    }

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

    const formSuporte = document.getElementById('formSuporte');

    if (formSuporte) {
        const supNome = document.getElementById('supNome');
        const supEmail = document.getElementById('supEmail');
        
        if (localStorage.getItem('usuarioNome')) supNome.value = localStorage.getItem('usuarioNome');
        if (localStorage.getItem('usuarioEmail')) supEmail.value = localStorage.getItem('usuarioEmail');

        formSuporte.addEventListener('submit', function(evento) {
            evento.preventDefault(); 
        
            alert('Sua mensagem foi enviada com sucesso! Nossa equipe entrará em contato em breve.');

            document.getElementById('supAssunto').value = '';
            document.getElementById('supMensagem').value = '';
        });
    }
});