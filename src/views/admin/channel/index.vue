<template>
  <div>
    <page-header :management="management">
      <!-- <div>
        页面简介...
      </div> -->
    </page-header>

    <a-card class="ant-card-body">
      <a-button class="add-btn" type="primary" @click="showAddModal"
        ><a-icon type="plus" />新建</a-button
      >
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :loading="loading"
        :pagination="{ defaultPageSize: 6 }"
      >
        <div slot="avatar" slot-scope="avatar">
          <img :src="avatar" alt="图片没了" style="height:60px" />
        </div>

        <span slot="action" slot-scope="record">
          <a @click="showEditModal(record)">修改</a>
          <a-divider type="vertical" />
          <a @click="showDeleteConfirm(record)">删除</a>
        </span>
      </a-table>
    </a-card>

    <!-- 新建栏目对话框 -->
    <a-modal
      title="新建栏目"
      :visible="visible_add"
      :confirm-loading="confirmLoading_add"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    >
      <a-form
        :form="add_form"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-form-item label="栏目名称:">
          <a-input
            placeholder="栏目名称"
            v-decorator="[
              'channelName',
              {
                rules: [{ required: true, message: '请输入名称' }],
                validateTrigger: ['change', 'blur']
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="上传封面:">
          <a-upload
            v-decorator="['avatar']"
            action="/api/upload"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="栏目描述:">
          <a-textarea
            :rows="4"
            placeholder="栏目描述"
            v-decorator="['description']"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 编辑栏目对话框 -->
    <a-modal
      title="编辑栏目"
      :visible="visible_edit"
      :confirm-loading="confirmLoading_edit"
      @ok="handleEditOk"
      @cancel="handleEditCancel"
    >
      <a-form
        :form="edit_form"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-form-item label="栏目id:">
          <a-input disabled="disabled" v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="栏目名称:">
          <a-input
            placeholder="栏目名称"
            v-decorator="[
              'channelName',
              {
                rules: [{ required: true, message: '请输入名称' }],
                validateTrigger: ['change', 'blur']
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="上传封面:">
          <a-upload
            v-decorator="['avatar']"
            action="/api/upload"
            list-type="picture"
          >
            <a-button> <a-icon type="upload" /> Click to upload </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="栏目描述:">
          <a-textarea
            :rows="4"
            placeholder="栏目描述"
            v-decorator="['description']"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import pageHeader from "@/components/AdminHeader";
import request from "@/utils/request";

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "封面",
    dataIndex: "avatar",
    key: "avatar",
    scopedSlots: { customRender: "avatar" },
    width: "15%"
  },
  {
    title: "名称",
    dataIndex: "channelName",
    key: "channelName"
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "20%"
  }
];

export default {
  data() {
    this.add_form = this.$form.createForm(this);
    this.edit_form = this.$form.createForm(this);
    return {
      management: "栏目管理",
      loading: true,
      data: null,
      // 测试数据
      // data2,
      columns,
      // 添加栏目对话框
      visible_add: false,
      confirmLoading_add: false,
      // 编辑栏目对话框
      visible_edit: false,
      confirmLoading_edit: false
    };
  },
  components: {
    pageHeader
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取栏目列表
    getList() {
      this.loading = true;
      request({
        url: "/channel/list",
        method: "get"
      }).then(res => {
        this.data = res.data.data;
        this.loading = false;
      });
    },
    // 添加栏目对话框
    showAddModal() {
      console.log(this.add_form.getFieldsValue());
      console.log(this.fileList);
      this.visible_add = true;
    },
    handleAddOk() {
      this.add_form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading_add = true;
          let channel = {
            channelName: values.channelName,
            avatar: values.avatar.fileList
              ? values.avatar.fileList[0].response.data
              : "/article.png",
            description: values.description
          };
          request({
            url: "/channel/save",
            method: "post",
            data: channel
          }).then(res => {
            if (res.data.data) {
              this.$message.success("添加成功");
              this.confirmLoading_add = false;
              this.visible_add = false;
              this.add_form.setFieldsValue({
                channelName: "",
                avatar: "",
                description: ""
              });
              this.getList();
            } else {
              this.$message.error("添加失败");
              this.confirmLoading_add = false;
              this.visible_add = false;
            }
          });
        }
      });
    },
    handleAddCancel() {
      this.visible_add = false;
    },
    // 编辑栏目
    showEditModal(record) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.edit_form.setFieldsValue(record);
        }, 100);
      });
      this.visible_edit = true;
      this.edit_form.setFieldsValue();
    },
    handleEditOk() {
      this.edit_form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading_edit = true;
          let channel = {
            id: values.id,
            channelName: values.channelName,
            avatar: values.avatar.fileList
              ? values.avatar.fileList[0].response.data
              : values.avatar,
            description: values.description
          };
          request({
            url: "/channel/update",
            method: "post",
            data: channel
          }).then(res => {
            if (res.data.data) {
              this.$message.success("更新成功");
              this.confirmLoading_edit = false;
              this.visible_edit = false;
              this.getList();
            } else {
              this.$message.error("更新失败");
              this.confirmLoading_edit = false;
              this.visible_edit = false;
            }
          });
        }
      });
    },
    handleEditCancel() {
      this.visible_edit = false;
    },
    // 删除
    showDeleteConfirm(record) {
      const _this = this;
      this.$confirm({
        title: "确定删除该栏目?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          request({
            url: "/channel/delete",
            method: "post",
            data: { id: record.id }
          }).then(res => {
            if (res.data.data) {
              _this.$message.success("删除成功");
              _this.getList();
            } else {
              _this.$message.error("删除失败");
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-card-body {
  margin: 15px;
  .add-btn {
    margin-top: -10px;
    margin-bottom: 15px;
    border-radius: 0;
  }
}
</style>
