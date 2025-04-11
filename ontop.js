window.onscroll = function(){
  let button = document.getElementById("scrollToTop");
  if (document.documentElement.scrollTop > 200){ 
    button.style.display = "block";
  }
  else{
    button.style.display= "none";
  }
};

document.getElementById("scrollToTop").addEventListener("click",function(){
  window.scrollTo({top: 0, behavior:"smooth"});
});