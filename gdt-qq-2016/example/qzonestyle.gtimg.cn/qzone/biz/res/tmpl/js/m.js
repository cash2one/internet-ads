
define(function(require){var modUtil=require("./util");var comm=require("./comm");var Constants={ACTTYPE_TELCALL:18,ACTTYPE_DOWNLOAD:47,PULL_INTERVAL:15000,ROTATE_COUNT:3,CREATIVE_TYPE:{TEXT:1,IMG:2,IMGTEXT:3,IMGTXTDESC:7},AD_ACTITON_TYPE:{URL:0,APP:1,PHONE:18},APP_ALIST_ID:2022,TEL_ALIST_ID:2026,IOS_PLATFORM_TYPE:"ios",ANDROID_PLATFORM_TYPE:"android",PRODUCT_TYPE:{OPEN_APP:12,MYAPP:5,IOSAPP:19},NOMAL_POSIDLIST_URL:"http://qzonestyle.gtimg.cn/qzone/qzactStatics/configSystem/data/167/config1.js",IFRAME_HEIGHT:50,MIS_CLICK_DISTANCE:5,IFRAME_WIDTH:document.body.clientWidth||document.body.offsetWidth};var effectiveExposure=(function(){var mod={};mod.addVisibilityEvent=function(){function handleVisibilityChange(){if(document.hidden){GDT.I.documentVisibilityState="hidden";}else{GDT.I.documentVisibilityState="show";}}
comm.addVisibilityEvent(handleVisibilityChange);}
mod.checkIsAdHidden=function(checkFlag){comm.sendMessageToParent({op:'checkHidden',type:'banner',posid:GDT.I.posid,flag:checkFlag},GDT.I.posDomain);}
mod.doExpose=function(apurl){if(!GDT.I.exposureUrls[apurl]){var i=new Image();i.src=apurl;GDT.I.exposureUrls[apurl]=true;}}
mod.checkImg=function(){var isImgComplete='';modUtil.imgLoad(GDT.I.img,function(){if(GDT.I.img.complete){comm.sendMessageToParent({op:'getImgStatus',isImgComplete:GDT.I.img.complete,type:'banner',posid:GDT.I.posid},GDT.I.posDomain);}else{setTimeout(mod.checkImg,50);}})}
mod.exposeCheck=function(apurl,tplType){comm.sendMessageToParent({op:'exposeCheck',apurl:encodeURIComponent(apurl),tplType:tplType,type:'banner',posid:GDT.I.posid},GDT.I.posDomain);}
mod.isVisibility=function(){if(effectiveExposure.isAdHidden==false&&GDT.I.documentVisibilityState=="show"){return true;}else{return false;}}
return mod;})();var GDT={};GDT.I={posDomain:'',postNum:'',poll:'',speedval:[],isdspeed:[],speedurl:'http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=175&flag2=33&flag3=22&flag5=1',playBeginTime:'',clickPageX:'',clickPageY:'',loading:false,pullAd:function(){var _s=GDT.I;if(!effectiveExposure.isVisibility()){_s.checkHiddenHandler=window.setInterval(function(){var checkFlag="pullAdCheck"
effectiveExposure.checkIsAdHidden(checkFlag);if(effectiveExposure.isVisibility()&&effectiveExposure.checkHiddenFlag==checkFlag){window.clearInterval(_s.checkHiddenHandler);_s.checkHiddenHandler=null;if(_s.pauseData){_s.renderAd(_s.pauseData);_s.pauseData=null;}
_s.doPullAd();}},50);}else if(effectiveExposure.isVisibility()){_s.doPullAd();}},doPullAd:function(){GDT.I.pollHandler=window.setTimeout(function(){GDT.I.loadAd();},Constants.PULL_INTERVAL);},pollErrCnt:0,firstAd:true,needRotateAd:false,init:function(){var _spoint=parseInt(modUtil.getParameter('_spoint'));if(isNaN(_spoint))_spoint=+new Date;GDT.I.isdspeed[0]=_spoint;GDT.I.isdspeed[1]=window._speed;GDT.I.needrepspeed=true;GDT.I.posDomain=decodeURIComponent(modUtil.getParameter('posdomain'));GDT.I.scale=decodeURIComponent(modUtil.getParameter('scale'));GDT.I.documentVisibilityState="show";GDT.I.posid=decodeURIComponent(modUtil.getParameter('posid'));effectiveExposure.addVisibilityEvent();GDT.I.bindMessageEvent();var checkFlag="initCheck";effectiveExposure.checkIsAdHidden(checkFlag);comm.checkToLoadTBS(GDT.I.posDomain);var image=new Image();image.onerror=function(){GDT.I.webpenabled=false;GDT.I.doLoadAd();};image.onload=function(){GDT.I.webpenabled=true;GDT.I.doLoadAd();};image.src='data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';},bindMessageEvent:function(){var _s=GDT.I;if(window.postMessage){function receiver(event){if(!event.origin||event.origin!=_s.posDomain)return;var d=(typeof event.data=='string')?JSON.parse(event.data):event.data;if(!d)return;if(d.isAdHidden&&d.id==_s.posid){if(d.showedBanner){_s.showedBanner=d.showedBanner;}
if(d.isAdHidden=='false'){effectiveExposure.checkHiddenFlag=d.flag;effectiveExposure.isAdHidden=false;if(d.scale){_s.scale=d.scale;}}else{effectiveExposure.isAdHidden=true;}}else if(d.op&&d.op=='doExpose'&&d.id==_s.posid){var apurl=decodeURIComponent(d.apurl);effectiveExposure.doExpose(apurl);}else if(d.op&&d.op=='checkImg'&&d.id==_s.posid){effectiveExposure.checkImg();}else if(d.op&&d.op=='doTBSAppClick'){var url=decodeURIComponent(d.url);var ifr=document.createElement('iframe');ifr.width='0';ifr.height='0';ifr.style.display='none';ifr.src=url+'&_='+Math.random();document.body.appendChild(ifr);}};modUtil.addEvent(window,'message',receiver);}},firstLoad:true,loadAd:function(){var checkFlag="loadAdCheck";effectiveExposure.checkIsAdHidden(checkFlag);if(!GDT.I.firstLoad&&effectiveExposure.isVisibility()&&effectiveExposure.checkHiddenFlag==checkFlag||GDT.I.firstAd){GDT.I.doLoadAd();}else{setTimeout(arguments.callee,50);}},doLoadAd:function(){if(GDT.I.pollHandler){window.clearTimeout(GDT.I.pollHandler);GDT.I.pollHandler=null;}
var _s=GDT.I;var posid=decodeURIComponent(modUtil.getParameter('posid'));if(!posid||!posid.match(/^\d+$/))return;var posw=parseInt(modUtil.getParameter('posw'));var posh=parseInt(modUtil.getParameter('posh'));var appid=decodeURIComponent(modUtil.getParameter('appid'));var openid=decodeURIComponent(modUtil.getParameter('openid'));var openkey=decodeURIComponent(modUtil.getParameter('openkey'));var muidtype=parseInt(decodeURIComponent(modUtil.getParameter('muidtype')));var muid=decodeURIComponent(modUtil.getParameter('muid'));var taglist=decodeURIComponent(modUtil.getParameter('taglist'));var posclass=decodeURIComponent(modUtil.getParameter('posclass'));var visiturl=decodeURIComponent(modUtil.getParameter('visiturl'));var iframeheight=parseInt(modUtil.getParameter('iframeheight'));var iframewidth=parseInt(modUtil.getParameter('iframewidth'));Constants.IFRAME_HEIGHT=iframeheight;Constants.IFRAME_WIDTH=iframewidth;GDT.I.adtype=decodeURIComponent(modUtil.getParameter('adtype'));var isHybrid=modUtil.getParameter('ishybrid');GDT.I.platform=modUtil.getParameter('platform')||'web';GDT.I.isHybrid=!!(isHybrid=='true'||isHybrid==true);_s.parentUrl=decodeURIComponent(modUtil.getParameter('locurl'));_s.postNum=parseFloat(modUtil.getParameter('postnum'));var conw=modUtil.getParameter('conw');var conh=modUtil.getParameter('conh');if(!window.postMessage){comm.pingHot('no_pm');}
_s.posid=posid;var req={};req.posw=posw;req.posh=posh;GDT.I.speedval[0]=+new Date;var reqcond=comm.getReqCond();reqcond.sdk_src='mobile_union_js';reqcond.tmpallpt=true;if(taglist&&taglist!='undefined'){reqcond.taglist=encodeURI(taglist);}
if(posclass&&posclass!='undefined'&&modUtil.checkParam(posclass)){reqcond.class=''+posclass;}
if(muidtype&&muidtype!='undefined'&&modUtil.checkParam(muidtype)&&muid&&muid!='undefined'&&modUtil.checkParam(muid)){reqcond.muidtype=muidtype;reqcond.muid=muid;}
var urlLenght=modUtil.getByteLen(visiturl);if(urlLenght>0&&urlLenght<512){reqcond.url=visiturl;}
GDT.I.webpenabled&&(reqcond.webp='1');var url='http://mi.gdt.qq.com/gdt_mview.fcg?adposcount=1&charset=utf8&datafmt=jsonp&count=1&callback=GDTI.render&_='+Math.random()+'&posw={W}&posh={H}&posid={POSID}&ext={EXT}';url=url.replace(/{W}/,req.posw).replace(/{H}/,req.posh).replace(/{POSID}/,posid).replace(/{EXT}/,encodeURIComponent(JSON.stringify({req:reqcond})));if(appid&&appid!='undefined'&&modUtil.checkParam(appid)){url+='&appid='+appid;}
if(openid&&openid!='undefined'&&modUtil.checkParam(openid)){url+='&openid='+openid;}
if(openkey&&openkey!='undefined'&&modUtil.checkParam(openkey)){url+='&openkey='+openkey;}
if(GDT.I.firstLoad){GDT.I.firstLoad=false;}
modUtil.loadJS(url,null,{charset:'UTF-8'});},checkNeedRotate:function(){var _s=GDT.I;if(_s.loadingAds.length==Constants.ROTATE_COUNT){_s.needRotateAd=true;}},checkRenderAfterShowedBannerWin:function(){var _s=GDT.I;if(_s.showedBanner){var checkFlag="renderCheck";effectiveExposure.checkIsAdHidden(checkFlag);if(effectiveExposure.isVisibility()&&effectiveExposure.checkHiddenFlag==checkFlag){_s.renderAd(_s.tmpData);_s.tmpData=null;}else if(!effectiveExposure.isVisibility()){_s.pauseData=_s.tmpData;_s.tmpData=null;}else{setTimeout(arguments.callee,50);}}else{setTimeout(arguments.callee,50);}},loadingAds:[],render:function(data){var _s=GDT.I;if(data.ret===0&&data.data&&data.data[_s.posid]&&data.data[GDT.I.posid].ret===0&&data.data[_s.posid].list){if(GDT.I.firstAd){GDT.I.firstAd=false;comm.sendMessageToParent({result:'success'},GDT.I.posDomain);}
_s.loadingAds.push(data);_s.checkNeedRotate();_s.tmpData=data;_s.checkRenderAfterShowedBannerWin();if(_s.needRotateAd){window.setTimeout(_s.rotateRender,Constants.PULL_INTERVAL);}else{_s.pullAd();}}else{if(GDT.I.firstAd){_s.doPullAd();}else{_s.pullAd();}}},index:0,rotateRender:function(){var data=GDT.I.loadingAds[GDT.I.index];var checkFlag="rotateRenderCheck"
effectiveExposure.checkIsAdHidden(checkFlag);if(effectiveExposure.isVisibility()&&effectiveExposure.checkHiddenFlag==checkFlag){GDT.I.renderAd(data);GDT.I.index++;if(GDT.I.index==GDT.I.loadingAds.length){GDT.I.index=0;}
window.setTimeout(GDT.I.rotateRender,Constants.PULL_INTERVAL);}else{setTimeout(GDT.I.rotateRender,50);}},exposureUrls:[],exposure:function(rl,tplType){if(GDT.I.exposureUrls[rl]){return;}
effectiveExposure.exposeCheck(rl,tplType);},appUrlList:[],filterNormalPosList:function(url){seajs.use(Constants.NOMAL_POSIDLIST_URL,function(mod){var posidList=mod['posidList'];if(!modUtil.contains(posidList,GDT.I.posid)){return;}else{GDT.I.doClickFunc();}});},renderAd:function(data){var _s=GDT.I;var adtype=GDT.I.adtype;GDT.I.playBeginTime=+new Date;GDT.I.speedval[1]=+new Date;var posdata=data.data[GDT.I.posid].list;var pcfg=data.data[GDT.I.posid].cfg.playcfg;var left=0;if(adtype=='interstitial'){left=(pcfg.pw==600?'187px':'79px');}
for(var i=0,len=posdata.length;i<len;i++){posdata[i].isApp=_s.isAppAd(posdata[i]);posdata[i].appid=posdata[i].targetid||posdata[i].productid||posdata[i].uin||'';posdata[i].btn_left=left;}
var isApp=posdata[0].isApp;var tmplid='tplSingleImage';var pdata=posdata;var pt=posdata[0].cfg.pt;var tplData={isImgText:(pt==3||pt==7),img:posdata[0].img,txt:posdata[0].txt,desc:posdata[0].desc,landing_domain:posdata[0].domain,rl:posdata[0].rl,showCallButton:false,phone:"",isFromFeedsAd:false};if(pt==2){tmplid='tplImg';}else if(isApp){tmplid='tplApp';}else{tmplid='tplUrl';}
comm.filterAPPDesc(tplData);pdata=tplData;GDT.I.currentData=posdata[0];_s.container=modUtil.$('#gdtwrap_ul');if(!GDT.I.bindClick){GDT.I.bindClick=true;GDT.I.antispam=new comm.antiSpam(_s.container,function(){GDT.touched=true;});modUtil.addEvent(_s.container,'click',function(elm){var misClickDistance=Constants.MIS_CLICK_DISTANCE*_s.scale,iframeHeight=Constants.IFRAME_HEIGHT*_s.scale,iframeWidth=Constants.IFRAME_WIDTH;GDT.I.isClickThrough='0';GDT.I.clickPageX='';GDT.I.clickPageY='';if((('ontouchstart'in window)&&('ontouchend'in window))&&!GDT.touched){if((elm.pageY<=misClickDistance)||((iframeHeight-elm.pageY)<=misClickDistance)||(elm.pageX<=misClickDistance)||((iframeWidth-elm.pageX)<=misClickDistance)){}else{GDT.I.isClickThrough='1';}
comm.pingHot('fclick.'+GDT.I.posid,{posid:GDT.I.posid,fclick:false});GDT.I.clickPageX=elm.pageX;GDT.I.clickPageY=elm.pageY;}
GDT.I.doClickFunc();});}
pdata.scale=_s.scale;_s.container.innerHTML=modUtil.tmpl(tmplid,pdata);var scale=GDT.I.scale;if(tmplid=='tplImg'){modUtil.$('#logo img').style['-webkit-transform']='scale('+GDT.I.scale+')';modUtil.$('#logo img').style['-webkit-transform-origin']='bottom right';modUtil.$('#icon_word').style['-webkit-transform']='scale('+GDT.I.scale+')';modUtil.$('#icon_word').style['-webkit-transform-origin']='bottom left';scale=1;modUtil.$('#scalewrap').style['width']='';_s.img=modUtil.$(".largeImg");}else{modUtil.$('#logo img').style['-webkit-transform']='';modUtil.$('#logo img').style['-webkit-transform-origin']='';modUtil.$('#icon_word').style['-webkit-transform']='';modUtil.$('#icon_word').style['-webkit-transform-origin']='';modUtil.$('#scalewrap').style['width']=(1/scale)*100+'%';}
document.body.style['-webkit-transform']='scale('+scale+')';document.body.style['-webkit-transform-origin']='0 0';_s.apurl=posdata[0].apurl;_s.tplType=tmplid;_s.exposure(_s.apurl,tmplid);var modad_dom=_s.container.querySelector('.mod_ad');var ifr_h=modUtil.getParameter('conw');if(!ifr_h||ifr_h.indexOf('%')!=-1){ifr_h=document.body.offsetWidth||document.body.clientWidth||640;}
ifr_h+='';ifr_h=ifr_h.replace(/px/,'');var _scale=ifr_h/640;ifr_h=ifr_h*5/32;window.setTimeout(function(){var __h=document.body.offsetHeight||document.body.clientHeight;__h+='';__h=__h.replace(/px/,'');if(ifr_h>__h){ifr_h=__h;_scale=ifr_h/100;}
var fixh=50;if(ifr_h&&ifr_h>fixh){}
if(_scale>1)fixh*=_scale;},100);var rpt=500;if(data){rpt=data.rpt||data.ret;}
comm.rptcode(rpt,'mi.gdt.qq.com','gdt_mview.fcg?'+GDT.I.posid,GDT.I.playBeginTime-GDT.I.speedval[0]);GDT.I.speedrpt();},setFontSize:function(_scale){var _s=GDT.I;var __w=document.body.clientWidth||document.body.offsetWidth;var scale=GDT.I.scale||1;var wd=modUtil.$('.mod_ad .ad_app');var wdt=modUtil.$('.mod_ad .ad_tips dt');var wdd=modUtil.$('.mod_ad .ad_tips dd');var wgd=modUtil.$('.mod_ad .ad_goods dd');var wgt=modUtil.$('.mod_ad .ad_goods dt');var orig_font=16;wd&&(wd.style.fontSize=scale*14+'px');wdd&&(wdd.style.fontSize=scale*13+'px');wdt&&(wdt.style.fontSize=scale*14+'px');wgd&&(wgd.style.fontSize=scale*12+'px');wgt&&(wgt.style.fontSize=scale*15+'px');},isAppAd:function(adData){if(adData&&(adData.acttype==Constants.AD_ACTITON_TYPE.APP||adData.producttype==Constants.PRODUCT_TYPE.IOSAPP||adData.producttype==Constants.PRODUCT_TYPE.OPEN_APP||adData.producttype==Constants.PRODUCT_TYPE.MYAPP)){return true;}else{return false;}},speedrpt:function(ele){var url=GDT.I.speedurl;url+='&1='+(GDT.I.playBeginTime-GDT.I.speedval[0]);if(Math.random()<0.1){var i=new Image();i.src=url;}},doClickFunc:function(){GDT.touched=false;GDT.I.clickAd();},clickAd:function(){var data=GDT.I.currentData;var url=data.rl+'&s='+GDT.I.antispam.getAntiSpamInfo(JSON.stringify({isClickThrough:GDT.I.isClickThrough,playBeginTime:GDT.I.playBeginTime,pageX:GDT.I.clickPageX,pageY:GDT.I.clickPageY}));var apurl=data.apurl;if(!GDT.I.exposureUrls[apurl]){effectiveExposure.doExpose(apurl);}
if(data.isApp&&data.producttype!=Constants.PRODUCT_TYPE.IOSAPP){if(navigator&&navigator.userAgent&&navigator.userAgent.indexOf("MicroMessenger")!=-1&&GDT.I.posDomain&&GDT.I.posDomain.indexOf('weixin.qq.com')==-1){var r=new Image();r.src=url+"&acttype="+Constants.ACTTYPE_DOWNLOAD;setTimeout(function(){window.open('http://app.qq.com/#id=detail&appid='+data.appid);},100);}else{GDT.I.downloadAPP(url);}}else{if(GDT.I.platform==='mqq'){GDT.I.Mclick(url,false);}else if(GDT.I.isHybrid){GDT.I.MQzoneClick(url);}else{window.open(url);}}},Mclick:function(url,isApp){comm.sendMessageToParent({op:'mclick',isApp:isApp,url:encodeURIComponent(url)},GDT.I.posDomain);},MQzoneClick:function(url){comm.sendMessageToParent({op:'mqzoneclick',url:encodeURIComponent(url)},GDT.I.posDomain);},AndroidAppOtherClick:function(url){comm.sendMessageToParent({op:'androidAppOtherClick',adtype:GDT.I.adtype,url:encodeURIComponent(url)},GDT.I.posDomain);},downloadAPP:function(rl,orderid){var url=rl+"&acttype="+Constants.ACTTYPE_DOWNLOAD+"&callback=GDTI.downloadCB";modUtil.loadJS(url);},downloadCB:function(d){if(d.ret!==0)return;var clickid=d.data.clickid;var dstlink=d.data.dstlink;if(GDT.I.platform==='mqq'){GDT.I.Mclick(dstlink,true);}
else if(GDT.I.isHybrid){GDT.I.MQzoneClick(dstlink);}else{GDT.I.AndroidAppOtherClick(dstlink);}}};window.GDT=window.GDT||GDT;window.GDT.I=GDT.I;window.GDT.touched=false;window.GDTI={render:GDT.I.render,downloadCB:GDT.I.downloadCB};GDT.I.init();});