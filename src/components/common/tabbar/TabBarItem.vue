<!-- -->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon" ></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>  
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>

export default {
  name: '',
  props:{
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data:()=>({
  }),
  computed: {
    isActive(){

      //判断当前活动的路由路径是否等于当前传递的路径
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  created(){
  
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  components:{

  }
}
</script>
<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    padding-top: 3px;
    box-sizing: border-box;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>