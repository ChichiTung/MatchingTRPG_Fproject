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
    },
    Button: {
      textColor: '#F8E9D6'
    }
    // ...
  }


// useUserStore().getUser()
</script>

<template>
  <v-app>
    <n-config-provider :date-locale="dateZhCN" :theme-overrides="themeOverrides">
      <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <router-view></router-view>
          </n-dialog-provider>
        </n-notification-provider>
        </n-message-provider>
      </n-loading-bar-provider>
  </n-config-provider>
  </v-app>
  </template>
  