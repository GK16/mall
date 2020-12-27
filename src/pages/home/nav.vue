<template>
  <nav class="nav">
    <ul class="nav-list">
      <li
        class="nav-item"
        v-for="(item, index) in navs"
        :key="index"
      >
        <a :href="item.linkUrl" class="nav-link">
          <img :src="item.picUrl" class="nav-pic">
          <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'HomeNav',
    data() {
      return {
        
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
</style>
