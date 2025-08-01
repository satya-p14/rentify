type CustomDropdownProps = {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
};