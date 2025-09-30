export const setLocalStorage = (data) => {
  localStorage.setItem('App', JSON.stringify(data));
}