const radioUrlArabic = "https://mp3quran.net/api/v3/radios?language=ar";

async function getRadio() {
    const chooseRadio = document.querySelector('#chooseRadio');
    try {
        const response = await fetch(radioUrlArabic);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        chooseRadio.innerHTML = `<option value="">إختر راديو</option>`;
        data.radios.forEach(radio => {
            chooseRadio.innerHTML += `<option value="${radio.url}">${radio.name}</option>`;
        });
    } catch (error) {
        console.error('Error fetching radios:', error);
        chooseRadio.innerHTML = `<option value="">Error loading radios</option>`;
    }

    chooseRadio.addEventListener('change', () => {
        const selectedRadio = chooseRadio.options[chooseRadio.selectedIndex].value;
        playSurah(selectedRadio);
    });
}

function playSurah(surahMp3) {
    const audioPlayer = document.querySelector('#audioPlayer');
    if (surahMp3) {
        audioPlayer.src = surahMp3;
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
        });
    } else {
        console.error('Invalid radio URL:', surahMp3);
    }
}

getRadio();
