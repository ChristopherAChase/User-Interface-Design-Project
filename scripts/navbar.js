

$(document).ready(() => {
  $(".navbar-burger").click(() => {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

const dropdowns = document.querySelectorAll('a.navbar-item');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', (event) => {
    console.log(event);
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
  })
});