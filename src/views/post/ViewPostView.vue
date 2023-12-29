<template>
  <div id="viewPostView">
    <div class="post">
      <a-card hoverable :style="{ width: '100%', padding: '1%' }">
        <template #cover>
          <div
            :style="{
              height: '50vh',
              overflow: 'hidden',
            }"
          >
            <img
              :style="{ width: '100%', transform: 'translateY(-20px)' }"
              alt="dessert"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp"
            />
          </div>
        </template>
        <a-card-meta>
          <template #title>
            <a-typography-title :heading="4">
              {{ post?.title }}
            </a-typography-title>
            <a-divider />
          </template>
          <template #description>
            <MdViewer :value="post?.content || ''" />
            <a-divider />
            <a-descriptions
              style="margin-top: 20px"
              size="medium"
              title="帖子信息"
              :column="1"
            >
              <a-descriptions-item label="作者">
                {{ post?.user?.userName }}
              </a-descriptions-item>
              <a-descriptions-item label="标签">
                <a-space>
                  <a-tag
                    v-for="(tag, index) of post?.tags"
                    :key="index"
                    color="arcoblue"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </a-descriptions-item>
              <a-descriptions-item label="创建时间">
                {{ moment(post?.createTime).format("YYYY-MM-DD") }}
              </a-descriptions-item>
            </a-descriptions>
          </template>
        </a-card-meta>
      </a-card>
    </div>

    <a-affix :offsetBottom="160" style="margin-left: 90%">
      <a-button type="primary" shape="circle" size="large">
        <icon-heart />
      </a-button>
    </a-affix>
    <a-affix :offsetBottom="200" style="margin-left: 90%">
      <a-button type="primary" shape="circle" size="large">
        <icon-star />
      </a-button>
    </a-affix>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import { PostControllerService, PostVO } from "@/generated";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import moment from "moment";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const post = ref<PostVO>();

const loadData = async () => {
  const res = await PostControllerService.getPostVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    post.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>
<style scoped>
#viewPostView {
}

.post {
  max-width: 820px;
  margin: auto;
}
</style>
