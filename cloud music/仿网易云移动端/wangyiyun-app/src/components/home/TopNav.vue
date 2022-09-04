<template>
  <div class="topNav">

    <div class="left">
                <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <div class="topContent">
      <span @click="$router.push('/user')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="right" @click="$router.push('/search')">
          <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-Magnifier"></use>
      </svg>
    </div>
  </div>
  
</template>

<style lang="less" scoped>
    .topNav{
        height: 1rem;
        padding: 0.2rem;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .topContent{
            justify-content: space-around;
            width: 65%;
            display: flex;
            font-size:18px;
            .active{
                font-weight: 900;
            }
        }
        .right,.left{
          .icon{
                  width: 0.6rem;
      height: 0.6rem;
          }
        }
    }
</style>