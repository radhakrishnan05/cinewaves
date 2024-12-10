document.addEventListener("DOMContentLoaded", function () {
  const slideshowContainer = document.getElementById("slideshow");

  // Load JSON file for slideshow images
  fetch("https://raw.githubusercontent.com/radhakrishnan05/json-api/refs/heads/main/movies.json")
      .then(response => response.json())
      .then(data => {
          // Create image elements for the slideshow
          data.forEach((movie, index) => {
              const img = document.createElement("img");
              img.src = movie.image; // Use the URL from the JSON file
              img.alt = movie.alt;
              if (index === 0) img.classList.add("active"); // Set the first image as active
              slideshowContainer.appendChild(img);
          });

          // Start the slideshow
          startSlideshow();
      })
      .catch(error => console.error("Error loading movies.json:", error));

  function startSlideshow() {
      let currentIndex = 0;
      const slides = document.querySelectorAll("#slideshow img");

      setInterval(() => {
          slides[currentIndex].classList.remove("active"); // Hide current slide
          currentIndex = (currentIndex + 1) % slides.length; // Move to next slide
          slides[currentIndex].classList.add("active"); // Show new slide
      }, 3000); // Change slide every 3 seconds
  }

  // Fetch movie data from the movieposter.json file hosted on GitHub
  fetch("https://raw.githubusercontent.com/radhakrishnan05/json-api/refs/heads/main/movieposter.json")
      .then(response => response.json())
      .then(movies => {
          const movieCardsContainer = document.getElementById('movie-cards-container');
          let allMovies = movies; // Store all movies for filtering

          // Function to display movies
          function displayMovies(movies) {
              movieCardsContainer.innerHTML = ''; // Clear current movie cards
              movies.forEach(movie => {
                  const movieCard = document.createElement('div');
                  movieCard.classList.add('movie-card');

                  // Movie poster
                  const moviePoster = document.createElement('img');
                  moviePoster.src = movie.poster;
                  moviePoster.alt = `${movie.name} Poster`;

                  // Movie name
                  const movieName = document.createElement('h3');
                  movieName.textContent = movie.name;

                  // Movie language
                  const movieLanguage = document.createElement('p');
                  movieLanguage.textContent = `Language: ${movie.language}`;

                  // Movie rating
                  const movieRating = document.createElement('div');
                  movieRating.classList.add('rating');
                  for (let i = 0; i < 5; i++) {
                      const star = document.createElement('span');
                      star.classList.add('star');
                      star.textContent = i < movie.rating ? '★' : '☆';
                      movieRating.appendChild(star);
                  }

                  // Movie download options (dropdown)
                  const downloadSelect = document.createElement('select');
                  for (const resolution in movie.downloadOptions) {
                      const optionElement = document.createElement('option');
                      optionElement.value = resolution;
                      optionElement.textContent = resolution;
                      downloadSelect.appendChild(optionElement);
                  }

                  // Buttons: Watch Now and Download
                  const buttons = document.createElement('div');
                  buttons.classList.add('buttons');

                  // Watch button
                  const watchButton = document.createElement('a');
                  watchButton.href = movie.watchLink;
                  watchButton.textContent = 'Watch Now';
                  buttons.appendChild(watchButton);

                  // Download button
                  

                  // Append all elements to the movie card
                  movieCard.appendChild(moviePoster);
                  movieCard.appendChild(movieName);
                  movieCard.appendChild(movieLanguage);
                  movieCard.appendChild(movieRating);
                  movieCard.appendChild(downloadSelect);
                  movieCard.appendChild(buttons);

                  // Append the movie card to the container
                  movieCardsContainer.appendChild(movieCard);
              });
          }

          // Initially display all movies
          displayMovies(allMovies);

          // Search functionality
          const searchBar = document.getElementById('search-bar');
          searchBar.addEventListener('input', function () {
              const searchTerm = searchBar.value.toLowerCase();

              // Filter movies based on the search term
              const filteredMovies = allMovies.filter(movie => {
                  return movie.name.toLowerCase().includes(searchTerm);
              });

              // Display filtered movies
              displayMovies(filteredMovies);
          });

      })
      .catch(error => {
          console.error('Error loading movie data:', error);
      });
});

