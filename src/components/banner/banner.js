Drupal.behaviors.banners = {
  attach(context) {
    const banners = context.querySelectorAll('.banner');

    /**
     * getBannerReferences
     *
     * @description Returns references to banner elements.
     * @param {HTMLElement} banner Banner element.
     * @returns {Object} References to label, button, video, pause, and play elements.
     */
    function getBannerReferences(banner) {
      return {
        label: banner.querySelector('.banner__toggle_label'),
        button: banner.querySelector('.banner__toggle'),
        video: banner.querySelector('.banner__video'),
        pause: banner.querySelector('.banner__pause'),
        play: banner.querySelector('.banner__play'),
      };
    }

    /**
     * playVideo
     *
     * @description Starts video playback and updates UI to reflect the playing state.
     * @param {Object} refs Object containing element references.
     * @returns {Promise} Resolves when the video starts playing or rejects with an error.
     */
    function playVideo(refs) {
      return new Promise((resolve, reject) => {
        refs.video
          .play()
          .then(() => {
            refs.pause.classList.remove('visually-hidden');
            refs.play.classList.add('visually-hidden');
            refs.label.textContent = 'Pause video';
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    /**
     * pauseVideo
     *
     * @description Pauses video playback and updates UI to reflect the paused state.
     * @param {Object} refs Object containing element references.
     */
    function pauseVideo(refs) {
      refs.play.classList.remove('visually-hidden');
      refs.pause.classList.add('visually-hidden');
      refs.label.textContent = 'Play video';
      refs.video.pause();
    }

    /**
     * toggleVideo
     *
     * @description Toggles video playback state and updates UI accordingly.
     * @param {Object} refs Object containing element references.
     */
    function toggleVideo(refs) {
      if (refs.video.paused) {
        playVideo(refs);
      } else {
        pauseVideo(refs);
      }
    }

    /**
     * setInitialState
     *
     * @description Sets the initial state for a video element and performs associated actions.
     * @param {Object} refs Object containing element references.
     * @throws {DOMException} - If an error occurs while attempting to play the video.
     */
    async function setInitialState(refs) {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

      // Check if the user disabled 'prefer reduced motion' on their system.
      if (!reduceMotion.matches) {
        // Check if the user's browser allows video autoplay.
        try {
          await playVideo(refs);
          refs.actions[0].classList.add('hidden');
        } catch (err) {
          if (err.name === 'NotAllowedError') {
            pauseVideo(refs);
          }
        }
      } else {
        pauseVideo(refs);
      }
    }

    banners?.forEach((banner) => {
      const refs = getBannerReferences(banner);

      if (refs.button && refs.video) {
        refs.button.addEventListener('click', () => toggleVideo(refs));
        setInitialState(refs);
      }
    });
  },
};
