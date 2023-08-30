<template>
  <div id="moduleView_bg">

    <div class="head">

      <h1 class="head_title">
        {{ module.name }}
        <p style="color:#F8E9DD; letter-spacing: 0.5rem;" class="gm"> GM: {{ module.gm }}</p>
      </h1>

      <div class="info_bar">
        <div class="column hexagon_1">
          <div class="column_title">難度</div>
          <div class="column_text">  {{ module.difficulty }}</div>

        </div>
        <div class="column hexagon_2">
          <div class="column_title">時長</div>
          <div class="column_text">  {{ module.minTime }}
            <span style="font-size: 0.5vw;">小時</span></div>

        </div>
        <div class="column hexagon_3">
          <div class="column_title">人數</div>
          <div class="column_text">  {{ module.pl }}</div>

        </div>

        <div id="attend" @click="showModal = true">
          <span style="position: absolute; top: 15%;right:20%;">報名</span>
        </div>

      </div>

    </div>
    <div id="head_img">
      <img :src="module.image" class="head_img_wrapper">
    </div>

    <div id="section2">

      <div id="content_info">
        <n-h1 align-text type="warning">
          <n-text style="color:#2F4F40; font-weight: 800;" strong>
            " 模組簡介 "
          </n-text>
        </n-h1>
        <p class="content_info">{{ module.info }}</p>
      </div>
      <img
        src="../../assets/matching_半身-01.png" class="cute_img"
      >

      <div id="content_notice">
        <n-h1 prefix="bar" align-text type="warning" style="margin-left: 3%;">
          <n-text style="color:#2F4F4055; font-weight: 800;" strong>
            NOTICE
          </n-text>
        </n-h1>
        <p class="content_notice">{{ module.notice }}</p>
      </div>

    </div>

    <!-- <n-divider /> -->

    <div id="gm_intro">
      <h2 class="gm_intro_title"> - About GM
        <span style="color: orange;">&nbsp; &nbsp;{{ module.gm }}</span> -</h2>
      <p class="gm_intro">
        重要的事先放在前面：
        妳各位 請禮貌地對待 PL 與 GM ！還有一定要守時啊啊啊啊！

        嗨，我是新手 GM 琪琪琪琪~ 目前帶過的本還沒有很多，請大家多多給我回饋，讓我能早日擺脫新手GM~
        目前主要以歐美本為主，正劇向長劇本居多，形式採語音團~
        歡迎各位新手、老手來報報~
      </p>

    </div>

    <div id="pl_orders">
      <h2 class="pl_orders_title">目前的預約</h2>

      <n-table id="favoriteTable" :single-line="false" striped style="margin-top: 5%; margin-bottom: 10%;" class="table">
        <thead>
          <tr>
            <th style="text-align: center; width: 30%;">日期</th>
            <th style="text-align: center;">HO : PL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center;">2/28</td>
            <td style="text-align: center;">HO:1 , {{ order.pl_nickname[0] }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">2/28</td>
            <td style="text-align: center;">HO:2 , 琪琪大人 </td>
          </tr>
        </tbody>
      </n-table>

    </div>
  </div>

  <n-modal v-model:show="showModal" :trap-focus="false" :mask-closable="false">
    <!-- rules 要再修 -->
    <n-form
      :model="form"
      label-placement="top"
      style="background-color: #F8E9DD; border-radius: 15px; padding: 2%; width: 60vw;"
      @submit.prevent="onApplyBtnClick"
    >
      <n-grid cols="6 l:12" item-responsive responsive="screen" x-gap="30">

        <n-form-item-gi span="12">
          <n-divider
            title-placement="left"
            style="--n-color: #5d8585; --n-text-color: #5d8585; margin: -8vh 0 -10vh 0;"
          >
            <h2 v-if="form._id.length <= 0" style="text-align: center;  width: 100%;"> {{ module.name }} &nbsp; 報名中</h2>
          </n-divider>
        </n-form-item-gi>

        <!-- 劇本名字 -->
        <n-form-item-gi span="xs:9 m:6 l:6" label="模組名稱" path="m_name">
          <n-input v-model:value="module.name" :default-value="module.name" type="text" disabled />
        </n-form-item-gi>

        <!-- 建議人數 -->
        <n-form-item-gi span="xs:6 m:3 l:3" label="想要的 HO" path="pl">
          <n-input-number v-model:value="form.ho" :default-value="1" clearable>
            <template #prefix>
              <div style="margin-right:-50px; padding-right: 60px; color: #2F4F4088">
                HO ：
              </div>
            </template>
          </n-input-number>
        </n-form-item-gi>

        <!-- 玩家資料 -->
        <n-form-item-gi span="xs:9 m:6 l:6" label="PL 頭像" path="pl_img">
          <n-image :src="user.image" width="120" />
        </n-form-item-gi>

        <!-- 玩家資料 -->
        <n-form-item-gi span="xs:9 m:6 l:6" label="PL 暱稱" path="pl_nickname">
          <n-input v-model:value="user.nickname" type="text" disabled />
        </n-form-item-gi>

        <!-- 玩家資料-DC -->
        <n-form-item-gi span="xs:9 m:6 l:6" label="PL DC帳號" path="pl_dc_account">
          <n-input v-model:value="user.dc_account" type="text" disabled />
        </n-form-item-gi>

        <!-- 玩家資料-DC -->
        <n-form-item-gi span="xs:9 m:6 l:6" label="PL資料 DC_id" path="pl_dc_id">
          <n-input v-model:value="user.dc_id" type="text" disabled />
        </n-form-item-gi>

        <!-- dateTime -->
        <!-- <n-form-item-gi span="xs:6 m:3 l:3" label="date" path="datetimeValue">
                <n-date-picker v-model:value="order.date" type="datetime" />
              </n-form-item-gi> -->

        <!-- 取消 -->
        <n-gi span="2" offset="7">
          <div style="display: flex; justify-content: flex">
            <n-button
              type="error" ghost
              :disabled="form.loading"
              round size="large"
              style="width: 9vw; height: 2.2vw; font-size: 1rem;"
              @click="showModal = false"
            >
              <!-- @click="order.showModal = false" -->
              取 &nbsp;&nbsp; 消
            </n-button>

          </div>
        </n-gi>

        <!-- 送出紐 -->
        <n-gi span="2">
          <div style="display: flex; justify-content: flex">
            <n-button
              :disabled="form.loading"
              round size="large"
              style="width: 9vw; height: 2.2vw; font-size: 1rem;"
              @keydown.enter.prevent
              @click="onApplyBtnClick"
            >
              送 &nbsp;&nbsp; 出
            </n-button>

          </div>
        </n-gi>

      </n-grid>
    </n-form>

  </n-modal>
</template>
<script setup>
import { apiAuth, api } from '@/plugins/axios'
import { reactive, ref, onMounted } from 'vue'
import { useMessage } from 'naive-ui'

// import { api } from '@/plugins/axios'
import { useRoute, useRouter } from 'vue-router'
// import { Swal } from 'sweetalert2'
import { useUserStore } from '@/stores/user'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// const ScrollTrigger = ScrollTrigger.getAll();
onMounted(() => {
  gsap.to('#content_info', {
    xPercent: 10,
    // x: '-100vw',
    // y: '100vw',
    ease: 'none',
    scrollTrigger: {
      trigger: '#content_info',
      scrub: true,
      markers: true // 顯示標記
      // start: 'top top-=100px'
      // pin: true

    }
  })
  gsap.set('#content_notice', { x: 500 })
  gsap.to('#content_notice', {
    xPercent: -15,
    // x: innerWidth * 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#content_notice',
      scrub: true,
      markers: true // 顯示標記
      // start: 'top top-=100px'
      // pin: true

    }
  })
  gsap.to('.head_img_wrapper', {
    xPercent: -5,
    // x: innerWidth * 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.head_img_wrapper',
      scrub: true,
      markers: true // 顯示標記
      // start: 'top top-=100px'
      // pin: true

    }
  })

  gsap.to('#gm_intro', {
    yPercent: -10,
    // x: innerWidth * 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'gm_intro',
      scrub: true,
      markers: true, // 顯示標記
      // start: 'top top-=100px'
      pin: true

    }
  })
  gsap.set('.cute_img', { x: -100 })

  gsap.to('.cute_img', {
    x: 55,
    // x: innerWidth * 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.cute_img',
      scrub: true,
      markers: true // 顯示標記
      // start: 'top top-=100px'
      // pin: true

    }
  })
})

