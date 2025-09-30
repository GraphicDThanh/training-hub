var helper = (function() {
  return {
    getLocalStorage: function() {
      if(typeof Storage !== 'undefined') {
        return localStorage;
      } else {
        throw new Error('Sorry! No Web Storage Support!');
      }
    }
  }
})();
