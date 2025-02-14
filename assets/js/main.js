/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

document.addEventListener("DOMContentLoaded", function () {
  /* Reviews */
  let currentIndex = 0;
  const reviews = document.querySelectorAll(".review");
  const indicators = document.querySelectorAll(".indicator");
  const totalReviews = reviews.length;
  let autoSlideInterval;

  function updateReview() {
    reviews.forEach((review, index) => {
      review.style.display = index === currentIndex ? "block" : "none";
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function changeReview(direction) {
    currentIndex = (currentIndex + direction + totalReviews) % totalReviews;
    updateReview();
    resetAutoSlide();
  }

  function goToReview(index) {
    currentIndex = index;
    updateReview();
    resetAutoSlide();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => changeReview(1), 8000);
  }

  // Initialize slider
  updateReview();
  autoSlideInterval = setInterval(() => changeReview(1), 8000);

  // Attach event listeners
  document
    .querySelector(".prev")
    .addEventListener("click", () => changeReview(-1));
  document
    .querySelector(".next")
    .addEventListener("click", () => changeReview(1));
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToReview(index));
  });
});

document.addEventListener("DOMContentLoaded", function () {
  /* Popup Functionality */
  const images = document.querySelectorAll(".work-item .image.thumb img");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupImage = document.getElementById("popupImage");
  const popupCaption = document.getElementById("popupCaption");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let imgCurrentIndex = 0;

  const captions = [
    "StartMate Student Fellowship 2025: Description here",
    "SunAware: Description here",
    "UBS | Investment Banking Challenge Participant: Description here",
    "Monash Business School Industry & Alumni Mentoring Program: Description here",
    "Private Academic Tutor and DW Tuition: Description here",
    "The Bicycle Corporation Pty. Ltd.: Description here"
  ];

  function showPopup(index) {
    if (index >= 0 && index < images.length) {
      popupImage.src = images[index].src; // Set image source for popup
      popupCaption.textContent = captions[index]; // Set corresponding caption text
      popupOverlay.style.display = "flex"; // Show the popup
      imgCurrentIndex = index;
    }
  }

  // Event listeners for image clicks to show popup
  images.forEach((img, index) => {
    img.addEventListener("click", function () {
      showPopup(index);
    });
  });

  // Close the popup
  closeBtn.addEventListener("click", function () {
    popupOverlay.style.display = "none";
  });

  // Navigation for next/previous buttons
  prevBtn.addEventListener("click", function () {
    showPopup((imgCurrentIndex - 1 + images.length) % images.length);
  });

  nextBtn.addEventListener("click", function () {
    showPopup((imgCurrentIndex + 1) % images.length);
  });

  // Close popup when clicking outside the image (on overlay)
  popupOverlay.addEventListener("click", function (event) {
    if (event.target === popupOverlay) {
      popupOverlay.style.display = "none";
    }
  });
});

/* For the drop downs */

document.querySelectorAll(".select-menu").forEach((menu) => {
  const selectBtn = menu.querySelector(".select-btn");

  selectBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});

/* For the Main Menu */

document.addEventListener("DOMContentLoaded", function () {
  let links = document.querySelectorAll("#menu a");
  let currentPage = window.location.pathname.split("/").pop(); // Get current page filename

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active"); // Add 'active' class to the current page
    } else {
      link.classList.remove("active"); // Remove from others
    }
  });
});


// function openPopup(index) {
//     const item = $(".work-item").eq(index);
//     const title = item.find("a").data("title");
//     const skills = item.find("a").data("skills");
//     const description = item.find("a").data("description");
//     const images = item.find("a").data("images");
//     const links = item.find("a").data("links");

//     // Generate Skill Bubbles
//     const skillBubbles = skills.split(",").map(skill => {
//         let category = "design";
//         if (skill.toLowerCase().includes("data")) category = "analysis";
//         if (skill.toLowerCase().includes("prototype")) category = "prototype";
//         return `<span class="skill-bubble ${category}">${skill.trim()}</span>`;
//     }).join("");

//     let popupContent = `
//         <h2>${title}</h2>

