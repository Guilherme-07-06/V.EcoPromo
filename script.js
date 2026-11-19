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

                const inputNome = document.getElementById('nome-cad');
                const inputEmail = document.getElementById('email-cad');
                const inputTel = document.getElementById('cadTelefone');
                const inputCid = document.getElementById('cadCidade');

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
            const cartoes = document.querySelectorAll('.card-produto, .card-cupom, .card-loja');

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

    const btnMinhaConta = document.querySelector('.btn-cta');
    const nomeSalvo = localStorage.getItem('usuarioNome');
    
    if (btnMinhaConta && nomeSalvo) {
        const primeiroNome = nomeSalvo.split(' ')[0];
        btnMinhaConta.textContent = `Olá, ${primeiroNome} ❯`;
    }

    const mostrarToast = (mensagem) => {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = mensagem;
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('mostrar'), 10);
        
        setTimeout(() => {
            toast.classList.remove('mostrar');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    let carteiraCupons = JSON.parse(localStorage.getItem('carteiraCupons')) || [];
        
    const atualizarContador = () => {
        const contador = document.getElementById('contadorCarteira');
        if (contador) contador.textContent = carteiraCupons.length;
    };
    
    const renderizarCarteira = () => {
        const container = document.getElementById('itensCarteira');
        if (!container) return;
        
        container.innerHTML = ''; 
        
        if (carteiraCupons.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#888; margin-top: 20px;">Sua carteira está vazia.</p>';
            return;
        }
        
        carteiraCupons.forEach((cupom, index) => {
            const div = document.createElement('div');
            div.className = 'item-carteira';
            div.innerHTML = `
                <h4>${cupom.nome}</h4>
                <p>📍 ${cupom.loja}</p>
                <div class="preco">${cupom.preco}</div>
                <button class="btn-remover-item" data-index="${index}">X</button>
            `;
            container.appendChild(div);
        });
        
        document.querySelectorAll('.btn-remover-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const cupomRemovido = carteiraCupons[index]; 
                
                carteiraCupons.splice(index, 1); 
                localStorage.setItem('carteiraCupons', JSON.stringify(carteiraCupons));
                renderizarCarteira();
                atualizarContador();
                
                document.querySelectorAll('.card-produto').forEach(card => {
                    if (card.querySelector('h3').textContent === cupomRemovido.nome) {
                        const btnRestaurar = card.querySelector('.btn-pegar-cupom');
                        if (btnRestaurar) {
                            btnRestaurar.textContent = 'Pegar Cupom';
                            btnRestaurar.style.background = '';
                            btnRestaurar.style.pointerEvents = 'auto';
                        }
                    }
                });
            });
        });
    };

    const btnsPegarCupom = document.querySelectorAll('.btn-pegar-cupom');
    if (btnsPegarCupom.length > 0) {
        btnsPegarCupom.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const card = this.closest('.card-produto');
                const nome = card.querySelector('h3').textContent;
                const loja = card.querySelector('.loja-vendedora') ? card.querySelector('.loja-vendedora').textContent : 'Loja Parceira';
                const preco = card.querySelector('.preco-novo') ? card.querySelector('.preco-novo').textContent : 'Cupom de Desconto';
                
                carteiraCupons.push({ nome, loja, preco });
                localStorage.setItem('carteiraCupons', JSON.stringify(carteiraCupons));
                
                this.textContent = 'Salvo ✔️';
                this.style.background = 'linear-gradient(135deg, #28a745, #218838)';
                this.style.pointerEvents = 'none';
            
                mostrarToast('Cupom adicionado à sua carteira! 🛒');
                atualizarContador();
                renderizarCarteira();
                abrirCarteira();
            });
        });
    }
    
    const painelCarteira = document.getElementById('painelCarteira');
    const overlayCarteira = document.getElementById('overlayCarteira');
    const btnCarteira = document.getElementById('btnCarteira');
    const fecharCarteira = document.getElementById('fecharCarteira');
    const limparCarteira = document.getElementById('limparCarteira');
    
    const abrirCarteira = () => {
        if(painelCarteira) painelCarteira.classList.add('aberto');
        if(overlayCarteira) overlayCarteira.classList.add('ativo');
    };
    const fecharPainelCarteira = () => {
        if(painelCarteira) painelCarteira.classList.remove('aberto');
        if(overlayCarteira) overlayCarteira.classList.remove('ativo');
    };
    
    if(btnCarteira) btnCarteira.addEventListener('click', abrirCarteira);
    if(fecharCarteira) fecharCarteira.addEventListener('click', fecharPainelCarteira);
    if(overlayCarteira) overlayCarteira.addEventListener('click', fecharPainelCarteira);
    
    if(limparCarteira) {
        limparCarteira.addEventListener('click', () => {
            carteiraCupons = []; 
            localStorage.setItem('carteiraCupons', JSON.stringify(carteiraCupons));
            renderizarCarteira();
            atualizarContador();
            
            document.querySelectorAll('.btn-pegar-cupom').forEach(btn => {
                btn.textContent = 'Pegar Cupom';
                btn.style.background = ''; 
                btn.style.pointerEvents = 'auto'; 
            });
        }); 
    } 
    
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    const cardsProdutosFiltro = document.querySelectorAll('.card-produto'); 

    if (botoesFiltro.length > 0) {
        botoesFiltro.forEach(btn => {
            btn.addEventListener('click', function() {
                botoesFiltro.forEach(b => b.classList.remove('ativo'));
                this.classList.add('ativo');

                const categoriaClicada = this.getAttribute('data-filtro');

                cardsProdutosFiltro.forEach(card => {
                    const categoriaDoProduto = card.getAttribute('data-categoria');
                    
                    if (categoriaClicada === 'todos' || categoriaClicada === categoriaDoProduto) {
                        card.style.display = 'block'; 
                        card.style.animation = 'fadeIn 0.5s'; 
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    const sincronizarBotoes = () => {
        document.querySelectorAll('.card-produto, .card-cupom').forEach(card => {
            const titulo = card.querySelector('h3') ? card.querySelector('h3').textContent : null;
            const btn = card.querySelector('.btn-pegar-cupom');
            
            if (titulo && btn) {
                const jaSalvo = carteiraCupons.some(cupom => cupom.nome === titulo);
                
                if (jaSalvo) {
                    btn.textContent = 'Salvo ✔️';
                    btn.style.background = 'linear-gradient(135deg, #28a745, #218838)';
                    btn.style.pointerEvents = 'none';
                }
            }
        });
    };
    
    sincronizarBotoes();
    atualizarContador();
    renderizarCarteira();

});