export const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
export const loadData = (key) => JSON.parse(localStorage.getItem(key)) || [];
