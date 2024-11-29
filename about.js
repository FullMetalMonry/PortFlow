// Анимация заголовка 
document.addEventListener("DOMContentLoaded", () => {
    const aboutHeader = document.getElementById("animate-about");
    const textContent = aboutHeader.textContent;
    aboutHeader.textContent = "";
    let index = 0;
  
    const typeEffect = () => {
      if (index < textContent.length) {
        aboutHeader.textContent += textContent.charAt(index);
        index++;
        setTimeout(typeEffect, 100);
      }
    };
  
    typeEffect();
  });
  
  // Анимация карточек 
  const triggerAboutAnimation = () => {
    const cardsSection = document.getElementById("about-cards");
    cardsSection.classList.remove("hidden");
  
    setTimeout(() => {
      document.querySelectorAll(".about-card").forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove("opacity-0", "translate-y-10");
        }, index * 200);
      });
    }, 100);
  };
  