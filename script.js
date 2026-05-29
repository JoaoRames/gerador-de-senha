const passwordDisplay = document.getElementById('password-display');
const lengthInput = document.getElementById('length');
const lengthVal = document.getElementById('length-val');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Função para atualizar a cor visual da opção (Verde se marcado, Vermelho se desmarcado)
function updateOptionColor(checkbox) {
    const optionContainer = checkbox.closest('.option');
    if (checkbox.checked) {
        optionContainer.classList.add('active');
    } else {
        optionContainer.classList.remove('active');
    }
}

// Adiciona o evento de mudança em todos os checkboxes
const checkboxes = [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck];
checkboxes.forEach(checkbox => {
    // Atualiza a cor assim que a página carrega
    updateOptionColor(checkbox); 
    
    // Atualiza a cor sempre que o usuário clicar
    checkbox.addEventListener('change', () => updateOptionColor(checkbox));
});

lengthInput.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

function generatePassword() {
    const length = parseInt(lengthInput.value);
    let allowedChars = '';
    let password = '';

    if (uppercaseCheck.checked) allowedChars += characters.uppercase;
    if (lowercaseCheck.checked) allowedChars += characters.lowercase;
    if (numbersCheck.checked) allowedChars += characters.numbers;
    if (symbolsCheck.checked) allowedChars += characters.symbols;

    if (allowedChars === '') {
        passwordDisplay.textContent = 'ERRO: SELECIONE UMA OPCAO!';
        passwordDisplay.style.color = '#ff0000';
        return;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    passwordDisplay.textContent = password;
    passwordDisplay.style.color = '#ffffff'; 
}

function copyToClipboard() {
    const password = passwordDisplay.textContent;
    
    if (password === 'Sua senha aparecerá aqui' || password === 'ERRO: SELECIONE UMA OPCAO!' || password === 'COPIADO!') {
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'COPIADO!';
        copyBtn.style.backgroundColor = '#00ff00';
        copyBtn.style.color = '#000000';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '#00ff00';
            copyBtn.style.color = '#000000';
        }, 2000);
    });
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);
