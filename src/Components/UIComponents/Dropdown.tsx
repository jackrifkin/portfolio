import { ReactNode, useState } from "react";

type DropdownProps<T> = {
  options: T[];
  onSelect: (selection: T) => void;
  renderT: (item: T) => ReactNode;
};

const Dropdown = <T,>({ options, onSelect, renderT }: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<T>(options[0]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: T) => {
    setSelectedValue(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle roboto" onClick={handleToggle}>
        Sort by
        <img alt="sort-icon" src="/TiVoAssets/sortIcon.svg" height={"16px"} />
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              className={`dropdown-option roboto ${
                option === selectedValue ? "selected" : ""
              }`}
              key={`${option}`}
              onClick={() => handleSelect(option)}
            >
              {renderT(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
