<template>
  <div>
    <el-button @click="chooseDir">选择文件夹路径</el-button>
    <p>
      {{ dirpath }}
    </p>
    <el-checkbox-group v-model="exts">
      <el-checkbox
        v-for="item in options"
        :key="item"
        :label="item"
      />
    </el-checkbox-group>
    <!-- TODO: 中文转英文 -->
    <el-button @click="submit">执行</el-button>
  </div>
</template>
<script>
import * as fs from '@/ctx/fs';
import * as path from '@/ctx/path';
import { minify } from './minify';

export default {
  data() {
    return {
      dirpath: '',
      options: [
        '.png',
        '.jpg',
      ],
      exts: [],
    };
  },
  methods: {
    async chooseDir() {
      const [dirpath] = await this.$electron.remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      });
      this.dirpath = dirpath;
    },
    async getImages(dirpath, images = []) {
      const paths = await fs.readdir(dirpath);
      await Promise.all(paths.map(async (p) => {
        const flag = await fs.isDirectory(path.join(dirpath, p));
        if (flag) {
          await this.getImages(path.join(dirpath, p), images);
          return;
        }
        const ext = path.extname(p);
        if (!this.exts.includes(ext)) return;
        const obj = {
          dirpath,
          filename: p,
        };
        images.push(obj);
      }));
      return images;
    },
    async submit() {
      const { dirpath } = this;
      // h偶去图片
      const images = await this.getImages(dirpath);
      const paths = images.map(item => path.join(item.dirpath, item.filename));
      try {
        await Promise.all(images.map(async (item) => {
          const filepath = path.join(item.dirpath, item.filename);
          // 压缩图片
          const [file] = await minify([filepath]);
          // 写入图片
          await fs.writeFile(filepath, file.data, 'binary');
        }));
        this.$message.success('执行完成');
      } catch (error) {
        console.log(error);
        this.$message.error('执行失败');
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
