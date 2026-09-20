/* Local raster artwork with real AcroForm widgets; never flatten the form. */
async function createInteractivePDF(interactive=true){
  if(!state.members.length)throw new Error('Añade al menos un miembro a la banda.');
  if(typeof fitCardsForPrint!=='function')throw new Error('La ficha todavía se está cargando. Inténtalo de nuevo en unos segundos.');
  const {PDFDocument,PDFName,PDFHexString}=PDFLib;
  const frame=document.createElement('iframe');
  frame.title='Preparación del PDF';
  frame.setAttribute('aria-hidden','true');
  frame.style.cssText='position:fixed;left:-12000px;top:0;width:900px;height:1200px;border:0';
  document.body.append(frame);
  try{
    const doc=frame.contentDocument;
    doc.open();doc.write('<!doctype html><html><head><base href="'+document.baseURI+'"></head><body></body></html>');doc.close();
    for(const sheet of document.styleSheets){
      const style=doc.createElement('style');
      style.textContent=[...sheet.cssRules].map(r=>r.cssText).join('\n');doc.head.append(style);
    }
    const printStyles=[...document.styleSheets].flatMap(s=>[...s.cssRules]).filter(r=>r.media?.mediaText==='print').map(r=>[...r.cssRules].map(x=>x.cssText).join('\n')).join('\n');
    const style=doc.createElement('style');style.textContent=printStyles+`
      :root,html,body{background:white;margin:0;padding:0;min-height:0}
      .sheet{width:718px;padding:0;margin:0}.character-page{display:contents;contain:none}
      .character-page .character-card{position:static;transform:none;width:718px;margin:0;display:flow-root}
      .cost-breakdown{display:block;padding:0;margin:0;width:718px}
    `;doc.head.append(style);
    const clone=el.sheet.cloneNode(true);doc.body.append(clone);
    await doc.fonts.ready;
    await Promise.all([...clone.querySelectorAll('img')].map(async img=>{
      try{await img.decode();}catch(error){throw new Error('No se pudo cargar una imagen de la ficha. Recarga la página e inténtalo de nuevo.');}
    }));
    const pdf=await PDFDocument.create();pdf.setTitle((state.name||'Mi banda')+' — ficha interactiva');
    const form=pdf.getForm(), W=595.28,H=841.89,M=28.35, usableW=W-2*M,usableH=H-2*M;
    async function capture(node){return html2canvas(node,{scale:3,backgroundColor:'#ffffff',logging:false,windowWidth:900});}
    async function place(page,node,y,maxHeight){
      const canvas=await capture(node), image=await pdf.embedPng(canvas.toDataURL('image/png'));
      const scale=Math.min(usableW/node.getBoundingClientRect().width,maxHeight/node.getBoundingClientRect().height);
      const width=node.getBoundingClientRect().width*scale,height=node.getBoundingClientRect().height*scale;
      const x=(W-width)/2;page.drawImage(image,{x,y:y-height,width,height});return {x,y,scale,height};
    }
    function checkbox(page,name,label,rect){
      const box=form.createCheckBox(name);box.acroField.dict.set(PDFName.of('TU'),PDFHexString.fromText(label));
      box.addToPage(page,{...rect,borderWidth:0});
      const widget=box.acroField.getWidgets()[0];
      // Transparent off state leaves the original icon visible; on state is an X.
      const stream=content=>pdf.context.register(pdf.context.flateStream(content,{Type:'XObject',Subtype:'Form',BBox:[0,0,rect.width,rect.height],Resources:{}}));
      const w=rect.width,h=rect.height,p=1;
      widget.dict.set(PDFName.of('AP'),pdf.context.obj({N:{Off:stream(''),Yes:stream(`q 0.65 0.05 0.05 RG 1.5 w ${p} ${p} m ${w-p} ${h-p} l S ${p} ${h-p} m ${w-p} ${p} l S Q`)}}));
      box.uncheck();form.markFieldAsClean(box.ref);
    }
    for(const [memberIndex,card] of [...clone.querySelectorAll('.character-card')].entries()){
      const page=pdf.addPage([W,H]), placed=await place(page,card,H-M,usableH), origin=card.getBoundingClientRect();
      if(!interactive)continue;
      const groups=[...card.querySelectorAll('.vitality-icons')].map((n,i)=>({node:n,key:i?'resistencia':'vida',label:i?'Resistencia gastada':'Herida recibida'}));
      card.querySelectorAll('.ammo-counter').forEach((n,i)=>groups.push({node:n,key:'arma-'+i,label:'Munición consumida: '+n.closest('.visual-item-card').querySelector('b').textContent}));
      for(const group of groups)for(const [i,icon] of [...group.node.querySelectorAll('svg')].entries()){
        const r=icon.getBoundingClientRect(),s=placed.scale;
        checkbox(page,`miembro-${memberIndex}-${group.key}-${i}`,`${card.querySelector('h4').textContent}: ${group.label} ${i+1}`,{x:placed.x+(r.left-origin.left)*s,y:placed.y-(r.bottom-origin.top)*s,width:r.width*s,height:r.height*s});
      }
    }
    const costs=clone.querySelector('.cost-breakdown');
    if(costs){
      let page=pdf.addPage([W,H]),y=H-M;
      for(const node of [...costs.children]){
        const height=node.getBoundingClientRect().height*usableW/718;
        if(y-height<M){page=pdf.addPage([W,H]);y=H-M;}
        const result=await place(page,node,y,usableH);y-=result.height+8;
      }
    }
    return await pdf.save({updateFieldAppearances:false});
  }finally{frame.remove();}
}

