const videoSelector = '[data-video-player]';
const behaviorId = 'emulsify-video';
const subscriptions = new WeakMap();

function videosIn(context) {
  const videos = [...context.querySelectorAll(videoSelector)];
  if (context.matches?.(videoSelector)) videos.unshift(context);
  return videos;
}

Drupal.behaviors.emulsifyVideo = {
  attach(context) {
    once(behaviorId, videosIn(context)).forEach((wrapper) => {
      const media = wrapper.querySelector('.video__media');
      const button = wrapper.querySelector('[data-video-toggle]');
      if (!media || !button) return;

      const controller = new AbortController();
      const { signal } = controller;
      const showNativeControls = () => {
        media.removeAttribute('aria-hidden');
        media.controls = true;
      };
      subscriptions.set(wrapper, () => {
        controller.abort();
        button.hidden = true;
        showNativeControls();
        wrapper.removeAttribute('data-video-playing');
      });

      const update = () => {
        const playing = !media.paused && !media.ended;
        wrapper.toggleAttribute('data-video-playing', playing);
        button.textContent = playing
          ? button.dataset.videoPauseLabel
          : button.dataset.videoPlayLabel;
      };
      const play = () => {
        media.play().catch(() => {
          if (signal.aborted) return;
          showNativeControls();
          update();
        });
      };

      ['play', 'pause', 'ended'].forEach((event) => {
        media.addEventListener(event, update, { signal });
      });
      button.addEventListener(
        'click',
        () => (media.paused ? play() : media.pause()),
        { signal },
      );
      button.hidden = false;
      update();

      if (wrapper.dataset.videoAutoplay === 'true') {
        media.controls = false;
        if (wrapper.dataset.videoDecorative === 'true') {
          media.setAttribute('aria-hidden', 'true');
        }
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        motion.addEventListener(
          'change',
          (event) => {
            if (event.matches) media.pause();
          },
          { signal },
        );
        if (!motion.matches) play();
      }
    });
  },

  detach(context, settings, trigger) {
    if (trigger !== 'unload') return;

    once.remove(behaviorId, videosIn(context)).forEach((wrapper) => {
      subscriptions.get(wrapper)?.();
      subscriptions.delete(wrapper);
    });
  },
};
