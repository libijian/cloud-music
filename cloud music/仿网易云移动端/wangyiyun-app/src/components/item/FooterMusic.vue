<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="show">
        <p>{{ playList[playListIndex].name }}</p>
        <p>横滑可以切换上下首歌曲</p>
      </div>
    </div>

    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang"></use>
      </svg>
            <svg style="width: 0.5rem; height: 0.5rem;" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
   
         <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
      />
    </van-popup>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods: {
    play: function () {
      //判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updatedIsbtnShow(false);
        this.updateCurrentTime(); //播放就调用函数进行传值
      } else {
        this.$refs.audio.pause();
        this.updatedIsbtnShow(true);
        clearInterval(this.interVal); //点击暂停就停止计时器
      }
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration);
    },
    //定时器传入时间给歌词详情页
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    ...mapMutations([
      "updatedIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  watch: {
    playListIndex() {
      //监听如果发生改变，就让其自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //如果本来是暂停，切换歌曲就进行播放，按钮变化
        this.updatedIsbtnShow(false);
      }
    },
    playList() {
      this.$refs.audio.autoplay = true;
      this.updatedIsbtnShow(false);
    },
  },
  components: {
    MusicDetail,
  },
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 95%;
  height: 1.4rem;
  background-color: #fff;
  border-top: 1px solid #999;
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .show {
      font-size: 5px;
    }
  }
  .footerRight {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      margin: 5px;
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>