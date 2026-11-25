export function tokenRows(tokens, prefix, sample) {
  return Object.entries(tokens).map(([name, value]) => ({
    name,
    value,
    usage: `var(--${prefix}-${name})`,
    sample,
  }));
}

// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
function luminance(color) {
  const hex = color.slice(1);
  const channels =
    hex.length === 3
      ? [...hex].map((digit) => digit.repeat(2))
      : hex.match(/../g);
  const [red, green, blue] = channels.map((channel) => {
    const srgb = Number.parseInt(channel, 16) / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrastRatio(color, background) {
  const colors = [luminance(color), luminance(background)];
  return (Math.max(...colors) + 0.05) / (Math.min(...colors) + 0.05);
}
