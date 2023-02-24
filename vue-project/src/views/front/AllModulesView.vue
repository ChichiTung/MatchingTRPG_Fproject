<template>
  <div id="front_module_bg">

    <h1 style="text-align: center; font-size: 3vw; color: bisque; position: relative; top:3vh"> 模 組 任 務 </h1>
    <n-divider />

    <!-- 輪播圖 -->
    <div id="carousel">
      <n-carousel autoplay interval="6000">
        <img
          class="carousel-img"
          src="https://res.cloudinary.com/dvpgoachn/image/upload/v1676555786/brtnzqixnpipmvjss4qg.jpg"
        >
        <img
          class="carousel-img"
          src="https://res.cloudinary.com/dvpgoachn/image/upload/v1676555689/ut2gxdvspynnb7mlcknu.jpg"
        >
        <img
          class="carousel-img"
          src="https://res.cloudinary.com/dvpgoachn/image/upload/v1677159495/oh7jf2vhzttet9sgigxx.jpg"
        >
        <img
          class="carousel-img"
          src="https://res.cloudinary.com/dvpgoachn/image/upload/v1677159046/exc3kafdx7srvfwsnwny.jpg"
        >
      </n-carousel>
    </div>

    <div class="front_module_contain">

      <div
        v-for=" mod in modules"
        :key="mod._id"
        class="col"
      >
        <ModuleCard v-bind="mod" class="module_card" />

      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { api } from '@/plugins/axios'
import Swal from 'sweetalert2'
import ModuleCard from '@/components/ModuleCard.vue'

const modules = reactive([]);

(async () => {
  try {
    const { data } = await api.get('/modules')
    modules.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error?.response?.data?.message || '發生錯誤'
    })
  }
})()

</script>

<style lang="scss">
#front_module_bg {
  width: 100vw;
  height: 200vh;
  margin-top: 10vh;
  background: #2F4F40;

  #carousel {
    width: 80%;
    height: 50vh;
    margin: auto;
  }

 .front_module_contain {
  width: 80vw;
  height: 110vh;
  margin: auto;
  display: flex;
  flex-wrap: wrap;

  .col {
    width: 25%;
    height: 300px;
    margin-left: 5%;
    margin-top: 15%;

    display: flex;

    .n-card {
      width: 90%;
      height: 380px;
      margin: auto;
      padding: 0;

      border: 0px;
      background-color:#F8E9D6;
      box-shadow: 8px 8px 0px 5px  #F9B02DCC;

      text-align: left;
      font-weight: 800;

      display: flex;
      .n-card__content {
        padding: 0;
      }

      .module_title {
        width: 90%;
        min-height: 30%;

        text-decoration: none;
        font-weight: 800;
        color: #2F4F40;
        font-size:18px;

        position: absolute;
        top: 55%;
        left: 5%;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      // overflow:hidden;
      }

      .card_info {
        text-overflow: ellipsis; overflow:hidden; width: 90%;height: 12%; position: absolute; top: 75%; left: 5%;
        font-size: 10px;
      }

      img {
          width: 100%;
          height: 200px;
          object-fit: cover;
      }

      }
    }
  }

}

  @media screen and (max-width: 1200px) and (min-width:768px){
  #front_module_bg{
    .front_module_contain{
   .col {
      width: 50%;
      height: 380px;
      display: flex;
      .n-card {
        margin: auto;
        display: flex;
        height: 400px;
        width: 90%;
        padding: 0;
        background: none;
        text-align: left;
        .n-card__content {
          padding: 0;
        }
        .n-card-cover {
          border-radius: 15px;
        }
        img{
           width: 100%;
          height: 350px;
          object-fit: cover;
        }
        .card_info {
          display: none;
        }
      }
    }
  }
  transition-duration: 0.5s;
  }
}

@media screen and (max-width: 768px) {
   #front_module_bg{
    .front_module_contain{
      .col{
          width: 100%;
          height: 460px;
          display: flex;
          .n-card {
            margin: auto;
            display: flex;
            height: 400px;
            width: 90%;
            padding: 0;
            background: none;
            text-align: left;

            animation:swing-in-top-fwd .5s cubic-bezier(.175,.885,.32,1.275) both;
            @ames swing-in-top-fwd{0%{transform:rotateX(-100deg);transform-origin:top;opacity:0}100%{transform:rotateX(0deg);transform-origin:top;opacity:1}}

            .n-card__content {
              padding: 0;
            }
            .n-card-cover {
          border-radius: 15px;
        }
        .card_info {
          display: none;
        }
            img{
              width: 100%;
              height: 350px;
              object-fit: scale-down;
            }
          }
        }
      }
      transition-duration: 0.5s;
  }
}

</style>
