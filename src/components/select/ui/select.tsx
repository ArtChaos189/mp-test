import type { FC } from "react";

import "./select.scss";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  options: Option[];
  value: string | number | undefined;
  onChange: (value: number | undefined) => void;
  id: string;
  label: string;
  placeholder: string;
};

export const Select: FC<SelectProps> = ({ options, value, onChange, id, placeholder, label }) => {
  return (
    <div className="select-container">
      <label className="select-label" htmlFor={id}>
        {label}
      </label>
      <select
        className="select"
        id={id}
        onChange={(event) => onChange(event.target.value ? Number(event.target.value) : undefined)}
        value={value}
      >
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
