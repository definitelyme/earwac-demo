<template>
  <v-select
    class="text-body-2 font-weight-normal rounded-lg"
    :autocomplete="autocomplete"
    :color="color"
    :background-color="backgroundColor"
    dense
    flat
    :hide-details="!showMessage ? 'auto' : false"
    :hide-selected="hideSelected"
    :items="items"
    :label="label"
    overflow
    persistent-hint
    :placeholder="placeholder"
    :required="required"
    :success-messages="successMessages"
    :error-messages="errorMessages"
    :error-count="
      successMessages
        ? successMessages.length
        : errorMessages
        ? errorMessages.length
        : 0
    "
    solo
    tabindex="0"
    validate-on-blur
  ></v-select>
</template>

<script>
export default {
  props: {
    items: Array,
    label: String,
    successMessages: [String, Array],
    errorMessages: [String, Array],
    hideSelected: {
      type: Boolean,
      default: () => false,
    },
    showMessage: {
      type: Boolean,
      default: () => false,
    },
    color: {
      type: String,
      default: () => "grey darken-3",
    },
    backgroundColor: {
      type: String,
      default: () => "grey lighten-2",
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    autocomplete: {
      type: Boolean,
      default: () => false,
    },
    placeholder: {
      type: String,
      required: false,
      default: () => "-- Select --",
    },
  },
};
</script>