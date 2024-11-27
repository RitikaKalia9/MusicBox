// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.

class MusicScreen {
  constructor(songId) {
    this.songId = songId;
    
    //'songData'fetched separately and available globally
    this.init();
  }

  async init() {
    const response = await fetch('http://127.0.0.1:5000/api/songs'); // Fetch song data
    const songs = await response.json();
    const selectedSong = songs.find(song => song.id == this.songId);
    
    this.audioPlayer = new AudioPlayer(selectedSong.url); // Create an AudioPlayer instance with the selected song
    this.gifDisplay = new GifDisplay(); // Create a GifDisplay instance
    this.playButton = new PlayButton(this.audioPlayer); // Create a PlayButton instance linked to the AudioPlayer

    // Start playback and show the first GIF
    this.start();
  }

  start() {
    this.audioPlayer.play(); // Start playing the song
    this.gifDisplay.showRandomGif(); // Show a random GIF
  }

  show() {
    // Logic to display the music screen
    document.querySelector('.music-screen').style.display = 'block'; 
  }

  hide() {
    // Logic to hide the music screen
    document.querySelector('.music-screen').style.display = 'none'; 
  }
}
