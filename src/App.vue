<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link :to="{name:'home'}">Home</router-link> |
      <router-link :to="{name:'about'}">About</router-link>
    </div> -->
    <!-- <transition-group :name="routerTransition"> -->
    <!-- <transition-group name="router"> -->
      <router-view key="default" />
      <router-view key="email"
                   name="email" />
      <router-view key="tel"
                   name="tel" />
    <!-- </transition-group> -->

  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      routerTransition: ''
    }
  },
  watch: {
    '$route' (newRouter) {
      console.log(newRouter)
      this.UPDATE_ROUTER(newRouter)
      // to.query && to.query.transitionName && (this.routerTransition = to.query.transitionName)
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_ROUTER'
    ])
  }
}
</script>

<style lang="less">
html,body{
  height: 100%;
}
body{
  margin: 0;
}
// 进入
// 即将显示
.router-enter {
  opacity: 0;
}
//从无到有的过程
.router-enter-active {
  transition: opacity 3s ease;
}
//完全显示
.touter-enter-to {
  opacity: 1;
}
// 离开
// 即将离开
.router-leave {
  opacity: 1;
}
//从有到无的过程
.router-leave-active {
  transition: opacity 1s ease;
}
//完全离开
.router-leave-to {
  opacity: 0;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
@font-face {font-family: 'iconfont';
  src: url('./assets/font/iconfont.eot');
  src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/font/iconfont.woff') format('woff'),
  url('./assets/font/iconfont.ttf') format('truetype'),
  url('./assets/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  }
  .icon {
      width: 1em; height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }
</style>
