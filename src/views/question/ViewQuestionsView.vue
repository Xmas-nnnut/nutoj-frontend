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
                          提交</a-button
                        >
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
              <a-scrollbar type="track" style="height: 60vh; overflow: auto">
                <div v-for="comment in comments" :key="comment.id">
                  <a-comment
                    :author="comment.author"
                    :datetime="comment.createTime"
                  >
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
                        @click="onLikeChange(comment.liked)"
                      >
                        <span v-if="comment.liked">
                          <IconHeartFill :style="{ color: '#f53f3f' }" />
                        </span>
                        <span v-else>
                          <IconHeart />
                        </span>
                        {{ comment.likeNum + (comment.liked ? 1 : 0) }}
                      </span>
                      <span
                        class="action"
                        key="star"
                        @click="onStarChange(comment.stared)"
                      >
                        <span v-if="comment.stared">
                          <IconStarFill :style="{ color: '#ffb400' }" />
                        </span>
                        <span v-else>
                          <IconStar />
                        </span>
                        {{ comment.starNum + (comment.stared ? 1 : 0) }}
                      </span>
                    </template>
                    <template #avatar>
                      <a-avatar>
                        <img alt="avatar" src="../../assets/SilverWolf.png" />
                      </a-avatar>
                    </template>
                  </a-comment>
                  <a-divider />
                </div>
              </a-scrollbar>
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
              <a-option>go</a-option>
              <a-option>html</a-option>
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
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

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
const comments = ref([
  {
    id: "1",
    author: "测试评论1",
    content:
      "测试内容1。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。",
    likeNum: 1,
    starNum: 1,
    liked: false,
    stared: false,
    createTime: "before 1 hour",
    isDelete: 0,
  },
  {
    id: "2",
    author: "测试评论2",
    content:
      "测试内容2。你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。",
    likeNum: 2,
    starNum: 2,
    liked: true,
    stared: true,
    createTime: "before 2 hour",
    isDelete: 0,
  },
]);

const onLikeChange = (liked: boolean): boolean => {
  return !liked;
};
const onStarChange = (stared: boolean): boolean => {
  return !stared;
};

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("题目加载失败，" + res.message);
  }
};

// todo
const answer =
  "```java\n" +
  "public class Main {\n" +
  "    public static void main(String[] args) {\n" +
  "        int a = Integer.parseInt(args[0]);\n" +
  "        int b = Integer.parseInt(args[1]);\n" +
  "        System.out.println((a + b));\n" +
  "    }\n" +
  "}\n" +
  "```";

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

const doCommentSubmit = async () => {
  message.success("提交评论成功，评论内容：" + commentForm.value.content);
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
