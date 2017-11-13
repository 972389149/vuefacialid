import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import homepage from '@/pages/homepage'
import seestaff from '@/components/staff/seestaff'
import addstaff from '@/components/staff/addstaff'
import seedepartment from '@/components/department/seedepartment'
import departmentdetails from '@/components/department/departmentdetails'
import departmentattendance from '@/components/attendance/departmentattendance'
import staffattendance from '@/components/attendance/staffattendance'
import stafflist from '@/components/blacklists/stafflist'
import departmentlist from '@/components/blacklists/departmentlist'
import search from '@/components/search'
import homepagecenter from '@/components/homepagecenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
       path:'/homepage',
       name: 'homepage',
       component: homepage,
       children:[
        {
          path: '/seestaff',
          name: 'seestaff',
          component : seestaff
        },
        {
          path: '/addstaff',
          name: 'addstaff',
          component : addstaff
        },
        {
          path: '/seedepartment',
          name: 'seedepartment',
          component : seedepartment
        },
        {
          path: '/departmentdetails',
          name: 'departmentdetails',
          component : departmentdetails
        },
        {
          path: '/departmentattendance',
          name: 'departmentattendance',
          component : departmentattendance
        },
        {
          path: '/staffattendance',
          name: 'staffattendance',
          component : staffattendance
        },
        {
          path: '/stafflist',
          name: 'stafflist',
          component : stafflist
        },
        {
          path: '/departmentlist',
          name: 'departmentlist',
          component : departmentlist
        },
        {
          path: '/search',
          name: 'search',
          component : search
        },
        {
          path: '/',
          name: 'homepagecenter',
          component: homepagecenter
        },
        {
          path: '/homepagecenter',
          name: 'homepagecenter',
          component: homepagecenter
        }
       ]
    }
  ]
})
