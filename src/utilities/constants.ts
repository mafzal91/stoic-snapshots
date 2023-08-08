import { ImagePresets } from "@/app/common";

export const imageDimensions: (ImageDimensions & { name: string })[] = [
  { name: ImagePresets.Screen, width: 1920, height: 1080 },
  { name: ImagePresets.InstagramSquare, width: 1080, height: 1080 },
  { name: ImagePresets.InstagramPortrait, width: 1080, height: 1350 },
  { name: ImagePresets.InstagramLandscape, width: 1080, height: 566 },
  { name: ImagePresets.InstagramStory, width: 1080, height: 1920 },
  { name: ImagePresets.FacebookStandard, width: 1200, height: 628 },
  { name: ImagePresets.TwitterStandard, width: 600, height: 335 },
  { name: ImagePresets.LinkedInStandard, width: 1200, height: 627 },
  { name: ImagePresets.TumblrStandard, width: 500, height: 750 },
];
