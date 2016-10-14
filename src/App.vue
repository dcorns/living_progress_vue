<template>
    <div id="app">
      <user-logged-non-logged-in></user-logged-non-logged-in>
      <router-view class="view"></router-view>
      <user-footer></user-footer>
    </div>
</template>
<script>
import UserMainLogin from './components/user-main-login'
import UserLoggedNonLoggedIn from './components/user-logged-non-logged-in'
import UserFooter from './components/user-footer'

export default {
  components: {
    UserLoggedNonLoggedIn,
    UserFooter
  }
}
</script>
<style></style>
