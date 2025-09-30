export const getLocalStorage = () => {
  let data = localStorage.getItem('App'),
      result = [];

  try {
    result = JSON.parse(data);
  } catch (e) {
    console.log('testing ERROR', e);
  }

  return result;
}