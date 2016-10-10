<template>
  <div class="filter-box hide">
    <h2 class="title-h2">Search and Share Ways to Do Good</h2>
    <div class="form-area">
      <div class="row-search">
        <a href="search_result.html" class="btn-search pull-right">Search</a>
        <div class="main-box">
          <div class="dropdown dropdown-default pull-right">
            <a class="dropdown-txt" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span class="value selected-option">All Interest Categories</span>
              <span class="icons icon-tag"></span>
              <span class="icons fa fa-chevron-down" aria-hidden="true"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="javascript:;">All Interest Categories</a></li>
              <li><a href="javascript:;">Adult education</a></li>
              <li><a href="javascript:;">Animals</a></li>
              <li><a href="javascript:;">Arts and culture</a></li>
              <li><a href="javascript:;">Children and youth education</a></li>
              <li><a href="javascript:;">Civic and community</a></li>
              <li><a href="javascript:;">Disaster and emergency services</a></li>
              <li><a href="javascript:;">Environment</a></li>
              <li><a href="javascript:;">Faith-based service</a></li>
              <li><a href="javascript:;">Family services</a></li>
              <li><a href="javascript:;">Health and wellness</a></li>
              <li><a href="javascript:;">Hunger and homelessness</a></li>
              <li><a href="javascript:;">Immigrant and refugee services</a></li>
              <li><a href="javascript:;">International service</a></li>
              <li><a href="javascript:;">Internships and employment</a></li>
              <li><a href="javascript:;">Justice and legal services</a></li>
              <li><a href="javascript:;">Schools</a></li>
              <li><a href="javascript:;">Senior services</a></li>
              <li><a href="javascript:;">Sports and recreation</a></li>
              <li><a href="javascript:;">Technology</a></li>
              <li><a href="javascript:;">Veterans and military families</a></li>
            </ul>
          </div>
          <!-- end .dropdown -->
          <span class="inputs"><i class="icons icon-search"></i><input type="search" placeholder="Search Opportunities, Group, Cities, etc" ></span>
        </div>
        <!-- end .main-box -->
      </div>
      <!-- end .row-search -->
      <div class="row-filter hide">
        <div class="col-calendar">
          <span class="inputs calendar">
            <input name="from-date" type="text" class="from-date" placeholder="From Date" readonly>
            <a href="javascript:;" class="icons icon-calendar date-icon"></a>
          </span>
        </div>
        <div class="col-calendar">
          <span class="inputs calendar">
            <input name="to-date" type="text" class="to-date" placeholder="To Date" readonly>
            <a href="javascript:;" class="icons icon-calendar to-date-icon"></a>
          </span>
        </div>
        <div class="col-dropdown">
          <div class="dropdown dropdown-default">
            <a class="dropdown-txt" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span class="value selected-option">Participate in this National Events</span>
              <span class="icons fa fa-chevron-down" aria-hidden="true"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="javascript:;">Participate in this National Events1</a></li>
              <li><a href="javascript:;">Participate in this National Events2</a></li>
            </ul>
          </div>
          <!-- end .dropdown -->
        </div>
      </div>
      <!-- end .row-filter -->
      <div class="row-btn">
        <a href="javascript:;" class="link-more">+ More Options</a>
        <a href="javascript:;" class="link-less hide">- Less Options</a>
      </div>
      <!-- end .row-btn -->
    </div>
    <!-- end .form-area -->
  </div>
</template>
<script></script>
<style></style>
