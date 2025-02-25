/*
	Name: Jason Abi Chebli
	Last Edited: 25-Feb-2025	
	Credit to HTML5 UP for laying some foundations.
*/

// Event listener that waits for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", function () {
  
  /*-------------- SMALL SCREEN SIZE --------------*/
  const menuToggle = document.getElementById("menu-toggle"); // Hamburger menu button
  const mobileNav = document.getElementById("mobile-nav"); // Mobile navigation container
  const mobileTitle = document.getElementById("mobile-title"); // Title displayed on mobile when the menu is hidden

  // Toggles visibility and other elements for mobile menu
  menuToggle.addEventListener("click", function () {
    // Toggle mobile menu visibility
    mobileNav.classList.toggle("active");

    // Toggle the rotation of the hamburger menu icon
    menuToggle.classList.toggle("rotated");

    // Hide/show the mobile title based on menu state
    if (mobileNav.classList.contains("active")) {
      mobileTitle.classList.add("hidden");
    } else {
      mobileTitle.classList.remove("hidden");
    }
  });

  /*-------------- REVIEWS ON HOME PAGE --------------*/
  let currentIndex = 0; // Initialize the index to keep track of the current review
  const reviews = document.querySelectorAll(".review"); // All review elements on the page
  const indicators = document.querySelectorAll(".indicator"); // Review indicators (dots)
  const totalReviews = reviews.length; // Total number of reviews
  let autoSlideInterval; // Variable to store the interval for automatic slide change

  // Update the displayed review and indicator based on current index
  function updateReview() {
    reviews.forEach((review, index) => {
      review.style.display = index === currentIndex ? "block" : "none"; // Show the current review, hide the others
    });

    // Update the active class on the indicators to highlight the current one
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  // Change the current review based on direction (+1 or -1)
  function changeReview(direction) {
    currentIndex = (currentIndex + direction + totalReviews) % totalReviews; // Ensures the index wraps around
    updateReview(); // Update review display
    resetAutoSlide(); // Reset auto slide to keep it running
  }

  // Jump to a specific review based on the clicked indicator
  function goToReview(index) {
    currentIndex = index;
    updateReview();
    resetAutoSlide();
  }

  // Reset the auto slide interval
  function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Clear the existing interval
    autoSlideInterval = setInterval(() => changeReview(1), 8000); // Start a new interval to change reviews every 8 seconds
  }

  // Initialize the review slider and start auto sliding
  updateReview();
  autoSlideInterval = setInterval(() => changeReview(1), 8000);

  // Attach event listeners for next/previous buttons and indicators
  document.querySelector(".prev").addEventListener("click", () => changeReview(-1));
  document.querySelector(".next").addEventListener("click", () => changeReview(1));
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToReview(index));
  });
});

// Event listener for dropdown toggling
document.querySelectorAll(".select-menu").forEach((menu) => {
  const selectBtn = menu.querySelector(".select-btn");

  // Toggle the dropdown menu on button click
  selectBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});

// Event listener for highlighting the current page in the main menu
document.addEventListener("DOMContentLoaded", function () {
  let links = document.querySelectorAll("#menu a"); // All links in the main menu
  let currentPage = window.location.pathname.split("/").pop(); // Get the current page's filename

  // Highlight the link corresponding to the current page
  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active"); // Add "active" class to the current page link
    } else {
      link.classList.remove("active");
    }
  });
});

$(document).ready(function () {
  let currentIndex = 0; // Track the index of the current item in the project list
  let projectsData = []; // Array to store projects data fetched from JSON

  // Get the current page name (e.g., "mechanical", "software")
  let pageName = window.location.pathname.split("/").pop().split(".")[0]; // Extract page name from URL

  // Construct the path to the corresponding JSON file based on the current page
  let jsonFilePath = `JSON/${pageName}.JSON`;

  // Fetch the JSON data
  fetch(jsonFilePath)
    .then((response) => response.json()) // Parse JSON data
    .then((data) => {
      projectsData = data.projects; // Store the fetched projects data
    })
    .catch((error) => console.error("Error loading JSON:", error)); // Error handling in case the JSON fails to load

  // Function to open the popup and display project details
  function openPopup(index) {
    if (!projectsData.length) {
      console.error("No projects loaded yet.");
      return; // Exit if no project data is available
    }

    const project = projectsData[index]; // Get the project object based on index

    let popupContent = `
          <h2>${project.title}</h2>
          <div class="dropdown-container">
      `;

    // Loop through each dropdown and create HTML content dynamically
    project.dropdowns.forEach((dropdown) => {
      popupContent += `
                <div class="select-menu">
                  <div class="select-btn">
                      <i class="${dropdown.icon}" style="color: ${dropdown.iconColor};"></i>
                      <span class="sBtn-text">${dropdown.title}</span>
                      <i class="fa-solid fa-chevron-down"></i>
                  </div>
                  <div class="${dropdown.title.toLowerCase().includes("skills") ? "skills" : "options"}">
          `;

      // Process dropdown items (either skills or text content)
      if (dropdown.items) {
        dropdown.items.forEach((item) => {
          if (item.name) {
            popupContent += `<span class="skill-bubble" style="background-color: ${item.color};">${item.name}</span>`; // Handle skills
          } else if (item.text) {
            popupContent += item.text; // Handle HTML content (Job Description, Summary, etc.)
          }
        });
      }

      popupContent += `
                  </div>
              </div>
          `;
    });

    popupContent += `</div>`;

    // Inject the generated content into the popup container
    $(".popup-content").html(popupContent);

    // Show the popup and overlay
    $(".popup-overlay, .popup-container").fadeIn();
    $("body").addClass("popup-open");

    // Enable dropdown toggling inside the popup
    $(".select-btn")
      .off("click")
      .on("click", function () {
        $(this).parent().toggleClass("active");
      });
  }

  // Open the popup when a work item is clicked
  $(".work-item a").on("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    currentIndex = $(this).closest(".work-item").index(); // Get the index of the clicked item
    openPopup(currentIndex);
  });

  // Close the popup when the close button is clicked
  $(".popup-close").on("click", function () {
    $(".popup-overlay, .popup-container").fadeOut(); // Hide popup
    $("body").removeClass("popup-open");
  });

  // Close the popup when the overlay is clicked
  $(".popup-overlay").on("click", function () {
    $(".popup-overlay, .popup-container").fadeOut();
    $("body").removeClass("popup-open");
  });

  // Navigate to the previous item in the popup
  $(".popup-nav.left").on("click", function () {
    currentIndex = currentIndex === 0 ? $(".work-item").length - 1 : currentIndex - 1;
    openPopup(currentIndex); // Open the previous project
  });

  // Navigate to the next item in the popup
  $(".popup-nav.right").on("click", function () {
    currentIndex = currentIndex === $(".work-item").length - 1 ? 0 : currentIndex + 1;
    openPopup(currentIndex); // Open the next project
  });
});


(function ($) {
  // Cache the window and body elements.
  var $window = $(window),
      $body = $("body");

  // Remove the "is-preload" class after page load to trigger animations.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100); // Delay for smooth transition.
  });
})(jQuery); // Execute the function immediately with jQuery.

