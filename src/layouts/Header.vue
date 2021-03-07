<template>
  <a-dropdown v-if="1" placement="bottomRight" class="right-dropdown">
    <span class="ant-pro-account-avatar">
      <a-avatar
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        class="antd-pro-global-header-index-avatar"
      />
      <span style="font-size:15px"> currentUser </span>
    </span>

    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          个人设置
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <div v-else>
    <a-button type="primary" size="large" shape="round">登录</a-button>
    <a-divider type="vertical" />
    <a-button size="large" shape="round">注册</a-button>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";

export default {
  name: "AvatarDropdown",
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToCenter() {
      this.$router.push({ path: "/account/center" });
    },
    handleToSettings() {
      this.$router.push({ path: "/account/settings" });
    },
    handleLogout() {
      Modal.confirm({
        title: "信息",
        content: "您确定要注销吗？",
        onOk: () => {
          return this.$store.dispatch("Logout").then(() => {
            this.$router.push({ name: "login" });
          });
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style lang="less" scoped>
.right-dropdown {
  height: 100%;
  display: inline-block;
}
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
