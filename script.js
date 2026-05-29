// Seleção dos elementos do DOM
const passwordDisplay = document.getElementById('password-display');
const lengthInput = document.getElementById('length');
const lengthVal = document.getElementById('length-val');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

// Dicionário de caracteres
const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Atualiza o texto do tamanho da senha em tempo real
lengthInput.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Função para gerar a senha
function generatePassword() {
    const length = parseInt(lengthInput.value);
    let allowedChars = '';
    let password = '';

    // Monta o pool de caracteres com base nas escolhas do usuário
    if (uppercaseCheck.checked) allowedChars += characters.uppercase;
    if (lowercaseCheck.checked) allowedChars += characters.lowercase;
    if (numbersCheck.checked) allowedChars += characters.numbers;
    if (symbolsCheck.checked) allowedChars += characters.symbols;

    // Validação caso o usuário desmarque todas as opções
    if (allowedChars === '') {
        passwordDisplay.textContent = 'Selecione uma opção!';
        passwordDisplay.style.color = '#ef4444';
        return;
    }

    // Gera a senha escolhendo caracteres aleatórios do pool
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    // Exibe a senha gerada
    passwordDisplay.textContent = password;
    passwordDisplay.style.color = '#f8fafc'; // Reseta para a cor padrão
}

// Função para copiar a senha
function copyToClipboard() {
    const password = passwordDisplay.textContent;
    
    // Evita copiar textos de aviso padrão
    if (password === 'Sua senha aparecerá aqui' || password === 'Selecione uma opção!' || password === 'Copiado!') {
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        copyBtn.style.backgroundColor = '#10b981';
        
        // Reseta o botão de copiar após 2 segundos
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '#38bdf8';
        }, 2000);
    });
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);
