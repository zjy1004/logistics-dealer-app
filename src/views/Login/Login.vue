
<template>
  <div class="login">
    <div class="bg-con"></div>
    <div class="form-con">
      <div class="account-con">
        <input type="text" @input="inputUserName" v-model="form.account" placeholder="请输入用户名">
        <div class="account-icon"></div>
      </div>
      <div class="pass-con">
        <input type="password" v-model="form.password" placeholder="请输入密码">
        <div class="password-icon"></div>
      </div>
      <!-- <div class="remeber-con">
        <input type="checkbox" v-model="form.remeberPass"/><span>记住密码</span>
      </div> -->
      <!-- <div class="register-con">
        <div class="register-user" @click="toRegisterUser()">注册新用户</div>
      </div> -->
      <div class="agreeTerms" @click="agreeTerms">登录表示同意<span>《平台网站注册服务协议》</span></div>
    </div>
    <div class="submit-con1">
      <div class="submit-con" @click="login()">登录</div>
    </div>
    <!-- <group>
      <x-input title="用户名:" v-model="form.account" placeholder="请输入用户名"></x-input>
    </group>
    <group>
      <x-input title="密码:" type="password" v-model="form.password" placeholder="请输入密码"></x-input>
    </group> -->
    <!-- <x-button type="primary" @click.native="login()">登录</x-button> -->
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import LoginAjax from '@/api/Login/Login'
// import MyCenterAjax from '@/api/MyCenter/MyCenter'
import { setTimeout } from 'timers'
// 安卓和ios获取缓存信息回调函数
window.setXXXaccount = (account) => {
  if (account !== 'null' && account !== null) {
    page.form.account = account
  }
  if (page.form.password !== '') {
    page.login()
  }
}
window.setXXXpassword = (password) => {
  if (password !== 'null' && password !== null) {
    page.form.password = password
  }
  if (page.form.account !== '') {
    page.login()
  }
}
window.accountCallBack = (account) => {
  if (account !== 'null' && account !== null) {
    page.form.account = account
  }
  if (page.form.password !== '') {
    page.login()
  }
}
window.passwordtCallBack = (password) => {
  if (password !== 'null' && password !== null) {
    page.form.password = password
  }
  if (page.form.account !== '') {
    page.login()
  }
}
let page
export default {
  name: 'Login',
  data () {
    return {
      phoneType: '',
      form: {
        account: '',
        password: ''
        // remeberPass: false
      },
      showPositionValue: false
    }
  },
  components: {
    Group,
    XInput,
    XButton
  },
  created () {
    page = this
    this.getPhoneInfo()
  },
  mounted () {

  },
  methods: {
    inputUserName () {
      this.form.password = ''
    },
    agreeTerms () {
      this.$router.push({name: 'ClauseDetail', query: {protocolName: '中驰车福物流云平台网站注册服务协议', protocolType: 1}})
    },
    toRegisterUser () {
      this.$router.push({name: 'RegisterUser', query: {from: 'login'}})
    },
    // 登录
    login () {
      if (this.form.account === '' && this.form.password !== '') {
        this.$vux.toast.show({
          type: 'warn',
          text: '请输入用户名'
        })
      } else if (this.form.account !== '' && this.form.password === '') {
        this.$vux.toast.show({
          type: 'warn',
          text: '请输入密码'
        })
      } else if (this.form.account === '' && this.form.password === '') {
        this.$vux.toast.show({
          type: 'warn',
          text: '用户名和密码不能为空'
        })
      } else {
        LoginAjax.Login({account: this.form.account, password: this.form.password, loginType: 3}).then((response) => {
          if (response.code === 200) {
            if (this.getPhoneTypeStr() === 'Android') {
              if (window.android && window.android.setXXX) {
                window.android.setXXX('account', this.form.account)
                window.android.setXXX('password', this.form.password)
              }
            } else { // ios
              if (window.iOSApp && window.iOSApp.setUserAccount) {
                window.iOSApp.setUserAccount(this.form.account)
                window.iOSApp.setUserPassword(this.form.password)
              }
            }
            let token = response.data.token
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('userInfo', JSON.stringify(response.data))
            // MyCenterAjax.queryUserInfo({userId: response.data.userId}).then((response) => {
            //   if (response.code === 200) {
            //     debugger
            //     if (response.data) {
            //       sessionStorage.setItem('driverInfo', JSON.stringify(response.data))
            //     }
            //   }
            // })
            this.$router.push({name: 'Index', query: {showPage: 2}})
            LoginAjax.QueryUserState().then((res) => {
              if (res.code === 200) {
                if (response.data.firstLogin === 0) {
                  this.$router.push({name: 'FirstChangePwd'})
                } else {
                  if (response.data.companyType === 6) { // 修理厂端
                    this.$router.push({name: 'Index', query: {showPage: 4}})
                  } else {
                    this.$router.push({name: 'Index', query: {showPage: 2}})
                  }
                }
              }
            })
          } else {
            this.$vux.toast.show({
              type: 'warn',
              text: `${response.message}`
            })
          }
        }).catch((err) => {
          this.$vux.toast.show({
            type: 'warn',
            text: `${err.message}`
          })
          console.clear()
        })
      }
    },
    getPhoneInfo () {
      if (this.getPhoneTypeStr() === 'Android') {
        this.getAndroidCache()
      } else {
        setTimeout(() => {
          this.getIosCache()
        }, 2000)
      }
    },
    // 安卓获取缓存账号密码
    getAndroidCache () {
      try {
        if (window.android) {
          window.android.getXXX('account')
          window.android.getXXX('password')
        }
      } catch (error) {
        console.log(error)
        this.$vux.toast.show({
          type: 'warn',
          text: `${error}`
        })
      }
    },
    // ios获取缓存账号密码
    getIosCache () {
      try {
        if (window.iOSApp) {
          window.iOSApp.getUserAccount()
          window.iOSApp.getUserPassword()
        }
      } catch (error) {
        console.log(error)
        this.$vux.toast.show({
          type: 'warn',
          text: `${error}`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.login{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  .bg-con{
    width: 750px;
    height: 590px;
    background: url('../../image/login-bg.png') no-repeat;
    background-size:  100% 100%;
  }
  .form-con{
    width: 750px;
    height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    .account-con,.pass-con{
      position: relative;
      height: 80px;
      width: 600px;
      /* display: flex;
      justify-content: center;
      align-items: center; */
    }
    .account-con{
      margin-bottom: 30px;
    }
    .account-icon,.password-icon{
      width: 32px;
      height: 40px;
      position: absolute;
      left: 0px;
      top: 20px;
    }
    .account-icon{
      background: url('../../image/account-icon.png') no-repeat;
      background-size:  100% 100%;
    }
    .password-icon{
      background: url('../../image/password-icon.png') no-repeat;
      background-size:  100% 100%;
    }
    input{
      width: 600px;
      height: 80px;
      outline: none;
      border: none;
      margin: 0;
      padding: 0;
      text-indent: 60px;
      font-size: 28px;
      border-bottom: 1px solid rgba(229,229,229,1);
    }
    .remeber-con{
      height: 60px;
      width: 600px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      input{
        width: 30px;
        height: 30px;
      }
      span{
        margin-left: 15px;
        .mixin-sc(28px;#333);
      }
    }
    .register-con {
      height: 60px;
      width: 600px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      // margin-top: 10px;
      .register-user {
        width: 30%;
        height: 60px;
        line-height: 60px;
        font-size: 26px;
        text-align: right;
        color: #4d64fd
      }
    }
    .agreeTerms{
      width: 600px;
      height: 60px;
      line-height: 60px;
      margin-top: 20px;
      .mixin-sc(26px;#606266);
      span{
        .mixin-sc(26px;#f00);
      }
    }
  }
  .submit-con{
    width: 668px;
    height: 88px;
    background: #fff;
    margin: 70px auto 0px;
    // margin-top: ;
    // background: url('../../image/login-btn.png') no-repeat;
    // background-size:  100% 100%;
    background: #4d64fd;
    color: #fff;
    border-radius: 44px;
    line-height: 88px;
    text-align: center;
    font-size: 32px;
  }
  .submit-con1{
    flex: 1;
    background: #fff;
  }
}
</style>
