import "./styles.scss";

import clsx from "clsx";
import LettermarkSvg from "./LettermarkSvg";
import LogoSvg from "./LogoSvg";
import type { LogoSvgProps } from "./types";

interface LogoProps extends LogoSvgProps {
  variant?: "logo" | "lettermark";
}

/** Brand logo svg */
export default function Logo(props: LogoProps) {
  const { class: class_attribute, className, variant, ...svg_props } = props;

  const is_lettermark = variant === "lettermark";

  const component_class = clsx(
    "logo",
    is_lettermark && "logo--lettermark",
    class_attribute,
    className,
  );

  if (is_lettermark) {
    return <LettermarkSvg {...svg_props} class={component_class} />;
  } else {
    return <LogoSvg {...svg_props} class={component_class} />;
  }
}
