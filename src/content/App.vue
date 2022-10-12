<template>
  <div id="app">
    <el-button type="primary" icon="el-icon-edit">主要按钮</el-button>
  </div>
</template>

<script>
import browser from 'webextension-polyfill'
export default {
  name: 'app',
  data() {
    return {
      isShow: true
    }
  },
  methods: {},
  mounted() {
    const href = window.location.href
    console.log(href)
  },
  destroyed() {}
}
</script>
<style>
* {
  text-align: left;
}
</style>
