<script lang="ts" setup>
// 主題
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
import { defineComponent, h, Component, ref } from 'vue'
import type { MenuOption, DrawerPlacement } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { DataBarHorizontal20Filled } from '@vicons/fluent'
import { LogOutOutline } from '@vicons/ionicons5'

// 獲得用戶狀態
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

// 主題
const themeOverrides: GlobalThemeOverrides = {
    common: {
      bodyColor: '#2F4F40',
      primaryColor: '#F8E9D6',
      primaryColorHover: '#F9B02D',
      primaryColorPressed:'#2F4F40',

      // font
      textColor1: '#F9B02D',
      textColor2: '#F8E9D6',
      textColor3: '#F8E9D677',

      // border-radius (輸入框)
      borderRadius: '15px'
    },
    Card:{
      boxShadow: ' 2% 2% 0 0 rgb(50,50,50),0.8'
    },
    Table:{
        thColor: '#F9B02D',
        thFontWeight: '800',
        thTextColor: '#2F4F40',

        tdColor: '#F8E9D6DD',
        tdColorStriped: '#F9B04488',
        tdTextColor:'#2F4F40',
      },
    Input :{
      color: '#E49E6F55',
      textColor: '#709148',
      colorFocus: '#F8E9D6',
      placeholderColor: '#E48966DD',
      countTextColor: '#709148',

      border: '2px',
      boxShadowFocus: '0 2px 5px 2px rgba(80,80,80,0.4)',
      // boxShadow: '0 0 8px 0 rgba(40,40,40,0.2)'
    },
    Form:{
      labelTextColor: '#C76828BB',
      labelFontWeight: '600',
      labelFontSizeTopMedium: '12px',
    },
    Button: {
      textColor: '#F8E9D6',
      color: '#F9B02D',
      fontWeight: '800'
    },
    Menu: {
      color: "#2F4F4FFF",
      itemColorActive: '#FFAC4D44',
      itemColorHover: '#F9B02D88',
      itemTextColor: '#F8E9D6',
      // itemTextColorActiveHover: ''
      
      itemTextColorActive: "#FFAC4DFF",
      itemTextColorActiveHover: "#FCD837FF"
    },
    Popconfirm:{
      iconSize: '10px',
    },
    Tooltip:{
      color: 'rgba(243, 221, 169, 1)',
    },
    Message:{
      iconSize: '10px',
      iconMargin: '8px 15px 0px 0px',
      textColorInfo: '#e8808088',
      
      color:'#e8808088',
      colorSuccess:'#e8808077',
      colorError:'#e8808077',
      colorWarning:'#e8808077',
      colorLoading:'#e8808077',

      // colorSuccess: '#2F4F40'

      // iconColorSuccess:'#63e2b7',
      // iconColorWarning:'#f2c97d',
      // iconColorError:'#e88080'
    }

    // ...
  }

  const user = useUserStore()
  const { isLogin, isAdmin, favorite } = storeToRefs(user)
  const { logout } = user

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'module'
          }
        },
        { default: () => '模組任務' }
      ),
    key: 'go-back-home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'discussion'
          }
        },
        { default: () => '探索者心得' }
      ),
    key: 'go-to-discussion',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'trpg'
          }
        },
        { default: () => 'TRPG ?' }
      ),
    key: 'go-to-trpg',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
          name: 'aboutus'
          }
        },
        { default: () => '關於邁欽' }
      ),
    key: 'go-to-aboutUs',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name:'login'
          }
        },
        { default: () => '登入/註冊' }
      ),
    key: 'go-to-login',
    show: !isLogin.value
  },
  {
    label: '探索者專區',
    key: 'userField',
    children: [
      {
        label: () =>
      h(
        RouterLink,
        {
         to: {
            name:'user-home'
          }
        },
         { default: () => '探索者檔案' }
      ),
    // key: 'hear-the-wind-sing',
      },
      {
        label: () =>
      h(
        RouterLink,
        {
         to: {
            name:'favorite'
          }
        },
         { default: () => '收藏庫' }
      ),
      },
      {
        label: () =>
      h(
        RouterLink,
        {
         to: {
            name:'orders'
          }
        },
         { default: () => '預約列表' }
      ),
      }
    ],
    show: isLogin.value
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name:'gm-home'
          }
        },
        { default: () => 'GM 專區' }
      ),
    key: 'go-to-gm',
    show: isLogin.value
  }
]

const active = ref(false)
    const placement = ref<DrawerPlacement>('right')
    const activate = (place: DrawerPlacement) => {
      active.value = true
      placement.value = place
    }

</script>

<style>
#navbar .logo {
  position: fixed;
  top: 2%;
  z-index: 100;
}
/* #navbar button {
  position: fixed;
  top: 6%;
  right: 3%;
  z-index: 100;
} */

.logo {
  width: 20%;
}
.n-menu-item {
  text-align: center;
}
</style>

<template>
  <div class="container" style="background-color: #2f4f40 ; position: fixed;">
    <n-config-provider :theme-overrides="themeOverrides" :breakpoints="{ xs: 0, s: 576, m: 768, l: 992, xl: 1200, xxl: 1400 }">
        <div id="navbar" >
          <img src="url('../../image/TRPG_LOGO.png" alt="logo" class="logo">

          <!-- 登出 -->
           <n-tooltip placement="left-start" trigger="hover" :show-arrow="false" style="background-color: #F8E9D6; color: #2f4f40;" v-if="isLogin">
            <template #trigger>
            <n-button @click="logout" text style="margin-right: 5%; position: fixed; top: 6%; right: 3%; z-index: 100;">
              <n-icon size="40" color="#F8E9D6">
                <LogOutOutline />
              </n-icon>
            </n-button>
            </template>
              登出
          </n-tooltip>
          <!-- 77777777777777777777777777777777 -->

          <n-button @click="activate('right')" text style="position: fixed;
  top: 6%;
  right: 3%;
  z-index: 100;">
      <!-- DataBarHorizontal20Filled -->
          <n-icon size="40" color="#F8E9D6">
            <DataBarHorizontal20Filled />
          </n-icon>
          </n-button>

          <n-drawer v-model:show="active" :width="350" :placement="placement" auto-focus block-scroll 
        style=" background: rgba(47,79,79, 0.9) ;position: fixed;
  top: 6%;
  right: 3%;
  z-index: 100;" >
          <n-drawer-content closable>
            <n-menu :options="menuOptions" accordian>
              <n-button quaternary round>
                Default
              </n-button>
            </n-menu>
          </n-drawer-content>
          </n-drawer>

          <!-- !!!!!!! -->
          <router-view></router-view>
        </div>
      </n-config-provider>
  </div>
</template>