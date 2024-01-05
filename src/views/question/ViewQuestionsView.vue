<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-scrollbar type="track" style="height: 60vh; overflow: auto">
                <a-descriptions
                  title="判题条件"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig.timeLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{ question.judgeConfig.memoryLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    {{ question.judgeConfig.stackLimit ?? 0 }}
                  </a-descriptions-item>
                </a-descriptions>

                <MdViewer :value="question.content || ''" />
              </a-scrollbar>

              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="arcoblue"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="answer" title="答案">
            <a-card title="答案">
              <template #extra>
                <a-button type="text" disabled>
                  <template #icon>
                    <icon-email />
                  </template>
                  反馈
                </a-button>
              </template>
              <a-scrollbar type="track" style="height: 60vh; overflow: auto">
                <MdViewer :value="answer || ''" />
              </a-scrollbar>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="comment" title="评论">
            <a-card title="评论">
              <template #extra>
                <a-popover title="新增评论" trigger="click" position="br">
                  <a-button type="text">
                    <template #icon>
                      <icon-pen />
                    </template>
                    我也写一条
                  </a-button>
                  <template #content>
                    <a-comment
                      style="width: 80vh"
                      align="right"
                      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                    >
                      <template #actions>
                        <a-button type="primary" @click="doCommentSubmit">
                          提交
                        </a-button>
                      </template>
                      <template #content>
                        <a-textarea
                          v-model="commentForm.content"
                          placeholder="请填写评论内容"
                          :max-length="{ length: 200, errorOnly: true }"
                          allow-clear
                          show-word-limit
                          :auto-size="{
                            minRows: 5,
                            maxRows: 5,
                          }"
                        />
                      </template>
                    </a-comment>
                  </template>
                </a-popover>
              </template>
              <a-list
                :max-height="420"
                :bordered="false"
                @reach-bottom="fetchData"
              >
                <template #scroll-loading>
                  <div v-if="bottom">
                    <icon-face-frown-fill />
                    没有更多评论了捏
                  </div>
                  <a-spin v-else />
                </template>
                <a-list-item v-for="comment in comments" :key="comment.id">
                  <a-comment :author="comment.author">
                    <template #datetime>
                      {{
                        moment(comment.createTime).format("YYYY-MM-DD HH:mm:ss")
                      }}
                    </template>
                    <template #content>
                      <a-typography-paragraph
                        :ellipsis="{
                          rows: 2,
                          expandable: true,
                        }"
                      >
                        {{ comment.content }}
                      </a-typography-paragraph>
                    </template>
                    <template #actions>
                      <span
                        class="action"
                        key="heart"
                        @click="onLikeChange(comment.thumbed)"
                      >
                        <span v-if="comment.thumbed">
                          <IconHeartFill :style="{ color: '#f53f3f' }" />
                        </span>
                        <span v-else>
                          <IconHeart />
                        </span>
                        {{ comment.thumbNum + (comment.thumbed ? 1 : 0) }}
                      </span>
                      <span
                        class="action"
                        key="star"
                        @click="onStarChange(comment.favoured)"
                      >
                        <span v-if="comment.favoured">
                          <IconStarFill :style="{ color: '#ffb400' }" />
                        </span>
                        <span v-else>
                          <IconStar />
                        </span>
                        {{ comment.favourNum + (comment.favoured ? 1 : 0) }}
                      </span>
                    </template>
                    <template #avatar>
                      <a-avatar>
                        <img alt="avatar" src="../../assets/SilverWolf.png" />
                      </a-avatar>
                    </template>
                  </a-comment>
                </a-list-item>
              </a-list>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>c</a-option>
              <a-option disabled>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>

        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="changeCode"
        />

        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watchEffect,
  withDefaults,
  defineProps,
  reactive,
  defineAsyncComponent,
} from "vue";
import {
  Question,
  QuestionCommentControllerService,
  QuestionCommentVO,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../generated";
import moment from "moment";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";

// 异步加载组件
const CodeEditor = defineAsyncComponent({
  // 加载函数
  loader: () => import("@/components/CodeEditor.vue"),
  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 10000,
});

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();
let commentForm = ref({
  content: "",
});
const comments = ref<QuestionCommentVO[]>([]);
const currentList = ref(0);
const bottom = ref(false);
const dataList = ref<QuestionCommentVO[]>([]);
const pages = ref(1);
const firstLoad = ref(true);

const onLikeChange = (liked: boolean): boolean => {
  return !liked;
};
const onStarChange = (stared: boolean): boolean => {
  return !stared;
};

/**
 * 获取评论信息
 * @param current
 */
const loadCommentData = async (current: number) => {
  const resComment =
    await QuestionCommentControllerService.listIdQuestionCommentVoByPageUsingPost(
      {
        questionId: question.value?.id,
        pageSize: 4,
        current: current,
      }
    );
  if (resComment.code === 0) {
    message.success("加载评论成功，" + resComment.message);
    pages.value = resComment.data.pages;
    return resComment.data.records;
  } else {
    message.error("评论加载失败，" + resComment.message);
  }
};

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    message.success("加载题目成功，" + res.message);
    question.value = res.data;
    // 获取评论信息
    comments.value = await loadCommentData(1);
    currentList.value = 1;
    firstLoad.value = false;
  } else {
    message.error("题目加载失败，" + res.message);
  }
};

/**
 * 评论列表触底后加载新的评论
 */
const fetchData = async () => {
  // console.log("reach bottom!");
  currentList.value = currentList.value + 1;
  // 不能是第一次加载
  if (currentList.value <= pages.value && !firstLoad.value) {
    dataList.value = await loadCommentData(currentList.value);
    // 将新获取的评论数据添加到comments数组中
    comments.value.push(...dataList.value);
  } else {
    // console.log("no data");
    bottom.value = true;
  }
};

// todo
const answer = "~~开通会员后查看答案~~";

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功," + res.message);
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 提交评论
 */
const doCommentSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res =
    await QuestionCommentControllerService.addQuestionCommentUsingPost({
      ...commentForm.value,
      questionId: question.value.id,
    });

  if (res.code === 0) {
    message.success("提交成功," + res.message);
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewQuestionView {
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
