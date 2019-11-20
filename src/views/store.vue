<template>
  <div>

    <!-- <a-input v-model="inputValue" /> -->
    <!-- <a-input :value="stateValue" @input="handleStateValueChange"/> -->
    <a-input v-model="stateValue" />
    <!-- <a-input @input="handleInput" /> -->
    <p>{{stateValue}} => lastLetter is {{inputValueLastLetter}}</p>
    <a-show :conent='inputValue' />
    <P>appName : {{appName}} appNameWithVersion : {{appNameWithVersion}}</P>
    <p>userName : {{userName}} => firstLetter {{firstLetter}}</p>
    <button @click="handleChangeAppName">修改AppName</button>
    <p>{{appVersion}}</p>
    <button @click="changeUsername">修改用户名称</button>
    <button @click="registerModule">动态添加模块</button>
    <p v-for="(item,index) in todoList" :key="index">{{item}}</p>
    <button @click="asyncUsage">async await的用法</button>
  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  components: {
    AInput,
    AShow
  },
  computed: {
    // ...mapState([
    //   'appName'
    // ])
    ...mapState({
      appName: state => state.appName,
      userName: state => state.user.userName,
      appVersion: state => state.appVersion,
      todoList: state => state.todo ? state.todo.todoList : []
      // stateValue: state => state.stateValue
    }),
    stateValue: {
      get () {
        return this.$store.state.stateValue
      },
      set (val) {
        this.SET_STATE_VALUE(val)
      }
    },
    // appName () {
    //   return this.$store.state.appName
    // },
    // userName () {
    //   return this.$store.state.user.userName
    // }
    // appNameWithVersion () {
    //   return this.$store.getters.appNameWithVersion
    // },
    ...mapGetters(['appNameWithVersion', 'firstLetter']),
    inputValueLastLetter () {
      return this.inputValue.substr(-1, 1)
    }
  },
  methods: {
    ...mapMutations([
      'SET_APP_NAME',
      'SET_USER_NAME',
      'SET_STATE_VALUE'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    handleInput (val) {
      this.inputValue = val
    },
    handleChangeAppName () {
      // this.$store.commit('SET_APP_NAME', 'newAppName')
      // this.SET_APP_NAME("newAppName");
      // this.$state.commit({
      //   type: 'SET_APP_NAME',
      //   param: 'newAppName'
      // })
      this.$store.commit('SET_APP_VERSION')
      this.updateAppName()
      // this.$store.dispatch('updateAppName','234')
    },
    changeUsername () {
      this.SET_USER_NAME('大小张')
    },
    registerModule () {
      this.$store.registerModule('todo', {
        state: {
          todoList: [
            '学习mutations',
            '学习actions'
          ]
        }
      })
    },
    handleStateValueChange (val) {
      this.SET_STATE_VALUE(val)
    },
    getInfo (resolve) {
      setTimeout(() => {
        resolve(1)
      }, 2000)
    },
    asyncUsage () {
      // var _self = this
      // async function foo () {
      //   var a = await new Promise((resolve) => {
      //     _self.getInfo(resolve)
      //   })
      //   console.log(`第二秒输出： ${a}`)

      //   try {
      //     var b = await new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         reject(2)
      //       }, 1000)
      //     })
      //   } catch (error) {
      //     console.log(`第三标输出： ${error}`)
      //   }
      //   var sleep = await new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve('sleep')
      //     }, 2000)
      //   })
      //   console.log(sleep)
      //   var c = await 3
      //   console.log(c)
      // }
      // foo()
      // function test (resolve, reject) {
      //   var timeOut = Math.random() * 2
      //   console.log('set timeout to: ' + timeOut + ' seconds.')
      //   setTimeout(function () {
      //     if (timeOut < 1) {
      //       console.log('call resolve()...')
      //       resolve('200 OK')
      //     } else {
      //       console.log('call reject()...')
      //       reject('timeout in ' + timeOut + ' seconds.')
      //     }
      //   }, timeOut * 3000)
      // }
      // new Promise(test).then(res => {
      //   console.log(res)
      // }).catch(error => {
      //   console.log(error)
      // })
      var p1 = new Promise((resolve) => {
        setTimeout(resolve, 500, { name: 'p1' })
      })
      var p2 = new Promise((resolve) => {
        setTimeout(resolve, 1000, { name: 'p2' })
      })
      Promise.all([p1, p2]).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
