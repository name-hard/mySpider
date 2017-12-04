
var common = {
    datepicker_CurrentInput : null
};
$(function(){

	/**
	 *   点击执行浏览器后退事件
	 *   如无浏览历史 取data-default-back 中的值跳转 data-default-back的值应为合法的url路径
	 *   如无data-default-back，跳转index.html
	 */
	$(document).on("click",".history-back",function(){
		core.visitHistory.goBack();
	});
    // 征信信息tab切换
    $(".credit-information-tab a").click(function(){
        var activeID = $(this).data("href");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(".credit-information").hide();
        $("#"+activeID).show();
    });
    // 证照信息图片显示切换
    $(".item-fold").click(function(){
    	if($(this).text() === '收缩'){
    		$(this).text("展开");
		}else {
            $(this).text("收缩");
		}
        $(this).parent().siblings(".item-bd").slideToggle()
    });
	// 弹出层取消按钮
	$(document).on("click",".pop-cancel",function(){
		$.fancybox.close();
	});
	$(document).on("input propertychange",".frm-input-box.has-count input",function () {
		var lenght = $(this).val().length;
		$(this).siblings(".input-count").find(".count-unm").text(lenght);
    });
	// 页面初始化时，如果窗体高度大于body高度，移除info_operate_fixed样式
	// 让bottomOperate部分absolute
	// 否则添加info_operate_fixed，让bottomOperate部分fixed
	if($(window).height() > $(document.body).height()){
		$("#bottomOperate").removeClass("info-operate-fixed");
	} else {
		$("#bottomOperate").addClass("info-operate-fixed");
	}
	
	// 点击tab切换tab页显示
	$(".tab-hd .tab-hd-con").click(function () {  
		// 被点击的tab添加active样式
		$(this).addClass("active");
		// 被点击的tab的兄弟节点移除active样式
		$(this).siblings().removeClass("active");
		// 获得tab的主体
		var parentsEl = $(this).parents(".tab");
		// 查找tab的内容部分，全部添加hide样式，移除active样式
		parentsEl.find(".tab-bd .tab-bd-con").addClass("hide").removeClass("active");
		// 获取所有的tab头部分
		var ary = parentsEl.find(".tab-hd .tab-hd-con");
		// 将与所点击的tab头部分索引相同的tab内容部分，添加active样式，移除hide样式
		// 至此已完成点击tab头，切换显示tab内容的功能
		parentsEl.find(".tab-bd .tab-bd-con:eq(" + $.inArray(this, ary) + ")").addClass("active").removeClass("hide");
		// 以下实现滚动到顶部的功能
		if(parentsEl.find(".position-tab").length > 0){
			// 获取页面主体部分距离顶部的高度
			var bodyscroll = parentsEl.parents("#body").offset().top;
			// 如果页面滚动的距离大于页面主体部分距离顶部的高度
			// 那么将页面滚动至主体部分的顶部
			if($(document).scrollTop()>bodyscroll){
				$("html,body").animate({ scrollTop:bodyscroll+33},400);
				return false;
			}
			// 如果页面高度比较小，点击切换的时候，下面的操作按钮条不会浮动上来
			if($(window).height() > $(document.body).height()){
				$("#bottomOperate").removeClass("info-operate-fixed");
			} else {
				$("#bottomOperate").addClass("info-operate-fixed");
			}
		}
        if($(window).height() >= ($(document.body).height() + 70)){
            $("#footer").css({"position":"fixed","bottom":0});
        }else{
            $("#footer").css({"position":"static","bottom":0});
        }
	});
    $(window).scroll(function(){
        if($(".tab").length>0){
            var tab_top = $(".tab").offset().top;
            var scroll_top = $(document).scrollTop();
            var mainHd_top = $("#main_hd").offset().top + $("#main_hd").height();
            if( scroll_top > tab_top){
                $(".title-tab").addClass("nav-fixed");
                if($(".originalTab-fixed").length == 0){
                    $(".title-tab").before("<div class='originalTab-fixed'></div>");
                }
            }else{
                $(".title-tab").removeClass("nav-fixed");
                $(".originalTab-fixed").remove();
            };
        }
        if($("#foot_operate_area").length>0) {
            var bottom = $(document).height() - $("#foot_operate_area").offset().top - $("#foot_operate_area").height();
            var scroll_bottom = $(document).height() - $(document).scrollTop() - $(window).height();
            var scroll_top = $(document).scrollTop() + $(window).height();
            var body_top = $("#body").offset().top + $("#body").height();
            if (scroll_top <= body_top + 31) {
                $("#bottomOperate").addClass("info-operate-fixed");
            }
            else {
                $("#bottomOperate").removeClass("info-operate-fixed");
            }
        }
    });

    // 左侧菜单 menu dynamic load
	/*if($("#menuBar").length>0){
		$("body").delegate("#nav li a","click",function(){
			$(this).parent().siblings().removeClass("active");
			$(this).parent().addClass("active");
			menu($(this).data("name"));
			nav($(this).data("name"));
		});

		// 左侧菜单点击显隐 menu toggle
		$("#menuBar").delegate(".menu_title","click",function(){
			$(this).toggleClass("active")
			$(this).siblings(".menu_item").slideToggle();
		});
	}*/
	// 顶部大功能菜单导航 nav dynamic load
	/*if($("#nav").length>0){
		nav();
	}*/
	
	// 表格列表宽度够不折行 table max width
	$.each($(".nowrap-table"),function (index, enpty) {
		if ($(enpty).parents().hasClass("item-bd")){
			$(enpty).css("width",$("#body").width()-291);
		}else {
			$(enpty).css("width",$("#body").width()-251);
		}
	});
	// $(".nowrap-table").css("width",$("#body").width()-251);

	//验证的提示信息
	$("body").delegate(".popoverbox","mouseenter",function(){
		$(this).children(".popover-validate").show();
	});
	$("body").delegate(".popoverbox","mouseleave",function(){
		$(this).children(".popover-validate").hide();
	});

	// 下拉列框控件 修改默认样式 select
	$(".selectpicker").selectpicker();
	// 单选与复选控件 表单单选与复选修改默认样式 checkbox radio
	$('.uniformjs').find("input[type=checkbox],input[type=radio]").uniform();
    //用来存放当前正在操作的日期文本框的引用。
    // 设置DatePicker 的默认设置
    $.datepicker.setDefaults({ showButtonPanel: true, closeText: '清除', beforeShow: function (input, inst) { common.datepicker_CurrentInput = input; } });
    //点击清除，值置空
    $(document).on("click",".ui-datepicker-close",function () {
        common.datepicker_CurrentInput.value = "";
        if($(common.datepicker_CurrentInput).hasClass("plan-loan-time")){
			schedule.dataStorage.lendingRegistration.creditTime = "";
			schedule.list.editLoanTime(schedule.dataStorage.lendingRegistration);
		}
    });
	// 日期控件 有时分秒
	$(".datepicker-time").datetimepicker({
		showSecond: true,
		showMillisec: true,
		showButtonPanel: true,
		timeFormat: 'HH:mm:ss',
        beforeShow: function (input, inst) {
            common.datepicker_CurrentInput = input;
        }
		/*onClose:function(){
			if ($(window.event.srcElement).hasClass('ui-datepicker-close'))
			{
				document.getElementById(this.id).value = '';
			}
		}*/
	});
	// 日期控件 年月日
	$(".datepicker-date").datepicker({
		changeMonth: true,  
        changeYear: true,
        beforeShow: function (input, inst) {
            common.datepicker_CurrentInput = input;
        }
	});
	//  日期控件 只能选择年月不能选择日期
	$(".datepicker-month").datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: 'yy-mm',
		beforeShow : function(input, inst){
			$("body").addClass("datepicker-month-inner");
            common.datepicker_CurrentInput = input;
		},
		onClose: function(dateText, inst) {
			var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			$(this).datepicker('setDate', new Date(year, month, 1));
			$("body").removeClass("datepicker-month-inner");
			$(".ui-datepicker-calendar").hide();
		}
	});
	//禁用手动输入
	$(".datepicker-date").attr("readonly","readonly");
	$(".datepicker-time").attr("readonly","readonly");
	$(".datepicker-month").attr("readonly","readonly");

	// 弹出层控件 fancybox
	$(".fancybox").fancybox({
		"afterLoad" : function(){
			this.inner.addClass("heightauto");
		}	
	});
    // 弹层内删除
    $(document).on("click",".fancybox-del-btn",function () {
        $(".fancybox-del-overlay").show();
        $(".fancybox-del").show();
    });
    $(document).on("click",".fancybox-del-cancel",function () {
        $(".fancybox-del-overlay").hide();
        $(".fancybox-del").hide();
    });
    // 弹出层取消按钮
    $(document).on("click",".pop-cancel",function(){
        $.fancybox.close();
        $(".fancybox-del-overlay").hide();
        $(".fancybox-del").hide();
    });
    $(document).on("click",".fancybox-close",function(){
        $(".fancybox-del-overlay").hide();
        $(".fancybox-del").hide();
    });
});
// 文本款只能输入数字
var onlyNum=function(){
	var keyCode=event.keyCode?event.keyCode:event.which;
	if(!(keyCode==46)&&!(keyCode==8)&&!(keyCode==9)&&!(keyCode==37)&&!(keyCode==39)){

		if(!((keyCode>=48&&keyCode<=57)||(keyCode>=96&&keyCode<=105))){
			// alert(keyCode);

			if(document.all){
				window.event.returnValue = false;
			}else{
				event.preventDefault();
			}
		}
	}
};
