<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <router-view>
          </router-view>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style lang="scss">
body
  {
  // : hiddden !important;
  overflow-y: scroll !important;
  overflow-x: hidden;
  }
</style>
