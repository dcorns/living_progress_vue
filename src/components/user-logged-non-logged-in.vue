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
  import UserNav from './shared-components/user-nav'
  import UserHeader from './shared-components/user-header'
  import UserCrumbs from './shared-components/user-crumbs'
  import UserFilterBox from './shared-components/user-filter-box'
  import UserBanner from './shared-components/user-banner'
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
