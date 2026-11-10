(function(){
function q(r,s){return r.querySelector(s)}
function boot(r){
  var M=window.MRMoldura,c=q(r,'canvas'),o={tpl:'km',km:'10,5',story:false,zoom:1,ox:0,oy:0,img:null},drag=null,DL=null;
  var draw=function(){M.render(c,o)};
  try{if(window.claude&&claude.use)claude.use('downloads').then(function(d){DL=d}).catch(function(){})}catch(e){}
  r.querySelectorAll('[data-tpl]').forEach(function(b){b.onclick=function(){o.tpl=b.dataset.tpl;r.querySelectorAll('[data-tpl]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});q(r,'.mrf-km').hidden=o.tpl==='feito';draw()}});
  r.querySelectorAll('[data-fmt]').forEach(function(b){b.onclick=function(){o.story=b.dataset.fmt==='story';r.querySelectorAll('[data-fmt]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});M.fit(o);draw()}});
  q(r,'.mrf-file').onchange=function(e){var f=e.target.files[0];if(!f)return;var i=new Image();i.onload=function(){o.img=i;r.classList.add('has-img');o.zoom=1;q(r,'.mrf-zoom').value=1;M.fit(o);draw()};i.src=URL.createObjectURL(f)};
  q(r,'.mrf-kmin').oninput=function(e){o.km=e.target.value;draw()};
  var ti=q(r,'.mrf-tin');if(ti)ti.oninput=function(e){o.team=e.target.value;draw()};
  q(r,'.mrf-zoom').oninput=function(e){M.zoomTo(o,+e.target.value);draw()};
  c.onclick=function(){if(!o.img)q(r,'.mrf-file').click()};
  c.onpointerdown=function(e){if(!o.img)return;drag={x:e.clientX,y:e.clientY};c.setPointerCapture(e.pointerId)};
  c.onpointermove=function(e){if(!drag)return;var k=1080/c.getBoundingClientRect().width;o.ox+=(e.clientX-drag.x)*k;o.oy+=(e.clientY-drag.y)*k;drag={x:e.clientX,y:e.clientY};draw()};
  c.onpointerup=c.onpointercancel=function(){drag=null};
  var msg=q(r,'.mrf-msg');
  q(r,'.mrf-go').onclick=function(){if(!o.img){msg.textContent=msg.dataset.nofoto;q(r,'.mrf-file').click();return}
    c.toBlob(function(b){var name=M.filename(o);
      if(DL){DL.save({filename:name,data:b}).then(function(){msg.textContent=msg.dataset.ok}).catch(function(e){if(e&&e.code==='rate_limited')msg.textContent=msg.dataset.wait});return}
      var file;try{file=new File([b],name,{type:'image/jpeg'})}catch(e){}
      if(file&&navigator.canShare&&navigator.canShare({files:[file]})&&matchMedia('(pointer:coarse)').matches){navigator.share({files:[file]}).then(function(){msg.textContent=msg.dataset.ok}).catch(function(){});return}
      var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();a.remove();msg.textContent=msg.dataset.ok},'image/jpeg',.92)};
  M.init().then(draw);draw();
}
function go(){document.querySelectorAll('.mrf').forEach(boot)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
