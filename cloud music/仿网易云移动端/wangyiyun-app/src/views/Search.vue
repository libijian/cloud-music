<template>
  <div class="searchTop">
    <div @click="$router.go(-1)">
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <input
      type="text"
      placeholder="周杰伦"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span
      class="spanKey"
      v-for="item in keyWordList"
      :key="item"
      @click="searchHistory(item)"
    >
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.artists" :key="index">{{
            item1.name
          }}</span>
        </div>
      </div>

      <div class="itemRight">
        <svg class="icon" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <!-- <svg class="icon" aria-hidden="true" >
      <use xlink:href="#icon-liebiao"></use>
    </svg> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getSearchMusic } from "@/request/api/home.js";
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || [];
  },
  methods: {
    enterKey: async function () {
      if (this.searchKey != "") {
        this.keyWordList.unshift(this.searchKey);
        //去重
        this.keyWordList = [...new Set(this.keyWordList)];
        //固定长度
        if (this.keyWordList.length > 6) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1);
        }
        localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
        let res = await getSearchMusic(this.searchKey);
        console.log(res);
        this.searchList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    delHistory() {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    searchHistory: async function (item) {
      let res = await getSearchMusic(item);
      this.searchList = res.data.result.songs;
      console.log(res);
    },
    updateIndex(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>


<style lang="less" scoped>
.searchTop {
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 20px;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 5px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
}
.searchHistory {
  height: 120px;
  position: relative;
  padding: 0.2rem;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    margin: 5px 10px;
    background-color: rgb(216, 206, 206);
    padding: 10px;
    border-radius: 20px;
    display: inline-block;
  }
  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 70px;
  }
}
.itemList {
  width: 100%;
  .item {
    margin: 10px 0;
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      margin-left: 20px;
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
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
      .icon {
        fill: #999;
        width: 20px;
        height: 20px;
      }
      .bofang {
        position: absolute;
        left: 0;
      }
      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>