import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import UserInfo from '@/views/Mine/UserInfo'
import Setting from '@/views/Mine/Setting'
import EditPsd from '@/views/Mine/EditPsd'
import StatePage from '@/components/StatePage/StatePage'
import CashWithdrawalDetail from '@/views/CashWithdrawal/CashWithdrawalDetail'
import RecordOfTotalWithdrawalAmount from '@/views/CashWithdrawal/RecordOfTotalWithdrawalAmount'
import RecordOfTotalCollectingGoods from '@/views/CashWithdrawal/RecordOfTotalCollectingGoods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      redirect: '/waybill',
      name: 'Index',
      component: () => import('@/views/Index/Index')
    },
    {
      path: '/firstChangePwd',
      name: 'FirstChangePwd',
      component: () => import('@/views/FirstChangePwd/FirstChangePwd')
    },
    {
      path: '/tuoPayRegister',
      name: 'TuoPayRegister',
      component: () => import('@/views/TuoPayRegister/TuoPayRegister')
    },
    {
      path: '/bindCard',
      name: 'BindCard',
      component: () => import('@/views/BindCard/BindCard')
    },
    {
      path: '/reBind',
      name: 'ReBind',
      component: () => import('@/views/BindCard/ReBind')
    },
    {
      path: '/treasure',
      name: 'Treasure',
      component: () => import('@/views/Treasure/Treasure')
    },
    {
      path: '/withdraw-deposit',
      name: 'WithdrawDeposit',
      component: () => import('@/views/Treasure/WithdrawDeposit/WithdrawDeposit')
    },
    {
      path: '/cart-total',
      name: 'CartTotal',
      component: () => import('@/views/Treasure/WithdrawDeposit/subpage/CartTotal/CartTotal')
    },
    {
      path: '/waybill',
      name: 'Waybill',
      component: () => import('@/views/Waybill/Waybill')
    },
    {
      path: '/moreWaybill',
      name: 'MoreWaybill',
      component: () => import('@/views/Waybill/MoreWaybill')
    },
    {
      path: '/waybillDetail',
      name: 'WaybillDetail',
      component: () => import('@/views/Waybill/WaybillDetail')
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/views/Mine/Mine')
    },
    {
      path: '/clause-detail',
      name: 'ClauseDetail',
      component: () => import('@/views/Mine/ClauseDetail')
    },
    {
      path: '/more',
      name: 'More',
      component: () => import('@/views/Mine/More')
    },
    {
      path: '/cardBag',
      name: 'CardBag',
      component: () => import('@/views/Mine/CardBag')
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/editPsd',
      name: 'EditPsd',
      component: EditPsd
    },
    {
      path: '/statePage',
      name: 'StatePage',
      component: StatePage
    },
    {
      path: '/cashWithdrawalDetail',
      name: 'CashWithdrawalDetail',
      component: CashWithdrawalDetail
    },
    {
      path: '/recordOfTotalWithdrawalAmount',
      name: 'RecordOfTotalWithdrawalAmount',
      component: RecordOfTotalWithdrawalAmount
    },
    {
      path: '/recordOfTotalCollectingGoods',
      name: 'RecordOfTotalCollectingGoods',
      component: RecordOfTotalCollectingGoods
    }
  ]
})
