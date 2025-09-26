Drupal.behaviors.siteHeader = {
  attach(context) {
    const menuItems = context.querySelectorAll('.header__menu-link');
    console.log('menuItems', menuItems);
  },
};
