<template>
  <div style="background-color:#fff">
    <div style="max-width: 1000px; margin: 0 auto">
      <a-row :gutter="24">
        <a-col :span="16">
          <a-carousel autoplay style="padding:12px 0px">
            <img src="/swiper/img2.png" alt="图片加载失败" />
            <img src="/swiper/img1.png" alt="图片加载失败" />
          </a-carousel>
          <a-card :bordered="false" :bodyStyle="{ padding: '12px 0px' }">
            <a-list item-layout="vertical" size="large" :data-source="listData">
              <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                <template v-for="{ type, text } in actions" slot="actions">
                  <span :key="type">
                    <a-icon :type="type" style="margin-right: 8px" />
                    {{ text }}
                  </span>
                </template>
                <img
                  slot="extra"
                  width="160"
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                <a-list-item-meta :description="item.description">
                  <a slot="title" :href="item.href" class="list-title">{{
                    item.title
                  }}</a>
                </a-list-item-meta>
              </a-list-item>
              <div slot="footer" style="text-align: center; margin-top: 16px;">
                <a-button>加载更多</a-button>
              </div>
            </a-list>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card :bordered="false"
            ><div>网站公告</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <a-divider></a-divider>
            <div>推荐作者</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div></a-card
          >
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: "https://www.antdv.com/",
    title: `ant design vue part ${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team."
  });
}
export default {
  data() {
    return {
      listData,
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ]
    };
  }
};
</script>

<style scoped>
.list-title {
  color: #333;
  font-size: 18px;
  font-weight: 700;
}
</style>
