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
import PostsView from "@/views/post/PostsView.vue";
import AddPostView from "@/views/post/AddPostView.vue";
import ManagePostView from "@/views/post/ManagePostView.vue";
import ViewPostView from "@/views/post/ViewPostView.vue";
import BoardView from "@/views/BoardView.vue";
import HelpView from "@/views/HelpView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    meta: {
      hideInMenu: true,
      group: "无分组",
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
    meta: {
      group: "无分组",
    },
  },
  {
    path: "/board",
    name: "排行榜",
    component: BoardView,
    meta: {
      access: ACCESS_ENUM.USER,
      group: "无分组",
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView,
    meta: {
      group: "题目",
    },
  },
  {
    path: "/questions_submit",
    name: "浏览题目提交记录",
    component: QuestionsSubmitView,
    meta: {
      group: "题目",
    },
  },
  {
    path: "/my/questions_submit",
    name: "我的浏览题目提交记录",
    component: QuestionsSubmitView,
    meta: {
      access: ACCESS_ENUM.USER,
      group: "题目",
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
      group: "题目",
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      group: "题目",
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      group: "题目",
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      group: "题目",
    },
  },
  {
    path: "/teams",
    name: "浏览队伍",
    component: TeamsView,
    meta: {
      group: "队伍",
    },
  },
  {
    path: "/add/team",
    name: "创建队伍",
    component: AddTeamView,
    meta: {
      access: ACCESS_ENUM.USER,
      group: "队伍",
    },
  },
  {
    path: "/update/team",
    name: "更新队伍",
    component: AddTeamView,
    meta: {
      // access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
      group: "队伍",
    },
  },
  {
    path: "/manage/team",
    name: "管理队伍",
    component: ManageTeamsView,
    meta: {
      access: ACCESS_ENUM.USER,
      group: "队伍",
    },
  },
  {
    path: "/posts",
    name: "浏览帖子列表",
    component: PostsView,
    meta: {
      group: "帖子",
    },
  },
  {
    path: "/add/post",
    name: "创建帖子",
    component: AddPostView,
    meta: {
      access: ACCESS_ENUM.USER,
      group: "帖子",
    },
  },
  {
    path: "/update/post",
    name: "更新帖子",
    component: AddPostView,
    meta: {
      // access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
      group: "帖子",
    },
  },
  {
    path: "/manage/post",
    name: "管理帖子",
    component: ManagePostView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      group: "帖子",
    },
  },
  {
    path: "/view/post/:id",
    name: "浏览帖子详情",
    component: ViewPostView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
      group: "帖子",
    },
  },
  {
    path: "/about",
    name: "关于我的",
    component: UserAboutView,
    meta: {
      access: ACCESS_ENUM.USER,
      group: "无分组",
      // hideInMenu: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/user/UserAboutView.vue"),
  },
  {
    path: "/help",
    name: "帮助",
    component: HelpView,
    meta: {
      group: "无分组",
    },
  },
  {
    path: "/manage/user",
    name: "用户管理",
    component: UserManageView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      group: "无分组",
    },
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: ExampleView,
    meta: {
      hideInMenu: true,
      group: "无分组",
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
      group: "无分组",
    },
  },
  {
    path: "/example",
    name: "栗子",
    component: ExampleView,
    meta: {
      hideInMenu: true,
      group: "无分组",
    },
  },
];
