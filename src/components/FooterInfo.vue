<template>
  <div class="gcs-footer">
    <div class="footer-top">
      <a href="#">百度网</a> |
      <a href="#">新浪网</a> |
      <a href="#">腾迅房产</a> |
      <a href="#">找货网</a> |
      <a href="#">北极绒</a> |
      <a href="#">阿里巴巴</a>
    </div>
    <p>
      ©Copyright 2019 海盗侠科技公司版权所有 | 上海ICP备12438170号-4
    </p>
  </div>
</template>

<script>
export default {
  name: 'FooterInfo'
}
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  * .gcs-footer {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    text-align: center;
    color: white;
    line-height: 30px;
    min-width: 500px;
  }

  .gcs-footer .footer-top {
    margin-top: 2px;
  }

  .gcs-footer a {
    color: #f0f1f1;
    text-decoration: none;
    padding: 0 10px;
    vertical-align: middle;
  }

  .gcs-footer a:hover {
    color: red;
    text-decoration: underline;
  }

  .gcs-footer p {
    height: 15px;
    color: #888888;
    margin-top: 30px;
  }
</style>
