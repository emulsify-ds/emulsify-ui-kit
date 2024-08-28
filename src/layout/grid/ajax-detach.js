/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
// Global JS file attached to ever page load.
(function detachProgressLoader($, Drupal) {
  Drupal.behaviors.detachExtraLoadingIcons = {
    attach(context) {
      // Remove ALL loading icons whenever AJAX is complete.
      $(context).ajaxComplete(function removeProgress() {
        $('.ajax-progress').detach();
      });
    },
  };
})(jQuery, Drupal);
