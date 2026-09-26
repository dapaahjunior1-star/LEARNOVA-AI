let mode='chat',history=[],pdfFileId=null,pdfFilename='';

const $=id=>document.getElementById(id);
function openChat(newMode='chat',starter=''){mode=newMode;$('modeTitle').textContent=newMode==='study'?'Study Mode':newMode==='research'?'Research Mode':'AI Chat';$('chatPanel').classList.remove('hidden');if(starter)sendMessage(starter)}
function addMessage(box,role,text){const d=document.createElement('div');d.className='msg '+role;d.textContent=text;box.appendChild(d);box.scrollTop=box.scrollHeight}
async function sendMessage(text){if(!text.trim())return;addMessage($('messages'),'user',text);history.push({role:'user',content:text});const loading=document.createElement('div');loading.className='msg assistant';loading.textContent='Thinking…';$('messages').appendChild(loading);
try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,mode,history})});const data=await r.json();loading.remove();addMessage($('messages'),'assistant',data.answer||data.error||'No response.');history.push({role:'assistant',content:data.answer||''})}catch(e){loading.remove();addMessage($('messages'),'assistant','Could not connect to the AI server.')}}
$('chatForm').onsubmit=e=>{e.preventDefault();const q=$('question');const t=q.value;q.value='';openChat('chat');sendMessage(t)}
$('chatFormBottom').onsubmit=e=>{e.preventDefault();const q=$('questionBottom');const t=q.value;q.value='';sendMessage(t)}
$('closeChat').onclick=()=>$('chatPanel').classList.add('hidden');

document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>openChat(b.dataset.mode));
document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{const a=b.dataset.action;if(a==='chat')openChat();else if(a==='explain')openChat('study','Explain a difficult topic to me in simple terms.');else if(a==='quiz')openChat('study','Create a short practice quiz for me. Ask me for the subject and topic first.');else if(a==='planner')openChat('study','Help me create a realistic study plan. Ask what subjects, exam date, and study time I have.');else if(a==='scan'||a==='voice')alert(a==='scan'?'Scan & Solve is planned for the next version.':'Voice input is planned for the next version.')});

$('pdfButton').onclick=()=>{$('pdfPanel').classList.remove('hidden')};
$('closePdf').onclick=()=>{$('pdfPanel').classList.add('hidden')};
$('choosePdf').onclick=()=>$('pdfInput').click();
$('pdfDrop').onclick=e=>{if(e.target.id!=='choosePdf')$('pdfInput').click()};
$('pdfInput').onchange=()=>{if($('pdfInput').files[0])uploadPdf($('pdfInput').files[0])};

async function uploadPdf(file){
  if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf'))return alert('Please choose a PDF.');
  if(file.size>20*1024*1024)return alert('PDF must be 20 MB or smaller.');
  $('pdfStatus').textContent='Uploading and preparing your PDF…';$('pdfStatus').classList.remove('hidden');
  const fd=new FormData();fd.append('pdf',file);
  try{const r=await fetch('/api/pdf/upload',{method:'POST',body:fd});const data=await r.json();if(!r.ok)throw new Error(data.error);
    pdfFileId=data.fileId;pdfFilename=data.filename;$('pdfDrop').classList.add('hidden');$('pdfStatus').textContent='✅ '+pdfFilename+' is ready. Ask a question or choose a quick action.';$('pdfTools').classList.remove('hidden');$('pdfAskForm').classList.remove('hidden');addMessage($('pdfMessages'),'assistant','Your PDF is ready. Ask me anything about it, or use Summarize, Explain Simply, or Make a Quiz.')}
  catch(e){$('pdfStatus').textContent='❌ '+e.message}
}
async function askPdf(question,action='ask'){
 if(!pdfFileId)return alert('Upload a PDF first.');
 if(action==='ask')addMessage($('pdfMessages'),'user',question);
 const loading=document.createElement('div');loading.className='msg assistant';loading.textContent='Reading your PDF…';$('pdfMessages').appendChild(loading);
 try{const r=await fetch('/api/pdf/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fileId:pdfFileId,filename:pdfFilename,question,action})});const data=await r.json();loading.remove();addMessage($('pdfMessages'),'assistant',data.answer||data.error||'No answer.')}
 catch(e){loading.remove();addMessage($('pdfMessages'),'assistant','Could not answer from the PDF.')}
}
$('pdfAskForm').onsubmit=e=>{e.preventDefault();const q=$('pdfQuestion');const t=q.value;q.value='';if(t)askPdf(t)};
document.querySelectorAll('[data-pdf-action]').forEach(b=>b.onclick=()=>askPdf('',b.dataset.pdfAction));
