import Select, { components } from "react-select";
import { PLATFORMS } from "../../../utils/constants";

const options = Object.values(PLATFORMS).map((platform) => ({
  value: platform.id,
  label: platform.label,
  icon: platform.icon,
}));

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="14"
        height="9"
        viewBox="0 0 14 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform ${menuIsOpen ? "rotate-180" : "rotate-0"}`}
      >
        <path
          d="M0.707031 0.707092L6.70703 6.70709L12.707 0.707092"
          stroke="#633CFF"
          strokeWidth="2"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const Option = (props) => {
  const { data, isSelected } = props;
  return (
    <components.Option {...props}>
      <span className="select-option flex items-center gap-x-[.75rem]">
        <img
          src={data.icon}
          alt=""
          className={
            isSelected
              ? "filter-[brightness(0)_saturate(100%)_invert(41%)_sepia(94%)_saturate(6740%)_hue-rotate(248deg)_brightness(100%)_contrast(101%)]!"
              : ""
          }
        />
        {data.label}
      </span>
    </components.Option>
  );
};

const SingleValue = (props) => {
  const { data } = props;

  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-x-[.75rem]">
        <img src={data.icon} />
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const Dropdown = ({ dropdownField, ...props }) => {
  return (
    <div className="dropdown-wrapper flex flex-col gap-y-8">
      <label htmlFor="platform" className="text-12 text-grey-900">
        Platform
      </label>
      <Select
        {...props}
        unstyled
        options={options}
        value={
          options.find((option) => option.value === dropdownField.value) ?? null
        }
        onChange={(selected) => dropdownField.onChange(selected?.value ?? "")}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
          Option,
          SingleValue,
        }}
        placeholder="Select a platform"
        classNames={{
          // Select
          control: ({ isFocused }) =>
            [
              "!cursor-pointer bg-white p-16 border border-grey-200 rounded-8 ",
              isFocused ? "border-purple-600 shadow-input/25" : "",
            ].join(" "),

          // Selected value
          singleValue: () => "text-grey-900",

          input: () => "text-grey-900",

          placeholder: () => "text-grey-900/50",

          // Menu
          menu: () =>
            "bg-white py-16 border border-grey-200 rounded-8 mt-8 shadow-menu/10",

          // Individual option
          option: ({ isFocused, isSelected }) =>
            [
              "!cursor-pointer rounded-8 p-16",
              "transition-colors",
              isSelected ? "text-purple-600" : "text-grey-900",
              isFocused && !isSelected ? "bg-gray-200" : "",
              "hover:bg-grey-200",
            ]
              .filter(Boolean)
              .join(" "),
        }}
      />
    </div>
  );
};

export default Dropdown;
