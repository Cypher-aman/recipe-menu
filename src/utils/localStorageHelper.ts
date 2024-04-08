const setItem = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  const initialData = JSON.parse(localStorage.getItem('recipes_#123') || '{}');

  const data = JSON.stringify({ ...initialData, [key]: value });
  localStorage.setItem('recipes_#123', data);
};

const hasItem = (key: string) => {
  if (typeof window === 'undefined') return;
  const initialData = JSON.parse(localStorage.getItem('recipes_#123') || '{}');
  return key in initialData;
};

const getItems = () => {
  if (typeof window === 'undefined') return;
  const initialData = JSON.parse(localStorage.getItem('recipes_#123') || '{}');
  return initialData || null;
};

const removeItem = (key: string) => {
  if (typeof window === 'undefined') return;
  const initialData = JSON.parse(localStorage.getItem('recipes_#123') || '');
  delete initialData[key];
  localStorage.setItem('recipes_#123', JSON.stringify(initialData));
};

export { setItem, hasItem, getItems, removeItem };
