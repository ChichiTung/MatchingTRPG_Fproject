<script lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
import { defineComponent, h, Component, ref } from 'vue'
import { NIcon } from 'naive-ui'
import type { DrawerPlacement } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  DataBarHorizontal20Filled
} from '@vicons/fluent'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const themeOverrides: GlobalThemeOverrides = {
    // background-color: '#2F4F4F',
    common: {
      bodyColor: '#2F4F4F',
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
        { default: () => '劇本任務' }
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
            name:'register'
          }
        },
        { default: () => '登入/註冊' }
      ),
    key: 'go-to-register',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name:'user'
          }
        },
        { default: () => '探索者檔案' }
      ),
    key: 'go-to-work',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name:'gm'
          }
        },
        { default: () => 'GM 專區' }
      ),
    key: 'go-to-work',
  }
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
      activate,
      menuOptions,
      DataBarHorizontal20Filled,
      themeOverrides
    }
  }
})
</script>

<style>
/* body {
  background-color: #2F4F4F;
} */
#navbar img {
  position: fixed;
  top: 2%;
  z-index: 100;
}
#navbar button {
  position: fixed;
  top: 6%;
  right: 3%;
  z-index: 100;
}

.logo {
  width: 20%;
}
.n-menu-item {
  text-align: center;
}
</style>

<template>
<div class="container" style="background-color: #2F4F4F ; position: fixed;">
  <n-config-provider :theme-overrides="themeOverrides" :breakpoints="{ xs: 0, s: 576, m: 768, l: 992, xl: 1200, xxl: 1400 }">
      <div id="navbar" >
        <img src="url('../../image/TRPG_LOGO.png" alt="logo" class="logo">
        <n-button @click="activate('right')" text>
      <!-- DataBarHorizontal20Filled -->
          <n-icon size="40" color="#F8E9D6">
            <DataBarHorizontal20Filled />
          </n-icon>
        </n-button>
  <n-drawer v-model:show="active" :width="350" :placement="placement" auto-focus block-scroll 
  style=" background: rgba(47,79,79, 0.9)">
    <n-drawer-content closable>
      <n-menu :options="menuOptions"/>
    </n-drawer-content>
  </n-drawer>

  <!-- !!!!!!! -->
  <router-view></router-view>
      </div>
    </n-config-provider>
  </div>
</template>