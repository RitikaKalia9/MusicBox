// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.

class GifDisplay {
  constructor() {
    this.gifs = []; // This will hold the fetched GIFs
  }

  // Method to show a random GIF
  showRandomGif() {
    if (this.gifs.length === 0) {
      console.error('No GIFs available to display.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.gifs.length);
    const selectedGif = this.gifs[randomIndex];
    const gifContainer = document.getElementById('gif-container');
    gifContainer.innerHTML = `<img src="${selectedGif.url}" alt="${selectedGif.title}" class="gif-item" />`;
  }
}
