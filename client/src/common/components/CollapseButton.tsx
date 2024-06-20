import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function CollapseButton({ target }: { target: string }) {
  return (
    <span role="button" data-bs-toggle="collapse" data-bs-target={target} aria-expanded="false">
      <FaChevronDown className="expand-down" />
      <FaChevronUp className="expand-up" />
    </span>
  )
}

export default CollapseButton;