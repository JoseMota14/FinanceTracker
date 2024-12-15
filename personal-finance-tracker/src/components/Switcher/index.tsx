import { useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Knob, MoonIcon, SunIcon, ToggleButton, ToggleWrapper } from "./styles";

export default function Switcher() {
  const { theme, toggleTheme } = useTheme();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDragging) return;
    toggleTheme();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData("text", "");
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (!toggleRef.current || !e.clientX) return;

    const toggleRect = toggleRef.current.getBoundingClientRect();
    const toggleWidth = toggleRect.width;
    const relativeX = e.clientX - toggleRect.left;

    const threshold = 0;
    const shouldSwitch =
      relativeX > toggleWidth * (1 - threshold) ||
      relativeX < toggleWidth * threshold;

    // Only switch if we cross the threshold
    if (shouldSwitch && (theme === "dark") !== relativeX > toggleWidth / 2) {
      toggleTheme();
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
  return (
    <ToggleWrapper>
      <ToggleButton
        ref={toggleRef}
        onClick={handleClick}
        isDark={theme === "dark"}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        <SunIcon isDark={theme === "dark"}>☀️</SunIcon>
        <MoonIcon isDark={theme === "dark"}>🌙</MoonIcon>
        <Knob
          ref={knobRef}
          draggable="true"
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          isDark={theme === "dark"}
        />
      </ToggleButton>
    </ToggleWrapper>
  );
}
