export const preserveElliptics = (text: string) => {
  return text.replace(/((?:\.\s+){2,}\.)(\s?)/g, (_, dots, trailing) => {
    const glued = dots.replace(/\s+/g, "\u00A0");
    return glued + (trailing || " ");
  });
};

export const stripFormatting = (str: string) => {
  return str[0] === "*" || str[0] === "?" ? str.slice(1) : str;
};

export const toRoman = (num: number): string => {
  if (num <= 0 || num >= 53) return num.toString();

  const romanMap: [number, string][] = [
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  return romanMap.reduce((acc, [value, numeral]) => {
    while (num >= value) {
      acc += numeral;
      num -= value;
    }
    return acc;
  }, "");
};
