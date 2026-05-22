import { BorderStyle } from "@/app/common";
import { CornersBorder } from "@/components/borders/Corners";
import { BracketsBorder } from "@/components/borders/Brackets";
import { DiamondsBorder } from "@/components/borders/Diamonds";
import { SparklesBorder } from "@/components/borders/Sparkles";
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
    case BorderStyle.None:
    default:
      return <NoBorder>{children}</NoBorder>;
  }
}
