<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopleft">
      <span style="color: #fff" @click="backhome">《《</span>
      <div class="leftMarquee">
        <Vue3Marquee style="color: #fff; font-size: 20px">{{
          musicList.name
        }}</Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item">
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang_o"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img
      src="@/assets/cd2.png"
      alt=""
      class="img_cd2"
      :class="{ img_cd2_active: !isbtnShow }"
    />
    <img src="@/assets/cd1.png" alt="" class="img_cd1" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      @click="isLyricShow = true"
      :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
    />
  </div>
  <div
    class="musicLyric"
    ref="musicLyric"
    v-show="isLyricShow"
    @click="isLyricShow = false"
  >
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <button>(≧∇≦)ﾉ</button>
      <button>下载</button>
      <button>唱碟</button>
      <button>评论</button>
    </div>
    <div class="footerContent">
      <input
        type="range"
        class="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div>
    <div class="footer">
      <button>切换</button>
      <button @click="goPlay(-1)">上一首</button>
      <button @click="play" v-if="isbtnShow">播放</button>
      <button @click="play" v-else>暂停</button>
      <button @click="goPlay(1)">下一首</button>
      <button>列表</button>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          //正则换行符
          let min = item.slice(1, 3); //切割时间
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          //*console.log(min,sec,Number(mill),lrc) 获取时间轴和歌词
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    },
  },
  mounted() {
    //  console.log(this.musicList);
    // console.log(this.lyricList.lyric);
    this.addDuration();
  },
  props: ["musicList", "isbtnShow", "play", "addDuration"],
  methods: {
    backhome() {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  watch: {
    currentTime: function (newvalue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newvalue === this.duration) {
        if (this.playListIndex === this.playListIndex - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
  components: {
    Vue3Marquee,
  },
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(50px);
}
.detailTop {
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-content: center;
  fill: #fff;
  .detailTopleft {
    width: 50%;
    display: flex;
    align-content: center;
    p {
      font-size: 20px;
      margin: 5px;
    }
    .leftMarquee {
      margin: 0px;
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
    }
  }
  .detailTopRight {
    position: relative;
    width: 20%;
    .icon{
      position: absolute;
      right: 20px;
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  position: relative;
  .img_cd2 {
    top: 2%;
    width: 2.2rem;
    height: 3.5rem;
    left: 54%;
    position: absolute;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }
  .img_cd2_active {
    top: 2%;
    width: 2.2rem;
    height: 3.5rem;
    left: 54%;
    position: absolute;
    transform-origin: 0 0;
    transform: rotate(5deg);
    transition: all 2s;
  }
  .img_cd1 {
    left: 18%;
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    left: 30%;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  overflow: scroll;
  p {
    color: rgb(134, 134, 134);
    margin-bottom: 15px;
  }
  .active {
    color: #fff;
    font-size: 20px;
  }
}
.detailFooter {
  width: 100%;
  height: 2.8rem;
  position: absolute;
  bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
}
</style>