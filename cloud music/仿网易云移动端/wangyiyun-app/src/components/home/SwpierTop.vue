<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from '@/request/api/home.js'
import axios from 'axios'
import{reactive,onMounted} from 'vue'
export default {
  //Vue3的语法
  setup() {
    const state = reactive({
      images:[]
      });
    onMounted(
      async() => {
      // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      //  state.images=res.data.banners
      //})
            let res=await getBanner();
            state.images=res.data.banners
            console.log(res)
    })
    return {state};
  },
};
</script>

<style lang="less">
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(210, 130, 130);
    }
  }
}
</style>