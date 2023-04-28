/* --------------------------------------------------------------- *
 * @version : 1.0
 * @date : 2022.09.19
 * @description : 다올저축은행 Fi 모바일 Script
 * --------------------------------------------------------------- */








// var ui = {
//     init: function(){ 
//         // 초기구동
//         this.keytab.init();
//         this.layout.init();
//         this.popup.init();
//         this.inputInit.set();
//         this.termsScroll.evt();
//         this.dropDown.init();
//         this.checked.init();
//         this.tabMenu.init();
//         this.inputClear.init();
//         this.pieGraph.init();
//         this.scrollTop.init();
//         this.scrollEvt.init();
//         this.changeToggle.evt();
//         this.accordion.init();
//     },
//     update: function(){ // 페이지 동적으로 뿌린 후 업데이트 ui.update();
//         this.popup.set();
//         this.inputInit.set();
//         // this.lottieAnimation.set();
//     },
//     transitionend:"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
    
//     keytab:{ /* 웹접근성 팝업안에서 탭키이동 */
// 		init:function(){
// 			ui.keytab.set( $("body") );
// 			this.evt();
// 		},
//         evt: function(){ // 텝키 작동 시 바디 focus 클래스 추가
//             $(document).on('keydown',function(event) {
//                 if(event.keyCode === 9){
//                     $(this).find('body').addClass('focus-visible');
//                 }
//             });
//             $(document).on('mousedown', function() {
//                 $(this).find('body').removeClass('focus-visible');
//             });
//         },
// 		set:function($els){
            
// 			var pbd = $els;
// 			var pls = pbd.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
// 			var peF = pls && pls.first();
// 			var peL = pls && pls.last();

// 			pls.length ? peF.on("keydown", function(event) { 
// 				// 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
// 				if (event.shiftKey && (event.keyCode || event.which) === 9) {
// 					// Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
// 					event.preventDefault();
// 					peL.focus();
// 				}
// 			}) : pbd.attr("tabindex", "0").focus().on("keydown", function(event){
// 				tabDisable = true;
// 				if ((event.keyCode || event.which) === 9) event.preventDefault();
// 				// Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
// 			});

// 			peL.on("keydown", function(event) {
// 				if (!event.shiftKey && (event.keyCode || event.which) === 9) {
// 					// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
// 					event.preventDefault();
// 					peF.focus();
// 				}
// 			});
// 		}
// 	},
//     layout: {
//         init: function(){
//             this.set();
//         },
//         set: function(){
            
//             var $wrap = $('.page-wrap');
//             var $header = $wrap.find('header.header');
//             var $lyout = $wrap.find('main.main > .inner');
//             var height = $('.btm-fixed').innerHeight() + 100;
//             var w = $header.find('> .inner> .title').innerWidth();
//             width = w / 2;

//             $header.find('> .inner > .title').css({
//                 'position' : 'absolute',
//                 'left' : `calc(50% - ${width}rem)`,
//             });

//             $lyout.css({
//                 'padding-bottom' :  `${height}rem`,
//             })

//             // 헤더가 없을 경우
//             if($header.length == 0) {
//                 $wrap.closest('body').addClass('is-removeHeaders')
//                 $wrap.addClass('is-headerless')
//             }else {
//                 return ;
//             }
//         },
        
//     },

//     popup: { // 레이어팝업
// 		init: function() {
// 			var _this = this;
// 			$(document).on("click", ".pop-layer .btn-pop-close:not('.no-close')", function() {
// 				var id = $(this).closest(".pop-layer").attr("id");
// 				_this.close(id);
// 			});

// 			_this.resize();
// 			$(window).on("load resize",function(){
// 				_this.resize();
// 			});
            
// 		},
// 		callbacks: {},
// 		open: function(id, params) {
//             var _this = this;

// 			if ( $("#" + id).length  <= 0  ) return ;   // id 호출팝업이 없으면 리턴

//             _this.opt = $.extend({
// 				ocb: null ,
// 				ccb: null,
// 				direct: "bottom",
// 				zIndex: "",
//                 callback: function(){
//                     console.log('오픈 콜백')
//                 } 
                
