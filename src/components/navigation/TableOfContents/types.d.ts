export type WithSubheadings<T extends Object> = T & {
  subheadings?: WithSubheadings<T>[];
};

export type WithHTMLElement<T> = T & { element: HTMLElement | null };

export interface TableOfContentsHeading {
  /** Url slug for the heading */
  slug?: string;
  /** Text content of the heading */
  text: string;
  /** Level of the heading */
  depth?: number;
}
