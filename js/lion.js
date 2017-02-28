(function() {
	var $text = $(".text");
	var time = null,
	 	time2 = null,
	 	time3 = null,
	 	time4 = null,
	 	time5 = null,
		tabT = null,
		bg = null,
		Stime = null;

	var tabOff = true;
	var num = 0,
		nub = 3,
		nub2 = 3;
	console.log(data)

	initSt(); //生成strong
	initBSp($(".lion"),data[1].length,1); //生成span

	// 狮子
	function initSt() {
		for (var i = 0; i < 6; i++) {
			var strong = $("<strong></strong>");
			$(".lion").append(strong);
		}

		$(".lion").find("strong").each(function(i,e) {
			$(e).css({
				position: "absolute",
				left: "0",
				top: "140px",
				webkitClipPath: data[0][i].path,
				backgroundColor: data[0][i].color,
				opacity: "0"
			});
		});
	};

	function initBSp(obj,num,index) {		// 传入参数创建span
		for (var i = 0; i < num; i++) {
			var span = $("<span></span>")
			obj.append(span);
		}

		obj.find("span").each(function(i,e) {
			$(e).css({
				position: "absolute",
				left: (parseFloat(Math.random()) - .5) * 1500 + "px",
				top: (parseFloat(Math.random()) - .5) * 1500 + "px",
				webkitClipPath: data[index][i].path,
				backgroundColor:  data[index][i].color,
				opacity: "0"
			});
		});
	}

	function initBsp(index) {		// box下的span
		var dataL = data[index].length;
			for (var i = 0; i < data[index].length; i++) {
				var span = $("<span></span>");
				$(".box").append(span);
			};
		$(".box").find("span").eq(dataL-1).nextAll().remove()

		window.location.hash = "bg"+(index-2);
		// console.log($(".box").find("span").length);
		// console.log(data[index].length);
		$(".box").find("span").each(function(i,e) {
			$(e).css({
				webkitClipPath: data[index][i].path,
				backgroundColor:  data[index][i].color
			});

		});
	}
		/*一图的svg*/
	function svgD() {
		$(".box").find(".svg .s1").html(`<svg xmlns="http://www.w3.org/2000/svg" id="s" width="100%" height="100%" version="1.1"></svg>`)
		var s = $(".box").find(".svg .s1 #s");
		for (var i = 0; i < data[2].length; i++) {
				var c = document.createElementNS('http://www.w3.org/2000/svg','path');
				$(s).append(c);
			}
			var d = $("path");
			d.each(function(i,e) {
				$(e).attr({
					fill: data[2][i].fill,
					stroke: data[2][i].stroke,
					d: data[2][i].path,
					"stroke-width": data[2][i].strokeWidth,
					opacity: "1"
					// transform: "translate(95 89) scale(.9, .9) translate(0 -100)"
			});
		})
	}

	// window.addEventListener("resize",function() {
	// 	$("#wrap").width($("#wrap").height() * 1.975);
	// 	console.log($("#wrap").width())
	// });

	$(window).on("load",function() {	// 加载完毕执行
		var $textBg = $(".text-bg div");
		window.location.hash = "";

		$(".lion").find("span").each(function(i,e) {
			$(e).stop().animate({
				left: "0",
				top: "0",
				opacity: "1"
			},2400);
		});
		clearTimeout(time);
		time = setTimeout(bigS,1100);
		function bigS() {	// 大三角延迟出现
			$(".lion").find("strong").each(function(i,e) {
				$(e).stop().animate({
					left: "0",
					top: "0",
					opacity: "1"
				},1200);
			});
		};

		clearTimeout(time2);
	    time2 = setTimeout(tg,2400);
		function tg() {	// 字体延时加载

			var text = $("<span class=text1>5</span><span class=text2><span>YEARS</span><span>PROJECTS</span></span><span class=text3>WITH SUTUNAM</span><span class=text4><button><span></span></button><span>SCROLL DOWN</span></span>");

			$text.append(text);

			$text.stop().animate({top: "60%"},1000);	// text 延迟
			$text.find(".text1").stop().animate({opacity: "1"},1000);	// 5
			$text.find(".text2 span").eq(0).stop().animate({opacity: "1"},500,function() {
				// text2字体加载完成后回调
				Text();
			});
		};

		function Text() {
			$text.find(".text3").stop().animate({
				opacity: "1",
				transform: "translateY(0)"
			},500,function() {		// text3字体加载完成后回调
				btn();
				bgC();
			});
		}

		function btn() {	// 按钮显示
			$text.find(".text4").stop().animate({opacity: "1"},800);

			roll();	// 调用滚轮事件

			$(".text4").find("span").on("click",down);

			$(".text4").find("button").on("click",down);
		}

		// 滚轮事件
		function roll() {
			$(document).on("mousewheel DOMMouseScroll", function (e) {
				var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));

            	if (delta > 0) {
			        // 向上滚

		        	up();

			    } else if (delta < 0) {
			        // 向下滚

		        	down();

			    }
      	 	})
		};

		// 下滚事件
		function down() {
			console.log(tabOff)
			if (tabOff == true && num == 1) {		// num = 2 切换到下一屏
				vanish();
				num = null;
				down = function() {};
				up = function() {};
			}
			if (tabOff == true) {
				tabOff = false;
				$text.find(".text2 span").eq(0).css({
					transition: "2s",
					transform: "translateY(-55px)",
					opacity: "0"
				});

				$text.find(".text2 span").eq(1).css({
					transition: "2s",
					transform: "translateY(-55px)",
					opacity: "1"
				});

				clearTimeout(tabT);
				tabT = setTimeout(function() {
					tabOff = true;
					num++;
					if (num >= 1) {
						num = 1;
					}
				},1800)
			}
		}

		// 上滚事件
		function up() {
			if (tabOff == true) {
				tabOff = false;
				$text.find(".text2 span").eq(0).css({
					transition: "2s",
					transform: "translateY(0)",
					opacity: "1"
				});

				$text.find(".text2 span").eq(1).css({
					transition: "2s",
					transform: "translateY(0)",
					opacity: "0"
				});
				clearTimeout(tabT);
				tabT = setTimeout(function() {
					tabOff = true;
					num--;
					if (num < 0) {
						num = 0;
					}
				},1800)
			}

		}

		// 清除狮子
		function vanish() {
			$(".lion").find("span").each(function(i,e) {
				$(e).stop().animate({
					top: parseFloat((Math.random() + 1) * -1200) + "px",
					opacity: "0"
				},2800);
			});

			$(".lion").find("strong").each(function(i,e) {
				$(e).stop().animate({
					top: parseFloat((Math.random() + 1) * -1200) + "px",
					opacity: "0"
				},2800);
			});

			$text.stop().animate({
				opacity: "0"
			},1200)

			clearTimeout(time3);
			time3 = setTimeout(move,2000)
			function move() {
				$(".lion").remove();
                initBsp(3)
				$(".box").find("span").each(function(i,e) {
					$(e).css({
						top: parseFloat((Math.random() + 1) * 1200) + "px",
						opacity: "1"
					})
				})
				clearTimeout(Stime);
				Stime = setTimeout(function() {
					$(".box").find("span").each(function(i,e) {
						$(e).css({
							top: "0",
							opacity: "1"
						})
					})
				},20)

				clearTimeout(time4);
				time4 = setTimeout(svgD,1500)

				$("#wrap").css({
					background: "#221f26",
					opacity: "1"
				});
				$(".prj-text").find("p").eq(0).css("opacity","1");
				$(".btn").find("a span").eq(0).css("opacity","1");

				clearTimeout(time5);
				time5 = setTimeout (function() {
					$textBg.eq(0).find("p span").eq(0).stop().animate({opacity:"1"},1800,function() {
						down = changeD;
						up = changeU;
						console.log(nub)
					});
				},1000)
			}
		}


		$(".btn").find("span").on("mouseover",function() {	// box下 btn的移入事件
			$(".btn").find(".see").attr("class","change");
			$(".btn").find("span").css({
				color: "#ee5688"
			})
		})
		$(".btn").find("span").on("mouseout",function() {	// box下 btn的移出事件
			$(".btn").find("span").attr("class","see");
			$(".btn").find("span").css({
				color: "#fff"
			})
		})

		function changeD() {
			if(tabOff == true) {
				tabOff = false;
				clearTimeout(bg);
				bg = setTimeout(function() {
					tabOff = true;
					nub++
					if(nub > data.length - 1) {
						nub = 3
					}
				},2000)
			}

			if(window.location.hash == "#bg1") {
				$(".box").find(".svg").html("<div class='s1'></div>")
				clearTimeout(time4);
				time4 = setTimeout(svgD,1500)
			}else {
				$(".s1").remove();
			}

			nub2 = nub;
			bgC();
			initBsp(nub);
		}

		function changeU() {
			if(tabOff == true) {
				tabOff = false;
				clearTimeout(bg);
				bg = setTimeout(function() {
					tabOff = true;
					nub2--;
					if(nub2 < 3) {
						nub2 = data.length - 1;
					}

				},2000)
			}

			if(window.location.hash == "#bg1") {
				$(".box").find(".svg").html("<div class='s1'></div>")
				clearTimeout(time4);
				time4 = setTimeout(svgD,1500)
			}else {
				$(".s1").remove();
			}

			nub = nub2
			bgC();
			initBsp(nub2);
		}

		function bgC() {
			window.onhashchange = function() {
				switch(window.location.hash) {
					case "#bg1":
					$("#wrap").css("backgroundColor","#221f26");
					$textBg.eq(0).find("p span").eq(1).css("backgroundColor","#ee5688");
					initBsp(3)
					break;
					case "#bg2":
					$("#wrap").css("backgroundColor","#ee5688");
					$textBg.eq(1).find("p span").eq(1).css("backgroundColor","#ab39db");
					initBsp(4)
					break;
					case "#bg3":
					$("#wrap").css("backgroundColor","#ab39db");
					$textBg.eq(2).find("p span").eq(1).css("backgroundColor","#157c80");
					initBsp(5)
					break;
					case "#bg4":
					$("#wrap").css("backgroundColor","#157c80");
					$textBg.eq(3).find("p span").eq(1).css("backgroundColor","#a90806");
					initBsp(6)
					break;
					case "#bg5":
					$("#wrap").css("backgroundColor","#a90806");
					$textBg.eq(4).find("p span").eq(1).css("backgroundColor","#221f26");
					initBsp(7)
					break;
				}
				if(window.location.hash == "#bg1") {
					$(".box").find(".svg").html("<div class='s1'></div>")
					clearTimeout(time4);
					time4 = setTimeout(svgD,1500)
				}else {
					$(".s1").remove();
				}

				// $textBg.each(function(i,e) {
				// 	$(e).find("p span").eq(1).stop().animate({
				// 		width: "100%",
				// 		opacity: "1"
				// 	},500,function() {
				// 		$(e).find("p span").eq(1).stop().animate({
				// 			width: "0",
				// 			opacity: "0"
				// 		},500)
				// 	})
				// })
			}
		}

	})
})();
