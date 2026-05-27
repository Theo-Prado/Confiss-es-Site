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
        const btnTema = document.getElementById('btn-tema');
        if (btnTema) {
            btnTema.textContent = '☀️ Claro';
        }
        localStorage.setItem('tema', 'escuro');
    } else {
        document.body.removeAttribute('data-tema');
        const btnTema = document.getElementById('btn-tema');
        if (btnTema) {
            btnTema.textContent = '🌙 Escuro';
        }
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
function inicializarTemaESistema() {
    const tema = recuperarTema();
    aplicarTema(tema);
    
    // Adicionar evento ao botão de tema
    const btnTema = document.getElementById('btn-tema');
    if (btnTema) {
        btnTema.addEventListener('click', alternarTema);
    }
    
    // Inicializar terço
    inicializarTerco();
}

// Executar ao carregar DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarTemaESistema);
} else {
    inicializarTemaESistema();
}

// ===== TERÇO DIGITAL =====

const oracoes = [
    "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e à hora da nossa morte. Amém.",
    "Pai Nosso, que estais nos céus, santificado seja o Vosso nome, venha a nós o Vosso reino, seja feita a Vossa vontade assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas dívidas assim como perdoamos aos nossos devedores, e não nos deixeis cair em tentação mas livrai-nos do mal. Amém.",
    "Glória seja ao Pai, e ao Filho, e ao Espírito Santo, como era no princípio, agora é, sempre será, mundo sem fim. Amém.",
    "Ó meu Jesus, perdoai-nos e livrai-nos do fogo do inferno, levai as almas todas para o céu, principalmente as que mais precisarem. Amém."
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
    display.innerHTML = `<span>${oracao}</span>`;
    
    // Marcar bead como ativo
    const beads = document.querySelectorAll('.bead');
    beads.forEach(bead => bead.classList.remove('active'));
    if (beads[numero - 1]) {
        beads[numero - 1].classList.add('active');
    }
}

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
    const lista = document.getElementById('paroquias-lista');
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
            <p><strong>📍 Endereço:</strong> ${paroquia.endereco}</p>
            <p><strong>📞 Telefone:</strong> ${paroquia.telefone}</p>
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
