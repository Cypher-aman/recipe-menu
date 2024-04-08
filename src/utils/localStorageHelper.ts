const setItem = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  const initialData = JSON.parse(localStorage.getItem('recipes') || '{}');

  const data = JSON.stringify({ ...initialData, [key]: value });
  localStorage.setItem('recipes', data);
};

const hasItem = (key: string) => {
  if (typeof window === 'undefined') return;
  const initialData = JSON.parse(localStorage.getItem('recipes') || '{}');
  return key in initialData;
};

const getItems = () => {
  if (typeof window === 'undefined') return;
  const initialData = JSON.parse(localStorage.getItem('recipes') || '');
  return initialData || null;
};

const removeItem = (key: string) => {
  if (typeof window === 'undefined') return;
  const initialData = JSON.parse(localStorage.getItem('recipes') || '');
  delete initialData[key];
  localStorage.setItem('recipes', JSON.stringify(initialData));
};

export { setItem, hasItem, getItems, removeItem };
