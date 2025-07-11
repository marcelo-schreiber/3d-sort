import en from "../../languages/en.json";
import pt from "../../languages/pt-BR.json";

export const useLanguage = () => {
  const language = navigator.language || "en";
  return language === "pt-BR" ? pt : en;
};
