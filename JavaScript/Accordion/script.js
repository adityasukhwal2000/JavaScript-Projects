//? Taking references of elements

const accordion = document.querySelectorAll(".accordion-div");
const openIcon = document.getElementsByClassName("openIcon");
const closeIcon = document.getElementsByClassName("closeIcon");

//? applying events

for (let i = 0; i < accordion.length; i++) {
  closeIcon[i].style.display = "none";

  accordion[i].addEventListener("click", () => {
    const accord = accordion[i].classList.toggle("active");

    if (accord) {
      closeIcon[i].style.display = "block";
      openIcon[i].style.display = "none";
    } else {
      closeIcon[i].style.display = "none";
      openIcon[i].style.display = "block";
    }
  });
}
