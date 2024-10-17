import { useState } from "react";
import {
  PickerContainer,
  SelectContainer,
  StyledSelect,
  StyledSelectYear,
} from "./styles";

interface Props {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

const YearMonthPicker = ({ onYearChange, onMonthChange }: Props) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );

  const handleYearChange = (e: any) => {
    const year = Number(e.target.value);
    setSelectedYear(year);
    onYearChange(year);
  };

  const handleMonthChange = (e: any) => {
    const month = e.target.value;
    setSelectedMonth(month);
    onMonthChange(months.indexOf(month) + 1);
  };

  return (
    <PickerContainer>
      <SelectContainer>
        <StyledSelectYear value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </StyledSelectYear>
        <StyledSelect value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </StyledSelect>
      </SelectContainer>
    </PickerContainer>
  );
};

export default YearMonthPicker;
