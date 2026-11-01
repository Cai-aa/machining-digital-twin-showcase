export const REPORT_SCHEMA='machining-practice-report-v1';
export const REPORT_STORAGE='machining-practice-reports-v1';
export const ACTIVE_REPORT='machining-active-report-v1';
export const REQUIRED={1:['power-on','air-on','control-on'],2:['self-test'],3:['warmup'],4:['change-mill'],5:['measure-length','save-length'],6:['unlock-door','open-door'],7:['place-workpiece','clamp-workpiece'],8:['install-sensor','confirm-sensor'],9:['connect-strain','connect-laser','connect-network'],10:['tidy-cables','close-lock-door'],11:['change-probe'],12:['probe-x','probe-y','probe-z','set-origin'],13:['change-mill'],14:['set-handwheel'],15:[],16:['load-baseline','run-baseline'],17:['sample-baseline','record-baseline'],18:['apply-parameters'],19:['load-aggressive','run-aggressive'],20:['compare-signals','record-comparison'],21:['threshold-applied'],22:['load-warning','run-warning'],23:['sample-warning','record-warning'],24:['confirm-stop','unlock-door','open-door'],25:['acquisition-off','disconnect-strain','disconnect-laser','disconnect-network'],26:['remove-sensor'],27:['unclamp-workpiece','remove-workpiece'],28:['clean-left','clean-center','clean-right'],29:['close-door','lock-door'],30:['control-off','power-off','air-off']};
const PENALTY={1:1,2:2,3:1,4:1,5:2,6:2,7:2,8:3,9:2,10:1,11:1,12:2,13:2,14:1,15:5,16:2,17:3,18:3,19:2,20:3,21:3,22:2,23:3,24:2,25:1,26:2,27:1,28:1,29:1,30:1};
const short=(v,max=200)=>String(v??'').slice(0,max);
export const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function normalizeDelta(value){
 if(!value||!Array.isArray(value.ops)||value.ops.length>2000)throw Error('报告格式不正确');
 let size=0;const ops=value.ops.map(op=>{if(!op||typeof op.insert!=='string')throw Error('报告仅支持文字和排版，不支持脚本或嵌入对象');size+=op.insert.length;if(size>60000)throw Error('报告文字超过60000字');const attributes={};for(const k of ['bold','italic','underline'])if(op.attributes?.[k]===true)attributes[k]=true;
  if([2,3].includes(op.attributes?.header))attributes.header=op.attributes.header;
  if(['bullet','ordered'].includes(op.attributes?.list))attributes.list=op.attributes.list;
  if(['center','right','justify'].includes(op.attributes?.align))attributes.align=op.attributes.align;
  return {insert:op.insert,...(Object.keys(attributes).length?{attributes}:{})};});
 return {ops:ops.length?ops:[{insert:'\n'}]};
}
export const deltaText=d=>normalizeDelta(d).ops.map(o=>o.insert).join('');
export function deltaHtml(delta){
 let result='',line='',list=null;
 const flush=a=>{const wanted=a.list==='bullet'?'ul':a.list==='ordered'?'ol':null;if(list!==wanted){if(list)result+='</'+list+'>';if(wanted)result+='<'+wanted+'>';list=wanted;}const tag=wanted?'li':a.header?'h'+a.header:'p';result+='<'+tag+(a.align?' style="text-align:'+a.align+'"':'')+'>'+(line||'<br>')+'</'+tag+'>';line='';};
 for(const op of normalizeDelta(delta).ops){const a=op.attributes||{},parts=op.insert.split('\n');parts.forEach((text,i)=>{let h=escapeHtml(text);if(a.bold)h='<strong>'+h+'</strong>';if(a.italic)h='<em>'+h+'</em>';if(a.underline)h='<u>'+h+'</u>';line+=h;if(i<parts.length-1)flush(a);});}if(line)flush({});if(list)result+='</'+list+'>';return result;
}
export function newReport(now=Date.now(),id=crypto.randomUUID()){
 return {schema:REPORT_SCHEMA,id,createdAt:now,updatedAt:now,status:'draft',student:{name:'',number:'',group:''},delta:{ops:[{insert:'\n'}]},events:[],review:{score:null,comment:'',reviewer:'',at:null},source:'local'};
}
export function normalizeEvent(event){
 if(!event||!['visit','success','error','complete'].includes(event.type)||!Number.isInteger(event.step)||!REQUIRED[event.step])throw Error('实验记录事件不合法');
 if(!Number.isSafeInteger(event.at)||event.at<1e12||event.at>9e12)throw Error('实验时间不合法');
 const inputs={};if(event.inputs&&typeof event.inputs==='object')for(const [k,v]of Object.entries(event.inputs).slice(0,24)){if(/^[a-zA-Z][a-zA-Z0-9]*$/.test(k)&&((typeof v==='number'&&Number.isFinite(v))||typeof v==='string'||typeof v==='boolean'))inputs[k]=typeof v==='string'?v.slice(0,160):v;}
 return {type:event.type,step:event.step,at:event.at,action:short(event.action,64),check:short(event.check,64),message:short(event.message),inputs};
}
export function appendEvent(report,event){
 if(report.status!=='draft')return false;if(report.events.length>=3000)throw Error('本次操作记录已达上限，请保存并新建实验');
 const normalized=normalizeEvent(event);normalized.at=Math.max(normalized.at,report.events.at(-1)?.at||report.createdAt);report.events.push(normalized);report.updatedAt=normalized.at;return true;
}
export function gradeReport(report,steps){
 const state=new Map(steps.map(s=>[s.number,{...s,checks:new Set(),speeds:new Set(),directions:new Set(),errors:[],actions:[],complete:false,startedAt:null,completedAt:null,visits:0}]));
 let current=null;
 for(const raw of report.events){const e=normalizeEvent(raw),s=state.get(e.step);if(!s)continue;
  if(e.type==='visit'){current=e.step;s.checks.clear();s.speeds.clear();s.directions.clear();s.visits++;s.startedAt??=e.at;}
  else if(current===e.step&&e.type==='error')s.errors.push(e);
  else if(current===e.step&&e.type==='success'){
   s.actions.push(e);s.checks.add(e.check||e.action);
   if(e.action.startsWith('jog-')){s.directions.add(e.action);if(Number.isFinite(Number(e.inputs.speed)))s.speeds.add(Number(e.inputs.speed));}
  }else if(current===e.step&&e.type==='complete'){
   const valid=e.step===15?s.directions.size>=2&&s.speeds.size>=2:REQUIRED[e.step].every(k=>s.checks.has(k));
   if(valid){s.complete=true;s.completedAt??=e.at;}
  }
 }
 const rows=[...state.values()].map(s=>{
  // Each rubric violation category is charged once, rather than once per click.
  const errors=s.errors.filter(e=>s.number!==15||e.message.includes('碰撞'));
  const units=s.number===9?new Set(errors.map(e=>e.action)).size:Math.min(1,errors.length);
  const deduction=s.complete?Math.min(s.points,units*PENALTY[s.number]):0;
  return {number:s.number,title:s.title,maxScore:s.points,score:s.complete?s.points-deduction:0,complete:s.complete,deduction,errors:s.errors.length,actions:s.actions.length,startedAt:s.startedAt,completedAt:s.completedAt,minutes:s.minutes,assessment:s.assessment,messages:[...new Set(s.errors.map(e=>e.message))]};
 });
 return {score:rows.reduce((n,r)=>n+r.score,0),maxScore:steps.reduce((n,s)=>n+s.points,0),completed:rows.filter(r=>r.complete).length,errors:rows.reduce((n,r)=>n+r.errors,0),rows};
}
export function normalizeReport(raw,{imported=false}={}){
 if(!raw||raw.schema!==REPORT_SCHEMA||typeof raw.id!=='string'||!/^[a-zA-Z0-9_-]{8,90}$/.test(raw.id)||!['draft','submitted'].includes(raw.status))throw Error('不支持的报告文件');
 if(!Array.isArray(raw.events)||raw.events.length>3000)throw Error('操作记录格式错误');
 if(!Number.isSafeInteger(raw.createdAt)||!Number.isSafeInteger(raw.updatedAt)||raw.createdAt<1e12)throw Error('报告日期不正确');
 const delta=normalizeDelta(raw.delta),events=raw.events.map(normalizeEvent);const score=raw.review?.score??null;
 if(score!==null&&(!Number.isFinite(score)||score<0||score>100))throw Error('报告评分必须为0—100分');
 return {schema:REPORT_SCHEMA,id:raw.id,createdAt:raw.createdAt,updatedAt:raw.updatedAt,status:raw.status,student:{name:short(raw.student?.name,60),number:short(raw.student?.number,60),group:short(raw.student?.group,80)},delta,events,submittedAt:Number.isSafeInteger(raw.submittedAt)?raw.submittedAt:null,review:{score,comment:short(raw.review?.comment,2000),reviewer:short(raw.review?.reviewer,60),at:Number.isSafeInteger(raw.review?.at)?raw.review.at:null},source:imported?'imported':raw.source==='imported'?'imported':'local'};
}
export function submitReport(report,steps,now=Date.now()){
 if(report.status==='submitted')return false;
 if(!report.student.name.trim()||!report.student.number.trim())throw Error('请填写姓名和学号/编号');
 if(gradeReport(report,steps).completed<1)throw Error('请先实际完成至少一个实验步骤，再提交阶段报告');
 if(deltaText(report.delta).trim().length<30)throw Error('请填写至少30字的实验报告内容');
 report.status='submitted';report.submittedAt=now;report.updatedAt=now;return true;
}
export function reviewReport(report,{score,comment='',reviewer=''},now=Date.now()){
 if(report.status!=='submitted')throw Error('请先提交报告');if(!Number.isFinite(score)||score<0||score>100)throw Error('报告评分必须为0—100分');
 report.review={score,comment:short(comment,2000),reviewer:short(reviewer,60),at:now};report.updatedAt=now;return report;
}
export function summaryReports(reports,steps,passLine=60){
 const submitted=reports.filter(r=>r.status==='submitted'),graded=submitted.filter(r=>r.review.score!==null),scores=graded.map(r=>r.review.score),operations=submitted.map(r=>gradeReport(r,steps).score);
 const mean=a=>a.length?Math.round(a.reduce((n,v)=>n+v,0)/a.length*10)/10:null;
 return {submitted:submitted.length,reviewed:graded.length,reportAverage:mean(scores),operationAverage:mean(operations),passRate:scores.length?Math.round(scores.filter(n=>n>=passLine).length/scores.length*1000)/10:null,distribution:[scores.filter(n=>n<60).length,scores.filter(n=>n>=60&&n<70).length,scores.filter(n=>n>=70&&n<80).length,scores.filter(n=>n>=80&&n<90).length,scores.filter(n=>n>=90).length]};
}
export function csvCell(value){const s=String(value??'');return '"'+(/^[=+\-@\t\r]/.test(s)?"'":'')+s.replaceAll('"','""')+'"';}
export function resultsCsv(reports,steps){
 const rows=[['姓名','学号/编号','班级','提交时间','完成步数','网页操作分','报告成绩','评阅人','评语','来源']];
 for(const r of reports.filter(r=>r.status==='submitted')){const g=gradeReport(r,steps);rows.push([r.student.name,r.student.number,r.student.group,new Date(r.submittedAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai'}),g.completed,g.score,r.review.score??'未评阅',r.review.reviewer,r.review.comment,r.source==='imported'?'导入文件':'本机记录']);}
 return '\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n');
}