// 			}, params);

            
// 			_this.callbacks[id] = {} ;
// 			_this.callbacks[id].open  = _this.opt.ocb ? _this.opt.ocb : null ;
// 			_this.callbacks[id].close = _this.opt.ccb ? _this.opt.ccb : null ;


//             if(_this.opt.callback) _this.opt.callback();

// 			$("body").addClass("is-pop "+ "is-"+id);
//             $("body").css('overflow', 'hidden')

// 			$("#" + id).attr("role", "dialog").attr("aria-modal", "true").addClass(_this.opt.direct).css({ zIndex: _this.opt.zIndex }).fadeIn(10, function(){
// 				$(this).attr({"aria-labelledby":id + "-title"});
// 				$(this).find(".phd .ptit").attr("tabindex", "0");
// 				$(this).find(".phd .ptit").attr({"id": id +"-title"});
// 				$(this).addClass("on").attr("tabindex", "0").focus();

// 				_this.resize();
// 				_this.scroll(id);
// 				$(this).find(">.pbd").on(ui.transitionend,function(){
// 					if(_this.callbacks[id].open)  _this.callbacks[id].open();
// 					$(this).off(ui.transitionend);
// 				});
// 			});

// 			window.setTimeout(function(){
// 				_this.resize();
// 			});

//             /* 웹접근성 팝업안에서 탭키이동 */
//             ui.keytab.set( $("#" + id) );
//             ui.pieGraph.get() // PIE 그래프 높이값 호출 
// 		},
// 		close: function(id, params) {

// 			var _this = this;
// 			_this.closOpt = $.extend({
// 				ccb: null,
//                 callback: function(){
//                     console.log('1111')
//                 } 
// 			}, params);


//             if(_this.closOpt.callback) _this.closOpt.callback();

//             $("body").css('overflow', 'auto')
// 			$("#"+id).removeClass("on").on(ui.transitionend, function(){
// 				_this.resize();
// 				$(this).hide().removeClass(_this.opt.direct);
// 				// if( typeof _this.callbacks[id].close == "function" ){ _this.callbacks[id].close(); }
// 				try{ _this.callbacks[id].close(); }catch(error){}
// 				// if( typeof _this.closOpt.ccb == "function") { _this.closOpt.ccb(); }
// 				try{ _this.closOpt.ccb(); }catch(error){}

// 				if( !$(".pop-layer:visible").length ){
// 					// ui.lock.using(false);
// 					$("body").removeClass("is-pop").removeClass("is-"+id);
// 					$("body").removeClass("is-pop-pbt");
// 				}

//                 $(this).closest('body').find(`[aria-controls=${id}]`).focus(); // 오픈 팝업 포커스를 위한 attr 

// 				$(this).off(ui.transitionend);



// 			}).css({"z-index":""});
// 		},
// 		// set:function(){
// 		// 	this.resize();
// 		// 	this.scroll();
// 		// },
// 		resize:function(){
//  			$(".pop-layer:visible").each(function(){
// 				var $pop = $(this);
// 				var pctnH =  $pop.outerHeight();
// 				var pbtnH =  $pop.find(".pbt:visible").outerHeight() || 0 ;
// 				var ptopH =  $pop.find(".tops:visible").outerHeight() || 0 ;
// 				var floatH =  $pop.find(".floatbots>.inr:visible").outerHeight() || 0 ;
// 				// console.log(pbtnH,floatH);
// 				pctnH = pctnH - ( $pop.find(".phd").outerHeight() || 0 );
// 				if( $pop.is(".is-full") ){ $pop.find(".pbd>div.pct").css({"height": pctnH }); }
// 				if( $pop.is(".is-middle") ){ $pop.find(".pbd>div.pct").css({"max-height": pctnH - pbtnH - 40 });}
// 				if( $pop.is(".is-bottom") ){ $pop.find(".pbd>div.pct").css({"max-height": pctnH - ptopH - 30 });}
				
