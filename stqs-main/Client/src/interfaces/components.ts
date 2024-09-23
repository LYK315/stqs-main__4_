export interface btnNavigateProps {
  route: string;
  label?: string;
}

export interface dropdownProps {
  optionList: { symbol: string; type: string }[];
  selected: string | null;
  setSelected: (value: string) => void;
}