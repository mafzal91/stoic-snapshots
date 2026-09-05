import { BorderStyle } from "@/app/common";
import { CornersBorder } from "@/components/borders/Corners";
import { BracketsBorder } from "@/components/borders/Brackets";
import { DiamondsBorder } from "@/components/borders/Diamonds";
import { SparklesBorder } from "@/components/borders/Sparkles";
import { ArtDecoBorder } from "@/components/borders/ArtDeco";
import { NYCSubwayBorder } from "@/components/borders/NYCSubway";
import { GreekKeyBorder } from "@/components/borders/GreekKey";
import { BookplateBorder } from "@/components/borders/Bookplate";
import { ArchitecturalBorder } from "@/components/borders/Architectural";
import { PostageStampBorder } from "@/components/borders/PostageStamp";
import { RomanMosaicBorder } from "@/components/borders/RomanMosaic";
import { LetterpressBorder } from "@/components/borders/Letterpress";
import { NoBorder } from "@/components/borders/None";

export function Border({
  borderStyle,
  children,
}: {
  borderStyle: BorderStyle;
  children: React.ReactNode;
}) {
  switch (borderStyle) {
    case BorderStyle.Corners:
      return <CornersBorder>{children}</CornersBorder>;
    case BorderStyle.Brackets:
      return <BracketsBorder>{children}</BracketsBorder>;
    case BorderStyle.Diamonds:
      return <DiamondsBorder>{children}</DiamondsBorder>;
    case BorderStyle.Sparkles:
      return <SparklesBorder>{children}</SparklesBorder>;
    case BorderStyle.ArtDeco:
      return <ArtDecoBorder>{children}</ArtDecoBorder>;
    case BorderStyle.NYCSubway:
      return <NYCSubwayBorder>{children}</NYCSubwayBorder>;
    case BorderStyle.NYCSubwayThin:
      return <NYCSubwayBorder thin>{children}</NYCSubwayBorder>;
    case BorderStyle.NYCSubwayThreeRows:
      return <NYCSubwayBorder rows={3}>{children}</NYCSubwayBorder>;
    case BorderStyle.GreekKey:
      return <GreekKeyBorder>{children}</GreekKeyBorder>;
    case BorderStyle.Bookplate:
      return <BookplateBorder>{children}</BookplateBorder>;
    case BorderStyle.Architectural:
      return <ArchitecturalBorder>{children}</ArchitecturalBorder>;
    case BorderStyle.PostageStamp:
      return <PostageStampBorder>{children}</PostageStampBorder>;
    case BorderStyle.RomanMosaic:
      return <RomanMosaicBorder>{children}</RomanMosaicBorder>;
    case BorderStyle.Letterpress:
      return <LetterpressBorder>{children}</LetterpressBorder>;
    case BorderStyle.None:
    default:
      return <NoBorder>{children}</NoBorder>;
  }
}
