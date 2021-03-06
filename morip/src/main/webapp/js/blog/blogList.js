/*작성 버튼 클릭 시  OptionModal 창 띄워주기*/
$('#writeOptionBtn').click(function(){
	$('#writeOptionModal').modal();
});

/*글 작성 모달에서 여행기 버튼 클릭시 */
$('#travelsWriteImg').click(function(){
	location.href="/morip/myblog/travlesWrite1";
});

/*글 작성 모달에서 에세이 버튼 클릭시 */
$('#writeBlogImg').click(function(){
	location.href="/morip/myblog/writeBlog1";
});

//해쉬태그 검색 버튼 눌렀을때

$('.hashtagSearchBtn').click(function(){
var ar = new Array();
$('.blogList_wrapper').empty();
console.log($('.blogList_wrapper').html());
	if($('.hashtagText').val()==''){
		//alert('검색어를 입력해주세요!');
		Swal.fire({
			icon: 'warning',
			confirmButtonText: '확인',
			title: '검색어를<br>입력해주세요!'
		})
	}else{
		$('.blogList_wrapper').empty();
		list='';
		$.ajax({//1.ajax
			type:'post',
			url:'../blog/hashtagSearch',
			data:{'hashtagText':$('.hashtagText').val()},
			dataType:'json',
			success:function(data){
				$.each(data.list,function(index,items){
// 					ar[index]=data.list[index].blogBoardSeq;
					ar.push(data.list[index].blogBoardTable_Seq);
				})
				alert(ar[0]);
				$.ajax({//2.ajax
					type:'post',
					url:'../blog/hashtagBlogList',
					data:{"ar":ar},
					dataType:'json',
					success:function(data){
						alert(data.list[0].subject);
				var tempNumber= 0;
				if(data.list.length!='0'){   //데이터가 존재할 때
				$('.blogList_wrapper').empty();
				$.each(data.list, function(index, items){
					let startdate= new Date(items.startdate).format('yyyy-MM-dd'); 
					let enddate = new Date(items.enddate).format('yyyy-MM-dd');  
					let seq = items.blogboardtable_seq;
					//처음 시작을 여는 div
					if(tempNumber%4==0){
						height+=230;
						$('.blogList_wrapper').css('height',height+'px');
						list += '<div class="blogList" id="blogList" data-aos="fade-up" data-aos-duration="3000">';
					}
					list+='<div id="blog_feed" class="hvr-grow-shadow" onclick="viewEnter('+seq+')">';
					list+='<div class="myblog_img">';
					list+='<img class="listImg" src="../storage/'+items.mainimage+'"></div>';
        			list+='<div class="myblog_info"><div class="myblog_subject">'+items.subject+'</div>';
        			list+='<div class="myblog_content">'+items.content+'</div>';
        			list+='<div class="myblog_userFunction"><div class="like'+seq+'" style="cursor:pointer;"onclick="likeClick('+seq+')"><i class="far fa-heart"></i></div>';
        			list+='<div class="reply"><span>34</span> </div><div class="myblog_travleDay">';
        			list+= startdate +'~'+ enddate+'</div></div></div></div>';
        			list+='<input type="hidden" id="likeCheck'+seq+'" value="unlike">';
        			//닫아주는 div
					if(tempNumber%4==3){
					console.log(tempNumber);
						list+='</div>';
					}
					tempNumber++;
				});
				$('.blogList_wrapper').append(list);
				list='';
				}
					},
					error:function(err){
						console.log(err);
					}
					
				});//2.ajax
				
				
			},
			error:function(err){
				console.log(err);
			}
			
		});//1.ajax
	}	
	
});



//날짜 형식 변환
Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";
    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};
String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

