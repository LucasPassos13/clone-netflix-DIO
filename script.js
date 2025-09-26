// Dados dos produtos básicos com preços médios (em reais)
const basicProducts = [
    {
        name: "Arroz (1kg)",
        price: 4.50,
        icon: "fas fa-seedling",
        description: "Arroz branco tipo 1"
    },
    {
        name: "Feijão (1kg)",
        price: 6.80,
        icon: "fas fa-seedling",
        description: "Feijão carioca"
    },
    {
        name: "Macarrão (500g)",
        price: 3.20,
        icon: "fas fa-utensils",
        description: "Macarrão espaguete"
    },
    {
        name: "Açúcar (1kg)",
        price: 3.90,
        icon: "fas fa-cube",
        description: "Açúcar cristal"
    },
    {
        name: "Óleo (900ml)",
        price: 4.80,
        icon: "fas fa-tint",
        description: "Óleo de soja"
    },
    {
        name: "Leite (1L)",
        price: 4.20,
        icon: "fas fa-glass-whiskey",
        description: "Leite integral UHT"
    },
    {
        name: "Pão (500g)",
        price: 3.50,
        icon: "fas fa-bread-slice",
        description: "Pão francês"
    },
    {
        name: "Ovos (dúzia)",
        price: 8.50,
        icon: "fas fa-egg",
        description: "Ovos brancos"
    },
    {
        name: "Banana (kg)",
        price: 4.00,
        icon: "fas fa-apple-alt",
        description: "Banana prata"
    },
    {
        name: "Cebola (kg)",
        price: 3.80,
        icon: "fas fa-apple-alt",
        description: "Cebola roxa"
    },
    {
        name: "Tomate (kg)",
        price: 5.50,
        icon: "fas fa-apple-alt",
        description: "Tomate vermelho"
    },
    {
        name: "Batata (kg)",
        price: 3.20,
        icon: "fas fa-apple-alt",
        description: "Batata inglesa"
    }
];

// Função para rolar suavemente para uma seção
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para atualizar a comparação de preços
function updateComparison() {
    const coffeePrice = parseFloat(document.getElementById('coffee-price').value);
    const comparisonGrid = document.getElementById('comparison-grid');
    
    if (!coffeePrice || coffeePrice <= 0) {
        alert('Por favor, insira um valor válido para o café.');
        return;
    }
    
    // Limpar grid anterior
    comparisonGrid.innerHTML = '';
    
    // Gerar itens de comparação
    basicProducts.forEach(product => {
        const quantity = Math.floor(coffeePrice / product.price);
        const remaining = (coffeePrice % product.price).toFixed(2);
        
        const item = document.createElement('div');
        item.className = 'comparison-item';
        
        item.innerHTML = `
            <i class="${product.icon}"></i>
            <h3>${product.name}</h3>
            <div class="price">R$ ${product.price.toFixed(2)}</div>
            <div class="quantity">${quantity}</div>
            <div class="description">
                ${quantity > 0 ? 
                    `Com R$ ${coffeePrice.toFixed(2)} você compra ${quantity} ${quantity === 1 ? 'unidade' : 'unidades'}${remaining > 0 ? ` e sobra R$ ${remaining}` : ''}` : 
                    `Com R$ ${coffeePrice.toFixed(2)} você não consegue comprar nem 1 unidade`
                }
            </div>
        `;
        
        comparisonGrid.appendChild(item);
    });
}

// Função para copiar código PIX
function copyPixCode() {
    const pixCode = document.getElementById('pix-code');
    if (pixCode.style.display === 'none') {
        pixCode.style.display = 'block';
    } else {
        pixCode.style.display = 'none';
    }
}

// Função para copiar texto para área de transferência
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Chave PIX copiada para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Chave PIX copiada para a área de transferência!');
    });
}

// Função para abrir PayPal (simulação)
function openPayPal() {
    alert('Redirecionando para PayPal...\n\nEm um projeto real, aqui seria o link para o PayPal.');
    // window.open('https://paypal.me/seuusuario/2', '_blank');
}

// Função para animar elementos quando entram na tela
function animateOnScroll() {
    const elements = document.querySelectorAll('.comparison-item, .stat, .donation-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Função para adicionar efeito de digitação no hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animações iniciais
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
    
    // Configurar animações de scroll
    const animatedElements = document.querySelectorAll('.comparison-item, .stat, .donation-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Adicionar listener para scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Executar animação inicial
    animateOnScroll();
    
    // Adicionar efeito de hover nos botões
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Adicionar validação ao input de preço
    const coffeePriceInput = document.getElementById('coffee-price');
    if (coffeePriceInput) {
        coffeePriceInput.addEventListener('input', function() {
            // Permitir apenas números e ponto decimal
            this.value = this.value.replace(/[^0-9.]/g, '');
            
            // Garantir apenas um ponto decimal
            const parts = this.value.split('.');
            if (parts.length > 2) {
                this.value = parts[0] + '.' + parts.slice(1).join('');
            }
        });
        
        // Permitir Enter para atualizar comparação
        coffeePriceInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                updateComparison();
            }
        });
    }
    
    // Adicionar efeito de parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Adicionar contador de visitantes (simulação)
    let visitorCount = Math.floor(Math.random() * 1000) + 500;
    const visitorElement = document.createElement('div');
    visitorElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(139, 69, 19, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 25px;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    visitorElement.innerHTML = `<i class="fas fa-users"></i> ${visitorCount} pessoas já compararam`;
    document.body.appendChild(visitorElement);
    
    // Simular aumento de visitantes
    setInterval(() => {
        visitorCount += Math.floor(Math.random() * 3) + 1;
        visitorElement.innerHTML = `<i class="fas fa-users"></i> ${visitorCount} pessoas já compararam`;
    }, 30000); // Atualiza a cada 30 segundos
});

// Função para mostrar notificação de doação
function showDonationNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #8b4513, #a0522d);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-heart" style="margin-right: 10px;"></i>
        Obrigado pela doação! ❤️
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .comparison-item:hover {
        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.15);
    }
    
    .stat:hover {
        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.15);
    }
`;
document.head.appendChild(style);