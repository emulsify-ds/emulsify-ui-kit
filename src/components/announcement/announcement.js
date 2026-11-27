Drupal.behaviors.emulsifyAnnouncement = {
  attach(context) {
    const dismissSelector = '[data-announcement-dismiss]';
    const buttons = [...context.querySelectorAll(dismissSelector)];
    if (context.matches?.(dismissSelector)) buttons.unshift(context);

    once('emulsify-announcement-dismiss', buttons).forEach((button) => {
      const announcement = button.closest('.announcement');
      if (!announcement) return;

      button.addEventListener('click', () => {
        announcement.hidden = true;
      });
      button.hidden = false;
    });
  },
};
