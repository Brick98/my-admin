<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <b>{{food}}</b>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
    <button @click="login">登录</button>
    <button @click="getInfo">请求数据</button>
    <button @click="handleLogout">退出登录</button>
    <Row :gutter="5" class="row-wrapper">
      <i-col span="8">a</i-col>
      <i-col span="8">b</i-col>
      <i-col span="8">c</i-col>
    </Row>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { getUserInfo, login } from '@/api/user'
import { mapActions } from 'vuex'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  },
  // 渲染前
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm)
    })
  },
  // 离开前
  beforeRouteLeave (to, from, next) {
    console.log(this)
    const leave = confirm('您确定要离开吗?')
    if (leave) next()
    else next(false)
  },
  methods: {
    ...mapActions(['logout']),
    handleClick (type) {
      if (type === 'back') this.$router.back()
      else if (type === 'push') {
        // const name='xz';
        this.$router.push({
          // path:`/argu/${name}`,

          name: 'argu',
          params: {
            name: 'xz'
          }

          // query:{
          //   name:'xz'
          // },

        })
      } else if (type === 'replace') {
        this.$router.replace({
          name: 'parent'
        })
      }
    },
    getInfo () {
      getUserInfo({ userId: 21 }).then(res => {
        console.log(res)
      })
    },
    login () {
      login()
    },
    handleLogout () {
      this.logout()
      this.$router.push({ name: 'login' })
    }

  }
}
</script>
<style lang="less">
.home{
  .ivu-col{
    background: palegoldenrod;
    background-clip: content-box;
  }
}
</style>
