<template>
  <div id="main">
    <a-card>
      <a-button
        class="draft-btn"
        type="dashed"
        size="large"
        @click="handleToDraft"
      >
        <a-icon type="delete" />草稿箱
      </a-button>
      <a-form>
        <a-form-item style="width: 60%">
          <a-input
            class="blog-title"
            placeholder="请输入标题 (建议30字以内)"
          ></a-input>
        </a-form-item>
        <!-- <a-divider></a-divider> -->
        <mavon-editor
          class="blog-editor"
          toolbarsBackground="#FA541C11"
          v-model="value"
        />
        <a-divider />
        <a-form-item label="请选择栏目分类">
          <a-radio-group defaultValue="1" button-style="solid" size="large">
            <a-radio-button
              v-for="item in channels"
              :value="item.id"
              :key="item.id"
            >
              {{ item.channelName }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="请设置文章封面">
          <div class="dropbox">
            <a-upload-dragger
              v-decorator="[
                'dragger',
                {
                  valuePropName: 'fileList'
                }
              ]"
              name="files"
              action="/upload.do"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p class="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </a-upload-dragger>
          </div>
        </a-form-item>
        <a-form-item label="请选择文集">
          <a-button>选择文集</a-button>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" size="large" shape="round" @click="show">
            提交文章
          </a-button>
          <a-button size="large" shape="round">
            存为草稿
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
const channels = [
  {
    id: "1",
    channelName: "动画"
  },
  {
    id: "2",
    channelName: "游戏"
  },
  {
    id: "3",
    channelName: "影视"
  },
  {
    id: "4",
    channelName: "生活"
  },
  {
    id: "5",
    channelName: "兴趣"
  },
  {
    id: "6",
    channelName: "科技"
  }
];
export default {
  data() {
    return {
      channels: channels,
      value: ""
    };
  },
  methods: {
    handleToDraft() {
      this.$router.push({ path: "/blog/draft" });
    },
    show() {
      console.log(this.value);
    }
  }
};
</script>

<style scoped>
.blog-title {
  height: 64px;
  width: 60%;
  margin: auto;
  font-size: 40px;
  border: none;
}
.ant-radio-button-wrapper {
  margin-right: 12px;
  /* border: none; */
}
.blog-editor {
  z-index: 1000 !important;
}
.draft-btn {
  float: right;
  margin-top: 10px;
}
</style>
