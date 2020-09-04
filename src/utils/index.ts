/**
 * Genera un id random
 */
export const generateId = (): string =>
  `${Math.round(4)}${Date.now()}${Math.round(5 * 2) * 49 + 1}`;

export const getDateTimeNowStr = (): string => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
