let togglerButton = document.querySelector('.page-header__menu-toggler');
let menu = document.querySelector('.page-header__menu');
let navigation = document.querySelector('.page-header__navigation');

togglerButton.addEventListener('click', function() {
  if (menu.classList.contains('page-header__menu--open')) {
    menu.classList.remove('page-header__menu--open');
    navigation.classList.remove('page-header__navigation--active');
  } else {
    menu.classList.add('page-header__menu--open');
    navigation.classList.add('page-header__navigation--active');
  }
});