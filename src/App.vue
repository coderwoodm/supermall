<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
import NavBar from 'components/common/navbar/NavBar';
export default {
  name: 'app',
  components: {
    MainTabBar,
    NavBar
  }
}
</script>

<style>
 @import "assets/css/base.css";
</style>
