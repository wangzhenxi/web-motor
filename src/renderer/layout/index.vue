<template>
    <div class="wrapper">
        <div class="top-bar">
            <slot name="top-bar" />
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
    .top-bar {
        border-bottom: 1px solid #000;
    }
    .content {

    }
}
</style>
