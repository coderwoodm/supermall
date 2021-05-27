<!-- -->
<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imgeLoad"/>
        </a>
      </swiper-item>
    </swiper>
</template>
<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  
  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data:()=>({
      isLoad: false
    }),
    created(){

    },
    methods:{
      imgeLoad(){
        if (!this.isLoad) {
          this.$emit("swiperImageLoad")
          this.isLoad = true;
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>
<style scoped>

</style>