;(function () {
    // 购买服务
    $('#buy-button').on('click', function () {
        $.pgwModal({
            titleBar: false,
            content: [
                '<div class="buy-dialog-content">',
                    '<span class="buy-qrcode"></span>',
                    '<p>扫描二维码，关注【上下学】公众号以购买服务</p>',
                '</div>'].join('')
        })
    })
})()
