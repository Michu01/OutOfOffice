function formatEnum(enumValue: string) {
  if (enumValue.length < 2) {
    return enumValue;
  }

  let s = enumValue[0];

  for (let i of [...Array(enumValue.length - 2).keys()].map(e => e + 1)) {
    const isUpperCase = enumValue[i].toUpperCase() == enumValue[i];
    const isNextUpperCase = enumValue[i + 1].toUpperCase() == enumValue[i + 1];
    if (isUpperCase && !isNextUpperCase) {
      s += " ";
    }
    s += enumValue[i];
  }

  return s + enumValue[enumValue.length - 1];
}

export default formatEnum;