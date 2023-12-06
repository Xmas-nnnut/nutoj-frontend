import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ExampleView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserManageView from "@/views/user/UserManageView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserAboutView from "@/views/user/UserAboutView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionsSubmitView from "@/views/question/QuestionsSubmitView.vue";
import ViewQuestionsView from "@/views/question/ViewQuestionsView.vue";
import TeamsView from "@/views/team/TeamsView.vue";
import AddTeamView from "@/views/team/AddTeamView.vue";
import ManageTeamsView from "@/views/team/ManageTeamsView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    meta: {
      hideInMenu: true,
    },
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView,
  },
  {
    path: "/questions_submit",
    name: "浏览题目提交记录",
    component: QuestionsSubmitView,
  },
  {
    path: "/teams",
    name: "浏览队伍",
    component: TeamsView,
  },
  {
    path: "/add/team",
    name: "创建队伍",
    component: AddTeamView,
    meta: {
      // access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/update/team",
    name: "更新队伍",
    component: AddTeamView,
    meta: {
      // access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionsView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/team",
    name: "管理队伍",
    component: ManageTeamsView,
    // meta: {
    //   access: ACCESS_ENUM.ADMIN,
    // },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/manage/user",
    name: "用户管理",
    component: UserManageView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: ExampleView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "管理员可见",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/example",
    name: "栗子",
    component: ExampleView,
  },
  {
    path: "/about",
    name: "关于我的",
    component: UserAboutView,
    meta: {
      access: ACCESS_ENUM.USER,
      // hideInMenu: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/user/UserAboutView.vue"),
  },
];