//                 if( $pop.find(".pbt:visible").length || $pop.find(".floatbots>.inr:visible").length ) {
// 					$("body").addClass("is-pop-pbt");
// 					$pop.addClass("is-pop-pbt");
// 					$pop.filter(".a,.c").find(".pct").css({"padding-bottom":"calc("+(pbtnH+floatH-0) + "rem + env(safe-area-inset-bottom))"});
// 				}else{
// 					$("body").removeClass("is-pop-pbt");
// 					$pop.removeClass("is-pop-pbt");
//                     $("body").removeAttr("aria-hidden"); 
// 					$pop.filter(".a,.c").find(".pct").css({"padding-bottom":""});
// 				}
// 			 });
// 		},
// 		scroll:function(id){
// 			var _this = this;
// 			var prevPosition = 0;
// 			var dnVar = 0;
// 			var upVar = 0;
// 			var gap = 3;
// 			$("#"+id+" .pct").on("scroll",function(){
// 				var _this = this;
// 				var scrTop = $(this).scrollTop();
// 				// console.log(id," = scrol = " , $(this).scrollTop());
// 				var initPosition = scrTop;
// 				// console.log(initPosition , prevPosition);
// 				// console.log(dnVar - upVar);
// 				if( initPosition > prevPosition ){
// 					dnVar ++ ;
// 					// console.log(id + " dn");
// 					//스크롤다운중;
// 					upVar = 0;
// 					$("#" + id + "").addClass("is-pop-scroll-down");
// 					// console.log(dnVar,upVar , upVar-dnVar);
// 					if( upVar-dnVar < -gap ) {
// 						$("#" + id + "").addClass("is-pop-pbt-hide");
// 					}
// 				}else {
// 					upVar ++ ;
// 					// console.log(id + " up");
// 					//스크롤 업중;
// 					dnVar = 0;
// 					$("#" + id + "").removeClass("is-pop-scroll-down");
// 					if( dnVar-upVar < 1 ) {
// 						$("#" + id + "").removeClass("is-pop-pbt-hide");
// 					}
// 				}
// 				prevPosition = initPosition ;

// 				if (scrTop > 10) {
// 					$("#"+ id + "").addClass("is-pop-head-shadow");
// 				}else{
// 					$("#" + id + "").removeClass("is-pop-head-shadow");
// 				}

// 				// 바닥첵크
// 				var docH = $("#"+id+" .poptents").outerHeight();
// 				var scr = scrTop + $("#"+id+" .pct").outerHeight();
// 				// console.log(docH,scr);
// 				if(docH <= scr + gap ){
// 					// console.log("바닥");
// 					$("#"+id+"").removeClass("is-pop-scroll-down");
// 					$("#"+id+"").removeClass("is-pop-pbt-hide");
// 				}else{
// 					//
// 				}
				

// 			});

// 		}
// 	},
    
//     termsScroll:{
//         evt :function(){
//             $(".layer-scroll .pct").on("scroll" ,function(){
//                 var scrollTop = $(this).scrollTop();
//                 var innerHeight = $(this).innerHeight();
//                 var scrollHeight = $(this).prop('scrollHeight');  // scrollHeight 구하기  

//                 num = Math.ceil( scrollTop + innerHeight )

//                 if(num >= scrollHeight) {
//                     $('.layer-scroll .btn-wrap .btn').text('동의합니다')
//                 }else {
//                     $('.layer-scroll .btn-wrap .btn').text('스크롤하기')
//                 }
                
//             });
//         },
       
//     },

//     scrollTop : {
//         init: function(){
//             this.evt();
//         },
//         evt : function(){
//             var hasPress = $('.main').hasClass('press');
//             var hasFooterBtn = $('.main + .btn-wrap').hasClass('btm-fixed');

//             if( hasPress === true ){
//                 $('.btm-fixed-top').css('bottom', 60);
//             } else if( hasFooterBtn === true ){
//                 $('.btm-fixed-top').css('bottom', 50);
//             }

//             $('.btn-top').click(function() {
//                 $('html, body').animate({
//                     scrollTop : 0 
//                 }, 400);
//             });
//         }
//     },

