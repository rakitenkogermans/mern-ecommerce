const saveToLocalstorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalstorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

const removeFromLocalstorage = (key: string) => {
    localStorage.removeItem(key);
};

export { saveToLocalstorage, getFromLocalstorage, removeFromLocalstorage };
