<template>
  <button :class="{ normal: styleOf }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    styleOf: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all .2s ease-in-out;

  &:hover {
    background-color: #f5fbfb;
    transform: scale(1.2);
  }
}

.normal {
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #c0c3c3;
  padding: 0.25rem 1rem;
}
</style>