//     scrollEvt:{
//         init: function(){
//             this.evt();
//             console.log(1)
//         },
//         evt: function(){
//             if( !$('.page-wrap .header .title').length ) return; // 값이 없을 경우 리턴 

//             $('.page-wrap .header .title').hide();
//             $(window).on('scroll', function(){
//                 var isCheck = $('.page-wrap .header .title').length;
//                 var st = $(window).scrollTop(); //높이
//                 if(isCheck){
//                     if(st >=  48){
//                         $('body').addClass('is-scroll');
//                         $('.page-wrap .header .title').show();
//                     }else {
//                         $('body').removeClass('is-scroll');
//                         $('.page-wrap .header .title').hide();
//                     }
//                 }

//                 var $sticky = $('.sticky');
//                 if(!$sticky.length) return;

//                 var currentRate = $('.rate-text').text()
//                 $sticky.find('.right-area .data').text(`${currentRate}%`)

//                 var $stickyPrev = $('.sticky').prev();
//                 var stickyTop = $stickyPrev.offset().top;


//                 if(st >= stickyTop ) {
//                     $sticky.addClass('fix')
                    
//                 }else {
//                     $sticky.removeClass('fix')
//                 }
//             });
//         },
//     },

//     dropDown : {
//         init: function(){
//             this.evt();
//         },
//         evt: function(){
            
//             $(document).on('click', '.ui-select-box .ui-select', function(){
//                 $(this).closest('.ui-select-box').addClass('focused');
//             });

//             $(document).on('click', '.btn-pop-close', function(){
//                 $(this).closest('body').find('.ui-select-box').removeClass('focused').addClass('completed');
//             });

//             $(document).on('click', '.dropdown-box .dropdown-option',function(e){
                
//                 var id = $(this).closest(".pop-layer").attr("id");
//                 var opt = $(this).text();
//                 $(`[aria-controls=${id}]`).find('.option').text(opt);
//                 $(`[aria-controls=${id}]`).addClass('completed').focus(); // select-box 버튼에 completed 클래스 추가
//                 $("#" + id).find(".dropdown-option").not(this).removeClass('selected').attr('aria-selected', false);
//                 $('.dropdown-option').not(this).removeClass('selected').attr('aria-selected', false);
//                 $(this).addClass('selected').attr('aria-selected', true) // 선택시 selected 클래스 추가
                
//                 ui.popup.close(id) // 팝업 닫기 
                

//                 // 콤보박스 이벤트 
//                 if( $(`[aria-controls=${id}]`).hasClass('completed') ) {
//                     $(this).closest('body').find('.ui-select-box').removeClass('focused').addClass('completed')
//                 }
//             });
//         },
//     },
//     inputInit: {
//         set: function(){
//             $('.ui-input').on('focus', function(){
//                 $(this).parents('.ui-input-box').addClass('focused');
                
//             }).on('focusout', function(){
//                 var inputValue = $(this).val();
//                 if ( inputValue !== "" ) {
//                     $(this).parents('.ui-input-box').addClass('completed');  
//                 } else {
//                     $(this).parents('.ui-input-box').removeClass('completed');
//                 }
//                 $(this).parents('.ui-input-box').removeClass('focused');
//                 // 툴팁 활성화 클래스 제거
//                 var $tooltip = $(this).parents('.ui-input-box').find('.tooltip-area');
//                 if($tooltip) {
//                     $tooltip.removeClass('is-active');
//                 }
//             });
//         }
//     },
//     checked : { // 체크 박스 및 라디오 버튼
//         init: function(){
//             this.evt();
//             this.set();
//         },
//         evt: function(){
//             var _this = this;
//             $(document).on('change', 'label.radio > input, label.checkbox > input',function(e){
//                 _this.set();
//             });
//         },
//         set:function(){
//             $('label.radio, label.checkbox').each(function(){

//                 var $checked = $(this);
//                 var $typeCheck = $checked.find('input').attr('type');
//                 var $disabled = $checked.find('input').attr('disabled');

