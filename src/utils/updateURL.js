// URL parameters update helper
export function updateURLParam(key, value, multiple = false) {
    if (typeof window === "undefined") return;
  
    const url = new URL(window.location.href);
    const params = url.searchParams;
  
    if (multiple && Array.isArray(value)) {
      // Remove existing key
      params.delete(key);
      value.forEach(val => params.append(key, val));
    } else if (value === null || value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  
    window.history.replaceState({}, "", `${url.pathname}?${params.toString()}`);
  }
  