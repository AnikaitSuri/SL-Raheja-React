
$(document).ready(function(){
    var mobnavbarheight = $(".mobilenavbar").outerHeight();

    $(".topmrmob").css("top", mobnavbarheight);
    console.log(mobnavbarheight);

    $("#myImage").click(function(){
        $('img',this).toggle();
      });
})

