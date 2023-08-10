<template>
  <div id="example">
    <MdEditor :value="value" :handle-change="onChange" />
    <CodeEditor :value="codevalue" :handle-change="onCodeChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue"; // @ is an alias to /src

const value = ref();
const codevalue = ref();

const onChange = (v: string) => {
  value.value = v;
};

const onCodeChange = (v: string) => {
  codevalue.value = v;
};
</script>
