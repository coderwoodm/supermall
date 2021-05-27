<!-- -->
<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.image" alt="">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props:{
      recommends: {
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

    }
  }
</script>
<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 15px 0px 30px;
    border-bottom: 10px solid #eee;
  }
  .recommends-item{
    flex: 1;
  }
  .recommends-item img{
    width: 70px;
    margin-bottom: 10px;
  }  
</style>