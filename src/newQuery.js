((window, undefined) => {
  let newQuery = () => {
    console.log('hello newQuery');
  }

  window.$ = newQuery;
})(window, undefined);