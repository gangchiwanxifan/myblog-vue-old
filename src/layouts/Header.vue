<template>
  <div>
    <div v-if="1">
      <a-button class="edit-button" shape="round" @click="handleToEdit"
        ><a-icon type="highlight" />写文章</a-button
      >
      <a-dropdown placement="bottomRight" class="right-dropdown">
        <span class="ant-pro-account-avatar">
          <a-divider type="vertical"></a-divider>
          <a-avatar :src="avatar" class="antd-pro-global-header-index-avatar" />
          <a-icon type="down" style="padding: 0px 3px" />
          <!-- <span style="font-size:15px"> {{ username }}</span> -->
        </span>

        <template v-slot:overlay>
          <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
            <a-menu-item class="menu-username"
              ><a-icon type="smile" style="font-size: 15px" />{{
                username
              }}</a-menu-item
            >
            <a-menu-divider v-if="menu" />
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
    </div>
    <div v-else>
      <a-button
        type="primary"
        size="large"
        shape="round"
        @click="$router.push({ name: 'login' })"
        >登录</a-button
      >
      <a-divider type="vertical" />
      <a-button
        size="large"
        shape="round"
        @click="$router.push({ name: 'register' })"
        >注册</a-button
      >
    </div>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";

export default {
  name: "AvatarDropdown",
  data() {
    return {
      username: "",
      avatar: ""
    };
  },
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
  mounted() {
    if (this.loginStatus) {
      this.username = this.userInfo.username;
      this.avatar = this.userInfo.avatar
        ? this.userInfo.avatar
        : "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";
    }
  },
  computed: {
    loginStatus() {
      return this.$store.state.user.loginStatus;
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    handleToEdit() {
      this.$router.push({ path: "/blog" });
    },
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
          return this.$store.dispatch("clearUserInfo").then(() => {
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
.menu-username {
  font-size: 17px;
  font-weight: 550;
  color: rgba(0, 0, 0, 0.65);
}
.edit-button {
  background-color: rgba(248, 80, 13, 0.062);
}
</style>