const route = useRoute()
const router = useRouter()
const message = useMessage()

const user = useUserStore()

const orders = reactive([])

const form = reactive({
  // _id 有東西代表正在編輯，空的代表新增中
  // module:[],
  _id: '',
  m_name: '',
  gm: '',

  //  pls: [],
  pl_id: '',
  pl_nickname: '',
  pl_dc_account: '',
  pl_dc_id: 0,

  ho: 1,
  // date: '',

  loading: false,
  showModal: false
  // idx: -1
})

const module = reactive({
  _id: '',
  living: true,
  name: '',
  gm: '',
  minTime: 0.5,
  difficulty: 0.5,
  image: [],
  pl: 1,
  hashtag: [],
  info: '',
  notice: '',
  ccfoliaLink: '',
  discordLink: ''
})

const order = reactive({
  _id: [],

  pl_id: [],
  pl_nickname: [],
  pl_dc_account: [],
  pl_dc_id: [],
  m_id: '',
  m_name: '',
  gm: 0.5,
  ho: [],
  date: ''
})

const showModal = ref(false)

const onApplyBtnClick = async () => {
  // if (!form.valid) return
  form.loading = true

  const data = {
    m_id: module._id,
    m_name: module.name,
    gm: module.gm,
    ho: form.ho
  }

  try {
    if (form._id.length === 0) {
      const { data2 } = await apiAuth.post('/orders', data)

      message.success('訂單新增成功')

      showModal.value = false
      console.log(data2.result)
      orders.push(data2.result)
    }
  } catch (error) {
    // message.error('訂單新增失敗QWQQQQQ')
  }

  form.loading = false
}