/*무한스크롤*/
//페이지 로딩 되자마자 1pg 뜨기
$(document).ready(function(){
	loadingPage();
/*	if($('#pageNickname').val().equals($('#nickname').val())){
		$('#writeOptionBtn').show();
	} else {
	
	}
	*/
	$('.userMenu').css("z-index","90");
});
//변수 선언
var $window = $(this);
var scrollTop = $window.scrollTop();
var windowHeight = $window.height();
var documentHeight = $(document).height();
var height=1500;
var pg = $('#pg').val();
var count = $('#count').val();
var list = "";
var loading = false;    //중복실행여부 확인 변수
var page = 1;   //불러올 페이지
var content = "";

$(window).scroll(function(){
console.log("documentHeight:" + documentHeight + " | scrollTop:" + scrollTop + " | windowHeight: " + windowHeight );
    if($(window).scrollTop()+200>=$(document).height() - $(window).height())
    {
        if(!loading)    //실행 가능 상태라면?
        {
            loading = true; //실행 불가능 상태로 변경
            loadingPage(); 
        }
    }
});  

/* 무한 스크롤 부분 */
function loadingPage(){
	$.ajax({
		type: 'post',
		url: '/morip/blog/infinityScroll',
		data: {'pg' : pg, 'content' : content},
		dataType: 'json',
		success: function(data){
			pg++;
			var tempNumber= 0;
			if(data.list.length!='0'){   //데이터가 존재할 때
				$.each(data.list, function(index, items){
					let startdate= new Date(items.startdate).format('yyyy-MM-dd'); 
					let enddate = new Date(items.enddate).format('yyyy-MM-dd');  
					let seq = items.blogboardtable_seq;
					//처음 시작을 여는 div
					if(tempNumber%4==0){
						//height+=300;
						//$('.blogList_wrapper').css('height',height+'px');
						height+=230;
						$('.blogList_wrapper').css('height',height+'px');
						list += '<div class="blogList" id="blogList" data-aos="fade-up" data-aos-duration="3000">';
					}
					list+='<div id="blog_feed" class="hvr-grow-shadow" onclick="viewEnter('+seq+')">';
					list+='<div class="myblog_img">';
					list+='<img class="listImg" src="../storage/'+items.mainimage+'"></div>';
        			list+='<div class="myblog_info"><div class="myblog_subject">'+items.subject+'</div>';
        			list+='<div class="myblog_content">'+items.content+'</div>';
        			list+='<div class="myblog_userFunction"><div class="like'+seq+'" style="cursor:pointer;"onclick="likeClick('+seq+')"><i class="far fa-heart"></i></div>';
        			list+='<div class="reply"><span>'+items.likecount+'</span> </div><div class="myblog_travleDay">';
        			list+= startdate +'~'+ enddate+'</div></div></div></div>';
        			list+='<input type="hidden" id="likeCheck'+seq+'" value="unlike">';
        			//닫아주는 div
					if(tempNumber%4==3){
					console.log(tempNumber);
						list+='</div>';
					}
					tempNumber++;
				});
				$('.blogList_wrapper').append(list);
				$('#pg').val(pg);
				list='';
				loading = false;
			}
		}   //success
	});   //AJAX
}

//뷰 페이지 진입
function viewEnter(seq){
	location.href="../myblog/view?seq="+seq;
}



$('.img1').click(function(){
	content = $('#content1').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img2').click(function(){
	content = $('#content2').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img3').click(function(){
	content = $('#content3').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img4').click(function(){
	content = $('#content4').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img5').click(function(){
	content = $('#content5').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img6').click(function(){
	content = $('#content6').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img7').click(function(){
	content = $('#content7').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img8').click(function(){
	content = $('#content8').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img9').click(function(){
	content = $('#content9').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img10').click(function(){
	content = $('#content10').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img11').click(function(){
	content = $('#content11').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img12').click(function(){
	content = $('#content12').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img13').click(function(){
	content = $('#content13').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img14').click(function(){
	content = $('#content14').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img15').click(function(){
	content = $('#content15').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img16').click(function(){
	content = $('#content16').text();
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});

$('.img0').click(function(){
	content = "";
	$('#pg').val(1);
	pg = $('#pg').val();
	$('.blogList_wrapper').empty();
	loadingPage();
});
