(function loadApprovedIcons(){
  let attempts=0;
  const timer=setInterval(()=>{
    attempts++;
    if(typeof pictogram==="function" && typeof svgWrap==="function"){
      clearInterval(timer);
      const dotes=document.createElement("script");
      dotes.src="dote-icons.js?v=20260914-6";
      dotes.onload=()=>{
        const defectos=document.createElement("script");
        defectos.src="defecto-icons.js?v=20260914-2";
        defectos.onload=()=>{if(typeof renderSummary==="function")renderSummary();};
        document.body.appendChild(defectos);
      };
      document.body.appendChild(dotes);
    } else if(attempts>=100){
      clearInterval(timer);
    }
  },50);
})();