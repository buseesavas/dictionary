let filteredText = '';
let words = null;
const wordDescriptionBox = document.querySelector('.wordDescriptionBox');
const searchForm = document.querySelector('.searchForm');
const searchInput = document.querySelector('.searchInput');

async function handleSubmit(e) {
  e.preventDefault();
  const data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/word').then(response => response.json());
  filteredText = searchInput.value.trim().toLocaleLowerCase('en');
  render(data);
}

searchForm.addEventListener('submit', handleSubmit);

function render(data) {
  wordDescriptionBox.innerHTML = ''; 
  for (const wordData of data) {
    if(wordData.word.toLocaleLowerCase('en') === filteredText) {
      const phonetic = wordData.phonetics.find(p => p.audio);
      if (phonetic) {
        wordDescriptionBox.innerHTML += `
        <div class="wordPronunciation">
        <div class="wordProText">
          <h2>${wordData.word}</h2>
          <p>${phonetic.text}</p>
        </div>
        <button class="playButton" data-audio="${phonetic.audio}">Okunuşu Dinle</button>
        </div>
        `;
      }
      wordData.meanings.forEach(meaning => {
        wordDescriptionBox.innerHTML += `<h3>${meaning.partOfSpeech}</h3>`;
        meaning.definitions.forEach(def => {
          wordDescriptionBox.innerHTML += `<p>- ${def.definition}</p>`;
        });
      });

      document.querySelectorAll('.playButton').forEach(button => {
        button.addEventListener('click', () => {
          const audioUrl = button.dataset.audio;
          const audio = new Audio(audioUrl);
          audio.play();
        });
      });
      break; 
      }else {
        alert('kelime bulunamadı');
      }
  }
}


