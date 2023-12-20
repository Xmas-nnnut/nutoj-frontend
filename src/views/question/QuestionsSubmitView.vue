<template>
  <div id="questionSubmitView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="justify-content: flex-start; align-content: center; margin: 10px"
    >
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>golang</a-option>
          <a-option>html</a-option>
        </a-select>
        <a-divider size="0" direction="vertical" />
      </a-form-item>
      <a-form-item label="仅查看我的">
        <a-switch
          v-model="switchValue"
          type="round"
          :checked-value="true"
          :unchecked-value="false"
          change
        >
          <template #checked> 是</template>
          <template #unchecked> 否</template>
        </a-switch>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});
const switchValue = ref(false);
const router = useRouter();
const route = useRoute();
// 如果页面地址包含 my，视为我的提交记录页面
const myPage = route.path.includes("my");

const loadData = async () => {
  // 判断查询条件
  if (switchValue.value) {
    // 获取我的提交信息
    const res =
      await QuestionControllerService.listMyQuestionSubmitByPageUsingPost({
        ...searchParams.value,
        sortField: "createTime",
        sortOrder: "descend",
      });
    if (res.code === 0) {
      dataList.value = res.data.records;
      total.value = res.data.total;
    } else {
      message.error("加载失败，" + res.message);
    }
  } else {
    // 获取全部提交信息
    const res =
      await QuestionControllerService.listQuestionSubmitByPageUsingPost({
        ...searchParams.value,
        sortField: "createTime",
        sortOrder: "descend",
      });
    if (res.code === 0) {
      dataList.value = res.data.records;
      total.value = res.data.total;
    } else {
      message.error("加载失败，" + res.message);
    }
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  if (myPage) {
    switchValue.value = true;
  }
  loadData();
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};
</script>

<style scoped>
#questionSubmitView {
}
</style>
