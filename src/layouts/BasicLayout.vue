<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://blog.xmas-nnnut.link/" target="_blank">
          坚果oj by nnnut
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  name: "BasicLayout",
  components: { GlobalHeader },
};
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
  /*position: -webkit-sticky;*/
  /*position: sticky;*/
  /*top: 0;*/
}

#basicLayout .content {
  background: #fefefe;
  margin-bottom: 20px;
  margin-left: 5%;
  margin-right: 5%;
  /*padding: 20px;*/
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  text-align: center;
}
</style>
