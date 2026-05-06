import clsx from "clsx";
import type { ButtonProps } from "@/components/input/Button";
import Button from "@/components/input/Button";
import { SOCIAL_MEDIAS } from "@/constants";
import type { SocialMedia } from "@/types";

export interface SocialLinkProps extends Omit<
  ButtonProps,
  "children" | "icon" | "href"
> {
  "social-media": SocialMedia;
}

export default function SocialLink(props: SocialLinkProps) {
  const {
    class: class_attribute,
    className,
    "social-media": social_media,
    variant,
    target,
    ...button_props
  } = props;

  return (
    <Button
      {...button_props}
      class={clsx("social-link", class_attribute, className)}
      href={SOCIAL_MEDIAS[social_media]}
      target={target ?? "_blank"}
      icon={social_media}
      variant={variant ?? "icon"}
    >
      <span class="visually-hidden">Max Caplan on </span>
      <span
        class={
          (props.variant ?? "icon") === "icon" ? "visually-hidden" : undefined
        }
      >
        {social_media.charAt(0).toUpperCase() + social_media.slice(1)}
      </span>
    </Button>
  );
}
