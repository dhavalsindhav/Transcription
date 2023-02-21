"use strict";(globalThis["webpackChunkTranscription"]=globalThis["webpackChunkTranscription"]||[]).push([[343],{8147:(a,l,e)=>{e.r(l),e.d(l,{default:()=>R});e(9665);var i=e(9835),s=e(499),o=e(6970),n=(e(826),e(4016)),t=e(8853),u=e(8339),d=e(5531),c=e(6950),r=e(9120),m=e(4170),_=e(3703),p=(e(3878),e(3129)),v=e.n(p);const g={class:"q-pa-md main-wrapper"},f={class:"datefilter_box"},h=(0,i._)("div",{class:"audio_list_head"},[(0,i._)("div",{class:"col1"},[(0,i._)("div",{class:"td_col1"},"Audio Name"),(0,i._)("div",{class:"td_col2"},"Patient Name"),(0,i._)("div",{class:"td_col3"},"Hospital Name")]),(0,i._)("div",{class:"col2"},"Action")],-1),w={class:"audio_list_body"},y={class:"audio_list_item"},k={class:"audio_list_col1"},Z={class:"audioplayer_col"},b=(0,i._)("span",{class:"play_icon"},[(0,i._)("i",{class:"las la-play"})],-1),q={class:"audio_info"},D={class:"audio_heading"},C={class:"audio_meta"},L={class:"audio_meta_list"},P={class:"audo_patient_name"},j={class:"audo_hospital_name"},H={class:"audio_list_action"},S={class:"text-center"},U=(0,i._)("i",{class:"las la-exclamation-triangle"},null,-1),W=(0,i._)("h5",null,"Data Not Found",-1),Q={class:"row justify-center q-my-md"},A={style:{display:"none"}},V={__name:"audioList",setup(a){const l=(0,i.RC)((()=>e.e(979).then(e.bind(e,7979)))),p=(0,u.tv)(),V=(0,u.yj)(),z=(0,s.iH)(!1),Y=(0,s.iH)([]),F=(0,s.iH)(!1),N=(0,s.iH)(null),T=(0,d.b)();c.Z.show({spinner:r.Z,message:"Loading..."});const x=(0,i.Fl)((()=>T.getAudioList)),I=(0,s.iH)(null),E=(0,s.iH)(1),B=(0,s.iH)(6),M=(0,s.iH)(!0);function O(){const a={from_date:N.value?.from,to_date:N.value?.to,limit:B.value,page:E.value,userId:V.params.slug.split("/")[0],statusId:V.params.slug.split("/")[1]};return T.fetchAudioList(a)}function R(a,l){O().then((a=>{a.success&&a.data.data.length>0?(E.value=E.value+1,l()):(M.value=!1,l(!0))})).catch((a=>{l(!0)})).finally((()=>{c.Z.hide()}))}function $(a){T.draft=a.draft,T.data=a,_.Z.set("data",a),p.push({name:"write-script",params:{slug:a.id}})}function K(a){c.Z.show({spinner:r.Z,message:"Loading..."}),n.Z.post(n.Z.resolveApiUrl(t.jU.SAVE,{id:a.id}),{status_id:"4"}).then((l=>{console.log(l),x.value.forEach(((l,e,i)=>{l.id==a.id&&(l.name="Published")}))})).catch((a=>{console.log(a)})).finally((()=>{c.Z.hide()}))}function G(a){c.Z.show({spinner:r.Z,message:"Loading..."}),n.Z.getWithParam(t.PZ.DOWNLOAD,{id:a}).then((a=>{a.success&&(console.log(a),z.value=!0,J(a))})).catch((a=>console.log(a))).finally((()=>c.Z.hide()))}async function J(a){Y.value=a.data,setTimeout((()=>{X(document.getElementById("downloadPDF")),c.Z.hide()}),4e3)}function X(a){v()(a,{margin:0,filename:`${Y.value[0].patient_name}_${Date.now()}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:1,letterRendering:!0},jsPDF:{unit:"in",format:"a4",orientation:"portrait"}})}function aa(){c.Z.show({spinner:r.Z,message:"Loading..."}),E.value=1,M.value=!0,T.audioList=[],R()}function la(){c.Z.show({spinner:r.Z,message:"Loading..."}),N.value=null,T.audioList=[],E.value=1,M.value=!0,I.value.reset(),I.value.resume(),I.value.trigger()}return(0,u.iS)(((a,l,e)=>{console.log("leave"),T.audioList=[],e()})),(a,e)=>{const n=(0,i.up)("q-btn"),t=(0,i.up)("q-card"),u=(0,i.up)("q-spinner-dots"),d=(0,i.up)("q-infinite-scroll"),c=(0,i.up)("q-date"),r=(0,i.up)("q-dialog"),_=(0,i.Q2)("close-popup");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",g,[(0,i._)("div",f,[(0,i.Wm)(n,{color:"primary",onClick:e[0]||(e[0]=a=>F.value=!0),label:N.value?.from?N.value.from+" to "+N.value.to:N.value??"Select Date"},null,8,["label"]),N.value?((0,i.wg)(),(0,i.j4)(n,{key:0,onClick:la,icon:"la la-times"})):(0,i.kq)("",!0)]),(0,i.Wm)(d,{onLoad:R,offset:250,"scroll-target":"body",ref_key:"scrollList",ref:I},{loading:(0,i.w5)((()=>[(0,i._)("div",Q,[(0,i.Wm)(u,{color:"primary",size:"40px"})])])),default:(0,i.w5)((()=>[0!==(0,s.SU)(x).length?((0,i.wg)(),(0,i.j4)(t,{key:0,class:"q-pa-lg"},{default:(0,i.w5)((()=>[h,(0,i._)("div",w,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)((0,s.SU)(x),(a=>((0,i.wg)(),(0,i.iD)("div",{class:"audio_list_bg caption",key:a},[(0,i._)("div",y,[(0,i._)("div",k,[(0,i._)("div",Z,[b,(0,i._)("div",q,[(0,i._)("p",D,(0,o.zw)(a.audio_name),1),(0,i._)("div",C,[(0,i._)("ul",L,[(0,i._)("li",null,[(0,i.Uk)(" Duration: "),(0,i._)("b",null,(0,o.zw)(a.audio_duration),1)]),(0,i._)("li",null,[(0,i.Uk)(" Created at: "),(0,i._)("b",null,(0,o.zw)((0,s.SU)(m.ZP).formatDate(a.created_at,"DD-MM-YYYY")),1)])])])]),(0,i._)("div",P,[(0,i._)("p",null,[(0,i._)("b",null,(0,o.zw)(a.patient_name),1)])]),(0,i._)("div",j,[(0,i._)("p",null,(0,o.zw)(a.hospital_name),1)])])]),(0,i._)("div",H,["Published"==a.name?((0,i.wg)(),(0,i.j4)(n,{key:0,round:"",color:"primary",icon:"las la-download",class:"q-ml-sm",padding:"sm",onClick:l=>G(a.id)},null,8,["onClick"])):(0,i.kq)("",!0),"Confirmed"==a.name?((0,i.wg)(),(0,i.j4)(n,{key:1,color:"green",label:"Publish",class:"q-ml-sm",onClick:l=>K(a)},null,8,["onClick"])):(0,i.kq)("",!0),(0,i.Wm)(n,{round:"",color:"secondary",icon:"las la-edit",class:"q-ml-sm",padding:"sm",disable:"Pending"!==a.name,onClick:l=>$(a)},null,8,["disable","onClick"])])])])))),128))])])),_:1})):M.value?(0,i.kq)("",!0):((0,i.wg)(),(0,i.j4)(t,{key:1,class:"q-pa-lg"},{default:(0,i.w5)((()=>[(0,i._)("div",S,[(0,i.Wm)(n,{class:"not_found_icon",outline:"",color:"primary"},{default:(0,i.w5)((()=>[U])),_:1}),W])])),_:1}))])),_:1},512)]),(0,i._)("div",A,[z.value?((0,i.wg)(),(0,i.j4)((0,s.SU)(l),{key:0,items:Y.value,id:"downloadPDF"},null,8,["items"])):(0,i.kq)("",!0)]),(0,i.Wm)(r,{modelValue:F.value,"onUpdate:modelValue":e[2]||(e[2]=a=>F.value=a)},{default:(0,i.w5)((()=>[(0,i.Wm)(c,{modelValue:N.value,"onUpdate:modelValue":e[1]||(e[1]=a=>N.value=a),range:""},{default:(0,i.w5)((()=>[(0,i.wy)((0,i.Wm)(n,{label:"Submit",onClick:aa,type:"submit",color:"primary"},null,512),[[_]])])),_:1},8,["modelValue"])])),_:1},8,["modelValue"])],64)}}};var z=e(8879),Y=e(6870),F=e(4458),N=e(7691),T=e(7501),x=e(2074),I=e(6711),E=e(2146),B=e(9984),M=e.n(B);const O=V,R=O;M()(V,"components",{QBtn:z.Z,QInfiniteScroll:Y.Z,QCard:F.Z,QChip:N.Z,QSpinnerDots:T.Z,QDialog:x.Z,QDate:I.Z}),M()(V,"directives",{ClosePopup:E.Z})}}]);