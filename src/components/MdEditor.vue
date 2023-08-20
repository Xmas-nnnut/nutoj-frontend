<template>
  <div id="editor">
    <Editor
      :value="value"
      :locale="locale"
      :mode="mode"
      :plugins="plugins"
      @change="handleChange"
    />
  </div>
</template>
<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";
import locale from "../locales/zh_Hans.json";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];
</script>
<style scoped>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy right:last-child {
  display: none;
}
</style>
