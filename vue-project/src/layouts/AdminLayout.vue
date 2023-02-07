<template>
  <n-config-provider :theme-overrides="themeOverrides_admin" :breakpoints="{ xs: 0, s: 576, m: 768, l: 992, xl: 1200, xxl: 1400 }">
    <div class="bg" style="background-color: #F8E9D6;">
      <div id="navbar" >
        <img src="url('../../image/TRPG_LOGO_2.jpg" alt="logo" class="logo">
      <div id="login">
        <n-menu :options="menuOptions" />
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
      primaryColor: '#2F4F40',
      primaryColorHover: 'rgba(0,0,0)',
      primaryColorPressed:'#2F4F40',

      // font
      textColor1: '#F9B02D',
      textColor2: '#F9B02D',
      textColor3: '#F9B02D',

      // border-radius (輸入框)
      borderRadius: '15px'},
    Form:{
      labelTextColor: '#C76828BB',
      labelFontWeight: '600',
      labelFontSizeTopMedium: '12px',
    },
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

</style>