;(function () {

    // 已开通学校
    new IScroll('#showcase', {
        scrollX: true,
        scrollY: false
    })


    // 估算价格
    // ------------------------------------------
    var phoneInput  = $('[name=phone]')
    var addrInput   = $('[name=address]')
    var schoolInput = $('[name=school]')

    var getValue = function () {
        return {
            phone : phoneInput.val(),
            addr  : addrInput.val(),
            school: schoolInput.val()
        }
    }

    // validate
    var validate = function (val) {
        var ret = false
        var phoneReg = /^1(3|4|5|7|8)[0-9]\d{8}$/

        if (!val.phone || !phoneReg.test(val.phone + '')) {
            // 手机号
            phoneInput.focus()
        } else if (!val.addr) {
            // 家庭地址
            addrInput.focus()
        } else if (!val.school) {
            // 学校
            schoolInput.focus()
        } else {
            ret = true
        }
        return ret;
    }

    // show dialog
    var showprice = function () {
        $.pgwModal({
            titleBar: false,
            content: [
                '<div class="price-dialog">',
                    '<div class="price-dialog-title">在线快捷估价</div>',
                    '<div class="price-dialog-detail">',
                        '<p>地址啊地址啊地址啊</p>',
                        '<p>学校啊学校啊学校啊</p>',
                        '<p>单月参考价格：<span class="price-num">￥1088</span></p>',
                        '<p>整学期参考价格：<span class="price-num">￥9872</span></p>',
                    '</div>',
                    '<a href="tel:4008-910-622" class="button price-dialog-callbtn">拨打400电话了解更多详情</a>',
                    '<div class="price-dialog-help">如需购买服务，请关注公众号【上下学】，点击“购买服务”即可购买</div>',
                '</div>'].join('')
        })
    }

    // ajax
    var request = function () {
        var params = getValue()
        if (validate(params)) {
            // submit
            // $.ajax({
            //     url: '',
            //     data: params,
            //     dataType: 'json',
            //     success: function (result) {
            //         showprice(result)
            //     }
            // })
        }
        showprice()
    }

    $('#evaluate-price-button').on('click', function () {
        request()
    })



    // video
    var videoUrl = 'http://tb-video.bdstatic.com/tieba-smallvideo/735625_06f661b5e651d37401d0942140291913.mp4';
    $('#show-video-intro').on('click', function () {
        $.pgwModal({
            mainClassName: 'pgwModal video-dialog',
            titleBar: false,
            content: [
                '<video controls autoplay preload style="width: 100%"  src="' + videoUrl + '" ></video>'
            ].join('')
        })
    })


    // 家长评价
    // new IScroll('#custumer-message', {
    //     scrollX: true,
    //     scrollY: false
    // })
    function animate(el, style, start, end, moveSpeed){
        //注：支持属性有width、height、top、bottom、left、right、font-size
        var changeVal = end-start;
        // var moveVal = changeVal/10;
        var moveVal = end>start?moveSpeed:-moveSpeed;
        var moveStart = start;
        var moveEnd = end;
        var timer = setInterval(function(){
            if(moveVal>0){
                if(moveStart < moveEnd){
                    el.css(style, moveStart+moveVal+'px');
                    moveStart = moveStart+moveVal;
                }else{
                    clearInterval(timer);
                }
            }else{
               if(moveStart > moveEnd){
                    el.css(style, moveStart+moveVal+'px');
                    moveStart = moveStart+moveVal;
                }else{
                    clearInterval(timer);
                } 
            }
            
        },10)
    }
    var evaluateCon = $('#customer-messages-con');
    var evaluateH = $('#customer-message').height();
    var evaluateConH = evaluateCon.height()-evaluateH;
    setInterval(function() {
        var top = parseInt(evaluateCon.css('top'));
        if(evaluateConH+top<=0){
            evaluateCon.css('top', '0px')
            top = parseInt(evaluateCon.css('top'));
        }
        animate( evaluateCon, 'top', top, top-evaluateH, 5);
    },5000);

    //控制家长评价图标位置
    var evaluateTitle = $("#evaluate-title");
    var evaluateTitleH = evaluateTitle.height();
    var moveTop = evaluateTitleH*0.79;
    $("#custumer-message").css('top','-'+moveTop+'px');
})()
