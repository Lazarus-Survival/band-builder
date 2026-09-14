(function loadApprovedDoteIcons(){
  let attempts=0;
  const timer=setInterval(()=>{
    attempts++;
    if(typeof pictogram==="function" && typeof svgWrap==="function"){
      clearInterval(timer);
      const script=document.createElement("script");
      script.src="dote-icons.js?v=20260914-1";
      document.body.appendChild(script);
    } else if(attempts>=100){
      clearInterval(timer);
    }
  },50);
})();
