<template>
  <router-view/>
<FooterMusic v-show="$store.state.isFooterMusic"/>
</template>
<script>
import  FooterMusic  from '@/components/item/FooterMusic.vue'
export default {
components:{
  FooterMusic
}
}
</script>


