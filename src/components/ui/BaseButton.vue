<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
</script>

<style lang="scss" scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e8eaea;
  }
}
</style>
