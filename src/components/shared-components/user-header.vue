<template>
  <header class="header">
    <a class="logo" href="javascript:;"></a>
    <nav class="nav">
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/other">Other</router-link></li>
        <li><router-link to="/login">/Login</router-link></li>
        <li class="current"><a href="home-non-logged-in-user.html">Home</a></li>
        <li><a href="browse-opportunities-and-organizations.html">Browse Opportunities</a></li>
        <li><a href="browse-groups.html">Browse Groups</a></li>
        <li><a href="javascript:;">Blog</a></li>
        <li><a href="javascript:;">About Us</a></li>
      </ul>
    </nav>
    <div class="pull-right">
      <a href="my-profile.html" class="user-name">
        <span class="name-txt">James Shawn</span>
        <img class="person" src="../../i/people-66x66-1.png" alt="person">
        <span class="icons icon-down"></span>
      </a>
      <router-link to="/register" class="btn-green btn-register">Register</router-link>
    </div>
  </header>
</template>
<script></script>
<style></style>
