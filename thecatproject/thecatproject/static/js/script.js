var srcImage = "";
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
      beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      }
    });


    $(document).ready(function () {
      var breed_ids = ['tvan', 'awir', 'amis', 'toyg', 'beng', 'bure', 'chau', 'chee', 'csho', 'rblu', 'lihu', 'hima', 'ocic', 'mcoo', 'norw', 'ragd', 'sibe', 'snow'];
      var testing2test;
      for (var i = 0; i < 18; i++) {
        var item = $("figure.gallery-landing-image-wrapped")[i];
        $.ajax({
          async: false,
          type: 'GET',
          url: 'https://api.thecatapi.com/v1/images/search?breed_ids=' + breed_ids[i],
          dataType: 'json',
          success: function (data) {
            // console.log(i);
            $($("figure.gallery-landing-image-wrapped")[i]).find("h2").text(data[0].breeds[0].name);
            $($("figure.gallery-landing-image-wrapped")[i]).find("amp-img").attr("src", data[0].url);
            $($("figure.gallery-landing-image-wrapped")[i]).find("amp-img").attr("width", data[0].width);
            $($("figure.gallery-landing-image-wrapped")[i]).find("amp-img").attr("height", data[0].height);
          }
        });
      };
    });





    $(document).on('click', '.gallery-landing-image-wrapped', function () {
      var breed_id = $(this).attr("id");
      srcImage = $(this).find("amp-img").attr("src");
      //   console.log(breed_id);
      $.ajax({
        type: 'GET',
        url: 'https://api.thecatapi.com/v1/images/search?breed_ids=' + breed_id, //Your form processing file URL
        dataType: 'json',
        success: function (data) {
          var cat_info = data[0].breeds[0];
          document.getElementById("lbname").innerText = cat_info.name;
          document.getElementById("lbdesc").innerText = cat_info.description;
        }
      });
      $('.lightbox').attr("id", breed_id);
      $('#my-lightbox').toggleClass('hide');
    });




    $(document).on('click', '.close-button', function () {
      $('#my-lightbox').toggleClass('hide');
      document.getElementById("lbname").innerText = "";
      document.getElementById("lbdesc").innerText = "";
      document.getElementById("saved-to-db").innerText = "";
      $('.lightbox').attr("id", "");

    });

    var token = '{{csrf_token}}';

    $(document).on('click', '.btn-desc', function () {
      var cat_breed_id = $('.lightbox').attr("id");
      var cat_breed_name = document.getElementById("lbname").innerText;
      var cat_breed_desc = document.getElementById("lbdesc").innerText;
      // console.log(cat_breed_id);
      // console.log(cat_breed_name);
      // console.log(cat_breed_desc);
      $.ajax({
        headers: { "X-CSRFToken": token },
        type: 'POST',
        url: '/save_desc/', //Your form processing file URL
        dataType: 'json',
        data: {
          'breed_id': cat_breed_id,
          'name': cat_breed_name,
          'description': cat_breed_desc,
        },
        success: function (data) {
          document.getElementById("saved-to-db").innerText = "Description successfully saved to database!";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          //console.log(data)
          alert("Status: " + textStatus);
          alert("Error: " + errorThrown);
        }
      });

    });



    $(document).on('click', '.btn-img', function () {
      var cat_breed_id = $('.lightbox').attr("id");
      // var cat_img_url = document.getElementById(cat_breed_id).find("amp-img").attr("src");
      var cat_breed_name = document.getElementById("lbname").innerText;
      var cat_breed_desc = document.getElementById("lbdesc").innerText;
      console.log(cat_breed_id);
      console.log(srcImage);
      // console.log(cat_breed_desc);
      $.ajax({
        headers: { "X-CSRFToken": token },
        type: 'POST',
        url: '/save_img/', //Your form processing file URL
        dataType: 'json',
        data: {
          'breed_id': cat_breed_id,
          'img_url': srcImage,
          'name': cat_breed_name,
          'description': cat_breed_desc,
        },
        success: function (data) {
          document.getElementById("saved-to-db").innerText = "Image link successfully saved to database!";
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          //console.log(data)
          alert("Status: " + textStatus);
          alert("Error: " + errorThrown);
        }
      });

    });


