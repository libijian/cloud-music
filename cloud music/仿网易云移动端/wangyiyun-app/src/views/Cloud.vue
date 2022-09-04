<template>
  <div class="item" v-for="(item, i) in state.recommend" :key="item">
    <div class="itemLeft">
      <span class="leftSpan">{{ i + 1 }}</span>
      <div>
        <p>{{ item.name }}</p>
        <span v-for="(item1, index) in item.ar" :key="index">{{
          item1.name
        }}</span>
      </div>
    </div>
            <div class="itemRight">
                    <img :src="item.al.picUrl" alt="">
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { getRecommend } from "@/request/api/home.js";
export default {
  setup() {
    const state = reactive({
      recommend: [],
    });
    onMounted(async () => {
      let res = await getRecommend();
      state.recommend = res.data.data.dailySongs;
      console.log(res);
    });
    return { state };
  },
};
</script>

<style lang="less" scoped>
.item {
  margin: 10px 0;
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .itemLeft {
    width: 85%;
    height: 100%;
    display: flex;
    align-items: center;
    .leftSpan {
      display: inline-block;
      width: 0.2rem;
      text-align: center;
      margin-left: 10px;
    }

    div {
      p {
        width: 4.54rem;
        height: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
        margin: 0 5px;
      }
      span {
        font-weight: 400;
        font-size: 0.24rem;
        color: #999;
      }

      margin-left: 0.3rem;
    }
  }
      .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
          img{
        width: 1.3rem;
        height: 0.8rem;
    }
      }
}
</style>