// Anonymous shared counters: page views and first successful operation per tab session.
// Local previews never write production counters. Failed requests never become fake zeros.
export const API_BASE='https://countapi.mileshilliard.com/api/v1';
export const COUNTER_PREFIX='whut-machining-showcase-20261101-v1';
const SESSION_KEY='machining-sharing-use-v1';
let mounted=false;
export function chinaDay(date=new Date()){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
 const part=k=>parts.find(x=>x.type===k).value;
 return part('year')+'-'+part('month')+'-'+part('day');
}
export function recentDays(now=new Date()){
 const day=chinaDay(now),end=Date.parse(day+'T12:00:00+08:00');
 return Array.from({length:7},(_,i)=>chinaDay(new Date(end-(6-i)*86400000)));
}
export function counterKey(prefix,kind,day='total'){
 if(!['views','uses'].includes(kind)||!(day==='total'||/^\d{4}-\d{2}-\d{2}$/.test(day)))throw Error('Invalid counter key');
 return prefix+'-'+kind+'-'+day;
}
export async function requestCount(key,{increment=false,fetcher=fetch}={}){
 const response=await fetcher(API_BASE+'/'+(increment?'hit':'get')+'/'+encodeURIComponent(key),{
  cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',keepalive:increment,signal:AbortSignal.timeout(10000)
 });
 const result=await response.json();
 if(!increment&&response.status===404&&result.error==='Key not found')return 0;
 if(!response.ok||!Number.isSafeInteger(result.value)||result.value<0)throw Error('Counter unavailable');
 return result.value;
}
export function chartMarkup(days,views,uses,{width=900}={}){
 const W=Math.max(320,Math.min(900,Math.round(width))),H=300,left=38,right=18,top=20,bottom=44,base=H-bottom;
 const values=[...views,...uses].filter(Number.isFinite),ceiling=Math.max(5,Math.ceil(Math.max(0,...values)/5)*5);
 const x=i=>left+i*(W-left-right)/6,y=n=>base-n/ceiling*(base-top);
 let s='<svg viewBox="0 0 '+W+' 300" role="img" aria-label="近七日浏览次数与实验使用人次趋势"><title>近七日网络共享情况</title>';
 for(let i=0;i<=5;i++){const v=ceiling*i/5,Y=y(v);s+='<line class="sharing-grid" x1="'+left+'" x2="'+(W-right)+'" y1="'+Y+'" y2="'+Y+'"/><text class="sharing-axis" x="'+(left-9)+'" y="'+(Y+4)+'" text-anchor="end">'+Number(v.toFixed(1))+'</text>';}
 days.forEach((day,i)=>s+='<text class="sharing-axis" x="'+x(i)+'" y="'+(H-16)+'" text-anchor="middle">'+day.slice(5)+'</text>');
 const series=(data,color,label)=>{
  let chunks=[],chunk=[];data.forEach((v,i)=>{if(Number.isFinite(v))chunk.push({i,v});else if(chunk.length){chunks.push(chunk);chunk=[];}});if(chunk.length)chunks.push(chunk);
  for(const part of chunks){const points=part.map(p=>x(p.i)+','+y(p.v)).join(' ');if(part.length>1)s+='<polygon points="'+x(part[0].i)+','+base+' '+points+' '+x(part.at(-1).i)+','+base+'" fill="'+color+'" fill-opacity="0.12"/><polyline points="'+points+'" fill="none" stroke="'+color+'" stroke-width="2.5"/>';
   for(const p of part)s+='<circle cx="'+x(p.i)+'" cy="'+y(p.v)+'" r="3.5" fill="white" stroke="'+color+'" stroke-width="1.8"><title>'+days[p.i]+' '+label+' '+p.v+'</title></circle>';
  }
 };
 series(views,'#d77737','浏览次数');series(uses,'#578fd3','实验使用人次');return s+'</svg>';
}
export function createRecorder({prefix,enabled=true,storage,fetcher=fetch,now=()=>new Date()}={}){
 let usePending=false,viewRecorded=false;
 async function record(kind){
  if(!enabled)return false;
  if(kind==='views'){if(viewRecorded)return false;viewRecorded=true;}
  else if(kind==='uses'){
   if(usePending)return false;
   try{if(storage.getItem(SESSION_KEY))return false;storage.setItem(SESSION_KEY,'pending');}catch{return false;}
   usePending=true;
  }else throw Error('Invalid event');
  // Do not retry a write after a timeout: the upstream may have accepted it already.
  const result=await Promise.allSettled(['total',chinaDay(now())].map(day=>requestCount(counterKey(prefix,kind,day),{increment:true,fetcher})));
  if(kind==='uses'){try{storage.setItem(SESSION_KEY,result.every(x=>x.status==='fulfilled')?'recorded':'unconfirmed');}catch{}}
  return result.every(x=>x.status==='fulfilled');
 }
 return {pageView:()=>record('views'),experimentUse:()=>record('uses')};
}
export function mountSharingStats(){
 if(mounted)return;mounted=true;
 const local=['127.0.0.1','localhost'].includes(location.hostname);
 const testing=local&&new URLSearchParams(location.search).get('stats_test')==='1';
 const production=location.hostname==='cai-aa.github.io'&&location.pathname.startsWith('/machining-digital-twin-showcase/');
 const prefix=testing?COUNTER_PREFIX+'-qa':COUNTER_PREFIX;
 let storage;try{storage=sessionStorage;}catch{storage=null;}
 const recorder=createRecorder({prefix,enabled:production||testing,storage});
 const root=document.getElementById('network-sharing');
 let reading=false,chartData=null;
 const renderChart=()=>{if(root&&chartData){const el=root.querySelector('[data-sharing-chart]');el.innerHTML=chartMarkup(chartData.days,chartData.views,chartData.uses,{width:el.clientWidth});}};
 if(root&&typeof ResizeObserver!=='undefined')new ResizeObserver(renderChart).observe(root.querySelector('[data-sharing-chart]'));
 const refresh=async()=>{
  if(!root||reading)return;reading=true;
  const button=root.querySelector('[data-sharing-refresh]'),status=root.querySelector('[data-sharing-status]');button.disabled=true;status.textContent='正在读取统计数据…';
  const days=recentDays();
  const safe=async(kind,day)=>{try{return await requestCount(counterKey(prefix,kind,day));}catch{return null;}};
  try{
   const [totalViews,totalUses,views,uses]=await Promise.all([safe('views','total'),safe('uses','total'),Promise.all(days.map(d=>safe('views',d))),Promise.all(days.map(d=>safe('uses',d)))]);
   const show=v=>Number.isSafeInteger(v)?v.toLocaleString('zh-CN'):'—';
   root.querySelector('[data-sharing-views]').textContent=show(totalViews);root.querySelector('[data-sharing-uses]').textContent=show(totalUses);
   chartData={days,views,uses};renderChart();
   root.querySelector('[data-sharing-rows]').innerHTML=days.map((day,i)=>'<tr><td>'+day+'</td><td>'+show(views[i])+'</td><td>'+show(uses[i])+'</td></tr>').join('');
   const incomplete=[totalViews,totalUses,...views,...uses].some(v=>v===null);
   const stamp=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit'}).format(new Date());
   status.textContent=incomplete?'部分统计暂不可用，请稍后刷新。':(testing?'测试统计（不计入正式数据） · ':local?'本地预览（不计入统计） · ':'')+'更新时间 '+stamp+'（北京时间）';
  }finally{button.disabled=false;reading=false;}
 };
 const onUse=()=>{recorder.experimentUse().then(changed=>{if(changed)refresh();}).catch(()=>{});};
 addEventListener('machining:operation-complete',onUse);
 if(globalThis.__machiningOperationCompleted)onUse();
 if(root)root.querySelector('[data-sharing-refresh]').addEventListener('click',refresh);
 recorder.pageView().catch(()=>false).finally(refresh);
}
