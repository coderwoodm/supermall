<!-- -->
<template>
  <div id="home">

    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
      <!-- 标题栏 -->
    <tab-control class='tab-control' 
                  :titles="['流行','新款','精选']" 
                  @tabClick="tabClick"
                  ref="tabControl1"
                  v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll" 
            :probe-type="3" 
            :pull-up-load="true" 
            @scroll="contentScroll"
            @pullingUp="loadMore">
      
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      
      <!-- 本周流行 -->
      <feature-view></feature-view>
      
      <!-- 标题栏 -->
      <tab-control :titles="['流行','新款','精选']" 
                   @tabClick="tabClick"
                   ref="tabControl2"/>
                   
      
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>

    </scroll>

    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>


  // 封装的轮播图
  import HomeSwiper from './childComps/HomeSwiper'
  // 推荐
  import RecommendView from './childComps/RecommendView'
  // 本周流行
  import FeatureView from './childComps/FeatureView'


  // 导航栏
  import NavBar from 'components/common/navbar/NavBar'
  // 标题栏
  import TabControl from 'components/content/tabControl/TabControl'
  // 滑轮
  import Scroll from 'components/common/scroll/Scroll'
  // 底部
  import BackTop from 'components/content/backTop/BackTop'

  // 数据请求
  import { getHomeMultidata,getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils';
  // 商品组件
  import GoodsList from 'components/content/goods/GoodsList'

  export default {
    name: 'home',
    data:()=>({ 
      banners: [],
      recommends: [],
      goods: {
        "pop" : {page: 0, list: []},
        "new" : {page: 0, list: []},
        "sell" : {page: 0, list: []},
      },
      currentType: "pop",
      isShowBackTop: false,
      offsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }),
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
      // console.log(this.saveY);
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
      // console.log(this.saveY);
    },
    created(){

      //  调用方法请求多种数据
      this.getHomeMultidata();

      //  调用请求商品的接口
      this.getHomeGoods("pop");
      this.getHomeGoods("sell");
      this.getHomeGoods("new");

    },
    mounted(){

      // 监听图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on("itemImageLoad", () => {
        refresh();
      })
    },
    methods:{

      /**
       * 事件监听的相关方法
       */
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // 回到顶部
      backClick(){
        this.$refs.scroll.scrollTo(0,0,800);
      },

      //监听滚动的位置
      contentScroll(position){

        // 1,判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000

        // 2,决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.offsetTop;
      },
      
      // 加载更多方法
      loadMore(){

        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad(){
        // 获取tabControl的offsetTop
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 监听网路请求相关的方法
       */ 

      //  1,请求多个数据的方法封装
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      //  2,请求商品数据的方法
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {

          // es6,将整个数组push到指定数组中
          this.goods[type].list.push(...res.data.list)

          //页数加一
          this.goods[type].page += 1;

          //完成加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {

      //显示数据的计算属性
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    }
  }
</script>
<style scoped>
  #home{
    /* padding-top: 44px;
    padding-bottom: 52px; */
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
 .home-nav{
   background: var(--color-tint);
   color: white;
   position: relative;
   z-index: 10;
 }
 .tab-control{
    position: relative;
    z-index: 9;
    background: white;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
</style>