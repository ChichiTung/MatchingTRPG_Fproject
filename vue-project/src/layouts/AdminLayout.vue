<template>
  <n-config-provider :theme-overrides="themeOverrides">
  <n-button-group>
    <n-button @click="activate('top')">
      上
    </n-button>
    <n-button @click="activate('right')">
      右
    </n-button>
    <n-button @click="activate('bottom')">
      下
    </n-button>
    <n-button @click="activate('left')">
      左
    </n-button>
  </n-button-group>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    </n-drawer-content>
  </n-drawer>
</n-config-provider>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const active = ref(false);
    const placement = ref("right");
    const activate = (place) => {
      active.value = true;
      placement.value = place;
    };

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
    return {
      active,
      placement,
      activate
    };
  }
});
</script>