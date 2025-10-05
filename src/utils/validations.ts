import { format, isValid, getDaysInMonth } from "date-fns";
/**
 * @description Aplica a máscara de data no padrão brasileiro (dd/mm/aaaa) com validação em tempo real.
 * @param value Valor a ser formatado.
 * @returns Valor formatado e corrigido no padrão dd/mm/aaaa.
 */
export const maskAndValidateDate = (value: string): string => {
  if (!value) return "";
  let cleaned = value.replace(/\D/g, "");

  if (cleaned.length >= 2) {
    let day = parseInt(cleaned.slice(0, 2), 10);
    if (isNaN(day) || day < 1) day = 1;
    if (day > 31) day = 31;
    cleaned = String(day).padStart(2, "0") + cleaned.slice(2);
  }

  if (cleaned.length >= 4) {
    let month = parseInt(cleaned.slice(2, 4), 10);
    if (isNaN(month) || month < 1) month = 1;
    if (month > 12) month = 12;
    cleaned = cleaned.slice(0, 2) + String(month).padStart(2, "0") + cleaned.slice(4);
  }

  return cleaned
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");
};

/**
 * @description Valida e corrige a data, considerando dias por mês e anos bissextos.
 * @param input Valor no formato dd/MM/yyyy.
 * @returns Objeto com valor mascarado corrigido, valor formatado (yyyy-MM-dd) e data para navegação.
 */
export const validateAndCorrectDate = (input: string): { masked: string; formatted: string; navDate: Date | undefined } => {
  if (!input || input.trim() === "") return { masked: "", formatted: "", navDate: undefined };

  const parts = input.split("/");
  if (parts.length !== 3) return { masked: input, formatted: "", navDate: undefined };

  let [dayStr, monthStr, yearStr] = parts;
  let day = parseInt(dayStr, 10);
  let month = parseInt(monthStr, 10);
  let year = parseInt(yearStr, 10);

  if (isNaN(year) || year < 2000 || year > 2050) {
    return { masked: input, formatted: "", navDate: undefined };
  }

  if (isNaN(month) || month < 1) month = 1;
  if (month > 12) month = 12;

  const maxDays = getDaysInMonth(new Date(year, month - 1));
  if (isNaN(day) || day < 1) day = 1;
  if (day > maxDays) day = maxDays;

  const correctedDate = new Date(year, month - 1, day);
  if (!isValid(correctedDate)) return { masked: input, formatted: "", navDate: undefined };

  const masked = `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  const formatted = format(correctedDate, "yyyy-MM-dd");
  return { masked, formatted, navDate: correctedDate };
};