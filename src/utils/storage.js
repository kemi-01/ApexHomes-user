// simple localStorage wrapper for properties
const KEY = "apexhomes_properties";

export function fetchProperties() {
  const raw = localStorage.getItem(KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProperties(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addProperty(prop) {
  const list = fetchProperties();
  list.unshift(prop);
  saveProperties(list);
}

export function getPropertyById(id) {
  return fetchProperties().find(p => p.id === id);
}

export function removePropertyById(id) {
  const list = fetchProperties().filter(p => p.id !== id);
  saveProperties(list);
}
