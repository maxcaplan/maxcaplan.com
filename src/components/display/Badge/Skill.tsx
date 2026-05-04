import type { CollectionEntry } from "astro:content";
import Badge, { type BadgeColour } from ".";

interface SkillBadgeProps {
  skill: CollectionEntry<"skills">;
  label?: boolean;
}

type SkillColour = Required<CollectionEntry<"skills">["data"]>["colour"];
type BadgeColourMap = { [K in SkillColour]: BadgeColour };

const badge_colour_map: BadgeColourMap = {
  red: "danger",
  yellow: "warning",
  green: "primary",
  blue: "secondary",
};

/** A small label for displaying a skill */
export default function SkillBadge(props: SkillBadgeProps) {
  const variant =
    props.label === false
      ? "icon"
      : props.skill.data.icon
        ? "icon-left"
        : undefined;

  return (
    <Badge
      icon={props.skill.data.icon}
      variant={variant}
      colour={
        props.skill.data.colour && badge_colour_map[props.skill.data.colour]
      }
    >
      {variant === "icon" && (
        <span class="visually-hidden">{props.skill.id}</span>
      )}

      {variant !== "icon" && <>{props.skill.id}</>}
    </Badge>
  );
}
