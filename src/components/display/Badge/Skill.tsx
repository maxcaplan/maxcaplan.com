import type { CollectionEntry } from "astro:content";
import Badge, { type BadgeColour } from ".";

interface SkillBadgeProps {
  skill: CollectionEntry<"skills">;
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
  return (
    <Badge
      icon={props.skill.data.icon}
      variant={props.skill.data.icon && "icon-left"}
      colour={
        props.skill.data.colour && badge_colour_map[props.skill.data.colour]
      }
    >
      {props.skill.id}
    </Badge>
  );
}
