const searchForm = document.querySelector(".search-form");
const searchResult = document.querySelector("#search-box");
const searchBtn = document.querySelector(".searchBtn");
const showMoreBtn = document.querySelector(".showMoreBtn");
const showResult = document.querySelector(".showResult");
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeToggleBtn.textContent = "☀️ Light Mode";
}

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeToggleBtn.textContent = "☀️ Light Mode";
    localStorage.getItem("theme", "dark");
  } else {
    themeToggleBtn.textContent = "🌙 Dark Mode";
    localStorage.getItem("theme", "light");
  }
});

let keyword = "";
let page = 1;
showMoreBtn.style.display = "none";

async function fetchImage() {
  keyword = searchResult.value.trim();

  if (!keyword) {
    alert("Type something in the search box");
    return;
  }

  const response = await fetch(
    `https://pixabay.com/api/?key=47187298-9bb1c4e8d9c6ef69c98e52ca5&q=${encodeURIComponent(
      keyword
    )}&image_type=photo&pretty=true&page=${page}`
  );

  if (!response.ok) {
    alert("Failed to fetch images. Try again later.");
    return;
  }

  const data = await response.json();

  if (page === 1) {
    showResult.innerHTML = "";
  }

  data.hits.forEach((image) => {
    const link = document.createElement("a");
    link.href = image.largeImageURL;
    link.target = "_blank";
    link.download = "";

    const img = document.createElement("img");
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = "lazy";
    img.classList.add("gallery-image");

    link.appendChild(img);
    showResult.appendChild(link);
  });

  if (data.hits.length > 0) {
    showMoreBtn.style.display = "block";
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page = 1;
  fetchImage();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  fetchImage();
});
