export default ProgressAccordion;

declare function ProgressAccordion(props: ProgressAccordionProps): JSX.Element;
interface ProgressAccordionProps {
  [x: string]: any;
  /** A11y text for assistive technologies to descibe the semantic list. */
  a11yText?: string;

  activeIndex?: number;
  /** Optional status text to be displayed with the active list item. */
  activeStatus?: React.ReactNode;
  /** List items (must be of type <ProgressAccordion.Item>. */
  children?: React.ReactNode;
  /** When kind is "navigation", all the children are expanded and cannot be collapsed */
  kind?: "" | kinds.NAVIGATION;
}
