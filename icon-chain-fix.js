(function loadApprovedIconLibraries(){
  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(typeof pictogram!=="function" || typeof iconBadge!=="function" || typeof renderSummary!=="function"){
      if(tries>=200){
        clearInterval(timer);
        console.error("No se pudo inicializar la ficha visual antes de cargar los iconos aprobados.");
      }
      return;
    }
    clearInterval(timer);

    const loadScript=(src)=>new Promise((resolve,reject)=>{
      const script=document.createElement("script");
      script.src=src;
      script.async=false;
      script.onload=resolve;
      script.onerror=()=>reject(new Error(`No se pudo cargar ${src}`));
      document.body.appendChild(script);
    });

    loadScript("dote-icons.js?v=20260914-10")
      .then(()=>loadScript("defecto-icons.js?v=20260914-5"))
      .then(()=>{
        iconBadge=function(name,text=""){
          return `<span class="item-icon" aria-hidden="true">${pictogram(name,text)}</span>`;
        };
        renderSummary();
      })
      .catch(error=>console.error("Error cargando iconos aprobados:",error));
  },50);
})();