(async () => {
  try {
    const { data } = await api.get('/modules/' + route.params.id)
    module._id = data.result._id
    module.living = data.result.living
    module.name = data.result.name
    module.gm = data.result.gm
    module.minTime = data.result.minTime
    module.difficulty = data.result.difficulty
    module.image = data.result.image[0]
    module.pl = data.result.pl
    module.hashtag = data.result.hashtag
    module.info = data.result.info
    module.notice = data.result.notice
    module.ccfoliaLink = data.result.ccfoliaLink
    module.discordLink = data.result.discordLink
    document.title = module.name + ' | Matching TRPG'
    console.log(data.result)
  } catch (error) {
    console.log('模組取得失敗')
    router.go(-1)
  }

  try {
    const { data: dataOrder } = await apiAuth.get(`/orders/module/${module._id}`)

    // var i=0; i<fruits.length; ++i
    for (let i = 0; i < dataOrder.result.length; i++) {
      order.pl_nickname[i] = dataOrder.result[i].pl_nickname
      order.pl_id[i] = dataOrder.result[i].pl_id
      order.ho[i] = dataOrder.result[i].ho
      // console.log('i:', i, dataOrder.result[i].pl_nickname)
      // console.log('i:', i, order.pl_nickname[i])
    }
    order._id = dataOrder.result._id
    order.pl_id = dataOrder.result.pl_id
    // order.pl_nickname = dataOrder.result.pl_nickname
    order.pl_dc_account = dataOrder.result.pl_dc_account
    order.pl_dc_id = dataOrder.result.pl_dc_id
    order.m_id = dataOrder.result.m_id
    order.m_name = dataOrder.result.m_name
    order.gm = dataOrder.result.gm
    order.date = dataOrder.result.date

    console.log(dataOrder.result.length)
  } catch (error) {
    console.log(error)
    // console.log(req.body.m_id)
    console.log('訂單取得失敗')
    // router.go(-1)
  }
})()

</script>

