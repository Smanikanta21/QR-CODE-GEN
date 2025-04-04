const dspl = document.querySelector('#input');

if (!dspl) {
    console.error('Input element not found');
} else {
    const navLinks = document.querySelectorAll('.nav-links');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const textType = link.innerText;
            dspl.setAttribute('placeholder', `Enter ${textType}`);
        });
    });
}

document.getElementById('paste').addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('input').value = text;
    } catch (err) {
        alert('Failed to paste text. Allow clipboard permissions.');
    }
});

document.querySelector('.container').addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = document.getElementById('input').value.trim();
    if (!inputValue) {
        alert('Please enter some text');
        return;
    }

    let qrData = inputValue;
    if (!/^https?:\/\//.test(inputValue) && !inputValue.includes('@')) {
        qrData = `text:${inputValue}`;
    }

    const qrResult = document.getElementById('qrResult');
    qrResult.style.opacity = '0';
    qrResult.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}" alt="QR Code">`;
    
    setTimeout(() => {
        qrResult.style.opacity = '1';
    }, 100);
});

document.getElementById('qrResult').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.classList.remove('bump');
        void e.target.offsetWidth;  // Trigger reflow to restart animation
        e.target.classList.add('bump');
    }
});
