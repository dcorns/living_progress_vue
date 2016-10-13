/* JavaScript Document */
var Event = new Array(["2016/05/12","past-date"],
                         ["2016/05/19","past-date"],
                         ["2016/05/26","past-date"],
                         ["2016/06/1","past-date"],
                         ["2016/06/13","progress-start-date"],
                         ["2016/06/14","progress-inner-date"],
                         ["2016/06/15","progress-inner-date"],
                         ["2016/06/16","progress-end-date"],
                         ["2016/06/18","upcoming-date"],
                         ["2016/06/25","upcoming-date"],
                         ["2016/07/3","upcoming-date"],
                         ["2016/07/17","upcoming-date"],
                         ["2016/09/15","upcoming-date"]);//Set Event
//line chart data
var line_chart_datas = new Array([
                                   {
                                      value:[0,30,62,65,90,65,90],
                                      color:'#7ec9ef',
                                      line_width:2
                                   }
                                ],
                                [
                                   {
                                      value:[500,350,600,530,640,840,950],
                                      color:'#7ec9ef',
                                      line_width:2
                                   }
                                ],
                                [
                                   {
                                      value:[12,24,35,32,35,22,27],
                                      color:'#7ec9ef',
                                      line_width:2
                                   }
                                ],
                                [
                                   {
                                      value:[8,6,15,15,19,16,13],
                                      color:'#7ec9ef',
                                      line_width:2
                                   }
                                ],
                                [
                                   {
                                      value:[180,110,165,95,110,125,125],
                                      color:'#7ec9ef',
                                      line_width:2
                                   }
                                ]);


