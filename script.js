// Nawigacja - pokazywanie odpowiednich sekcji
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Ukryj wszystkie sekcje
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Pokaż wybraną sekcję
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).classList.add('active');
    });
});

// Funkcja do dodawania pojazdów
function dodajPojazd() {
    const nazwa = document.getElementById('nazwa').value;
    const typ = document.getElementById('typ').value;
    const rok = document.getElementById('rok').value;
    const status = document.getElementById('status').value;
    
    if (!nazwa || !typ || !rok) {
        alert('Wypełnij wszystkie pola!');
        return;
    }
    
    // Stwórz nowy element pojazdu
    const nowyPojazd = document.createElement('div');
    nowyPojazd.className = 'vehicle-card';
    nowyPojazd.innerHTML = `
        <h3>${nazwa}</h3>
        <p>Typ: ${typ}</p>
        <p>Rok: ${rok}</p>
        <p>Status: ${status === 'W trasie' ? '🟢' : status === 'Postój' ? '🟡' : '🔴'} ${status}</p>
    `;
    
    // Dodaj do listy
    document.querySelector('.vehicles-grid').appendChild(nowyPojazd);
    
    // Wyczyść formularz
    document.getElementById('nazwa').value = '';
    document.getElementById('typ').value = '';
    document.getElementById('rok').value = '';
    
    alert('Pojazd dodany!');
}

// Funkcja do dodawania linii
function dodajLinie() {
    const numer = document.getElementById('linia_numer').value;
    const trasa = document.getElementById('linia_trasa').value;
    const czestotliwosc = document.getElementById('linia_czestotliwosc').value;
    
    if (!numer || !trasa || !czestotliwosc) {
        alert('Wypełnij wszystkie pola!');
        return;
    }
    
    // Stwórz nowy element linii
    const nowaLinia = document.createElement('div');
    nowaLinia.className = 'line-item';
    nowaLinia.innerHTML = `
        <span class="line-number">${numer}</span>
        <span class="line-route">${trasa}</span>
        <span class="line-frequency">${czestotliwosc}</span>
    `;
    
    // Dodaj do listy
    document.querySelector('.lines-list').appendChild(nowaLinia);
    
    // Wyczyść formularz
    document.getElementById('linia_numer').value = '';
    document.getElementById('linia_trasa').value = '';
    document.getElementById('linia_czestotliwosc').value = '';
    
    alert('Linia dodana!');
}

// Pokaż pierwszą sekcję przy starcie
document.getElementById('mapa').classList.add('active');

// Dodaj możliwość usuwania (opcjonalnie)
document.addEventListener('dblclick', function(e) {
    if (e.target.classList.contains('vehicle-card') || 
        e.target.classList.contains('line-item')) {
        if (confirm('Czy na pewno usunąć?')) {
            e.target.remove();
        }
    }
});