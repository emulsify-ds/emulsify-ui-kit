import { renderTwig } from "@emulsify/core/storybook";
import iconTwig from "./icons.twig";

// Use import.meta.glob to find all .svg files in the directory and subdirectories
const svgIcons = import.meta.glob("../../../assets/icons/**/*.svg");

// Extract clean file names
const icons = Object.keys(svgIcons).map((path) => {
  return path.replace("../../../assets/icons/", "").replace(".svg", "");
});

export default { title: "Components/Media/Icons" };

export const Icons = () => renderTwig(iconTwig({ icons }), { context });
