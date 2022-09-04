<template>
    <div class="info-top">
        <img :src="userinfo.avatarUrl" alt="" class="profileimg">
        <h3>个人用户{{userinfo.nickname}}</h3>
    </div>
</template>

<script>
import {getuser} from '@/request/api/home.js'
import axios from 'axios'
import {reactive,onMounted} from 'vue'
export default {
    data() {
        return {
            userinfo:[]
        }
    },
    mounted() {
        
axios.get('http://localhost:3000/user/detail?uid=502807435').then((res)=>{
    this.userinfo=res.data.profile
    console.log(this.userinfo);
})
                  // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      //  state.images=res.data.banners

        

}
}
</script>

<style lang="less" scoped>
.info-top{
justify-content: center;
align-items: center;
    display: flex;
    width: 330px;
    height: 100px;
    background: #999;
    margin-top:20%;
    border: 1px solid #999;
    border-radius: 20px;
margin-left:20px ;
position: relative;
.profileimg{
    top: 10px;
    position: absolute;
    width: 1rem;
    height: 50px;
    border-radius:50% ;
}
}

</style>