<template>
    <n-config-provider :theme-overrides="themeOverrides">
      <n-space justify="end">
      <n-button @click="activate('right')" text >
      <!-- DataBarHorizontal20Filled -->
        <n-icon size="40">
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

<script>
import { defineComponent, h, Component, ref } from 'vue'
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
import { NIcon } from 'naive-ui'
// import type { DrawerPlacement } from 'naive-ui'
// import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  LaptopOutline as WorkIcon,
  LogOutOutline as HomeIcon
} from '@vicons/ionicons5'
import {
  DataBarHorizontal20Filled
} from '@vicons/fluent'

const themeOverrides = {
  common: {
      primaryColor: '#FF0000'
    },
    Button: {
      textColor: '#FF0000'
    },
  BackTop: {
    iconColorHover: '#FFDA08FF',
    iconColorPressed: '#1E8260FF',
    textColor: 'rgba(244, 45, 45, 0.82)',
    iconColor: 'rgba(222, 33, 33, 0.82)'
  },
  Menu: {
    color: "#2F4F4FFF",
    groupTextColor: "rgba(252, 252, 252, 0.52)",
    itemColorHover: "rgba(249, 176, 45, 0.5)",
    itemTextColorActive: "#63e2b7",
    itemColorHoverInverted: "#0000"
  }
  }

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

// const menuOptions = [
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name: 'module'
//           }
//         },
//         { default: () => '劇本任務' }
//       ),
//     key: 'go-back-home',
//   },
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name: 'discussion'
//           }
//         },
//         { default: () => '探索者心得' }
//       ),
//     key: 'go-to-discussion',
//   },
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name: 'trpg'
//           }
//         },
//         { default: () => 'TRPG ?' }
//       ),
//     key: 'go-to-trpg',
//   },
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//           name: 'aboutus'
//           }
//         },
//         { default: () => '關於邁欽' }
//       ),
//     key: 'go-to-aboutUs',
//   },
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name:'register'
//           }
//         },
//         { default: () => '登入/註冊' }
//       ),
//     key: 'go-to-register',
//   },
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name:'user'
//           }
//         },
//         { default: () => '探索者檔案' }
//       ),
//     key: 'go-to-work',
//   },
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             name:'gm'
//           }
//         },
//         { default: () => 'GM 專區' }
//       ),
//     key: 'go-to-gm',
//   }
// ]

export default defineComponent({
  components: {
    DataBarHorizontal20Filled
  },
  setup () {
    const active = ref(false);
    const placement = ref("right");
    const activate = (place) => {
      active.value = true;
      placement.value = place;
    };
    return {
      active,
      placement,
      activate,
      menuOptions,
      DataBarHorizontal20Filled
    };
  }
});
</script>

<style>
.n-base-icon svg {
    height: 2em;
    width: 2em;
    margin-top: -10px;
    color: #F9B02D}
.n-menu .n-menu-item-content .n-menu-item-content-header a{
    font-size: 20px;
    color: #F8E9D6 !important;
    text-align: center;
    margin: auto;
}
.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled):hover::before {
    background-color: #F9B02D55;
}
</style>