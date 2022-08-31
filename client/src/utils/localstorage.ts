const saveToLocalstorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalstorage = (key: string) => localStorage.getItem(key);

export { saveToLocalstorage, getFromLocalstorage };
