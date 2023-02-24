<template>
  <div id="front_module_bg">
    <h1 style="text-align: center; font-size: 3vw; color: bisque; position: relative; top:3vh"> 模 組 任 務 </h1>
    <n-divider />
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
    margin-top: 5%;
    display: flex;

    .n-card {

      margin: auto;
      display: flex;
      height: 380px;
      width: 90%;
      padding: 0;
      background: none;
      text-align: left;
      .n-card__content {
        padding: 0;
      }

      img {
          width: 100%;
          height: 225px;
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
