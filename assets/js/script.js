const apiUrl = 'https://mp3quran.net/api/v3';
const lang = 'ar';

async function getReciters() {
  const chooseReciter = document.querySelector('#chooseReciter');
  const response = await fetch(`${apiUrl}/reciters?language=${lang}`);
  const data = await response.json();
  data.reciters.sort((a, b) => a.name.localeCompare(b.name));

  chooseReciter.innerHTML = `<option value="">إختر قارئ</option>`;
  data.reciters.forEach(reciter => chooseReciter.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`);
  chooseReciter.addEventListener('change', e => getMoshaf(e.target.value));
}

getReciters();

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

  const chooseSurah = document.querySelector('#chooseSurah');

  const response = await fetch(`https://mp3quran.net/api/v3/suwar?language=ar`);
  const data = await response.json();
  const surahNames = data.suwar;

  surahList = surahList.split(',');
  chooseSurah.innerHTML = `<option value="">إختر سوره</option>`
  surahList.forEach(surah => {
    const padSurah = surah.padStart(3, '0');
    surahNames.forEach(surahName => {
      if (surahName.id == surah) {
        chooseSurah.innerHTML += `<option value="${surahServer}${padSurah}.mp3">${surahName.name}</option>`
      }
    })
  })

  chooseSurah.addEventListener('change', e => {
    const selctedSurah = chooseSurah.options[chooseSurah.selectedIndex];
    playSurah(selctedSurah.value);
  });

  function playSurah(surahMp3) {
    const audioPlayer = document.querySelector('#audioPlayer');
    audioPlayer.src = surahMp3;
    audioPlayer.play();
  }
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
