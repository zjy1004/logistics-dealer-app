
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
      <div class="remeber-con">
        <input type="checkbox" v-model="form.remeberPass" @change="remeberChange(form.remeberPass)"/><span>记住密码</span>
      </div>
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
import MyCenterAjax from '@/api/MyCenter/MyCenter'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        account: '',
        password: '',
        remeberPass: false
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
    if (this.getCookie('user') && this.getCookie('pswd')) {
      this.form.account = this.getCookie('user')
      this.form.password = this.base64decode(this.getCookie('pswd'))
      this.form.remeberPass = true
    }
    this.getPhoneInfo()
  },
  methods: {
    inputUserName () {
      this.form.password = ''
    },
    remeberChange (val) {
      if (!val) {
        this.delCookie('user')
        this.delCookie('pswd')
      }
    },
    agreeTerms () {
      this.$router.push({name: 'ClauseDetail', query: {protocolName: '中驰车福物流云平台网站注册服务协议', protocolType: 1}})
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
            if (this.form.remeberPass) {
              this.setCookie({name: 'user', value: this.form.account, day: 7}) // 保存帐号到cookie，有效期7天
              this.setCookie({name: 'pswd', value: this.base64encode(this.form.password), day: 7}) // 保存密码到cookie，有效期7天
            }
            let token = response.data.token
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('userInfo', JSON.stringify(response.data))
            this.$vux.toast.show({
              type: 'success',
              text: '登录成功！'
            })
            MyCenterAjax.queryUserInfo({userId: response.data.userId}).then((response) => {
              if (response.code === 200) {
                if (response.data) {
                  sessionStorage.setItem('driverInfo', JSON.stringify(response.data))
                }
              }
            })
            LoginAjax.QueryUserState().then((res) => {
              if (res.code === 200) {
                if (response.data.firstLogin === 0) {
                  this.$router.push({name: 'FirstChangePwd'})
                } else {
                  this.$router.push({name: 'Index'})
                }
                // if (res.data === 3) {
                //   if (response.data.firstLogin === 0) {
                //     this.$router.push({name: 'FirstChangePwd'})
                //   } else {
                //     this.$router.push({name: 'Index'})
                //   }
                // } else {
                //   if (response.data.firstLogin === 0) {
                //     this.$router.push({name: 'FirstChangePwd'})
                //   } else {
                //     this.$router.push({name: 'Index'})
                //   }
                // }
              }
            })
          } else {
            this.$vux.toast.show({
              type: 'warn',
              text: response.message
            })
          }
        }).catch((err) => {
          this.$vux.toast.show({
            type: 'warn',
            text: err.message
          })
          console.clear()
        })
      }
    },
    isCompatibilityPhone (navigator) {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    },
    getPhoneInfo () {
      let app = navigator.appVersion
      // 根据括号进行分割
      let left = app.indexOf('(')
      let right = app.indexOf(')')
      let str = app.substring(left + 1, right)
      // console.log(str+'裁剪过后的')
      let Str = str.split(';')
      // 手机型号--苹果 iPhone
      let mobileIphone = Str[0]
      // 手机型号--安卓
      let mobileAndroid = Str[2]
      // 红米手机等特殊型号处理 匹配字符
      let res = /Android/
      let reslut = res.test(mobileAndroid)
      // 根据设备型号判断设备系统
      if (mobileIphone === 'iPhone') {
        let isX = this.isCompatibilityPhone(navigator)
        console.log(isX)
        console.log('访问设备型号' + mobileIphone + '系统版本' + Str[1].substring(4, 19))
      } else if (mobileAndroid === 'Linux') {
        if (reslut) {
          console.log('访问设备型号' + Str[4].substring(0, 9) + '系统版本' + Str[2])
        } else {
          console.log('访问设备型号' + mobileAndroid.substring(0, 9) + '系统版本' + Str[1])
        }
      } else if (mobileIphone === 'iPad') {
        console.log('访问设备' + Str[0] + '系统版本' + Str[1].substring(4, 12))
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
