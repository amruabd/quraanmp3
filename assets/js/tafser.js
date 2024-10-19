const url = "https://mp3quran.net/api/v3/tafsir?language=ar";

async function getTafser() {
  const chooseSurah = document.getElementById("chooseSurah");
  const response = await fetch(url);
  const data = await response.json();

  // dropdown with Surah names
  chooseSurah.innerHTML = `<option value="">إختر سوره</option>`;
  data.tafasir.soar.forEach(surah => {
    chooseSurah.innerHTML += `<option value="${surah.url}">${surah.name}</option>`;
    console.log(surah[0]);
  });

  //event listener Surah is selected
  chooseSurah.addEventListener('change', () => {
    const selectedSurah = chooseSurah.options[chooseSurah.selectedIndex].value;
    
    playSurah(selectedSurah);
  });
}

function playSurah(surahMp3) {
  const audioPlayer = document.getElementById('audioPlayer');
  if (surahMp3) {
    audioPlayer.src = surahMp3;
    audioPlayer.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  } else {
    console.error('Invalid audio URL:', surahMp3);
  }
}

getTafser();