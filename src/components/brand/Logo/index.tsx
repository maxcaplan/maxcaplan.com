import "./styles.scss";

import clsx from "clsx";
import LettermarkSvg from "./LettermarkSvg";
import LogoSvg from "./LogoSvg";
import type { LogoSvgProps } from "./types";

interface LogoProps extends LogoSvgProps {
  variant?: "logo" | "lettermark";
}

export default function Logo(props?: LogoProps) {
  const { variant, className, ...svgProps } = props || {};

  const is_lettermark = variant === "lettermark";

  const classes = clsx("logo", is_lettermark && "logo--lettermark", className);

  if (is_lettermark) {
    return <LettermarkSvg className={classes} {...svgProps} />;
  } else {
    return <LogoSvg className={classes} {...svgProps} />;
  }
}
