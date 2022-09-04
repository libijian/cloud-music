import { getMusicLyric } from '@/request/api/item.js'
import { getCaptcha } from '@/request/api/home.js'
import { getLogin } from '@/request/api/home.js'

import {
  createStore
} from 'vuex'
export default createStore({
  state: {
    playList: [{ //播放列表默认值
      al: {
        id: 3451497,
        name:"遊情BEST",
        pic: 109951166201350060,
        picUrl: "https://p1.music.126.net/CMIot85QdsoE0N23jtJVJA==/109951166201350061.jpg",
        pic_str: "109951166201350061"
      },
      id: 41654876,
      name: "船上の音楽団",
      ar:[{
        name: "遊助"
      }]
    }],
    playListIndex:0,//默认下标
    isbtnShow:true,//暂停按钮的显示
    detailShow:false,//歌曲详情页
    lyricList:{},//歌词
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否显示
    
  },
  getters: {},
  mutations: {
    //更改按钮图标
    updatedIsbtnShow(state,value) {
      state.isbtnShow=value
    },
        //更改按钮音乐列表
    updatePlayList(state,value){
      state.playList=value
      // console.log(state.playList)
    },
            //更改按钮音乐下标
    updatePlayListIndex:function(state,value){
      state.playListIndex=value
    },
    updateDetailShow(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList(state,value){
      state.lyricList=value
    },
    updateCurrentTime(state,value){
      // console.log(state.currentTime);
        state.currentTime=value
    },
    updateDuration(state,value){
      state.duration=value
    },
    pushPlayList(state,vale){
      state.playList.push(vale)
    },
    updateIsLogin(state,value){
      state.isLogin=true
    }
  },
  //异步请求
  actions: {
    getLyric:async function(context,value){
            let res=await getMusicLyric(value)
            // console.log(res);
            context.commit("updateLyricList",res.data.lrc)
    },
    getCaptcha:async function(context,value){
      let res=await getCaptcha(value);
      console.log(res);
    },
    getLogin:async function(context,value){
      let res=await  getLogin(value);
      console.log(res);
      return res
    }
  },
  modules: {}
})