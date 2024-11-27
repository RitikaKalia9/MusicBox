// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.

class PlayButton {
  constructor(audioPlayer) {
    // Store a reference to the AudioPlayer instance
    this.audioPlayer = audioPlayer;
    
    // Create the button element
    this.button = document.createElement('button');
    this.button.textContent = 'Play'; // Initial button text
    this.button.classList.add('play-button'); 
    this.button.addEventListener('click', () => this.togglePlay()); // Event listener for button click

    // Append the button to the music screen (assuming you have a container for it)
    document.querySelector('.music-screen').appendChild(this.button);
  }

  togglePlay() {
    if (this.audioPlayer.isPlaying()) {
      this.audioPlayer.pause(); 
      this.button.textContent = 'Play'; 
    } else {
      this.audioPlayer.play(); 
      this.button.textContent = 'Pause'; 
    }
  }
}