//                 $checked.find('input').attr('aria-hidden','true');

//                 // 라디오
//                 if( $typeCheck == 'radio' ){  
//                     $checked.attr('role','radio');
//                     if ($checked.find('input').is(':checked') == true ) {
//                         $checked.attr('aria-checked',true);
//                     }else{
//                         $checked.attr('aria-checked',false);
//                     }
//                 }
                
//                 // 체크박스
//                 if( $typeCheck == 'checkbox' ){  
//                     $checked.attr('role','checkbox');
//                     if(	$checked.find('input').is(':checked') ){
//                         $checked.attr('aria-checked',true);
//                     }else{
//                         $checked.attr('aria-checked',false);
//                     }

//                     // select-box에서 체크시 select-box에 completed 클래스 추가
//                     if(	$checked.find('.select-check').is(':checked') ){
//                         $checked.parents('.select-box').addClass('completed');
//                     }else{
//                         $checked.parents('.select-box').removeClass('completed');
//                     }
//                 }

//                 // disabled 체크
//                 if( $disabled == 'disabled' ){
//                     $checked.attr('aria-disabled', 'true');
//                 }
//             });
//         },
//     },
//     tabMenu : {
//         init: function() {
//             this.evt();
//             this.set();
//         },
//         set: function(){
//             $('.ui-tab').attr({'role':'tablist'});
//             $('.ui-tab > button').each(function(){
//                 $(this).attr({'role':'tab'});
//                 $(this).is('.active') ? $(this).attr({'aria-selected':'true'}) : $(this).attr({'aria-selected':'false'});
//             });
            
//             $('.tab-content').each(function(){
//                 $(this).attr({'role':'tabpanel' });
//             })
//         },
//         evt: function(){
//             var _this = this;
//             $(document).on('click', '.ui-tab > button', function(e){
//                 _this.using(this);
//                 _this.set();
//             });
//         },
//         using: function(els){
//             var val = $(els).attr('id')
//             $(els).addClass('active').siblings().removeClass('active')
//             $(`[aria-labelledby=${val}]`).addClass('active').siblings().removeClass('active')
//         }
//     },
//     accordion : { // 아코디언 
//         init: function (targetGroup) {
//             if(targetGroup) this.$accordion = $(targetGroup + ' .accordion');
//             else this.$accordion = $('.accordion');

//             if(!this.$accordion.length) return false;

//             this.evt();
//         },
//         evt: function() {
//             var _this = this,
//             accCount = 1; // 동적 생성부분과 갯수 체크 수정 필요!!!
            
//             this.$accordion.each(function() {
//                 var chkParent = $(this).parent().hasClass('auto-close');
//                 var accTrigger = $(this).find('.acc-trigger');
//                 var accContent = $(this).find('.acc-content');

//                 if(!accTrigger.attr('aria-expanded')) accTrigger.attr('aria-expanded', 'false');

//                 accTrigger.attr({
//                     'id' : 'acc_head' + accCount,
//                     'aria-controls' : 'acc_content' + accCount
//                 });

//                 accContent.attr({
//                     'id' : accTrigger.attr('aria-controls'),
//                     'aria-labelledby' : accTrigger.attr('id'),
//                     'aria-hidden' : 'true'
//                 });

//                 accCount++;

//                 // 아코디언 열기 체크
//                 if(accTrigger.attr('aria-expanded') === 'true') {
//                     accTrigger.attr('aria-label', '컨텐츠 닫기');
//                     $(this).find('.acc-content').attr('aria-hidden', 'false').show();
//                 } else {
//                     accTrigger.attr('aria-label', '컨텐츠 열기');
//                 }

//                 accTrigger.on('click', {chkParent, accTrigger, accContent}, _this.accToggle);
//             });
//         },
//         accToggle: function(e) {
//             var chkOpen = e.data.accTrigger.attr('aria-expanded'),
//                 triggerTitle;

//             if(chkOpen === 'true') {
//                 chkOpen = 'false';
//                 triggerTitle = '컨텐츠 열기';
//             } else {
//                 chkOpen = 'true';                
//                 triggerTitle = '컨텐츠 닫기';
//             }
//             chkClose = !JSON.parse(chkOpen);
            
