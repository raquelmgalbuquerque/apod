function displayApod(date) {
  let apod = {};

  let url =
    date === "today"
      ? "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
      : `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}&concept_tags=True`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      apod = json;

      apodCopyright =
        apod.copyright === undefined
          ? "Not provided by the API"
          : apod.copyright;

      document.querySelector(
        ".apod-container"
      ).innerHTML = `<h2 class="apod-title">${apod.title}</h2>
      <p class="apod-date">${new Date(apod.date).toDateString()}</p>
      <p class="apod-explanation">${apod.explanation}</p>
      <img class="apod-image" src="${apod.url}" alt="${apod.title}"/>
      <p class="apod-copyright"><b>Image Credit & Copyright</b>: ${apodCopyright}</p>`;
    });
}

function todayDate() {
  let today = new Date().toISOString().split("T")[0];
  document.getElementById("selected-date").setAttribute("max", today);
}

window.onload = () => {
  // I want to fetch today's picture when I load the page...
  displayApod("today");
  // ... block the input maximum to today's date...
  todayDate();
  // ... and show some random APODs at the bottom of the page.
  displayRandomApods();
};

function displayAnotherApod(event) {
  event.preventDefault();
  let selectedDate = document.getElementById("selected-date").value;
  displayApod(selectedDate);
}

function displayRandomApods() {
  let apods = {};

  let url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5";

  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      apods = json;

      let randomApodContainer = document.querySelector(
        ".random-apod-container"
      );

      apods.forEach((apod) => {
        let randomApodElement = document.createElement("div");
        randomApodElement.innerHTML = `<img class="random-apod-image" src="${apod.url}" alt="${apod.title}" onclick="displayApod('${apod.date}')"/>`;
        randomApodContainer.appendChild(randomApodElement);
      });
    });
}
