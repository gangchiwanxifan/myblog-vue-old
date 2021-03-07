<template>
  <a-layout class="ant-layout topmenu" style="min-height: 100vh">
    <a-layout-header>
      <div class="ant-top-nav-header">
        <div class="ant-top-nav-header-main">
          <div class="ant-top-nav-header-left">
            <div class="ant-top-nav-header-logo">
              <img src="~@/assets/spring.svg" class="logo" alt="logo" />
              <h1>Simple Blog</h1>
            </div>
          </div>
          <div class="ant-top-nav-header-menu">
            <a-menu
              theme="light"
              mode="horizontal"
              :default-selected-keys="['2']"
              :style="{ lineHeight: '64px' }"
            >
              <a-menu-item key="1">
                <a-icon type="compass" style="font-size:17px" />
                <span style="font-size:17px">发现</span>
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="table" style="font-size:17px" />
                <span style="font-size:17px">栏目</span>
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="team" style="font-size:17px" />
                <span style="font-size:17px">关注</span>
              </a-menu-item>
            </a-menu>
          </div>
          <div class="ant-global-header-index-right">
            <Header />
          </div>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content class="basicLayout-content">
      <div style="max-width: 1200px; margin: 0 auto">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
.ant-layout-header {
  padding: 0;
}
.ant-top-nav-header {
  background-color: #fff;
}
.ant-top-nav-header-main {
  max-width: 1200px;
  margin: auto;
  padding-left: 0;
  display: flex;
}
.basicLayout-content {
  position: relative;
  margin: 24px;
}
.ant-global-header-index-right {
  float: right;
}
.ant-top-nav-header-left {
  float: left;
}
.logo {
  display: inline-block;
  height: 36px;
  width: 36px;
  vertical-align: middle;
}
.ant-top-nav-header-left h1 {
  display: inline-block;
  margin: 0 0 0 12px;
  font-weight: 400;
  font-size: 16px;
  vertical-align: top;
}
.ant-global-header-index-right {
  float: right;
  height: 100%;
  margin-left: auto;
  overflow: hidden;
}
.ant-top-nav-header-logo {
  width: 165px;
}

a-menu-item {
  font-size: 20px;
}
</style>