//             // 나머지 닫기(.auto-close) 체크
//             if(e.data.chkParent) {
//                 var siblings = e.data.accTrigger.closest('.accordion').siblings();
//                 siblings.find('.acc-trigger').attr('aria-expanded', 'false');
//                 siblings.find('.acc-content').attr('aria-hidden', 'false').slideUp(200);
//             }
            
//             e.data.accTrigger.attr({
//                 'aria-expanded' : chkOpen,
//                 'aria-label' : triggerTitle
//             });
//             e.data.accContent.attr('aria-hidden', chkClose).slideToggle(200);
//         }
//     },
//     inputClear : {
//         init: function() {
//             this.$inputClear = $('.ui-input.input-clear');
//             if(!this.$inputClear.length) return false;

//             this._bindEvent();
//             this._setClearButton();
//         },
//         _bindEvent: function() {
//             var clearWrap = '<div class="input-clear-wrap"/>';
//             var clearBtn = '<button type="button">초기화</button>';

//             this.$inputClear.wrap(clearWrap).after(clearBtn).on('focus blur keyup', function() {
//                 var btnClear = $(this).next('button');
//                 $(this).val().length ? btnClear.show() : btnClear.hide();
//             });
//         },
//         _setClearButton: function() {
//             $('.input-clear-wrap > button').off('click').on('click', function() {
//                 $(this).hide().prev('input').val('').focus();
                
//                 // input-clear 클릭시 input-error 클래스 제거
//                 var $inputBox = $(this).parents('.ui-input-box');
//                 if($inputBox.hasClass('input-error')) {
//                     $inputBox.removeClass('input-error');
//                 }
//             });
//         }
//     },
//     pieGraph : { // 원형 PIE 그래프
//         init : function(){
//             this.set();
//         },
//         set :function(){
//             var $pie = $('.pie-wrap .pie');
//             if($pie.length <= 0 ) return;

//             var result;

//             var onTxt = $('.step-area .step-item li.on');
//             var maxNum = $('.step-area .step-item li').length;
//             var minNum = $('.step-area .step-item li').index(onTxt) + 1; // on 클래스 인덱스 값

//             result = Math.ceil( ( minNum /  maxNum ) * 100 )  ; 

//             // onTxt.prevAll().append('<a href="javascript:void(0)" class="icon icon-modify"><span class="sr-only">수정</span></a>');

//             $pie.attr('data-value' , `${minNum}`);
//             $pie.attr('aria-label' , `${minNum} of ${maxNum}`);
//             $pie.find('.is-current').attr('aria-current' , `${minNum}`).text(`${minNum}`);
//             $pie.find('circle').css({
//                 'stroke-dasharray' : `${result + 1} 100`,
//                 'stroke-dashoffset' :  `${result + 1}`
//             });
//             var $progressValue = $('.progress.vertical > .progress-bar');
//             var $tooltip = $('.progress.vertical .tooltip');
        
//             $progressValue.attr({
//                 'aria-valuenow': `${result}`,
//             })
//             $progressValue.css({
//                 'height': `${result}%`
//             });
//             // $tooltip.text(`${Math.ceil(result / 100 * 10 )}0%`) // 뒤에 절삭 0 으로 만들게 되면 주석 제거 후 사용;
//             $tooltip.text(`${result}%`);

//         },
//         get :function(){ // 우측 그래프 높이 값
//             var height =  $('.step-area .step-list').height() - 12;
//             $('.pop-layer .progress-area').height(height)
//         }
//     },
//     loading : { // 로딩
//         show: function(){
//             var opt = $.extend({
//                 cls : "",
//                 msg : ""
//             });
            
//             var el =
//             `<article class="ui-loading ${ opt.cls }">
//             	<em>
//             		<div class="pct"> ${ opt.msg } </div>
//             	</em>
//             </article>`;

//             $("body").append(el).addClass("is-loading");
//             console.log('loading');
//         },
//         hide: function(){
            
