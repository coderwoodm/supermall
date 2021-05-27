<!-- -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',

    props:{
      probeType:{
        type: Number,
        default(){
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default(){
          return false
        }
      }
    },

    data:()=>({
      scroll: null
    }),
    created(){

    },
    mounted(){

      //1,new一个BScroll实例对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
        // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
        // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
        // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
        probeType: this.probeType,

        //pullUpLoad: 触发时机：当底部下拉距离超过阈值
        pullUpLoad: this.pullUpLoad,
        
        click: true
      })

      //监听滚动事件
      this.scroll.on('scroll',(position) => {

        //滑轮的位置
        // console.log(position);
        this.$emit("scroll", position)
      })

      //监听底部下拉距离超过阈值
      this.scroll.on('pullingUp',() => {
        // console.log("上拉加载更多...");
        this.$emit('pullingUp')
        // setInterval(() => {
          // this.scroll.finishPullUp();
        // },2000)
      })

      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // console.log("滚到底部");
        })
      }
    },
    methods:{
      scrollTo( x, y, time=800 ){
        this.scroll.scrollTo(x, y, time);
      },
      refresh(){
        // console.log("---");
        this.scroll && this.scroll.refresh();
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      // 获取当前scrollY的值
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      },

    },
    components:{

    }
  }
</script>
<style scoped>

</style>