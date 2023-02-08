<template>
  <n-config-provider :theme-overrides="themeOverrides_admin" :breakpoints="{ xs: 0, s: 576, m: 768, l: 992, xl: 1200, xxl: 1400 }">
    <div class="bg_admin" style="background-color: #F8E9D6;top: 0; position: absolute;">
      <div id="navbar_admin" >
        <img src="url('../../image/TRPG_LOGO_2.jpg" alt="logo" class="logo">
        <div id="login">
        <!-- <n-menu :options="menuOptions" /> -->

        </div>
      </div>
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
  DataBarHorizontal20Filled
} from '@vicons/fluent'

import { dateZhCN } from 'naive-ui';
// import { themeOverrides } from '../theme.ts'
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

      Form:{
      labelTextColor: '#2F4F40BB',
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
        railWidthLarge:'60px'
      }
    }

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'modulesedit'
          }
        },
        { default: () => '模組上架' }
      ),
    key: 'go-back-home',
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
      themeOverrides_admin
    }
  }
})
</script>

<style lang="scss">
#navbar_admin {
  img {
    position: absolute;
    top: 1%;
    width: 20vw;
  }
}

</style>