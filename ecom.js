document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".search form");
    const searchInput = document.querySelector("#search");
    let searchResultsContainer = document.getElementById("search-results");

    // Create the search-results container if it doesn't exist
    if (!searchResultsContainer) {
        searchResultsContainer = document.createElement("div");
        searchResultsContainer.id = "search-results";
        searchForm.parentNode.insertBefore(searchResultsContainer, searchForm.nextSibling);
    }

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const query = searchInput.value.trim();
        if (!query) {
            searchResultsContainer.innerHTML = "<h2>Please enter a search term.</h2>";
            return;
        }

        fetch(`search.php?search=${encodeURIComponent(query)}`)
            .then((response) => response.text())
            .then((data) => {
                // Insert response into the DOM
                searchResultsContainer.innerHTML = data;

                // Manually execute any scripts in the response
                const tempContainer = document.createElement("div");
                tempContainer.innerHTML = data;
                const scripts = tempContainer.querySelectorAll("script");

                scripts.forEach((script) => {
                    const newScript = document.createElement("script");
                    if (script.src) {
                        newScript.src = script.src; // For external scripts
                        newScript.async = false; // Ensure execution order
                    } else {
                        newScript.textContent = script.textContent; // For inline scripts
                    }
                    document.body.appendChild(newScript); // Append and execute
                });
            })
            .catch((error) => {
                console.error("Error fetching search results:", error);
                searchResultsContainer.innerHTML = "<h2>Failed to fetch search results.</h2>";
            });
    });
});


// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].id = dots[i].id.replace("active", " ");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].id = "active";
}

// Show/hide responsive menu bar
function showmenuR() {
    const x = document.getElementById("menuR");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Show/hide dropdown-content
const dropdown = document.getElementsByClassName("dropdown");
for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}
