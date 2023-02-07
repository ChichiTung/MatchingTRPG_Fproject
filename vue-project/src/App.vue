<script setup>
// import { useUserStore } from '@/stores/user'
import { NConfigProvider } from 'naive-ui'
/**
   * js 文件下使用这个做类型提示
   * @type import('naive-ui').GlobalThemeOverrides
   */

import { dateZhCN } from 'naive-ui';
// import { themeOverrides } from '../theme.ts'

const themeOverrides = {
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

      border: '2px',
      boxShadowFocus: '0 2px 5px 2px rgba(80,80,80,0.4)',
      // boxShadow: '0 0 8px 0 rgba(40,40,40,0.2)'
    },
    Form:{
      labelTextColor: '#C76828BB',
      labelFontWeight: 600,
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
      colorSuccess:'#e8808077',
      colorError:'#e8808077',
      colorWarning:'#e8808077',
      colorLoading:'#e8808077',

      // iconColorSuccess:'#63e2b7',
      // iconColorWarning:'#f2c97d',
      // iconColorError:'#e88080'
    }

    // ...
  }


// useUserStore().getUser()
</script>

<style>
  body {
    overflow-x: hidden;
    /* overflow-y: hidden; */
  }
</style>

<template>
    <n-config-provider :date-locale="dateZhCN" :theme-overrides="themeOverrides" :breakpoints="{ xs: 0, s: 576, m: 768, l: 992, xl: 1200, xxl: 1400 }">
      <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
          <router-view/>     
          <!-- </router-view> -->
          </n-dialog-provider>
        </n-notification-provider>
        </n-message-provider>
      </n-loading-bar-provider>
  </n-config-provider>
</template>
  