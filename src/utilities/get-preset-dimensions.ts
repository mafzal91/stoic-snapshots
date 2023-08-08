import { imageDimensions } from "@/utilities/constants";
import { ImagePresets } from "@/app/common";

export function getPresetDimensions(preset: ImagePresets): ImageDimensions {
  const presetDimensions = imageDimensions.find(
    (dimension) => dimension.name === preset
  );
  if (!presetDimensions) {
    throw new Error(`No preset dimensions found for ${preset}`);
  }
  return {
    width: presetDimensions.width,
    height: presetDimensions.height,
  };
}
