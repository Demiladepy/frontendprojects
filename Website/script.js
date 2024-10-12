document.addEventListener("DOMContentLoaded", () => {
  // Display welcome message when the page loads
  alert("Welcome to my portfolio!");

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav__link");

  navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);

          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: "smooth"
          });
      });
  });
});
