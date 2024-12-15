import { useEffect, useRef, useState } from "react";
import {
  DropdownButton,
  DropdownContainer,
  DropdownOption,
  PickerContainer,
  SectionCenter,
} from "./styles";

interface Props {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

const YearMonthPicker = ({ onYearChange, onMonthChange }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const [isYearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setMonthDropdownOpen] = useState(false);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    onYearChange(year);
    setYearDropdownOpen(false); // Close dropdown
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    onMonthChange(months.indexOf(month) + 1);
    setMonthDropdownOpen(false); // Close dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setYearDropdownOpen(false);
        setMonthDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <PickerContainer ref={dropdownRef}>
      <SectionCenter>
        <DropdownButton
          onClick={() => {
            setYearDropdownOpen(!isYearDropdownOpen);
            setMonthDropdownOpen(false); // Close month dropdown if open
          }}
        >
          {selectedYear}
        </DropdownButton>
        {isYearDropdownOpen && (
          <DropdownContainer>
            {years.map((year) => (
              <DropdownOption key={year} onClick={() => handleYearChange(year)}>
                {year}
              </DropdownOption>
            ))}
          </DropdownContainer>
        )}
      </SectionCenter>
      <SectionCenter>
        <DropdownButton
          onClick={() => {
            setMonthDropdownOpen(!isMonthDropdownOpen);
            setYearDropdownOpen(false); // Close year dropdown if open
          }}
        >
          {selectedMonth}
        </DropdownButton>
        {isMonthDropdownOpen && (
          <DropdownContainer>
            {months.map((month) => (
              <DropdownOption
                key={month}
                onClick={() => handleMonthChange(month)}
              >
                {month}
              </DropdownOption>
            ))}
          </DropdownContainer>
        )}
      </SectionCenter>
    </PickerContainer>
  );
};

export default YearMonthPicker;
