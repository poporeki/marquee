
/* 滚动 */
;(function ($, pluginName) {
    var __DEFAUTS__ = {/* 默认参数 */
        listUL: ".marquee-ul",/* 列表ul  */
        listLI: ".marquee-li",/* li */
        speed: 2000,/* 滚动速度 */
        direction: 'vertical'/* 方向 默认垂直 */
    }

    function Marquee(el, options) {
        this.$el = el; /* 目标元素 */
        this.defaults = $.extend({}, __DEFAUTS__, options); /* 参数 */
        this.$mUL = $(this.$el).find(this.defaults.listUL); /* 目标元素ul */
        this.$mLI = this.$mUL.find('li'); /* 目标元素li */
        this.speed = this.defaults.speed; /* 滚动速度 */
        this.TIMER = ''; /* 定时器初始化 */
        this.init();
    }
    Marquee.prototype = {
        /* 初始化 */
        init: function () {
            this._ulHei = this.$mUL.outerHeight(); /* 获取整个列表的高度 */
            this._liWid = this.maxMethod.width(this.$mLI); /* 获取li的最大宽度 */
            this._liHei = this.maxMethod.height(this.$mLI); /* 获取li的最大高度 */
            var _maxWid = 0;
            this.$mLI.each(function () {
                _maxWid += $(this).outerWidth();
            });
            this._maxWid = _maxWid;
            this._rollingNum = 0; /* 当前滚动的高度 */
            $(this.$el) /* 目标元素重新赋值宽高 */
                .width(this._liWid)
                .height(this._liHei);
            this.$mLI/* 取最大值li赋给其它 */
                .outerHeight(this._liHei)
                .outerWidth(this._liWid);
            this.settingPlay(); /* 设置 */
            this.hoverEvent(); /* 目标元素 鼠标hover事件 */
        },
        settingPlay: function () {
            this.clearTimer(this.TIMER); /* 清空定时器 */

            switch(this.defaults.direction){/* 按方向执行 */
                case"horizontal":
                    this.dirHor();
                    break;
                case"vertical":
                    this.dirVer();
                    break;
                default:
                    console.log('参数错误');
            }
            this.play();
        },
        play: function () {
            var $this = this;
            this.TIMER = setTimeout(function () {
                $this.settingPlay();
            }, $this.speed);
        },
        hoverEvent: function () {
            var $this = this;

            $this.$el.hover(function () {
                $this.clearTimer($this.TIMER);
            }, function () {
                $this.play();
            })
        },
        clearTimer: function (t) {
            return t ? clearTimeout(t) : '';
            t = null;
        },
        dirHor: function () {/* 横向 */
            this.$mLI.css({
                "float": "left"
            });
            this.$mUL.width(this._maxWid) ;
            this._rollingNum>=this._maxWid-this._liWid?
                this._rollingNum=0:
                this._rollingNum+=Number(this._liWid);
            this.$mUL
                .css({
                    'transform': 'translateX(' + -this._rollingNum + 'px)'
                });
        },
        dirVer: function () {/* 纵向 */
            var _ulHei = this._ulHei;
            var _liHei = this._liHei;
            this._rollingNum >= _ulHei - _liHei ?
                this._rollingNum = 0 :
                this._rollingNum += _liHei;
            this.$mUL
                .css({
                    'transform': 'translateY(' + -this._rollingNum + 'px)'
                });
        },
        maxMethod:{/* 取最大宽度高度 */
            width: function ($e) {
                var max_Wid = 0;
                $e.each(function () {
                    if ($(this).outerWidth() > max_Wid) {
                        max_Wid = $(this).outerWidth();
                    }
                });
               return max_Wid
            },
            height: function ($e) {
                var max_Hei = 0;
                $e.each(function () {
                    if ($(this).outerHeight() > max_Hei) {
                        max_Hei = $(this).outerHeight();
                    }
                });
                return max_Hei;
            }
        }
    }
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            new Marquee($(this), options);/* 实例化Marquee */
        });
    };
})(window.jQuery, 'marquee');