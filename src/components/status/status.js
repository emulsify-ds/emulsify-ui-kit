Drupal.behaviors.emulsifyStatus = (() => {
  const dismissSelector = '[data-status-dismiss]';
  const behaviorId = 'emulsify-status-dismiss';

  function buttonsIn(context) {
    const buttons = [...context.querySelectorAll(dismissSelector)];
    if (context.matches?.(dismissSelector)) buttons.unshift(context);
    return buttons;
  }

  function dismissMessage(event) {
    const { currentTarget: button } = event;
    const message = button.closest('.status__message');
    const group = message.closest('.status');

    message.hidden = true;
    const next = group.querySelector(
      `.status__message:not([hidden]) ${dismissSelector}:not([hidden])`,
    );
    (next ?? group).focus();
  }

  return {
    attach(context) {
      once(behaviorId, buttonsIn(context)).forEach((button) => {
        button.addEventListener('click', dismissMessage);
        button.hidden = false;
      });
    },

    detach(context, settings, trigger) {
      if (trigger !== 'unload') return;

      once.remove(behaviorId, buttonsIn(context)).forEach((button) => {
        button.removeEventListener('click', dismissMessage);
        button.hidden = true;
      });
    },
  };
})();
