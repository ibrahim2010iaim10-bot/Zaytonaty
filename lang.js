const langData = {};
let currentLang = localStorage.getItem('lang') || 'ar'; 

async function loadLanguageFiles() {
    // تأكد من أن المسارات صحيحة
    const ar = await fetch('data/ar.json').then(res => res.json());
    const en = await fetch('data/en.json').then(res => res.json());
    langData.ar = ar;
    langData.en = en;
    updateContent(currentLang); 
}

function updateContent(lang) {
    const data = langData[lang];
    if (!data) return;

    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (data[key]) {
            element.textContent = data[key]; 
        }
    });

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', data.dir);
    
    const toggleButton = document.getElementById('lang-toggle');
    if (toggleButton) {
        toggleButton.textContent = lang === 'ar' ? 'English' : 'العربية';
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', currentLang);
    updateContent(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    loadLanguageFiles();
    const toggleButton = document.getElementById('lang-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleLanguage);
    }
});
