// ===== MODO ESCURO/CLARO =====

// Recuperar preferência do usuário do localStorage
function recuperarTema() {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) {
        return temaSalvo;
    }
    // Se não houver tema salvo, verificar preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
}

// Aplicar tema
function aplicarTema(tema) {
    if (tema === 'escuro') {
        document.body.setAttribute('data-tema', 'escuro');
        document.getElementById('btn-tema').textContent = '☀️ Claro';
        localStorage.setItem('tema', 'escuro');
    } else {
        document.body.removeAttribute('data-tema');
        document.getElementById('btn-tema').textContent = '🌙 Escuro';
        localStorage.setItem('tema', 'claro');
    }
}

// Alternar tema
function alternarTema() {
    const temaAtual = document.body.getAttribute('data-tema') || 'claro';
    const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
    aplicarTema(novoTema);
}

// Inicializar tema ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const tema = recuperarTema();
    aplicarTema(tema);
    
    // Adicionar evento ao botão de tema
    const btnTema = document.getElementById('btn-tema');
    if (btnTema) {
        btnTema.addEventListener('click', alternarTema);
    }
});

// ===== TERÇO DIGITAL =====

const oracoes = [
    "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres...",
    "Pai Nosso, que estais nos céus, santificado seja o Vosso nome...",
    "Glória seja ao Pai, ao Filho e ao Espírito Santo...",
    "Ó meu Jesus, perdoai-nos e livrai-nos do fogo do inferno..."
];

function inicializarTerco() {
    const beadsContainer = document.getElementById('rosario-beads');
    if (!beadsContainer) return;
    
    beadsContainer.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
        const bead = document.createElement('button');
        bead.className = 'bead';
        bead.textContent = i;
        bead.onclick = () => exibirOracao(i);
        beadsContainer.appendChild(bead);
    }
}

function exibirOracao(numero) {
    const display = document.getElementById('oracao-display');
    if (!display) return;
    
    const oracao = oracoes[numero % oracoes.length];
    display.textContent = oracao;
    
    // Marcar bead como ativo
    const beads = document.querySelectorAll('.bead');
    beads.forEach(bead => bead.classList.remove('active'));
    document.querySelectorAll('.bead')[numero - 1]?.classList.add('active');
}

// Inicializar terço ao carregar
document.addEventListener('DOMContentLoaded', function() {
    inicializarTerco();
});

// ===== LOCALIZAÇÃO DE PARÓQUIAS =====

function localizarParoquias() {
    const endereco = document.getElementById('endereco-input')?.value;
    
    if (!endereco) {
        alert('Por favor, digite um endereço ou localidade');
        return;
    }
    
    // Simulação: mostrar paróquias (em produção, conectar a uma API)
    const paroquiasSimuladas = [
        {
            nome: 'Paróquia São Pedro',
            endereco: 'Rua das Flores, 123 - Centro',
            telefone: '(11) 3333-3333'
        },
        {
            nome: 'Paróquia Nossa Senhora Aparecida',
            endereco: 'Av. Paulista, 500 - Bela Vista',
            telefone: '(11) 3434-3434'
        },
        {
            nome: 'Paróquia São João Batista',
            endereco: 'Rua do Comércio, 789 - Vila Maria',
            telefone: '(11) 3535-3535'
        }
    ];
    
    exibirParoquias(paroquiasSimuladas);
}

function exibirParoquias(paroquias) {
    const lista = document.getElementById('lista-paroquias');
    if (!lista) return;
    
    lista.innerHTML = '';
    
    if (paroquias.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: var(--text-primary);">Nenhuma paróquia encontrada</p>';
        return;
    }
    
    paroquias.forEach(paroquia => {
        const item = document.createElement('div');
        item.className = 'paroquia-item';
        item.innerHTML = `
            <h4>${paroquia.nome}</h4>
            <p>${paroquia.endereco}</p>
            <p>Telefone: ${paroquia.telefone}</p>
            <button class="btn-direcoes" onclick="abrirDirecoes('${paroquia.endereco}')">Ver no Mapa</button>
        `;
        lista.appendChild(item);
    });
}

function abrirDirecoes(endereco) {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(endereco)}`;
    window.open(url, '_blank');
}

// ===== VÍDEOS =====

function abrirVideo(url) {
    window.open(url, '_blank');
}