//             $(".ui-loading").remove();
//             $("body").removeClass("is-loading");
//             console.log('loading hide');
//         }
//     },
//     changeToggle: {
//         evt : function(){
//             $(document).on('click', '.auth-box', function(){
//                 $('.auth-box').not(this).removeClass('is-active');
//                 $(this).toggleClass('is-active');
//             })
//         }
//     },

//     alert:function(msg,params){ // 커스텀 알럿

// 		var opt = $.extend({
// 			msg:msg,
// 			tit:"",
// 			cls:"",
// 			ycb:"",
// 			ybt:"확인"
// 		}, params);

// 		if( $(".ui-alert").length ) return;
		
// 		// ui.lock.using(true);
// 		// console.log(opt.tit);

// 		var lyAlert =
// 		'<article role="alertdialog" aria-live="assertive" tabindex="0" class="ui-alert ' + opt.cls + '">' +
// 		'	<div class="pbd">'+
// 		'		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
// 		'		<div class="pct"><div class="msg">'+opt.msg+'</div></div>'+
// 		'		<div class="pbt">'+						
// 		'			<button type="button" class="btn btn-primary btn-confirm">'+ opt.ybt +'</button>'+
// 		'		</div>'+
// 		// '		<button type="button" class="btn-close">닫기</button>'+ 상단 X 단기 버튼 
// 		'	</div>'+
// 		'</article>';

// 		$("body").append(lyAlert).addClass("is-alert");
// 		if (opt.tit) {
// 			$(".ui-alert>.pbd>.phd").addClass("is-tit");
// 		}


// 		$(".ui-alert").find(".btn-confirm").on("click",function(){
// 			window.setTimeout(opt.ycb);
// 		});
// 		$(".ui-alert").find(".btn-close , .btn-confirm").on("click",alertClose);

// 		function alertClose(){
// 			$(".ui-alert").remove();
// 			$("body").removeClass("is-alert");
// 			// if( $(".pop-layer:visible").length < 1 ){
// 			// 	ui.lock.using(false);
// 			// }
            
// 		}
// 		/* 웹접근성 팝업안에서 탭키이동 */
// 		ui.keytab.set( $(".ui-alert").find(".pbd") );
// 		$(".ui-alert").focus();
// 	},
// 	confirm:function(msg,params){ // 커스텀 컨펌

// 		var opt = $.extend({
// 			msg:msg,
// 			tit:"",
// 			cls:"",
// 			ycb:"",
// 			ybt:"확인",
// 			ncb:"",
// 			nbt:"취소"
// 		}, params);

// 		if( $(".ui-confrim").length ) return;
		
// 		// ui.lock.using(true);

// 		var lyConfirm =
// 		'<article role="alertdialog" aria-live="assertive" tabindex="0" class="ui-confrim ' + opt.cls + '">' +
// 		'	<div class="pbd">'+
// 		'		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
// 		'		<div class="pct"><div class="msg">'+opt.msg+'</div></div>'+
// 		'		<div class="pbt">'+
// 		'			<button type="button" class="btn btn-cancel">'+ opt.nbt +'</button>'+
// 		'			<button type="button" class="btn btn-primary btn-confirm">'+ opt.ybt +'</button>'+
// 		'		</div>'+
// 		// '		<button type="button" class="btn-close">닫기</button>'+ 상단 X 단기 버튼 
// 		'	</div>'+
// 		'</article>';
// 		$("body").append(lyConfirm).addClass("is-confrim");
// 		if (opt.tit) {
// 			$(".ui-confrim>.pbd>.phd").addClass("is-tit");
// 		}
		

// 		$(".ui-confrim").find(".btn-confirm").on("click",function(){
// 			window.setTimeout(opt.ycb);
// 		});

// 		$(".ui-confrim").find(".btn-cancel").on("click",function(){
// 			window.setTimeout(opt.ncb);
// 		});

// 		$(".ui-confrim").find(".btn-confirm, .btn-close , .btn-cancel").on("click", confirmClose);

