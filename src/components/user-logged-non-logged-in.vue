<template>
  <div class="logged non-logged-in-user">
<user-nav></user-nav>
<user-header></user-header>
<user-crumbs></user-crumbs>
<user-filter-box></user-filter-box>
<user-banner></user-banner>
  </div>
</template>
<script>
  import UserNav from './user-nav'
  import UserHeader from './user-header'
  import UserCrumbs from './user-crumbs'
  import UserFilterBox from './user-filter-box'
  import UserBanner from './user-banner'
  export default{
    components: {
      UserNav,
      UserHeader,
      UserCrumbs,
      UserFilterBox,
      UserBanner
    }
  }
</script>
<style>
</style>
