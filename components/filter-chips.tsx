"use client";

export type FilterOption = {
  value: string;
  label: string;
};

type FilterChipsProps = {
  options: FilterOption[];
  active: string;
  onChange: (value: string) => void;
  ariaLabel: string;
};

export function FilterChips({ options, active, onChange, ariaLabel }: FilterChipsProps): JSX.Element {
  return (
    <div className="filter-row" role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`filter-chip${active === option.value ? " active" : ""}`}
          aria-pressed={active === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
