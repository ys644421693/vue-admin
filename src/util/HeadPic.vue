<template>
  <button
    class="all_list_brands_title_details_btn"
    :class="classObject"
    @click="handleClick"
  >
    <img class="img-head" :src="url" :class="classObject"/>
  </button>
</template>

<script>
export default {
  name: 'ElHeadButton',
  props: {
    url: String,
    size: {
      type: String,
      default: 'normal'
    }
  },
  methods: {
    handleClick (evt) {
      console.log(evt)
    }
  },
  computed: {
    classObject: function () {
      return this.size === 'big' ? 'pic_big' : this.size === 'small' ? 'pic_small' : 'pic_normal'
    }
  }
}
</script>

<style>
  .pic_big{
    width: 90px;
    height: 90px;
    border-radius: 45px;
  }
  .pic_small{
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
  .pic_normal{
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .all_list_brands_title_details_btn{
    text-align: center;
    font-size: 12px;
    line-height: 1.428571429;
    border: 1px solid #ffffff;
    padding: 0px;
    overflow: hidden;
    outline:none;
    box-shadow: 0 0 20px #fff;
  }
  .img-head{
    cursor:pointer;
    border: 0px;
    box-shadow: #2d374b;
  }
</style>
