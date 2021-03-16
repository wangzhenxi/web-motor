<template>
  <Layout>
    <div slot="top-bar" class="entries">
      <router-link
        v-for="item in list"
        :key="item.name"
        :to="item.to"
        :class="{ todo: item.to.name === 'todo' }"
      >
        {{ item.name }}
      </router-link>
    </div>
    <router-view />
  </Layout>
</template>
<script>
import Layout from '../layout/index.vue';

export default {
  components: {
    Layout,
  },
  data() {
    return {
      list: [
        {
          name: '主页',
          to: { name: 'home' },
        },
        {
          name: '图片压缩',
          to: { name: 'image-minify' },
        },
        {
          name: '项目启动',
          to: { name: 'todo' },
        },
        {
          name: 'dns proxy',
          to: { name: 'todo' },
        },
        {
          name: '代码生成',
          to: { name: 'todo' },
        },
        {
          name: '翻译文案代码转换器',
          to: { name: 'todo' },
        },
      ],
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
.entries {
  display: flex;
  > a {
    display: inline-block;
    & + a {
      margin-left: 8px;
    }
  }
}
.todo {
  &::before {
    content: 'TODO: ';
  }
}
</style>
