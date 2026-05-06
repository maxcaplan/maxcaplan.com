import clsx from "clsx";
import type { ComponentChild, JSX } from "preact";
import type { ButtonGroupProps } from "@/components/input/ButtonGroup";
import ButtonGroup from "@/components/input/ButtonGroup";
import SocialLinkButton from "@/components/navigation/SocialLinkButton";
import { SOCIAL_MEDIAS } from "@/constants";
import type { SocialMedia } from "@/types";

export interface SocialLinksProps extends Omit<ButtonGroupProps, "children"> {
  "social-media"?: SocialMedia[];
  children?: (
    item: SocialMedia,
    index: number,
    array: SocialMedia[],
  ) => ComponentChild;
}

export interface SocialLinksComponent {
  (props: SocialLinksProps): JSX.Element;
}

/** s of social links */
const SocialLinks: SocialLinksComponent = (props) => {
  const {
    class: class_attribute,
    className,
    children,
    "social-media": social_media,
    ...button_group_props
  } = props;

  return (
    <ButtonGroup
      {...button_group_props}
      class={clsx("social-links", class_attribute, className)}
    >
      {(social_media ?? (Object.keys(SOCIAL_MEDIAS) as SocialMedia[])).map(
        (item, index, array) => (
          <li class="social-links__item">
            {children !== undefined ? (
              children(item, index, array)
            ) : (
              <SocialLinkButton social-media={item} />
            )}
          </li>
        ),
      )}
    </ButtonGroup>
  );
};

export default SocialLinks;
