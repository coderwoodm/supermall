<!-- -->
<template>
  <div class="detail-swiper">
    <swiper class="aswiper">
      <swiper-item v-for="item in topImages">
        <img :src="item"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: 'DetailSwiper',
    props: {
      topImages:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data:()=>({

    }),
    created(){

    },
    methods:{

    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>
<style scoped>
  .aswiper{
    overflow: hidden;
    height:300px
  }
</style>