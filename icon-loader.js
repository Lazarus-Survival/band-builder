// Carga las bibliotecas de iconos después de que card-visuals.js haya definido pictogram().
(function(){
  let tries=0;
  function load(src,onload){const s=document.createElement('script');s.src=src;s.onload=onload||null;document.body.appendChild(s);}
  function ready(){
    if(typeof pictogram==='function'){
      load('dote-icons.js?v=20260914-3',()=>load('defecto-icons.js?v=20260914-1',()=>{if(typeof renderSummary==='function')renderSummary();}));
      return;
    }
    if(++tries<100)setTimeout(ready,50);
  }
  ready();
})();