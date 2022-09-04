<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemleft">
      <span @click="$router.go(-1)">
              <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      </span>
      <span>歌单</span>
    </div>
    <div class="itemright">
      <span>搜索</span>
      <span>更多</span>
    </div>
  </div>
  <div class="itemTopContent">
    <div class="contentleft">
      <img :src="playlist.coverImgUrl" />
      <div class="playCount">
        <span>{{ changeCount(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="contentRight">
      <p class="rightP_one">{{ playlist.name }}</p>
      <div class="right_img">
        <img :src="playlist.creator.backgroundUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
      </div>
      <p class="rightP_two">
        <span>{{ playlist.description }}</span>
      </p>
    </div>
  </div>
  <div class="itemTopFooter">
    <div class="footerItem">
      <p>评论数</p>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="footerItem">
      <p>分享数</p>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="footerItem">
      <p>下载</p>
    </div>
    <div class="footerItem">
      <p>多选</p>
    </div>
  </div>
</template>
<script>
export default {
  setup(props) {
    console.log(props);
    //通过props传值，判断如果数据无法获取就获取session里面的数据
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(sessionStorage.getItem.playlist).creator;
    }
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>
<style lang="less" scoped>
.itemMusicTop {

  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .itemleft,
  .itemright {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    span {
      font-size: 20px;
      color: white;
    }
      .icon {
    width: 40px;
    height: 40px;
    
  }
  }
  .bgimg {
    width: 100%;
    height: 11rem;
    position: absolute;
    z-index: -1;
    filter: blur(20px);
  }
}
.itemTopContent {

  height: 3rem;
  padding: 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  .contentleft {
    width: 36%;
    height: 2.6rem;
    position: relative;
    img {
      width: 2.6rem;
      height: 2.8rem;
      border-radius: 15px;
      position: absolute;
      z-index: -1;
    }
    .playCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;
      span {
        font-size: 0.26rem;
        color: #fff;
      }
    }
  }
  .contentRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: -20px;
    .rightP_one {
      font-size: 0.3rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
    }
    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.1rem;
      }
    }
    .rightP_two {
      width: 100%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
        color: rgb(204, 204, 204);
      }
    }
  }
}
.itemTopFooter {
  margin-top: -20px;
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-around;
  .footerItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    span {
      margin-top: -10px;
    }
  }
}
</style>