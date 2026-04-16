import type { SVGAttributes } from "preact";

export type LogoSvgProps = Omit<
  SVGAttributes<SVGSVGElement>,
  "children" | "class"
>;
