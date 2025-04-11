let slideIndex = 0;
let slideTimer;

showSlides();


function showSlides() {
    let slides = document.querySelectorAll(".slide");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }

    slides[slideIndex].style.display = "block";


    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => { 
        slideIndex++; 
        showSlides();
    }, 5000); 
}

function changeSlide(n) {
    slideIndex += n;
    showSlides();
}