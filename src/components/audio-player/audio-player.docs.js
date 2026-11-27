export default {
  description: {
    component: `
## Overview

Use Audio Player for a recording that listeners can play on demand.

## Anatomy & composition

The browser renders the audio controls. The transcript link appears beneath the player and remains available if the browser cannot play the file.

## Variants

Supply one audio source or list alternative formats in order of preference. Set preload, mute, or loop options to suit the recording.

## Accessibility

Playback starts when the listener activates Play. Give each recording a descriptive label and provide a transcript that includes meaningful sounds as well as speech. The transcript link uses the theme's link and focus styles.

## Content guidelines

Use a link label that identifies the transcript, especially when there are several recordings on the page.

## Drupal usage

Pass \`audio_player__sources\` as source URLs or objects with \`src\` and an optional MIME \`type\`. Set \`audio_player__transcript_url\` to a page or an anchor containing the transcript.

## Theming

The native controls follow the browser's appearance. The transcript link inherits the surrounding theme.

## Changes from 1.x

Replace \`audio_content\` with \`audio_player__sources\`. Prefix the playback and wrapper options with \`audio_player__\`. The autoplay option has been removed.
`,
  },
};