// 		function confirmClose(){
// 			$(".ui-confrim").remove();
// 			$("body").removeClass("is-confrim");
// 			// if( $(".pop-layer:visible").length < 1 ){
// 			// 	ui.lock.using(false);
// 			// }
// 		}


// 		/* 웹접근성 팝업안에서 탭키이동 */
// 		ui.keytab.set( $(".ui-confrim").find(".pbd") );

// 		$(".ui-confrim:visible").focus();


// 	},

//     scrollBtn:function(els){
//         var _this = $(els);
//         console.log(_this);
        
//         var $closest = _this.closest('.layer-scroll')
//         var headerHeight = $closest.find('.phd .in').height();
//         var currentHeight =  $closest.find('.pbd .pct').innerHeight(); // 팝업 콘텐츠 높이
//         var currentScrollTop = $closest.find('.pbd .pct').scrollTop();
//         num = currentHeight - headerHeight - 15;
//         $closest.find('.pbd .pct').stop().animate({ scrollTop: currentScrollTop + num}, 500);

//         ui.termsScroll.evt()
        

//     },

//     tooltipFn:function(els){ 
//         var _this = $(els);
//         // var btnAttr = _this.attr('aria-describedby'); // 버튼 
//         // var id = _this.attr('id');

//         // var boxTooltip = $('.help-tooltip-area'); // 튤팁 박스
//         // boxTooltip.css('display', 'none');
//         // $('.btn-help').removeClass('is-active');
        
//         // var boxAttr = $('.help-tooltip-area').attr('id') // 하단 툴팁

//         // if (boxAttr === btnAttr) {
//         //     _this.addClass('is-active')
//         //     $(`#${btnAttr}`).css('display', 'block');
//         // } else if(id === '') {
//         //     $(`#${btnAttr}`).css('display', 'block');
//         // } 
//         $('.tooltip-box-area').click(function(e) {
//             e.preventDefault()
//         });
//         $('.tooltip-area').removeClass('is-active');
//         _this.parent('.tooltip-area').addClass('is-active');
       
//         $('.btn-tooltip-close').click(function() {
//             _this.parent('.tooltip-area').removeClass('is-active');
//         });
//     },
//     util: function(el, params){ 
     
//         params = (typeof params !== 'undefined') ?  params : '' // params 값이 없을 경우 빈값 처리
//         el.value = comma(uncomma(el.value));
//         $(el).val(el.value);

//         function comma(str) {
//             str = String(str);
//             return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
//         }
//         function uncomma(str) {
//             str = String(str);
//             return str.replace(/[^\d]+/g, '');
//         } 

//         // 최대 숫자 처리
//         if (params) {
//             var $sticky = $('.sticky .left-area .data'); 
//             var str = '5000'; // 최대 금액 
//             var maxNumber =  str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

//             var currentNumber = parseInt(el.value.replace(/,/g , ''));
//             if(currentNumber >= 5000) {
//                 $(el).val(maxNumber);
//                 $sticky.text(`${maxNumber}만원`)
//             }else {
//                 $sticky.text(`${el.value}만원`)
//             }
//         }
//     },

//     evtAction: function(el, params){
//         setTimeout(() => {
//             $(`#${params}`).css({
//                 'animation' : 'bound 0.25s ease-in',
//                 'display' : 'block',
//             })
//         }, 500);
       
//         $(`#${params}`).on('click', function(){
//             $(this).css({
//                 'animation' : 'unBound 0.25s ease-in',
//             });
//             setTimeout(() => {
//                 $(`#${params}`).css({
//                     'display' : 'none',
//                 })
//             }, 500);
//         });
//     },

//     // Lottie Plugin
//     lottieAnimation: {
//         set: function(svgData, idx){
            
//             console.log(idx)

//             if(!$('.lottie-wrap').length) return; 
//             bodymovin.loadAnimation({
//                 container: $('.lottie-area')[idx],
//                 animationData: svgData[idx],
//                 renderer: 'svg',
//                 loop: true, // Optional
//                 autoplay: true, // Optional
//             });
            
//         },
//     },

// }

// ui.init();
