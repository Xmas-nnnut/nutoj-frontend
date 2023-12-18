<template>
  <div id="postsView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="justify-content: flex-start; align-content: center; margin: 10px"
    >
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.searchText" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :pagination-props="{
        defaultPageSize: 3,
        total: total,
      }"
    >
      <a-list-item
        v-for="(post, index) in dataList"
        :key="post.id"
        class="list-demo-item"
        action-layout="vertical"
      >
        <template #actions>
          <a-tooltip content="喜欢数">
            <span><icon-heart />{{ post.thumbNum }}</span>
          </a-tooltip>
          <a-tooltip content="收藏数">
            <span><icon-star />{{ post.favourNum }}</span>
          </a-tooltip>
          <a-divider direction="vertical" />

          <a-tooltip content="查看详情">
            <icon-list @click="toPostPage(post)" />
          </a-tooltip>
          <a-divider direction="vertical" />

          <a-space wrap>
            <a-tag
              v-for="(tag, index) of post.tags"
              :key="index"
              color="arcoblue"
              >{{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #extra>
          <div className="image-area">
            <img alt="arco-design" :src="imageSrc[index % imageSrc.length]" />
          </div>
        </template>
        <a-list-item-meta>
          <template #title>
            <span>{{ post.title }}</span>
            <a-divider direction="vertical" />
            <span>{{ post.user.userName }}</span>
          </template>
          <template #avatar>
            <a-avatar shape="square">
              <img alt="avatar" :src="avatarSrc[index % avatarSrc.length]" />
            </a-avatar>
          </template>
          <template #description>
            <a-typography-paragraph
              :ellipsis="{
                rows: 3,
                expandable: true,
              }"
              style="width: 90%"
            >
              {{ post.content }}
            </a-typography-paragraph>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, reactive } from "vue";
import {
  PostVO,
  PostControllerService,
  PostQueryRequest,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const avatarSrc = [
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp",
];
const imageSrc = [
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp",
];
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<PostQueryRequest>({
  searchText: "",
  current: 1,
});

const loadData = async () => {
  // todo
  const res = await PostControllerService.listPostVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    console.log(dataList.value);
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const router = useRouter();

/**
 * 跳转到队伍页面
 * @param team
 */
const toPostPage = (post: PostVO) => {
  router.push({
    path: `/view/post/${post.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#postsView {
}

.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}

.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}
</style>
