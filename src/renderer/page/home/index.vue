<template>
  <div>
    home
    <div @click="handleClick">btn</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleClick() {
      this.$ctx.url.toLink('https://github.com');
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