//         <div class="dropdown">
//             <div class="dropdown-title">Skills</div>
//             <div class="dropdown-content skill-bubbles">${skillBubbles}</div>
//         </div>

//         <div class="dropdown">
//             <div class="dropdown-title">Brief</div>
//             <div class="dropdown-content"><p>${description}</p></div>
//         </div>
//     `;

//     if (images) {
//         popupContent += `
//             <div class="dropdown">
//                 <div class="dropdown-title">Solution</div>
//                 <div class="dropdown-content">
//                     ${images.split(",").map(image => `<img src="${image}" style="width:100%; margin-top:10px;">`).join("")}
//                 </div>
//             </div>
//         `;
//     }

//     if (links) {
//         popupContent += `
//             <div class="dropdown">
//                 <div class="dropdown-title">Links</div>
//                 <div class="dropdown-content">
//                     <a href="${links}" target="_blank">${links}</a>
//                 </div>
//             </div>
//         `;
//     }

//     $(".popup-content").html(popupContent);
//     $(".popup-overlay, .popup-container").fadeIn();
// }

// // Toggle dropdowns
// $(document).on("click", ".dropdown-title", function () {
//     $(this).next(".dropdown-content").slideToggle();
// });


/* For the Pop-up */
$(document).ready(function () {
    let currentIndex = 0; // Track the index of the current item

    // Function to open the popup and update the content
    function openPopup(index) {
        const item = $(".work-item").eq(index); // Get the clicked item

        // Build the popup content dynamically
        let popupContent = `
        <h2>Tesla | Mechanical Design Engineer Intern</h2>
        <div class="dropdown-container">
    
            <!-- Skills -->
            <div class="select-menu">
                <div class="select-btn">
                    <i class="fa-solid fa-lightbulb" style="color: #F4D03F;"></i>
                    <span class="sBtn-text">Skills</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <p class="options" style="text-align: center;">
                    <span class="skill-bubble design">Mechanical Design</span>
                    <span class="skill-bubble analysis">CATIA</span>
                    <span class="skill-bubble prototype">Prototyping</span>
                    <span class="skill-bubble prototype">Thermal Systems</span>
                    <span class="skill-bubble prototype">Cross-functional Collaboration</span>
                    <span class="skill-bubble prototype">Manufacturing Optimization</span>
                    <span class="skill-bubble prototype">Test Planning</span>
                    <span class="skill-bubble prototype">First-Principles Engineering</span>
                    <span class="skill-bubble prototype">Data Analysis</span>
                </p>
            </div>
    
            <!-- Brief or Job Description -->
            <div class="select-menu">
                <div class="select-btn">
                    <i class="fa-solid fa-file-alt" style="color: #28B463;"></i>
                    <span class="sBtn-text">Job Description</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>    
                <div class="options">
                      <div class="pdf-container">
                          <iframe src="documents/mechanical/Tesla/Job_Description.pdf" width="100%" height="600px"></iframe>
                      </div>
                </div>
            </div>
    
            <!-- Solution or Summary -->
            <div class="select-menu">
                <div class="select-btn">
                    <i class="fa-solid fa-align-left" style="color: #E67E22;"></i>
                    <span class="sBtn-text">Summary</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>    
                <div class="options">
                    <div class="summary-container">
                        
                        <!-- Left: Text Content -->
                        <div class="summary-text">
                            <p>
                                Tesla, one of the leading electric vehicle companies, has a mission to accelerate the world's transition to sustainable energy.<br><br>
                                After undergoing a highly competitive global application process, Jason was fortunate to secure a Mechanical Design Engineering internship within Tesla's Thermal Team. Based in Silicon Valley, Jason's role focuses on spearheading the design, testing, and prototyping of mechanical components and systems for current and future Tesla vehicles and product programs.<br><br>
                                Applying his strong first-principles engineering, Jason ensures that his CATIA designs are not only robust but also efficient. He meticulously balances cost and mass optimization, always striving for excellence.<br><br>
                                Despite officially being an 'intern,' Jason's projects and commitments mirror those of a full-time employee due to the lean team structure. As such, Jason serves as a lead designer for certain thermal components in two future vehicles, involved in every step from concept inception to global manufacturing scale.
                            </p>
                        </div>
    
                        <!-- Right: Images & Video -->
                        <div class="summary-media">
                            <img src="images/mechanical/Tesla/Tesla_Factory.jpg" alt="Tesla Factory">
                            <img src="images/mechanical/Tesla/Tesla_Fremont.jpg" alt="Tesla Fremont Factory">
                            
                            <!-- Embedded YouTube Video -->
                            <div class="video-container">
                                <iframe width="100%" height="200" src="https://www.youtube.com/embed/Qfj4urMF8CU" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
    
            <!-- Links -->
            <div class="select-menu">
                <div class="select-btn">
                    <i class="fa-solid fa-link" style="color: #9B59B6;"></i>
                    <span class="sBtn-text">Links and Resources</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>    
                <div class="options">
                      <a href="https://www.tesla.com/" target="_blank" style="display: block; margin-bottom: 10px;">
                          <i class="fa-solid fa-globe"></i> Tesla Website
                      </a>
                      <a href="https://www.linkedin.com/posts/jason-abi-chebli_tesla-mechanicaldesignengineer-intern-activity-7212982421015650305-DI19?utm_source=share&utm_medium=member_desktop" target="_blank" style="display: block; margin-bottom: 10px;">
                          <i class="fa-brands fa-linkedin"></i> LinkedIn Post
                      </a>
                </div>
            </div>
    
        </div>
    `;
    

        // Inject the content into the popup
        $(".popup-content").html(popupContent);

        // Show the popup and overlay
        $(".popup-overlay, .popup-container").fadeIn();

        // Add the class to blur the background
        $("body").addClass("popup-open");

		// Add event listener so drop downs can be toggled
		$(".select-btn").off("click").on("click", function () {
			$(this).parent().toggleClass("active");
		});
    }

    // Open the popup when an item is clicked
    $(".work-item a").on("click", function (e) {
        e.preventDefault();
        currentIndex = $(this).closest(".work-item").index(); // Get the index of the clicked item
        openPopup(currentIndex);
    });

    // Close the popup when the close button is clicked
    $(".popup-close").on("click", function () {
        $(".popup-overlay, .popup-container").fadeOut();
        $("body").removeClass("popup-open");
    });

    // Close the popup when the overlay is clicked
    $(".popup-overlay").on("click", function () {
        $(".popup-overlay, .popup-container").fadeOut();
        $("body").removeClass("popup-open");
    });

    // Left navigation button (previous item)
    $(".popup-nav.left").on("click", function () {
        currentIndex = (currentIndex === 0) ? $(".work-item").length - 1 : currentIndex - 1;
        openPopup(currentIndex);
    });

    // Right navigation button (next item)
    $(".popup-nav.right").on("click", function () {
        currentIndex = (currentIndex === $(".work-item").length - 1) ? 0 : currentIndex + 1;
        openPopup(currentIndex);
    });
});


