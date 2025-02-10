// GlobalStyles.js

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
    --background-color: ${({ theme }) => theme.colors.background};
    --text-color: ${({ theme }) => theme.colors.text};
    --text-active: ${({ theme }) => theme.colors.activeText};
    --text-inactive: ${({ theme }) => theme.colors.inactiveText};
    --button-border: ${({ theme }) => theme.button.borderColor};
    --background-color-fade: ${({ theme }) => theme.colors.backgroundFade};
    --background-dashboard: ${({ theme }) => theme.colors.dashboardBackground};
    --dashboard-item: ${({ theme }) => theme.colors.dashboardItem};
    --backfround-color-foreground: ${({ theme }) =>
      theme.colors.backgroundForeground};
    --border-box : ${({ theme }) => theme.colors.border}
  }

  body {
    height: 100% !important;
    background-color: var(--background-color);
    color: var(--text-color);
    border-color: var(--border-color);
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For IE and Edge */
    overflow-y: scroll; /* Optional: Still allows scrolling without the scrollbar */
  }


::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: var(--background-color);
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--background-color-foreground);
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
    display: none;
}
`;
