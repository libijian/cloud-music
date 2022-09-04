<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="170"
        :height="200"
        class="my-swipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">{{ changeCount(item.playCount) }}</span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import { getMusicList } from "@/request/api/home.js";
export default {
  //*vue2写法
  //Vue2语法
  // data() {
  //   return {
  //     musicList: [],
  //   };
  // },
  // methods: {
  //   async getGnedan() {
  //     let res = await getMusicList();
  //     console.log(res);
  //     this.musicList = res.data.result;
  //   },
  //   changeCount:function(num){
  //          if(num>=100000000){
  //           return(num/100000000).toFixed(1)+"亿"
  //          }else if(num>=10000){
  //           return(num/10000).toFixed(1)+"万"
  //          }
  //   }
  // },
  // mounted() {
  //   this.getGnedan();
  // },
  //*vue3写法
  setup() {
    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      console.log(res);
      state.musicList = res.data.result;
    });
    return { state, changeCount };
  },
};
</script>


<style lang="less" scoped>
.musicList {
  height: 5rem;
  padding: 00.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 5rem;
    .my-swipe {
      height: 100%;
      .playCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;
      color: white;
    }
      a{
        color: black;
      }
      img {
        width: 100%;
        height: 150px;
        border-radius: 10px;
      }
      .van-swipe-item {
        margin-right: 10px;
      }
    }
  }
}
</style>