// /* For the Pop-up */
// $(document).ready(function () {
//     let currentIndex = 0; // Track the index of the current item

//     // Function to open the popup and update the content
//     function openPopup(index) {
//         const item = $(".work-item").eq(index); // Get the clicked item
//         const title = item.find("a").data("title");
//         const skills = item.find("a").data("skills");
//         const description = item.find("a").data("description");
//         const images = item.find("a").data("images");
//         const videos = item.find("a").data("videos");
//         const documents = item.find("a").data("documents");
//         const links = item.find("a").data("links");

//         // Build the popup content dynamically
//         let popupContent = `
//             <h2>${title}</h2>
//             <p><strong>Skills:</strong> ${skills}</p>
//             <p><strong>Description:</strong> ${description}</p>
//         `;

//         // Add images if available
//         if (images) {
//             popupContent += `
//                 <div class="images">
//                     ${images.split(",").map(image => `<img src="${image}" alt="${title}" style="width:40%; margin-bottom:10px;">`).join("")}
//                 </div>
//             `;
//         }

//         // Add video if available
//         if (videos) {
//             popupContent += `
//                 <div class="video">
//                     <iframe width="100%" height="315" src="${videos}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//                 </div>
//             `;
//         }

//         // Add documents if available
//         if (documents) {
//             popupContent += `
//                 <div class="documents">
//                     <p><strong>Documents:</strong></p>
//                     ${documents.split(",").map(doc => `<a href="${doc}" target="_blank" class="document-link">${doc}</a>`).join("<br>")}
//                 </div>
//             `;
//         }

