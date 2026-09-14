// Dotes aprobados: carga directa por nombre.
(function(){
  const basePictogram=pictogram;
  const approvedIcons=window.LAZARUS_DOTE_ICONS||{};
  pictogram=function(name,text=""){
    const src=approvedIcons[name];
    if(src)return `<img class="approved-icon-img" src="${src}" alt="" aria-hidden="true" width="50" height="50" style="display:block;width:50px;height:50px;object-fit:contain">`;
    return basePictogram(name,text);
  };
  if(typeof renderSummary==="function")renderSummary();
})();
