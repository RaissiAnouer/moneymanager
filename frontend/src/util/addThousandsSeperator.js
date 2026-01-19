
export const addThousandsSeparator = (number) => {
    if (number === null || number === undefined) return '';

    const num = Number(number);

    return num.toLocaleString();
};
