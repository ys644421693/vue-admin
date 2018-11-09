<template>
  <button
    class="all_list_brands_title_details_btn"
    @click="handleClick"
  >
    <img class="img-head" :src="url" />
  </button>
</template>

<script>
export default {
  name: 'ElHeadButton',
  props: {
    url: String
  },
  methods: {
    handleClick (evt) {
      console.log(evt)
    }
  }
}
</script>

<style>
  .all_list_brands_title_details_btn{
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 15px;
    border: 2px solid #ffffff;
    padding: 0px;
    overflow: hidden;
    outline:none;
  }
  .img-head{
    width: 30px;
    height: 30px;
    cursor:pointer;
    border: 0px;
    box-shadow: #2d374b;
  }
</style>
