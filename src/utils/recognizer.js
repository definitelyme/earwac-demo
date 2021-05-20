import Vue from "vue";

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
const files = require.context("../", true, /\.vue$/i);
files.keys().map((key) => {
  // Get PascalCase name of component
  const componentName = key
    .split("/")
    .pop()
    .split(".")[0];

  // Get component config
  const componentConfig = files(key);

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig?.default || componentConfig
  );
});
