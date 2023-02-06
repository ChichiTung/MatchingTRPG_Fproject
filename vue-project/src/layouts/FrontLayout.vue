<template>
  
    <n-config-provider>
      <n-space justify="space-between" style="margin: 3vh 2vw;">
        <img src="url('../../image/TRPG_LOGO.png" alt="logo" class="logo">
        <n-button @click="activate('right')" text
      style="margin-top: 50%; margin-left: -100% ;"
        >
      <!-- DataBarHorizontal20Filled -->
          <n-icon size="40" color="#F8E9D6">
            <DataBarHorizontal20Filled />
          </n-icon>
        </n-button>
      </n-space>
  <n-drawer v-model:show="active" :width="350" :placement="placement" auto-focus block-scroll 
  style=" background: rgba(47,79,79, 0.9)">
    <n-drawer-content closable>
      <n-menu :options="menuOptions"/>
    </n-drawer-content>
  </n-drawer>

  <!-- !!!!!!! -->
  <router-view></router-view>
  </n-config-provider>
</template>

<script lang="ts">
import { NConfigProvider } from 'naive-ui'
import { defineComponent, h, Component, ref } from 'vue'
import { NIcon } from 'naive-ui'
import type { DrawerPlacement } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  LaptopOutline as WorkIcon,
  LogOutOutline as HomeIcon
} from '@vicons/ionicons5'
import {
  DataBarHorizontal20Filled
} from '@vicons/fluent'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
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
      DataBarHorizontal20Filled
    }
  }
})
</script>

<style>
body {
  background-color: #2F4F4F;
}
.n-base-icon svg {
    height: 2em;
    width: 2em;
    margin-top: -10px;
    color: #F9B02D}
.logo {
  width: 20%;
}



</style>