const exportToggle=document.querySelector('#printButton');
const exportOptions=document.querySelector('#exportOptions');
const textExportDialog=document.querySelector('#textExportDialog');
const exportText=document.querySelector('#exportText');
function closeExportMenu(){exportOptions.close();}
exportToggle.addEventListener('click',()=>exportOptions.showModal());
for(const dialog of [exportOptions,textExportDialog]){
  dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
}
document.querySelector('#copyTextButton').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(exportText.value);document.querySelector('#copyStatus').textContent='Texto copiado.';}
  catch(error){exportText.focus();exportText.select();document.querySelector('#copyStatus').textContent='Texto seleccionado. Pulsa Ctrl+C o usa la opción Copiar de tu dispositivo.';}
});
function downloadExport(data,type,suffix){
  const url=URL.createObjectURL(new Blob([data],{type}));
  const link=document.createElement('a');link.href=url;link.download=(state.name||'Mi banda').replace(/[<>:"/\\|?*]/g,'-')+suffix;link.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
function exportPlainText(){
  if(!state.members.length)throw new Error('Añade al menos un miembro a la banda.');
  const lines=[state.name||'Mi banda',band().name,totalCost()+' / '+state.limit+' pts',''];
  for(const card of el.sheet.querySelectorAll('.character-card')){
    const copy=card.cloneNode(true);
    copy.querySelectorAll('.print-section-heading,.print-placeholder').forEach(n=>n.remove());
    copy.querySelectorAll('.vitality-icons,.ammo-counter').forEach(n=>n.textContent=n.getAttribute('aria-label'));
    // Read the displayed text with its line breaks, without decorative icons.
    copy.style.cssText='position:fixed;left:-12000px;width:718px';document.body.append(copy);
    lines.push(copy.innerText.trim(),'');copy.remove();
  }
  lines.push('DESGLOSE DE COSTES');
  for(const member of el.sheet.querySelectorAll('.cost-member')){
    lines.push(member.querySelector('h4').textContent);
    member.querySelectorAll('tbody tr,tfoot tr').forEach(row=>lines.push([...row.children].map(cell=>cell.textContent).join(' · ')));
    lines.push('');
  }
  lines.push('Total de la banda: '+totalCost()+' / '+state.limit+' pts');
  return lines.join('\r\n');
}
for(const [id,kind] of [['pdfButton','pdf'],['interactivePdfButton','interactive'],['textButton','text']]){
  document.getElementById(id).addEventListener('click',async()=>{
    closeExportMenu();exportToggle.disabled=true;exportToggle.textContent='Preparando archivo…';
    try{
      if(kind==='text'){exportText.value=exportPlainText();document.querySelector('#copyStatus').textContent='';textExportDialog.showModal();exportText.focus();}
      else downloadExport(await createInteractivePDF(kind==='interactive'),'application/pdf',kind==='interactive'?'-interactiva.pdf':'.pdf');
    }catch(error){alert('No se pudo exportar la ficha. '+error.message);}
    finally{exportToggle.disabled=false;exportToggle.textContent='Imprimir ficha';}
  });
}
