<template>
<TopNav/>
<SwpierTop/>
<MusicList/>
</template>

<script>

import TopNav from "@/components/home/TopNav.vue";
import SwpierTop from "@/components/home/SwpierTop.vue";
import MusicList from "@/components/home/MusicList.vue"
export default {
  name:"Home",
  components: {
    TopNav,
    SwpierTop,
    MusicList
  },
};
</script>