$(document).ready(function(){

  //style the form elements
  if($(".form-container").length>0){
    $('.form-container').jqTransform({imgPath:'i/forms/'});
  }

  /*calendar*/
  if($(".from-date").length>0)
  {
    $(".from-date").datepicker({
      dateFormat:"mm/dd/yy",
      dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      firstDay: 1,
      showOtherMonths: true
    });
  }
  $(".date-icon,.to-date-icon").bind('click',function(){
    $(this).prev().trigger("click").focus();
  });
  if($(".to-date").length>0)
  {
    $(".to-date").datepicker({
      dateFormat:"mm/dd/yy",
      dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      firstDay: 1,
      showOtherMonths: true
    });
  }

  //click dropdown options
  $(".dropdown-default .dropdown-menu li a").click(function(){
    $(this).parents(".dropdown-default").find(".selected-option").html($(this).html());
    $(this).parents(".dropdown-default").find(".selected-option").parent().removeClass("field-error");
  })

  //style the custom scrollbar
  renderScrollbar();
  function renderScrollbar()
  {
    if($('.contacts-panel .main-box ul').length>0)
    {
      $('.contacts-panel .main-box ul').mCustomScrollbar("destroy");
      $('.contacts-panel .main-box ul').mCustomScrollbar();
    }
  }

  //click on Sign In button
  $(".login-main .btn-login").click(function(){
    var pass = true;
    if($(".login-username-input").val() === "")
    {
      $(".login-username-input").parent().addClass("field-error");
      pass = false;
    }
    else
    {
      $(".login-username-input").parent().removeClass("field-error");
    }

    if($(".login-password-input").val() === "")
    {
      $(".login-password-input").parent().addClass("field-error");
      pass = false;
    }
    else
    {
      $(".login-password-input").parent().removeClass("field-error");
    }

    if(pass)
    {
      if($(".login-username-input").val() === "user" && $(".login-password-input").val() === "pass")
      {
        location.href = "volunteer-dashboard.html";
      }
      else if($(".login-username-input").val() === "admin" && $(".login-password-input").val() === "pass")
      {
        location.href = "admin-user-dashboard.html";
      }
      else
      {
        $(".login-username-input").parent().addClass("field-error");
        $(".login-password-input").parent().addClass("field-error");
      }
    }
  })

  //focus on inputs of login form and register step one form
  $(".login-main .login-username-input,.login-main .login-password-input,.step-one input").click(function(){
    $(this).parent().removeClass("field-error");
  })

  //click Next button in Register As Volunteer page
  var mapLoaded = false;
  $(".register-as-volunteer-main .btn-next-step,\
     .register-as-volunteer-main .btn-skip-this-step-for-now").click(function(){
    var current_index = $(".step-nav li").index($(".step-nav li.current"));
    var pass = true;

    switch(current_index)
    {
      case 0:
        var form_inputs = $(".step-one input");
        for(var i=0;i<form_inputs.length;i++)
        {
          if(form_inputs.eq(i).val() === "" && !form_inputs.eq(i).hasClass("optional"))
          {
            form_inputs.eq(i).parent().addClass("field-error");
            pass = false;
          }
          else
          {
            form_inputs.eq(i).parent().removeClass("field-error");
          }
        }
        if($(".step-one .email-input").length>0 && !checkMail($(".step-one .email-input").val()))
        {
          $(".step-one .email-input").parent().addClass("field-error");
          pass = false;
        }
        if($(".step-one .password-input").val() !== $(".step-one .confirm-password-input").val())
        {
          $(".step-one .password-input").parent().addClass("field-error");
          $(".step-one .confirm-password-input").parent().addClass("field-error");
          pass = false;
        }
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        if($(this).hasClass("btn-skip-this-step-for-now"))
        {
          location.href = "admin-user-dashboard.html";
          return;
        }
        break;
      default:
        pass = false;
        break;
    }

    //pass = true; //Un-comment to test Step pages' steps directly
    if(pass)
    {
      //go to next step
      $(".step-content").eq(current_index).addClass("hide");
      $(".step-content").eq(current_index+1).removeClass("hide");

      $(".step-nav li").eq(current_index).removeClass("current");
      if(current_index === 0)
      {
        //click Next button in first step
        $(".step-nav li").eq(current_index).addClass("already");
        $(".step-nav li").eq(current_index+1).addClass("current");

        //load the google map
        if($("#map-canvas").length>0 && !mapLoaded)
        {
          loadMap();
          mapLoaded = true;
        }
      }
      else
      {
        //click Next button in non-first step
        $(".step-nav li").eq(current_index-1).removeClass("already").addClass("obsolete");
        $(".step-nav li").eq(current_index).addClass("already");
        $(".step-nav li").eq(current_index+1).addClass("current");
        if((current_index+1)===($(".step-nav li").length-1))
        {
          $(".register-as-volunteer-main .btn-next-step").addClass("hide");
          $(".register-as-volunteer-main .btn-finish").removeClass("hide");
          $(".register-as-volunteer-main .btn-activate-opportunity").removeClass("hide");
          if($(".admin-main").length === 0)
          {
            //Register as Volunteer
          }
          else
          {
            //Register as Organization
            $(".right-btn .check-box").removeClass("hide");
          }
        }
      }
    }
  })

  //click Cancel button in Register As Volunteer page
  $(".register-as-volunteer-main .btn-cancel-step").click(function(){
    var current_index = $(".step-nav li").index($(".step-nav li.current"));

    if(current_index>0)
    {
      //go to prev step
      $(".step-content").eq(current_index).addClass("hide");
      $(".step-content").eq(current_index-1).removeClass("hide");

      $(".step-nav li").eq(current_index).removeClass("current");
    }

    if(current_index === 0)
    {
      if($(".post-main").length === 0)
        location.href = "register.html";
      else
        location.href = "admin-user-dashboard.html";
    }
    else if(current_index === 1)
    {
      //click Cancel button in second step
      $(".step-nav li").eq(current_index-1).removeClass("already");
      $(".step-nav li").eq(current_index-1).addClass("current");
    }
    else
    {
      //click Cancel button in non-first-second step
      $(".step-nav li").eq(current_index-2).removeClass("obsolete").addClass("already");
      $(".step-nav li").eq(current_index-1).removeClass("already").addClass("current");
      if((current_index)===($(".step-nav li").length-1))
      {
        $(".register-as-volunteer-main .btn-next-step").removeClass("hide");
        $(".register-as-volunteer-main .btn-finish").addClass("hide");
        $(".register-as-volunteer-main .btn-activate-opportunity").addClass("hide");
        if($(".admin-main").length === 0)
        {
          //Register as Volunteer
        }
        else
        {
          //Register as Organization
          $(".right-btn .check-box").addClass("hide");
        }
      }
    }
  })

  //type on Search Location input box in Register As Volunteer page
  $(".search-location-input-box").keyup(function(){
    if($(this).val() !== "")
    {
      $(this).parent().next().removeClass("hide");
    }
    else
    {
      $(this).parent().next().addClass("hide");
    }
  })

  //click on Search Location input box in Register As Volunteer page
  $(".search-location-input-box").click(function(){
    if($(this).val() !== "")
    {
      $(this).parent().next().removeClass("hide");
    }
    else
    {
      $(this).parent().next().addClass("hide");
    }
  })

  //click on option in Auto Complete popup
  $(".autocomplete li a").click(function(){
    $(".search-location-input-box").val($(this).html());
    $(this).parents(".autocomplete").addClass("hide");
  })



  //click on tabs in My Profile and Groups Organization Profile pages
  $(".nav-tab li a").click(function(){
    if($(this).parents(".nav-tab-navigation").length>0)
      return;

    var index = $(".nav-tab li a").index($(this));
    $(".nav-tab li a").parent().removeClass("active");
    $(this).parent().addClass("active");

    $(".tab-content").addClass("hide");
    $(".tab-content").eq(index).removeClass("hide");

    $(".tab-content-area").addClass("hide");
    $(".tab-content-area").eq(index).removeClass("hide");
  })

  //click "Close ads" icon in Ads section
  $(".with-ads .btn-close,\
     .with-ads-banner .btn-close").click(function(){
    $(this).parents(".with-ads,.with-ads-banner").addClass("hide");

    $(".mask-backdrop").addClass("hide");
  })

  //click See More button in My Profile page
  $(".my-profile-main .btn-more-box").click(function(){
    var new_item_number = 3;
    if($(this).parents(".tab-badges").length>0)
    {
      new_item_number = 4;
    }

    var copied_item = $(this).prev().find(".card-item").eq(0);
    for(var i=0;i<new_item_number;i++)
    {
      var new_item = copied_item.clone(true);
      $(this).prev().append(new_item);
    }
  })

  //click See More button in All pages except My Profile page
  $(".my-opportunities-module .btn-see-more,\
     .browse-groups-main .btn-see-more").click(function(){
    var copied_item = $(this).parent().prev().find(".card-item").eq(0);
    for(var i=0;i<3;i++)
    {
      var new_item = copied_item.clone(true);
      $(this).parent().prev().append(new_item);
    }
  })

  //click See More button in All pages except My Profile page
  $(".recommended-module .btn-see-more,\
     .list-column .btn-see-more").click(function(){
    var copied_item = $(this).parent().prev();
    if(($(this).parents(".recommended-module").length === 1) && !copied_item.hasClass("row-list-item"))
    {
      return;
    }
    for(var i=0;i<3;i++)
    {
      var new_item = copied_item.clone(true);
      new_item.insertBefore($(this).parent());
    }
  })

  //click See More button in All pages except My Profile page
  $(".popular-opportunity-module .btn-see-more,\
     .browse-opportunities-main .opportunities-module:eq(0) .btn-see-more,\
     .browse-opportunities-main .opportunities-module:eq(1) .btn-see-more,\
     .home-page .opportunities-module .btn-see-more").click(function(){
    var copied_item = $(this).parent().parent().find(".card-list .card-item:eq(0)");
    for(var i=0;i<3;i++)
    {
      var new_item = copied_item.clone(true);
      $(this).parent().parent().find(".card-list").append(new_item);
    }
  })

  //click on Search icon in All pages
  $(".btn-icon-search").click(function(){
    if($(".filter-box").length>0)
    {
      if(!$(".filter-box").hasClass("non-hidden"))
      {
        $(".filter-box").eq(0).toggleClass("hide");
      }
    }
  })

  //click "More Options" link
  $(".filter-box .link-more").click(function(){
    $(this).parent().prev().removeClass("hide");
    $(this).addClass("hide");
    $(this).next().removeClass("hide");
  })

  //click "Less Option" link
  $(".filter-box .link-less").click(function(){
    $(this).parent().prev().addClass("hide");
    $(this).addClass("hide");
    $(this).prev().removeClass("hide");
  })

  //click on Dislike button
  $(".row-list-item .row-btn .btn-dislike").click(function(){
    if($(".non-logged-in-user").length === 0)
    {
      $(this).parents(".row-list-item").remove();
    }
  })

  //click on Join The Opportunity button in Opportunity Detail page
  $(".opportunity-banner .btn-join-the-opportunity,\
     #logged-carousel-example .btn-join-this-opportunity,\
     .banner-box .btn-join-this-opportunity").click(function(){
    if($(this).attr("href") !== "javascript:;")
      return;

    if($(this).html() === "Join This Opportunity")
    {
      $(this).html("Joined");

      $(".discussions-module").removeClass("hide");
    }
    else
    {
      $(this).html("Join This Opportunity");

      $(".discussions-module").addClass("hide");
    }
  })

  //show the tab by URL parameter
  if($(".nav-tab").length>0)
  {
    if(getQueryString("tab") !== null)
    {
      switch(getQueryString("tab"))
      {
        case "Details":
          $(".nav-tab li a").eq(0).click();
          break;
        case "Opportunities":
          $(".nav-tab li a").eq(1).click();
          break;
        case "Discussions":
          $(".nav-tab li a").eq(2).click();
          break;
        default:
          break;
      }
    }
  }

  //click on "+Follow" link in Groups Organization Profile page
  $(".btn-follow").click(function(){
    if($(this).html() === "+ Follow")
    {
      $(this).html("Followed");
    }
    else
    {
      $(this).html("+ Follow");
    }
  })

  //type Enter in Write Post input box
  $(".write-post-input-box").keyup(function(event){
    if(event.keyCode === 13){
      if($(this).val().trim() !== "")
      {
        var hidden_post_area = $(".post-area.hide");
        var new_post_area = hidden_post_area.clone(true);
        new_post_area.removeClass("hide").addClass("copied");
        new_post_area.find(".comment-mian .txt-p").html($(this).val());
        hidden_post_area.parent().append(new_post_area);
        $(this).val("");
      }
    }
  })

  //type Enter in Write Comment inputbox
  $(".write-comment-input-box").keyup(function(event){
    if(event.keyCode === 13){
      if($(this).val().trim() !== "")
      {
        var hidden_comment_area = $(this).parents(".post-area").find(".comment-reply.hide");
        var new_comment_area = hidden_comment_area.clone(true);
        new_comment_area.removeClass("hide").addClass("copied");
        new_comment_area.find(".reply-message .content").html($(this).val());
        hidden_comment_area.parent().append(new_comment_area);
        $(this).val("");
      }
    }
  })






  //start of admin user functiones

  //click Show/Hide Report Summary button in Admin User Dashboard page
  $(".admin-dashboard-main .btn-gray-bar").click(function(){
    if($(this).hasClass("btn-gray-show"))
    {
      //click Show Report Summary button
      $(this).addClass("hide");
      $(this).next().removeClass("hide");
      $(this).prev().removeClass("hide");
    }
    else if($(this).hasClass("btn-gray-hide"))
    {
      //click Hide Report Summary button
      $(this).prev().removeClass("hide");
      $(this).addClass("hide");
      $(this).prev().prev().addClass("hide");
    }
  })

  //click Sign In link in Step 1 of Admin User Register as a Organization page
  $(".register-as-volunteer-main .btn-sign-in").click(function(){
    $(".left-area .user-sign-status").removeClass("hide");
    $(".left-area .form-boxs").addClass("hide");
    $(".left-area .form-boxs input").val("placeholder@placeholder.com");
    $(".left-area .under-text").addClass("hide");

    $(".nav-part").removeClass("hide");
    $(".btn-register").addClass("hide");
    $(".user-name").removeClass("hide");
  })

  //click Add Photo link in Step 2 of Admin User Register as a Organization page
  $(".register-as-volunteer-main .step-two .pic-circle-boxs a.icon-camera").click(function(){
    $(this).parents(".pic-circle-boxs").find(".add-photo-input-file").click();
  })

  //select a file for Add Photo link in Step 2 of Admin User Register as a Organization page
  $(".register-as-volunteer-main .step-two .add-photo-input-file").change(function(e){
    if($(this).val() !== "")
    {
      //select a image file
      $(this).parent().parent().addClass("after-add-photo");

      e = e || window.event;

      var files = e.target.files;  //FileList Objects
      var ireg = /image\/.*/i;
      var p = $(this).prev();

      //do nothing if it is not a image file
      if(!files[0].type.match(ireg)) {
          return;
      }

      var reader = new FileReader();

      reader.onload = (function(file) {
          return function(e) {
              var innerHTML = '<img src="'+ this.result +'" alt="'+ file.name +'" />';
              $(".pic-circle-boxs .little-img-add").empty();
              $(".pic-circle-boxs .little-img-add").append(innerHTML);
          };
      })(files[0]);
      //read file content
      reader.readAsDataURL(files[0]);
    }
    else
    {
      //select no image file
      $(this).parent().parent().removeClass("after-add-photo");
    }
  })

  //select a file for Change Cover link in Step 2 of Admin User Register as a Organization page
  $(".register-as-volunteer-main .step-two .change-cover-input-file").change(function(e){
    if($(this).val() !== "")
    {
      //select a image file
      $(this).parents(".upload-changed-boxs").find(".white-circle").addClass("hide");

      e = e || window.event;

      var files = e.target.files;  //FileList Objects
      var ireg = /image\/.*/i;
      var p = $(this).prev();

      //do nothing if it is not a image file
      if(!files[0].type.match(ireg)) {
          return;
      }

      var reader = new FileReader();

      reader.onload = (function(file) {
          return function(e) {
              var innerHTML = '<img src="'+ this.result +'" alt="'+ file.name +'" />';
              $(".bg-img-wrapper .img-boxs").empty();
              $(".bg-img-wrapper .img-boxs").append(innerHTML);
              $(".bg-img-wrapper .img-boxs").removeClass("hide");
          };
      })(files[0]);
      //read file content
      reader.readAsDataURL(files[0]);
    }
    else
    {
      //select no image file
      $(this).parents(".upload-changed-boxs").find(".white-circle").removeClass("hide");
      $(this).parents(".upload-changed-boxs").find(".img-boxs").addClass("hide");
    }
  })

  //click on Social Media buttons in Step 3 of Admin User Register as a Organization page
  $(".register-as-volunteer-main .step-three .btn-item").click(function(){
    $(this).toggleClass("connected");
  })

  //click on Radio buttons in Step 4 of Admin User Register as a Organization page
  $(".register-as-volunteer-main .step-four .jqTransformRadio").click(function(){
    $(".register-as-volunteer-main .step-four .boxs").removeClass("checked-status");
    $(this).parent().parent().parent().addClass("checked-status");
  })

  //click in Logo box in Step 4 of Admin User Register as a Organization page
  $(".register-as-volunteer-main .step-four .btn-box").click(function(){
    $(this).prev().find(".jqTransformRadio").click();
  })

  //click on Accept text in Last Step of Admin User Register as a Organization page
  $(".register-as-volunteer-main .row-btn .accept-text").click(function(){
    $(this).prev().find(".jqTransformCheckbox").click();
  })

  //click on Card items in Volunteers tab of Admin User Opportunity Detail page
  $(".admin-opportunity-detail-main .tab-container-volunteers .card-item").click(function(){
    $(this).toggleClass("active");

    if($(".admin-opportunity-detail-main .tab-container-volunteers .card-item.active").length > 0)
    {
      $(".btn-send-email-to-selected-users").addClass("active");
    }
    else
    {
      $(".btn-send-email-to-selected-users").removeClass("active");
    }
  })

  //choose Date & Time options in Step 1 of Admin User Post Opportunities page
  $(".post-main .choose-date-time-block .btn-choose").click(function(){
    $(this).parent().find(".btn-choose").removeClass("active");
    $(this).addClass("active");
    var index = $(this).parent().find(".btn-choose").index($(this));
    if(index === 0)
    {
      $(this).parent().next().removeClass("hide");
      $(this).parent().next().next().addClass("hide");
    }
    else if (index === 1)
    {
      $(this).parent().next().addClass("hide");
      $(this).parent().next().next().removeClass("hide");
    }
  })

  //change on Opportunity Image file input box in Step 1 of Admin User Post Opportunities page
  $(".post-main .opportunity-image-file-input").change(function(){
    $(this).parent().prev().val($(this).val());
  })

  //set restriction on number input boxes in Admin User Post Opportunities page
  $(".post-main .number-inputs input").keyup(function(event){
    $(this).val($(this).val().replace(/[^0-9]+/,''));
  })

  //click arrows in number input boxes in Admin User Post Opportunities page
  $(".post-main .number-inputs .btn-up-down .icon-up,\
     .post-main .number-inputs .btn-up-down .icon-down").click(function(){
    var input_box = $(this).parent().prev();
    if($(this).hasClass("icon-up"))
    {
      //click up arrow
      input_box.val(parseInt(input_box.val())+1);
    }
    else if($(this).hasClass("icon-down"))
    {
      //click down arrow
      if(parseInt(input_box.val())>0)
      {
        input_box.val(parseInt(input_box.val())-1);
      }
    }
  })

  //click Add Questiones button in Step 2 of Admin User Post Opportunities page
  $(".post-main .btn-add-questiones").click(function(){
    var new_row = $(this).prev().find(".row.hide").clone(true)
    new_row.removeClass("hide");
    $(this).prev().append(new_row);
  })

  //choose Radio type button options in Step 4 of Admin User Post Opportunities page
  $(".post-main .neutral-module .btn-choose").click(function(){
    $(this).parent().find(".btn-choose").removeClass("active");
    $(this).addClass("active");
    var index = $(this).parent().find(".btn-choose").index($(this));
    if(index === 0)
    {
      $(this).parents(".neutral-module").find(".yes-show").addClass("hide");
    }
    else if (index === 1)
    {
      $(this).parents(".neutral-module").find(".yes-show").removeClass("hide");
    }
  })

  //choose Payment Methods in Step 4 of Admin User Post Opportunities page
  $(".post-main .neutral-module .yes-show .btn-item").click(function(){
    $(this).parent().parent().find(".btn-item").removeClass("btn-venmo-blue").addClass("btn-gray");
    $(this).removeClass("btn-gray").addClass("btn-venmo-blue");
  })

  //init line charts in Admin User Dashboard page
  if($(".admin-dashboard-main").length>0)
  {
    //load Being Searched charts
    for(var i=0;i<$(".being-searched-chart").length;i++)
    {
      var chart = new iChart.LineBasic2D({
                  render : "being-searched-chart"+i,
                  data: line_chart_datas[0],
                  animation: true,
                  width : 186,
                  height : 70,
                  sub_option: {
                    intersection: false,
                  label: false
                  },
                  border: false,
                  coordinate: {
                    height:'90%',
                    width: '85%',
                    axis: {
                      width: [0,0,1,0],
                      color: '#f0f2f5'
                    },
                    grid_line_width: 0,
                    scale: {
                      scale_size: 0,
                      scale_share: 2,
                      label: {
                        font: "lato_regular",
                        fontsize: 10,
                        color: '#646464'
                      }
                    }
                  }
                });
      chart.draw();
    }

    //load Volunteers charts
    for(var i=0;i<$(".volunteers-chart").length;i++)
    {
      var chart = new iChart.LineBasic2D({
                  render : "volunteers-chart"+i,
                  data: line_chart_datas[0],
                  animation: true,
                  width : 186,
                  height : 70,
                  sub_option: {
                    intersection: false,
                  label: false
                  },
                  border: false,
                  coordinate: {
                    height:'90%',
                    width: '85%',
                    axis: {
                      width: [0,0,1,0],
                      color: '#f0f2f5'
                    },
                    grid_line_width: 0,
                    scale: {
                      scale_size: 0,
                      scale_share: 2,
                      label: {
                        font: "lato_regular",
                        fontsize: 10,
                        color: '#646464'
                      }
                    }
                  }
                });
      chart.draw();
    }

    //load Donation charts
    for(var i=0;i<$(".donation-chart").length;i++)
    {
      var chart = new iChart.LineBasic2D({
                  render : "donation-chart"+i,
                  data: line_chart_datas[1],
                  animation: true,
                  width : 186,
                  height : 70,
                  sub_option: {
                    intersection: false,
                  label: false
                  },
                  border: false,
                  coordinate: {
                    height:'90%',
                    width: '80%',
                    axis: {
                      width: [0,0,1,0],
                      color: '#f0f2f5'
                    },
                    grid_line_width: 0,
                    scale: {
                      scale_size: 0,
                      scale_share: 2,
                      label: {
                        font: "lato_regular",
                        fontsize: 10,
                        color: '#646464'
                      }
                    }
                  }
                });
      chart.draw();
    }
  }

  //init line charts in Admin User Opportunity Detail page
  if($(".admin-opportunity-detail-main").length>0)
  {
    //load Being Searched charts
    var chart_being_searched = new iChart.LineBasic2D({
                  render : "being-searched-chart"+0,
                  data: line_chart_datas[2],
                  animation: true,
                  width : 186,
                  height : 70,
                  sub_option: {
                    intersection: false,
                  label: false
                  },
                  border: false,
                  coordinate: {
                    height:'90%',
                    width: '85%',
                    axis: {
                      width: [0,0,1,0],
                      color: '#f0f2f5'
                    },
                    grid_line_width: 0,
                    scale: {
                      scale_size: 0,
                      scale_share: 2,
                      label: {
                        font: "lato_regular",
                        fontsize: 10,
                        color: '#646464'
                      }
                    }
                  }
                });
    chart_being_searched.draw();

    //load Volunteers charts
    var chart_volunteers = new iChart.LineBasic2D({
                  render : "volunteers-chart"+0,
                  data: line_chart_datas[3],
                  animation: true,
                  width : 186,
                  height : 70,
                  sub_option: {
                    intersection: false,
                  label: false
                  },
                  border: false,
                  coordinate: {
                    height:'90%',
                    width: '85%',
                    axis: {
                      width: [0,0,1,0],
                      color: '#f0f2f5'
                    },
                    grid_line_width: 0,
                    scale: {
                      scale_size: 0,
                      scale_share: 2,
                      label: {
                        font: "lato_regular",
                        fontsize: 10,
                        color: '#646464'
                      }
                    }
                  }
                });
    chart_volunteers.draw();

    //load Donation charts
    var chart_donation = new iChart.LineBasic2D({
                  render : "donation-chart"+0,
                  data: line_chart_datas[4],
                  animation: true,
                  width : 186,
                  height : 70,
                  sub_option: {
                    intersection: false,
                  label: false
                  },
                  border: false,
                  coordinate: {
                    height:'90%',
                    width: '85%',
                    axis: {
                      width: [0,0,1,0],
                      color: '#f0f2f5'
                    },
                    grid_line_width: 0,
                    scale: {
                      scale_size: 0,
                      scale_share: 2,
                      label: {
                        font: "lato_regular",
                        fontsize: 10,
                        color: '#646464'
                      }
                    }
                  }
                });
    chart_donation.draw();
  }

  //end of admin user functiones





  //load Dashboard page
  if($(".volunteer-dashboard-main").length>0)
  {
    var certified_level_indicator = $(".volunteer-dashboard-main .status-indicator input");
    certified_level_indicator.each(function(){$(this).attr("data-oldvalue", $(this).val());});
    certified_level_indicator.each(function(){$(this).val(0).trigger('change').delay(2000);});
    certified_level_indicator.knob({
      'draw' : function () {
         $(this.i).val(this.cv + '%');
         $(this.i).css({"font-family" : "lato_light", "font-size" : "36px", "color" : "#282828", "font-weight" : "normal"});
         $(this.i).on("focus", function(){
          $(this.i).parent().click();
         });
      }
    });
    certified_level_indicator.each(function(){
      animateKnob($(this));
    });

    renderCalendar();
  }

  //render calendar
  function renderCalendar(){
    //calendar
    var today = new Date();
    var year;
    var month;

    if($(".calendar-box").length === 1)
    {
      year = today.getFullYear();
      month = today.getMonth() + 1;
      var monthText = convertMonthText(month) + " " + year;
      $(".month-title label").html(monthText);

      initCalendar();
    }

    //prev month
    $(".btn-prev").on("click", function(){
      today.setDate(15);
      today.setMonth(today.getMonth()-1);

      year = today.getFullYear();
      month = today.getMonth() + 1;
      var monthText = convertMonthText(month) + " " + year;
      $(".month-title label").html(monthText);
      initCalendar();
    });

    //next month
    $(".btn-next").on("click", function(){
      today.setDate(15);
      today.setMonth(today.getMonth()+1);

      year = today.getFullYear();
      month = today.getMonth() + 1;
      var monthText = convertMonthText(month) + " " + year;
      $(".month-title label").html(monthText);
      initCalendar();
    });

    //init calendar
    var Event_Name = "";
    var Task_Name = "";
    function initCalendar(){
      var Nowdate=new Date(today);
      var MonthNextFirstDay=new Date((Nowdate.getYear()>=1900?Nowdate.getYear():(Nowdate.getYear()+1900)),Nowdate.getMonth()+1,1);
      var v_today=new Date(MonthNextFirstDay-86400000);

      var totalDays = v_today.getDate();

      v_today.setDate(1);
      var firstDayinWeekday = v_today.getDay();
      var weeks = 0;

      var table = $(".calendar-box").find("table tbody");
      table.find("td label").html("");

      table.find("td.current-date").removeClass("current-date");
      table.find("td.disable-text").removeClass("disable-text");

      table.find("td a").remove();
      table.find("td label").show();
      table.find("td.past-date").removeClass("past-date");
      table.find("td.progress-start-date").removeClass("progress-start-date");
      table.find("td.progress-inner-date").removeClass("progress-inner-date");
      table.find("td.progress-end-date").removeClass("progress-end-date");
      table.find("td.upcoming-date").removeClass("upcoming-date");

      if(table.find("tr").length > 5)
        table.find("tr").eq(table.find("tr").length-1).remove();

      if(table.find("tr").length < 5)
      {
        var newRow = table.find("tr").eq(0).clone();
        newRow.find("td label").html("");
        newRow.find("td a").remove();
        newRow.find("td label").show();
        newRow.find("td").removeClass("current-date").removeClass("past-date").removeClass("progress-start-date").removeClass("progress-inner-date").removeClass("progress-end-date").removeClass("upcoming-date");
        table.append(newRow);
      }

      for(var i = 1; i <= totalDays; i++)
      {
        v_today.setDate(i);
        var weekDay = v_today.getDay();//0-6

        weekDay = weekDay -1;//reset first week day from Sunday to be Monday
        if(weekDay<0)
          weekDay = 6;

        var row = table.find("tr").eq(weeks);
        var cell = row.find("td").eq(weekDay);
        if(isToday(v_today))
          cell.addClass("current-date");
        cell.find("label").html(i);

        var returnValue = setEvent(v_today);
        if(returnValue !== "")
        {
          cell.addClass(returnValue);
        }

        if(i === totalDays)
        {
          var k = 1;
          for(var j = (weekDay+1); j <=6 ;j++)
          {
            row.find("td").eq(j).addClass("disable-text");
            row.find("td").eq(j).find("label").html(k);
            k++;
          }

          var first_row = table.find("tr").eq(0);
          var blankCount = 0;
          for(var j = 0;j <=6; j++)
          {
            var cell_first_row = first_row.find("td").eq(j);
            if(cell_first_row.find("label").html() === "")
              blankCount++;
          }

          v_today.setMonth(v_today.getMonth())
          v_today.setDate(0);
          var prev_totalDays = v_today.getDate();

          for(var j = 0;j <blankCount; j++)
          {
            var cell_first_row = first_row.find("td").eq(j).addClass("disable-text");
            cell_first_row.find("label").html(prev_totalDays-blankCount+j+1);
          }
        }

        if(weekDay === 6 && i < totalDays)
        {
          weeks++;
          if(weeks>4 && i < totalDays)
          {
            var newRow = table.find("tr").eq(0).clone();
            newRow.find("td label").html("");
            newRow.find("td a").remove();
            newRow.find("td label").show();
            newRow.find("td").removeClass("current-date").removeClass("past-date").removeClass("progress-start-date").removeClass("progress-inner-date").removeClass("progress-end-date").removeClass("upcoming-date");
            table.append(newRow);
          }
        }
      }

      if(weeks === 3)
      {
        table.find("tr").eq(4).remove();
      }
    }

    //check Event day
    function setEvent(v_today){
      var new_today = new Date();
      var date_day_next_prev = new Date((new_today.getYear()>=1900?new_today.getYear():(new_today.getYear()+1900))+"/"+(new_today.getMonth()+1)+"/"+new_today.getDate());;

      for(var i = 0; i < Event.length ; i++)
      {
        var day = new Date(Event[i][0]);

        var date_day = (day.getYear()>=1900?day.getYear():(day.getYear()+1900))+"-"+(day.getMonth()+1)+"-"+day.getDate();
        var date_v_today = (v_today.getYear()>=1900?v_today.getYear():(v_today.getYear()+1900))+"-"+(v_today.getMonth()+1)+"-"+v_today.getDate();
        var date_v_today_next_prev = new Date((v_today.getYear()>=1900?v_today.getYear():(v_today.getYear()+1900))+"/"+(v_today.getMonth()+1)+"/"+v_today.getDate());

        if(date_day === date_v_today)
        {
          return Event[i][1];
        }
      }
      return "";
    }

    //check if the date is on today
    function isToday(v_today){
      var new_today = new Date();

      var date_day = (new_today.getYear()>=1900?new_today.getYear():(new_today.getYear()+1900))+"-"+(new_today.getMonth()+1)+"-"+new_today.getDate();
      var date_v_today = (v_today.getYear()>=1900?v_today.getYear():(v_today.getYear()+1900))+"-"+(v_today.getMonth()+1)+"-"+v_today.getDate();
      if(date_day === date_v_today)
        return true;
      else
        return false;
    }

    //convert month text
    function convertMonthText(month){
      var monthText = "";
      switch(month)
      {
        case 1:
          monthText = "January";
          break;
        case 2:
          monthText = "February";
          break;
        case 3:
          monthText = "March";
          break;
        case 4:
          monthText = "April";
          break;
        case 5:
          monthText = "May";
          break;
        case 6:
          monthText = "June";
          break;
        case 7:
          monthText = "July";
          break;
        case 8:
          monthText = "August";
          break;
        case 9:
          monthText = "September";
          break;
        case 10:
          monthText = "October";
          break;
        case 11:
          monthText = "November";
          break;
        case 12:
          monthText = "December";
          break;
      }
      return monthText;
    }
  }

  //load the google map
  function loadMap(){
    function initialize() {
      var myLatlng = new google.maps.LatLng(-23,135);
      var myLatlngCenter = new google.maps.LatLng(-23,135);
      var mapOptions = {
        zoom: 9,
        center: myLatlngCenter,
        disableDefaultUI: true
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var image = new google.maps.MarkerImage("i/icon-map.png", null, null, null, new google.maps.Size(38,58));
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Location A',
        icon: image
      });
    }

    initialize();
  }
})

  //check Email format
  function checkMail(mail){
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail))
      return true;
    else
    {
      return false;
    }
  }

  //get value of URL paramaters
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return unescape(r[2]);
    }
    return null;
  }

  //show pecentage value animate
  function animateKnob (elem) {
    var endval = parseInt(elem.attr("data-oldvalue"));
    var m1 = 0;
    var tmr1 = self.setInterval(function(){delayProgress()},10);
    function delayProgress(){
      m1 += 1;
      elem.val(m1).trigger('change');
      if(m1 === endval) {
        window.clearInterval(tmr1);
      }
    }
  }
