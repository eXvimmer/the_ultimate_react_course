import { SelectHTMLAttributes } from "react";
import styled from "styled-components";

interface StyledSelectProps {
  type: string;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  type: string;
}

function Select({ options, ...props }: SelectProps) {
  return (
    <StyledSelect {...props}>
      {options.map(({ value: val, label }) => (
        <option key={val} value={val}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
