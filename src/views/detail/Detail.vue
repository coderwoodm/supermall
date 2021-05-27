<!-- -->
<template>
  <div id="detail">

    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"/>
    <scroll class="conent" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <!-- <detail-comment-info :comment-info="commentInfo"></detail-comment-info> -->
    </scroll>
  </div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo' 
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  // import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'

  export default {
    name: 'Detail',
    data:()=>({
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
    }),
    created(){

      // 1,保存传过来的iid
      this.iid = this.$route.params.iid
      
      // 2,通过iid来请求数据
      getDetail(this.iid).then((res) => {

        const data = res.result;
        // 1,获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;

        // console.log(data);

        // 2,获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns,data.shopInfo.services)
      
        // 3,创建店铺的信息
        this.shop = new Shop(data.shopInfo)
      
        // 4, 保存商品详情的数据
        this.detailInfo = data.detailInfo;

        // 5,获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6,取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh();
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      // DetailCommentInfo,
      Scroll,
    }
  }
</script>
<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background: #ffffff;
    height: 100vh;
  }
  .conent{
    height: calc(100% - 44px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>