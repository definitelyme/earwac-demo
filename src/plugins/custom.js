import mapsUtils from "./map";

export const Custom = {
  install: (Vue, options) => {
    if (options) console.log(options);

    // Add map instance method
    Vue.prototype.$maps = mapsUtils;

    Vue.prototype.$debounce = _debounce;
  },
};

const _debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
