/**
 * Tips 插件， 依赖 jquery
 * 参考：https://github.com/PerezYuan/miyazono/blob/master/src/js/tipsDialog.js
 */

(function () {
    umd('Tips', Tips);

    /**
     * 默认配置
     */
    var defaultConfig = {
        // 淡入延时
        fadeInTimeout : 500,
        // 隐藏延时
        hideTimeout : 2000,
        // 类型
        type : 'success',
        // 文案
        text : ''
    };

    /**
     * @constructor
     */
    function Tips (config) {
        this._config = $.extend({}, defaultConfig, config);
        this._init();
    }

    /**
     * 初始化
     */
    Tips.prototype._init = function () {
        this.$el = $(this.getTipsTmp()); 
        this.setTipsStyle();
        $(document.body).append(this.$el);
        this.doTipsAnimate();
        this.doTipsHide();
    };

    /**
     * 设置 Tips 的 style
     */
    Tips.prototype.setTipsStyle = function () {
        this.$el
            .css({
                position: 'fixed',
                zIndex: '999',
                top: '50%',
                left: '50%',
                padding: '10px',
                borderRadius: '3px',
                fontSize: '14px',
                transform: 'translate(-50%, 50%)',
                transition: 'all ' + this._config.fadeInTimeout / 1000 + 's',
                opacity: '0'
            });

        this.$el.css(
            this.$el.hasClass('tips-success')
                ? {
                    border : '1px solid #00ba45',
                    backgroundColor: '#c9ffda',
                    color: '#00802f'
                }
                : {
                    border : '1px solid #f6b9b9',
                    backgroundColor : '#ffe4e4',
                    color : '#b94a48'
                }
        );
    };

    /**
     * 设置 Tips 隐藏回调函数
     */
    Tips.prototype.doTipsHide = function () {
        var _self = this;
        setTimeout(function () {
            _self.$el.remove();
        }, _self._config.hideTimeout);
    };

    /**
     * 设置 Tips 运动回调函数
     */
    Tips.prototype.doTipsAnimate = function () {
        var _self = this;
        this.$el.animate({}, function () {
            _self.$el.css({
                opacity: 1,
                transform: 'translate(-50%, -50%)',
            })
        });
    };

    /**
     * 获取弹窗的 HTML 字符串
     */
    Tips.prototype.getTipsTmp = function () {
        var _config = this._config;
        var htmlArr = [
            '<div class="alert-tips ',
            _config.type === 'success' ? 'tips-success' : 'tips-error',
            '"><span>',
            _config.text,
            '</span></div>'
        ];
        return htmlArr.join('');
    }

    // UMD
    function umd(name, component) {
        switch (true) {
            case typeof module === 'object' && !!module.exports:
                module.exports = component;
                break;
            case typeof define === 'function' && !!define.amd:
                define(name, function () {
                    return component;
                });
                break;
            default:
                try { /* Fuck IE8- */
                    if (typeof execScript === 'object') execScript('var ' + name);
                } catch (error) {
                }
                window[name] = component;
        }
    };
})();