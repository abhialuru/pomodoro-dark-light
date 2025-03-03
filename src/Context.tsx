import { createContext, ReactNode, useState } from "react";

interface themePropType {
  theme: string;
  toggleTheme: () => void;
}

const defaultValue: themePropType = {
  theme: "light",
  toggleTheme: () => {},
};

export const myContext = createContext(defaultValue);

function Context({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <myContext.Provider value={{ theme, toggleTheme }}>
      <div>{children}</div>
    </myContext.Provider>
  );
}

export default Context;
