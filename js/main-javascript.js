const animItems = document.querySelectorAll('._anim-items');

if(animItems.length > 0){
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(){
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if(animItemHeight > window.innerHeight){
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')){ // 1 раз работаеть анимация!!!
          animItem.classList.remove('_active');
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft } 
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}




  let acc = document.querySelectorAll(".accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}




function videoPopup(objectName, videoUrl){
  this.videoUrl= videoUrl;
  this.screenSize= $(window).width();
  this.heightOfVideo= this.screenSize * .4;
  this.videoPop= '<div class="popUpWrapper">'+
                    '<div id="videoWrap"">'+
                    '<button type="button" class="videoClose" onclick="'+objectName+'.closeVideo()">X</button>'+
                    '<iframe width="100%" height="'+this.heightOfVideo+'" src="'+this.videoUrl+'" frameborder="0" allowfullscreen></iframe></div>'+
                  '</div>', 
  this.closeVideo= function(){
    $('.blackOut').fadeOut('slow');
    $('.popupAlignCenter').html("");
  },
  this.launchPopUp= function(){
    $(window).scroll(function() { return false; });
    if($('.blackOut').css('display')=="none"){
        $('.blackOut').fadeIn('slow');
    }
    $('.blackOut').css('z-index','1000');
    $('.popupAlignCenter').html(this.videoPop);
    $('.popUpWrapper').fadeIn('slow'); 
  }
};

$(document).mouseup(function (e) {
  var container = $(".popUpWrapper");
  if($('.blackOut').css('z-index')!="0"){
    if (!container.is(e.target) && container.has(e.target).length === 0){
      $('.blackOut').fadeOut('slow');
     }
  }
});

var videoPopupItem= new videoPopup('videoPopupItem', 'https://www.youtube.com/embed/41iGeoJ8hYc');
