<template>
    <div class="login">
              <span @click="$router.go(-1)">
              <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      </span>
        <span>用户登录</span><br>
        <input type="text" name="phone" placeholder="请输入账号" v-model="phone"><br>
        <button type="submit" class="btn" @click="getCaptcha">获取验证码</button>
                <input type="text" name="password" placeholder="验证码" v-model="captcha"><br>
         <button type="submit" class="btn" @click="getLogin">登录</button>               
    </div>
</template>

<script>
export default {
    data() {
        return {
            phone:'',
            captcha:''
        }
    },
    methods: {
        getCaptcha:function(){
            this.$store.dispatch('getCaptcha',{phone:this.phone})
        },
            getLogin:async function(){
            let res= await this.$store.dispatch('getLogin',{phone:this.phone,captcha:this.captcha})
            console.log(res);
            if(res.data.code===200){
                this.$store.commit('updateIsLogin',true)
                this.$router.push('/User')
            }else{
                alert("验证码错误")
            }
        }
    },
}
</script>

<style lang="less">
    .login{
display: flex;
flex-direction: column;
align-items: center;
input{
    margin: 20px;
}
    }
</style>