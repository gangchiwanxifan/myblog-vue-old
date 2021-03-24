<template>
  <div style="background-color:#fff; min-height: 70vh">
    <div style="max-width: 800px; margin: 0 auto; padding-bottom: 50px">
      <h2 class="head-title">
        草稿箱
        <span class="count">（1）</span>
      </h2>
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <img
            style="margin-right:20px"
            width="160"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
          <a-list-item-meta>
            <div slot="description">
              <div>123123</div>
              <div>最后修改时间：2021-03-16 10:54:04</div>
            </div>
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
          </a-list-item-meta>
          <a-button>编辑</a-button>
          <a-divider type="vertical"></a-divider>
          <a-button type="danger">删除</a-button>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];
export default {
  data() {
    return {
      data
    };
  }
};
</script>

<style scoped>
.head-title {
  display: inline-block;
  font-weight: 400;
  font-size: 20px;
  color: #222;
  height: 67px;
  line-height: 67px;
}
.count {
  font-size: 14px;
  color: #99a2aa;
}
</style>
