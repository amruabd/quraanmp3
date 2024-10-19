const apiUrl = 'https://mp3quran.net/api/v3';
const lang = 'ar';

document.addEventListener('DOMContentLoaded', function() {
  async function getReciters() {
    const recitersList = document.getElementById('recitersList');
    const chooseReciterInput = document.getElementById('chooseReciterInput');

    if (!recitersList || !chooseReciterInput) {
      console.error('Elemente mit den IDs "recitersList" oder "chooseReciterInput" nicht gefunden.');
      return;
    }

    const response = await fetch(`${apiUrl}/reciters?language=${lang}`);
    const data = await response.json();
    data.reciters.sort((a, b) => a.name.localeCompare(b.name));

    recitersList.innerHTML = "";
    data.reciters.forEach(reciter => {
      const option = document.createElement('option');
      option.value = reciter.name;
      option.dataset.reciterId = reciter.id;
      recitersList.appendChild(option);
    });

    chooseReciterInput.addEventListener('input', e => {
      const selectedOption = [...recitersList.options].find(option => option.value === e.target.value);
      if (selectedOption) {
        getMoshaf(selectedOption.dataset.reciterId);
      }
    });
  }

  getReciters();
});

async function getMoshaf(reciter) {
  const chooseMoshaf = document.querySelector('#chooseMoshaf');
  const response = await fetch(`${apiUrl}/reciters?language=${lang}&reciter=${reciter}`);
  const data = await response.json();
  const moshafs = data.reciters[0].moshaf;
  chooseMoshaf.innerHTML = `<option value="" data-server="" data-surahList="$">إختر قرأه</option>`;
  moshafs.forEach(moshaf => {
    chooseMoshaf.innerHTML += `<option value="${moshaf.id}" data-server="${moshaf.server}" data-surahList="${moshaf.surah_list}">${moshaf.name}</option>`;
  });
  chooseMoshaf.addEventListener('change', e => {
    const selctedMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex];
    const surahServer = selctedMoshaf.dataset.server;
    const surahList = selctedMoshaf.dataset.surahlist;
    getSurah(surahServer, surahList);
  });
}

async function getSurah(surahServer, surahList) {
  const surahListElement = document.querySelector('#surahList');
  const chooseSurahInput = document.querySelector('#chooseSurahInput');
  const response = await fetch(`https://mp3quran.net/api/v3/suwar?language=ar`);
  const data = await response.json();
  const surahNames = data.suwar;

  surahList = surahList.split(',');
  surahListElement.innerHTML = '';
  surahList.forEach(surah => {
    const padSurah = surah.padStart(3, '0');
    surahNames.forEach(surahName => {
      if (surahName.id == surah) {
        const option = document.createElement('option');
        option.value = surahName.name;
        option.dataset.surahMp3 = `${surahServer}${padSurah}.mp3`;
        surahListElement.appendChild(option);
      }
    });
  });

  chooseSurahInput.addEventListener('input', e => {
    const selectedOption = [...surahListElement.options].find(option => option.value === e.target.value);
    if (selectedOption) {
      playSurah(selectedOption.dataset.surahMp3);
    }
  });
}

function playSurah(surahMp3) {
  const audioPlayer = document.querySelector('#audioPlayer');
  audioPlayer.src = surahMp3;
  audioPlayer.play();
}

function playLive(channel) {
  if (Hls.isSupported()) {
    var video = document.getElementById('liveVideo');
    var hls = new Hls();
    hls.loadSource(channel);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = channel;
    video.addEventListener('loadedmetadata', function () {
      video.play();
    });
  }
}