<style lang="scss">
body{
  width: 100%;
  height: 100%;
  background: #2F4F40;

  overflow-x: hidden;

#moduleView_bg{
  width: 100%;
  height: 200%;
  margin-top: 10vh;
  background: #2F4F40;
  display: flex;
  flex-wrap: wrap;
  // flex-direction: ;
  #pl_orders {
    margin-top: 10%;
    color: #F8E9D6;
    width: 80%;
    margin: auto;
  }
  .head {
    width: 50%;
    height: 70vh;
    margin-top: 10%;
    position: relative;

  .head_title {
    width: 100%;
    margin: auto;
    font-size: 50px;
    padding-left: 8%;
    padding-bottom: 8%;
    text-align: center;
    color: #F9B02D;
    // color: #F8E9D6;
    position:absolute;
    top: 3rem;
    left:50%;
    letter-spacing: 1rem;
    text-shadow: 0.1em 0.1em 0.2em black;
    transform:translateX(-50%);

    .gm {
      font-size: 15px;
    }
  }
  .info_bar {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-around;
    margin: auto;
    padding-bottom: 3%;
    z-index:100;
    position: absolute;
    top: 80%;

    .column{
      display: flex;
      flex-direction: column;
      width: 20%;
      height: 100%;
      text-align: center;
      position:relative;

      &:before {
      content: '';
      width: 7vw;
      height: 6vw;
      // transform: rotate(90deg);
      background: #f8E9D6;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0 50%);
    //  transform: rotate(120deg);
      position:absolute;
      bottom: -15%;
      right: 15%;
      z-index: -1;

      // 動畫
       animation: fade_rotate .8s linear  ;
       @keyframes fade_rotate {
    from {
        transform: rotate(90deg);
        opacity: 0.5;
    }
    to {
       transform: rotate(0deg);
       opacity:1;
    }
}
    }

      .column_title {
        color:#2F4F40;
        font-size: 1rem;
        font-weight: 800;
        text-shadow: 0em 0em 0.2em #29353188;
        margin-top: 0.3rem;

      }
      .column_text {
        color: #2F4F40;
        font-size: 1.2rem;
        font-weight: 600;
        margin-left: 0%;
      }
    }

    #attend {
  position: fixed;
  top: 95%;
  right: 6%;
  border-radius: 100%;
  transform: translateY(-98%);
  opacity: 1;
  visibility: visible;
  cursor: pointer;
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 40px;
  text-align: center;
  color: #2F4F40;
  font-weight:800;
  /* top: 3px; */
  z-index: 1;
  background: #F9B02D;

  &:before {
  content: "";
  border: 3px solid #F9B02D;
  position: fixed;
  z-index: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  animation: zoomBig 3.25s linear infinite;
  -webkit-animation-delay: .75s;
  animation-delay: .75s;
}

&::after {
  content: "";
  border: 3px solid #F9B02D;
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  animation: zoomBig 3.25s linear infinite;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
}

@keyframes zoomBig {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
    border-width: 3px;
  }

  40% {
    opacity: .5;
    border-width: 2px;
  }

  65% {
    border-width: 1px;
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
    border-width: 1px;
  }
}

  }

}
#head_img {
  width: 30vw;
  height: 30vw;
  display: flex;
  position: absolute;
  top: 20%;
  right: 10%;

  &::before {
      content: '';
      width: 30vw;
      height: 30vw;
      background: #F8E9D6;
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0 50%);
    //  transform: rotate(120deg);
      position:absolute;
      bottom: 0%;
      right: -10%;
      z-index: 0;
      animation: to-right .5s linear;
      @keyframes to-right {
      from {
        right: 10%;
        opacity:0.5;
      }
      to {
        right: -10%;
        opacity:1;

      }
}
    }

  .head_img_wrapper{
    position: relative;
    width: 100%;
    object-fit: cover;
    aspect-ratio: 0.8;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0 50%);
  // transform: translate(var(--_x, 0), var(--_y, 0)) scale(var(--_t, 1));
    transition: 0.2s all;
    // border: #F9B02D 10px solid;

  }
 }
 #section2 {
  width: 100%;
  background-image: linear-gradient(to top, #3c6853 0%, #2F4F40 100%);
  position: relative;

  .cute_img {
    width: 20%;
    position:absolute;
    top: 50%;
    left: -5%;
    rotate: 30deg;

  }
 }
 #content_info {
  width: 40%;
  height: 200px;
  margin: auto;
  margin-top: 10%;
  margin-left: 10%;
  padding: 2%;
  // margin-bottom: 20%;
  background-color: #F9B02DDD;
  border-radius: 15px;
  box-shadow: 0.2rem 0.2rem 0.5rem #2b2b2b;

  .content_info {
    width: 80%;
    color: #F8E9D6;
    font-weight: 600;
    font-size: 20px;
    margin: auto;
    position: relative;

      &::before {
      content:" ";
      display:block;
      width: 0%;
      // width: 100%;
      height: 3px;
      top: 110%;
      position: absolute;
      background-color: #F9B02D;
      transition: .4s .2s;

    }
     &:hover::before{
      width: 80%;
    }

  }
 }

 #content_notice {
  width: 40%;
  // height: 200px;
  margin: auto;
  margin-top: 10%;
  margin-left: 10%;
  padding: 2%;
  margin-bottom: 10%;
  background-color: #ffb24cdd;
  border-radius: 15px;
  padding-bottom: 2%;
  box-shadow: 0.2rem 0.2rem 0.5rem #2b2b2b;

  .content_notice {
    width: 80%;
    color: #2F4F40cc;
    font-weight: 600;
    font-size: 20px;
    margin: auto;
    position: relative;

      &::before {
      content:" ";
      display:block;
      width: 0%;
      // width: 100%;
      height: 3px;
      top: 102%;
      position: absolute;
      background-color: #F9B02D;
      transition: .4s .2s;

    }
     &:hover::before{
      width: 80%;
    }

  }

 }

 #gm_intro {
    width: 100%;
    padding: 2% 5%;
    background: #F8E9D6;
    box-shadow: 0 0 0.5rem #222 inset;
  }
  .gm_intro{
    width: 60%;
  }

}

}

@media screen and (max-width:1280px) {
  body{
     #moduleView_bg{
       .head_title{
        width: 80%;
        position: absolute;
        top:20rem;
         font-size: 4rem !important;
        }
      }
  }
}
@media screen and (max-width:768px) {
  body{
     #moduleView_bg{
       .head_title{
        width: 80%;
        font-size: 30px !important;
       position:absolute;
        top: 50rem;
        }
      }
  }
}

</style>
