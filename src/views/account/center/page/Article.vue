<template>
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
<style></style>
