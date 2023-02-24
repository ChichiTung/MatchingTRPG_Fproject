  <!-- rules 要再修 -->
  <n-form
    :model="order"
    label-placement="top"
    style="background-color: #F8E9DD; border-radius: 15px; padding: 2%;"
    @submit.prevent="submitClick"
  >
    <n-grid cols="6 l:12" item-responsive responsive="screen" x-gap="30">

      <n-form-item-gi span="12">
        <n-divider
          title-placement="left"
          style="--n-color: #5d8585; --n-text-color: #5d8585; margin: -8vh 0 -10vh 0;"
        >
          <h2 v-if="order._id.length <= 0" style="text-align: center;  width: 100%;">模組報名中</h2>
        </n-divider>
      </n-form-item-gi>

      <!-- 劇本名字 -->
      <n-form-item-gi span="xs:9 m:6 l:6" label="模組名稱" path="m_name">
        <n-input v-model:value="order.m_name" placeholder="" type="text" />
      </n-form-item-gi>

      <!-- 建議人數 -->
      <n-form-item-gi span="xs:6 m:3 l:3" label="PL 人數" path="pl">
        <n-input-number v-model:value="order.pl" :disabled="disabled" :default-value="module.pl" clearable>
          <template #suffix>
            <div style="margin-left:-50px; padding-right: 60px;">
              人
            </div>
          </template>
        </n-input-number>
      </n-form-item-gi>

      <!-- 玩家資料 -->
      <n-form-item-gi span="xs:9 m:6 l:6" label="PL資料" path="pl_nickname">
        <n-input v-model:value="order.pl_nickname" placeholder="req.user.nickname" type="text" />
      </n-form-item-gi>

      <!-- 玩家資料-DC -->
      <n-form-item-gi span="xs:9 m:6 l:6" label="PL資料 DC帳號" path="pl_dc_account">
        <n-input v-model:value="order.pl_dc_account" placeholder="req.user.dc_account" type="text" />
      </n-form-item-gi>

      <!-- 玩家資料-DC -->
      <n-form-item-gi span="xs:9 m:6 l:6" label="PL資料 DC_id" path="pl_dc_id">
        <n-input v-model:value="order.pl_dc_account" placeholder="req.user.dc_id" type="text" />
      </n-form-item-gi>

      <!-- dateTime -->
      <n-form-item-gi span="xs:6 m:3 l:3" label="date" path="datetimeValue">
        <n-date-picker v-model:value="order.date" type="datetime" />
      </n-form-item-gi>

      <!-- 取消 -->
      <n-gi span="2">
        <div style="display: flex; justify-content: flex">
          <n-button
            type="error" ghost
            :disabled="form.loading"
            round size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw;"
          >
            <!-- @click="order.showModal = false" -->
            取 &nbsp;&nbsp; 消
          </n-button>

        </div>
      </n-gi>

      <!-- 存檔紐 -->
      <n-gi span="2">
        <div style="display: flex; justify-content: flex">
          <n-button
            :disabled="order.loading"
            round type="primary" size="large" style="width: 12vw; height: 3vw; font-size: 1.5vw;"
            attr-type="submit" @keydown.enter.prevent
          >
            存 &nbsp;&nbsp; 檔
          </n-button>

        </div>
      </n-gi>

    </n-grid>
  </n-form>
