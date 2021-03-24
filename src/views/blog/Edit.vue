<template>
  <div id="main">
    <a-card style="margin: 0 20px">
      <a-button
        class="draft-btn"
        type="dashed"
        size="large"
        @click="handleToDraft"
      >
        <a-icon type="delete" />草稿箱
      </a-button>
      <a-form v-bind="formItemLayout">
        <a-form-item :wrapperCol="{ span: 15 }" style="width:80%">
          <a-input
            v-model="title"
            class="blog-title"
            placeholder="请输入标题"
          ></a-input>
        </a-form-item>
        <mavon-editor
          class="blog-editor"
          toolbarsBackground="#FA541C11"
          v-model="content"
          @imgAdd="imgAdd"
          ref="md"
        />
        <a-divider />
        <a-form-item label="请选择栏目分类">
          <a-radio-group
            button-style="solid"
            size="large"
            v-model="selectedChannel"
          >
            <a-radio-button
              v-for="item in channels"
              :value="item.id"
              :key="item.id"
            >
              {{ item.channelName }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <div class="copyright-hint">
          <a-icon type="info-circle" />
          <span>非必选，若不选择分类，则默认进入生活分区</span>
        </div>
        <a-form-item label="请设置文章封面">
          <!--  -->
          <div class="ant-upload-preview" @click="$refs.modal.edit(img)">
            <a-icon type="cloud-upload-o" class="upload-icon" />
            <div class="mask">
              <a-icon type="plus" />
            </div>
            <img :src="img" onerror="this.src='/article.png'" />
          </div>
          <!--  -->
        </a-form-item>
        <a-form-item label="请选择文集">
          <a-button @click="showCataModal">选择文集</a-button>
        </a-form-item>
        <div class="copyright-hint">
          <a-icon type="info-circle" />
          <span>可在个人中心创建或管理文集哦~</span>
        </div>
        <a-form-item class="submit-btns">
          <a-button type="primary" size="large" shape="round" @click="show">
            提交文章
          </a-button>
          <a-button size="large" shape="round" style="margin-left:20px">
            存为草稿
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <!-- 选择文集对话框 -->
    <a-modal
      v-model="cata_visible"
      title="选择文集"
      width="400px"
      @ok="handleCataOk"
    >
      <div class="add_modal">
        <a-radio-group v-model="selectedCatagory">
          <a-radio
            v-for="item in catagory"
            :style="radioStyle"
            :value="item.id"
            :key="item.id"
          >
            {{ item.catagoryName }}
          </a-radio>
        </a-radio-group>
      </div>

      <div>
        <a-button
          class="add_catagory_btn"
          v-show="!is_add"
          @click="showAdd"
          :disabled="catagory.length >= 10"
          ><a-icon type="plus"></a-icon>新建文集({{
            this.catagory.length
          }}/10)</a-button
        >
        <div>
          <a-input-search
            v-model="add_cata"
            v-show="is_add"
            placeholder="请输入文集名称"
            @search="onSearch"
          >
            <a-button slot="enterButton">
              新建
            </a-button>
          </a-input-search>
        </div>
      </div>
    </a-modal>

    <!-- 封面图片 -->
    <avatar-modal ref="modal" @ok="setavatar" />
  </div>
</template>

<script>
import request from "@/utils/request";
import AvatarModal from "./AvatarModal";

// const channels = [
//   {
//     id: "1",
//     channelName: "动画"
//   },
//   {
//     id: "2",
//     channelName: "游戏"
//   },
//   {
//     id: "3",
//     channelName: "影视"
//   },
//   {
//     id: "4",
//     channelName: "生活"
//   },
//   {
//     id: "5",
//     channelName: "兴趣"
//   },
//   {
//     id: "6",
//     channelName: "科技"
//   }
// ];

export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      title: "",
      content: "",
      selectedChannel: 6,
      selectedCatagory: "",
      img: "/article.png",
      formItemLayout: {
        labelCol: {
          span: 24
        },
        wrapperCol: {
          span: 16
        }
      },
      userInfo: {},
      channels: [],
      catagory: [],
      is_add: false,
      add_cata: "",
      radioStyle: {
        display: "block",
        height: "40px",
        lineHeight: "40px"
      },
      cata_visible: false
    };
  },
  beforeMount() {
    this.userInfo = this.$store.state.user.userInfo;
  },
  mounted() {
    this.getChannels();
    this.getCatagory(this.userInfo.id);
  },
  methods: {
    // 显示文集对话框
    showCataModal() {
      this.cata_visible = true;
    },
    handleCataOk() {
      this.cata_visible = false;
    },
    getCatagory(userId) {
      request({
        url: "/catagory/list",
        method: "post",
        data: { userId: userId }
      }).then(res => {
        (this.catagory = res.data.data), console.log(this.catagory);
      });
    },
    showAdd() {
      this.is_add = true;
    },
    hideAdd() {
      this.is_add = false;
    },
    // 添加文集
    onSearch() {
      if (this.add_cata) {
        let catagory = {
          catagoryName: this.add_cata,
          userId: this.userInfo.id
        };
        request({
          url: "/catagory/save",
          method: "post",
          data: catagory
        }).then(res => {
          if (res.data.data) {
            this.$message.success("添加成功"),
              (this.is_add = false),
              this.getCatagory(this.userInfo.id);
          }
        });
      }
    },
    // 获取栏目信息
    getChannels() {
      request({
        url: "/channel/list",
        method: "post"
      }).then(res => {
        this.channels = res.data.data;
      });
    },
    // 跳转草稿箱
    handleToDraft() {
      this.$router.push({ path: "/blog/draft" });
    },
    // 上传封面
    setavatar(url) {
      if (url) {
        this.$message.success("上传成功");
        console.log(url);
        this.img = url;
      } else {
        this.$message.error("出现未知错误！");
      }
    },
    // 将图片上传，返回地址替换到md中
    imgAdd(pos, $file) {
      let file = new FormData();
      file.append("file", $file);
      request({
        url: "/api/upload",
        method: "post",
        data: file
      }).then(res => {
        if (res.data.data) {
          // console.log(res);
          this.$refs.md.$img2Url(pos, res.data.data);
        } else {
          this.$message.error("图片上传出错");
          // console.log(res);
        }
      });
    },
    // test
    show() {
      console.log(this.title);
      console.log(this.content);
      console.log(this.selectedChannel);
      console.log(this.selectedCatagory);
      console.log(this.content.substring(0, 60).replaceAll("\n", "") + "...");
    }
  }
};
</script>

<style lang="less" scoped>
.blog-title {
  height: 64px;
  font-size: 36px;
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

.add_modal {
  height: 256px;
}
.add_catagory_btn {
  width: 352px;
}
.copyright-hint {
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #99a2aa;
}
.submit-btns {
  margin-top: 40px;
}

.ant-upload-preview {
  position: relative;
  // margin: 0 auto;
  width: 100%;
  max-width: 300px;
  border-radius: 5%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 300px;
    height: 100%;
    border-radius: 5%;
    overflow: hidden;
  }
}
</style>
