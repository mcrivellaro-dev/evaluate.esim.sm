import { createContext, useState, type ReactElement, type ReactNode } from "react";

type LanguageContextType = {
  selectedLanguage: string | undefined;
  selectedCurrency: string | undefined;
  setSelectedLanguage: any;
  setSelectedCurrency: any; // TODO
  languages: any[];
  currencies: any[];
  setLanguages: any;
  setCurrencies: any;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = (props: { children: ReactNode }): ReactElement => {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [currencies, setCurrencies] = useState<any>();
  const [languages, setLanguages] = useState<any>();

  return (
    <LanguageContext.Provider
      {...props}
      value={{
        selectedLanguage,
        selectedCurrency,
        setSelectedLanguage,
        setSelectedCurrency,
        languages,
        currencies,
        setLanguages,
        setCurrencies
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};
