/* *
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 31/05/2010, 00:36
 */
var tip_active = !1,
	tip_autoclose = !0,
	winX = 0,
	winY = 0,
	oldWinX = 0,
	oldWinY = 0,
	cRangeX = 0,
	cRangeY = 0,
	docX = 0,
	docY = 0,
	scrt = 0,
	oldScrt = 0,
	scrtRangeY = 0;

function winResize() {
	oldWinX = winX;
	oldWinY = winY;
	winX = $(window).width();
	winY = $(window).height();
	docX = $(document).width();
	docY = $(document).height();
	cRangeX = Math.abs(winX - oldWinX);
	cRangeY = Math.abs(winY - oldWinY);
}

function contentScrt() {
	oldScrt = scrt;
	scrt = $(".wrap").scrollTop();
	scrtRangeY = scrt - oldScrt;
	if (scrt > 56) {
		if (scrtRangeY > 0 && $("#mobilePage").is(".fixed")) {
			$("#mobilePage").removeClass("fixed");
		}
		if (scrtRangeY < 0 && $("#mobilePage").not(".fixed")) {
			$("#mobilePage").addClass("fixed");
		}
	}
} /*Change Captcha*/

function change_captcha(a) {
	$("img.captchaImg").attr("src", nv_siteroot + "index.php?scaptcha=captcha&nocache=" + nv_randomPassword(10));
	$(a).val("");
	return !1
};

function tipHide() {
	$("[data-toggle=tip]").attr("data-click", "y").removeClass("active");
	$("#tip").hide();
	tip_active = !1;
	tipAutoClose(!0)
}

function tipAutoClose(a) {
	!0 != a && (a = !1);
	tip_autoclose = a
}

function tipShow(a, b) {
	if ($(a).is(".pa")) switchTab(".guest-sign",a);
	tip_active && tipHide();
	$("[data-toggle=tip]").removeClass("active");
	$(a).attr("data-click", "n").addClass("active");
	$("#tip").attr("data-content", b).show("fast");
	tip_active = !0
}
// Switch tab

function switchTab(a) {
	if ($(a).is(".current")) return !1;
	var b = $(a).data("switch").split(/\s*,\s*/),
		c = $(a).data("obj");
	$(c + " [data-switch]").removeClass("current");
	$(a).addClass("current");
	$(c + " " + b[0]).removeClass("hidden");
	for (i = 1; i < b.length; i++) $(c + " " + b[i]).addClass("hidden")
};
// ModalShow

function modalShow(a, b) {
	"" == a && (a = "&nbsp;");
	$("#sitemodal").find(".modal-title").html(a);
	$("#sitemodal").find(".modal-body").html(b);
	$("#sitemodal").modal()
}

function headerSearchSubmit(t) {
	if ("n" == $(t).attr("data-click")) return !1;
	$(t).attr("data-click", "n");
	var a = $(".headerSearch input"),
		c = a.attr("maxlength"),
		b = strip_tags(a.val()),
		d = $(t).attr("data-minlength");
	a.parent().removeClass("has-error");
	"" == b || b.length < d || b.length > c ? (a.parent().addClass("has-error"), a.val(b).focus(), $(t).attr("data-click", "y")) : window.location.href = $(t).attr("data-url") + rawurlencode(b);
	return !1
}

function headerSearchKeypress(a) {
	13 != a.which || a.shiftKey || (a.preventDefault(), $("#tip .headerSearch button").trigger("click"));
	return !1
}
// NukeViet Default Custom JS
$(function() {
	winResize();
	// Modify all empty link
	$('a[href="#"], a[href=""]').attr('href', 'javascript:void(0);');
	// Smooth scroll to top
	$(".bttop").click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 800);
		return !1
	});
	$(document).on("keydown", function(a) {
		27 === a.keyCode && (tip_active && tip_autoclose && tipHide())
	});
	$(document).on("click", function() {
		tip_active && tip_autoclose && tipHide()
	});
	$("#tip").on("click", function(a) {
		a.stopPropagation()
	});
	$("[data-toggle=tip]").click(function() {
		var a = $(this).attr("data-target"),
			d = $(a).html(),
			c = $("#tip").attr("data-content");
		a != c ? ("" != c && $('[data-target="' + c + '"]').attr("data-click", "y"), $("#tip").html(d), ("#metismenu" == a && $('#tip .metismenu ul').metisMenu({
			toggle: !1
		})), tipShow(this, a)) : "n" == $(this).attr("data-click") ? tipHide() : tipShow(this, a);
		return !1
	});
	//Search form
	$(".headerSearch button").on("click", function() {
		if ("n" == $(this).attr("data-click")) return !1;
		$(this).attr("data-click", "n");
		var a = $(".headerSearch input"),
			c = a.attr("maxlength"),
			b = strip_tags(a.val()),
			d = $(this).attr("data-minlength");
		a.parent().removeClass("has-error");
		"" == b || b.length < d || b.length > c ? (a.parent().addClass("has-error"), a.val(b).focus(), $(this).attr("data-click", "y")) : window.location.href = $(this).attr("data-url") + rawurlencode(b);
		return !1
	});
	$(".headerSearch input").on("keypress", function(a) {
		13 != a.which || a.shiftKey || (a.preventDefault(), $(".headerSearch button").trigger("click"))
	});
	$(".wrap").on("scroll", function() {
		contentScrt()
	});
});
$(window).on("resize", function() {
	winResize();
	if (150 < cRangeX || 150 < cRangeY) tipHide()
});