//         // Add links if available
//         if (links) {
//             popupContent += `
//                 <div class="links">
//                     <p><strong>Project Link:</strong> <a href="${links}" target="_blank">${links}</a></p>
//                 </div>
//             `;
//         }

//         // Inject the content into the popup
//         $(".popup-content").html(popupContent);

//         // Show the popup and overlay
//         $(".popup-overlay, .popup-container").fadeIn();

//         // Add the class to blur the background
//         $("body").addClass("popup-open");
//     }

//     // Open the popup when an item is clicked
//     $(".work-item a").on("click", function (e) {
//         e.preventDefault();
//         currentIndex = $(this).closest(".work-item").index(); // Get the index of the clicked item
//         openPopup(currentIndex);
//     });

//     // Close the popup when the close button is clicked
//     $(".popup-close").on("click", function () {
//         $(".popup-overlay, .popup-container").fadeOut();
//         $("body").removeClass("popup-open");
//     });

//     // Close the popup when the overlay is clicked
//     $(".popup-overlay").on("click", function () {
//         $(".popup-overlay, .popup-container").fadeOut();
//         $("body").removeClass("popup-open");
//     });

//     // Left navigation button (previous item)
//     $(".popup-nav.left").on("click", function () {
//         currentIndex = (currentIndex === 0) ? $(".work-item").length - 1 : currentIndex - 1;
//         openPopup(currentIndex);
//     });

//     // Right navigation button (next item)
//     $(".popup-nav.right").on("click", function () {
//         currentIndex = (currentIndex === $(".work-item").length - 1) ? 0 : currentIndex + 1;
//         openPopup(currentIndex);
//     });
// });

/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $header = $("#header"),
    $footer = $("#footer"),
    $main = $("#main"),
    settings = {
      // Parallax background effect?
      parallax: true,

      // Parallax factor (lower = more intense, higher = less intense).
      parallaxFactor: 20
    };

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1800px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"]
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Touch?
  if (browser.mobile) {
    // Turn on touch mode.
    $body.addClass("is-touch");

    // Height fix (mostly for iOS).
    window.setTimeout(function () {
      $window.scrollTop($window.scrollTop() + 1);
    }, 0);
  }

  // Footer.
  breakpoints.on("<=medium", function () {
    $footer.insertAfter($main);
  });

  breakpoints.on(">medium", function () {
    $footer.appendTo($header);
  });

  // Header.

  // Parallax background.

  // Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
  if (browser.name == "ie" || browser.mobile) settings.parallax = false;

  if (settings.parallax) {
    breakpoints.on("<=medium", function () {
      $window.off("scroll.strata_parallax");
      $header.css("background-position", "");
    });

    breakpoints.on(">medium", function () {
      $header.css("background-position", "left 0px");

      $window.on("scroll.strata_parallax", function () {
        $header.css(
          "background-position",
          "left " +
            -1 * (parseInt($window.scrollTop()) / settings.parallaxFactor) +
            "px"
        );
      });
    });

    $window.on("load", function () {
      $window.triggerHandler("scroll");
    });
  }

  // Main Sections: Two.

  // Lightbox gallery.
  $window.on("load", function () {
    $("#two").poptrox({
      caption: function ($a) {
        return $a.next("h3").text();
      },
      overlayColor: "#2c2c2c",
      overlayOpacity: 0.85,
      popupCloserText: "",
      popupLoaderText: "",
      selector: ".work-item a.image",
      usePopupCaption: true,
      usePopupDefaultStyling: false,
      usePopupEasyClose: false,
      usePopupNav: true,
      windowMargin: breakpoints.active("<=small") ? 0 : 50
    });
  });
})(jQuery);
