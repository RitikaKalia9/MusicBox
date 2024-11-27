// This class will represent the menu screen that you see when you first load
// the music visualizer.

class MenuScreen {
  constructor() {
    this.gifData = []; // Field to hold the fetched GIF data
    this.gifContainer = document.getElementById("gif-container"); // Assuming you'll have a div to display GIFs
    this.queryInput = document.getElementById("query-input");
    this.errorDiv = document.getElementById("error");
    
    // Initialize the menu screen by fetching GIFs
    this.init();
  }

  async init() {
    await this.fetchGifs(); // Fetch GIFs when initializing
    this.displayGifs(); // Display fetched GIFs
  }

  // Method to fetch GIFs from your custom Flask API
  async fetchGifs() {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/gifs'); 
      if (!response.ok) throw new Error('Network response was not ok');
      this.gifData = await response.json(); // Store the fetched GIFs in the class field
    } catch (error) {
      console.error('Error fetching GIFs:', error);
      this.errorDiv.classList.remove('inactive'); // Show error message if there's an issue
    }
  }

  // Method to display fetched GIFs
  displayGifs() {
    if (this.gifData.length === 0) {
      this.errorDiv.classList.remove('inactive'); // Show error message if no GIFs are available
      return;
    }

    this.gifData.forEach(gif => {
      const gifElement = document.createElement('img');
      gifElement.src = gif.url; // Use the GIF URL
      gifElement.alt = gif.title; // Add alt text
      gifElement.classList.add('gif-image'); // Add a class for styling (optional)
      this.gifContainer.appendChild(gifElement); // Append the GIF to the container
    });
  }
}
