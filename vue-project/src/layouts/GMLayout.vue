<template>
  <n-config-provider :theme-overrides="themeOverrides_admin" :breakpoints="{ xs: 0, s: 576, m: 768, l: 992, xl: 1200, xxl: 1400 }">
    <div class="bg_admin" style="background-color: #F8E9D6;top: 0; position: absolute;">
      <div id="navbar_admin" >
        <img src="url('../../image/TRPG_LOGO_2.jpg" alt="logo" class="logo">
        <div id="menu_admin">
          <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
        </div>
        <!-- avatar -->
        <!-- <n-avatar round :size="48" src="avatar"    /> -->
      </div>
      <n-divider></n-divider>
      <router-view/>
    </div>
    </n-config-provider>
</template>

<script lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
import { defineComponent, h, Component, ref } from 'vue'
import { NIcon } from 'naive-ui'
import type { DrawerPlacement } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  DataBarHorizontal20Filled,
  HomePerson20Regular,
  DocumentBulletListClock24Regular
} from '@vicons/fluent'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const themeOverrides_admin: GlobalThemeOverrides = {
    common: {
      bodyColor: '#447788',
      primaryColor: '#548886ee',
      primaryColorHover: '#DDA492',
      primaryColorPressed:'#2F4F40',

      // font
      textColor1: '#F9B02D',
      textColor2: '#2F4F4088',
      textColor3: '#F9B02D',

      // border-radius (輸入框)
      borderRadius: '15px',
      inputColor: '#F9B055',
      placeholderColor: '#2F4F4F88'

      },
      Menu: {
      // color: "#2F4F4FFF",
      itemColorActive: '#FFAC4D44',
      itemColorHover: '#F9B02D88',
      itemTextColor: '#2F4F4F',
      
      // itemTextColorActiveHover: ''
      
      itemTextColorActive: "#FFAC4DFF",
      itemTextColorActiveHover: "#FCD837FF"
    },
    Upload:{
      draggerColor: '#FFAC4D44'

    },

      Form:{
      labelTextColor: '#2F4F4088',
      labelFontWeight: '800',
      labelFontSizeTopMedium: '1vw',
      },

      Input :{
      color: '#F9B02D75',
      textColor: '#709148',
      colorFocus: '#F8E9D6',
      placeholderColor: '#70914899',
      countTextColor: '#709148',

      border: '2px',
      boxShadowFocus: '0 2px 5px 2px rgba(80,80,80,0.4)',
      // boxShadow: '0 0 8px 0 rgba(40,40,40,0.2)'
    },
      Switch :{
        buttonHeightLarge: '30px',
        buttonWidthLarge:'30px',
        buttonWidthPressedLarge:'30px',
        railHeightLarge:'30px',
        railWidthLarge:'20px'
      },
      Divider: {
        color: '#F9B02D88',
      },
      Table:{
        thColor: '#385d4a',
        thFontWeight: '800',
        thTextColor: '#EEE',

        tdColor: '#F9B02D22',
        tdColorStriped: '#F9B04455',
        tdTextColor:'#2F4F40',
      }
      
    }

const menuOptions: MenuOption[] = [
   {
    label: () =>
      h(
        RouterLink,
       {
          to: {
            name: 'gm-home'
          }
        },
        { default: () => 'GM 專區首頁' }
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(HomePerson20Regular)
  },
  {
    label: '模組管理',
    key: 'modules_management',
    icon: renderIcon(BookIcon),
    // disabled: true,
    children: [
      {
        label: () =>
      h(
        RouterLink,
        {
         to: {
            name:'modulesedit',
            target: '_blank'
          }
        },
         { default: () => '模組上架' }
      ),
    // key: 'hear-the-wind-sing',
      },
      {
        label: () =>
      h(
        RouterLink,
        {
         to: {
            name:'modules',
            target: '_blank'
          }
        },
         { default: () => '模組庫' }
      ),
    key: 'hear-the-wind-sing',
      }
    ]
  },
  {
    label: '預約管理',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(DocumentBulletListClock24Regular),
    // disabled: true
  },
  {
    label: () =>
      h(
        RouterLink,
       {
          to: {
            name: 'home'
          }
        },
        { default: () => '探索者專區' }
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(HomePerson20Regular)
  },
]


  export default defineComponent({
  components: {
    DataBarHorizontal20Filled
  },
  setup () {
    const active = ref(false)
    const placement = ref<DrawerPlacement>('right')
    const activate = (place: DrawerPlacement) => {
      active.value = true
      placement.value = place
    }
    return {
      active,
      placement,
      activeKey: ref<string | null>(null),
      menuOptions,
      themeOverrides_admin
    }
  }
})
</script>

<style lang="scss">
.bg_admin {
  width: 100vw;

  #navbar_admin {
    display: flex;
    position: relative;
    // padding-bottom: 1%;

    img {
      width: 12vw;
      margin-top: 1%;
    }
    #menu_admin {
      margin-top: 2%;
      margin-left: 2%;
      svg {
        color: #f19e38;
      }

      a{
        color: #2F4F4FDD;
      }
      .n-menu-item-content-header{
        font-size: 16px;
        font-weight: 800;
        color: #2F4F4FDD;
      }
    }
    }
  }


</style>