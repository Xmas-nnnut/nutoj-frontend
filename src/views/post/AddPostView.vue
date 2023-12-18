<template>
  <div id="addPostView">
    <h2>创建帖子</h2>
    <a-divider size="0" />
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" :content-flex="false" label="题目内容">
        <MdEditor
          @click="
            contentZIndex = 2;
            answerZIndex = 1;
          "
          mode="split"
          :style="`z-index: ${contentZIndex}`"
          :value="form.content"
          :handle-change="onContentChange"
        />
      </a-form-item>
      <a-form-item label="帖子图片" disabled tooltip="不可用" help="不可用">
        <a-upload
          list-type="picture"
          action="/"
          :default-file-list="fileList"
          :limit="1"
        />
      </a-form-item>
      <a-divider size="0" />
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { PostControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const contentZIndex = ref(1);
const answerZIndex = ref(1);

const router = useRouter();
const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  title: "",
  tags: [],
  content: "",
});

const fileList = [
  {
    uid: "-2",
    name: "20200717-103937.png",
    url: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
  },
  {
    uid: "-1",
    name: "hahhahahahaha.png",
    url: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp",
  },
];

/**
 * 根据帖子 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await PostControllerService.getPostVoByIdUsingGet(id as any);
  if (res.code === 0) {
    form.value = res.data as any;
    // json 转 js 对象
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      // 将代理对象转换为数组
      form.value.tags = Array.from(form.value.tags);
    }
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await PostControllerService.updatePostUsingPost(form.value);
    if (res.code === 0) {
      message.success("更新成功");
      await router.push({
        path: `/manage/post`,
        replace: true,
      });
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await PostControllerService.addPostUsingPost(form.value);
    if (res.code === 0) {
      message.success("创建成功");
      await router.push({
        path: `/posts`,
        replace: true,
      });
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};

const onContentChange = (value: string) => {
  form.value.content = value;
};
</script>

<style scoped>
#addPostView {
}

:deep(.bytemd-fullscreen.bytemd) {
  z-index: 100;
}
</style>
