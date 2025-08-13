
export const savePreference = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const loadPreference = (key, fallback=null) => {
  try{
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  }catch(_){ return fallback; }
};
