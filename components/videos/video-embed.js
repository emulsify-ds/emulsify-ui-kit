Drupal.behaviors.responsiveEmbeddedVideos = {
  attach(context) {
    // List of Video Vendors embeds you want to support
    const players = context.querySelectorAll(
      'iframe[src*="youtube.com"]',
      'iframe[src*="vimeo.com"]',
    );

    // If there are videos on the page...
    if (players) {
      // Loop through videos
      Array.from(players).forEach((player) => {
        // Get Video Information
        const width = player.getAttribute('width');
        const height = player.getAttribute('height');
        const aspectRatio = `${width} / ${height}`;
        const parentDiv = player.parentNode;

        parentDiv.style.aspectRatio = aspectRatio;

        // Clear static height/width attributes for responsive styles
        player.removeAttribute('height');
        player.removeAttribute('width');
      });
    }
  },
};
