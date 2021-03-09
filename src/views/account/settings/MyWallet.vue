<template>
  <div>
    <span>myWallet</span
    ><a-button @click="changeData" size="small">change</a-button>
    <div>{{ data }}</div>
    <a-form layout="inline">
      <a-form-item>
        <a-input v-model="user.username" placeholder="用户名"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model="user.password" placeholder="密码"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="getUser">提交</a-button>
      </a-form-item>
    </a-form>
    <a-button @click="$store.commit('add', 1)"></a-button>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      data: "none",
      user: {}
    };
  },
  methods: {
    getUser() {
      console.log(this.user);
      request({
        url: "/user/login",
        method: "post",
        data: this.user
      }).then(res => {
        this.data = res.data;
      });
    },
    changeData() {
      this.data = this.data == "none" ? "changed" : "none";
    }
  }
};
</script>

<style></style>
