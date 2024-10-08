'use strict';

require('./../../lib/@vkontakte/vkjs/lib/es6/detections.js');
var functions = require('./../../lib/@vkontakte/vkjs/lib/es6/functions.js');
var ResizeObserver_es = require('./../../lib/resize-observer-polyfill/dist/ResizeObserver.es.js');
var styles = require('../../utils/styles.js');
var index = require('./langs/index.js');
var short = require('./langs/short.js');
var long = require('./langs/long.js');

var logoSvg = '\n  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path id="logoBg" fill-rule="evenodd" clip-rule="evenodd" d="M4.2653 4.2653C3 5.5306 3 7.56707 3 11.64V12.36C3 16.4329 3 18.4694 4.2653 19.7347C5.5306 21 7.56706 21 11.64 21H12.36C16.4329 21 18.4694 21 19.7347 19.7347C21 18.4694 21 16.4329 21 12.36V11.64C21 7.56707 21 5.5306 19.7347 4.2653C18.4694 3 16.4329 3 12.36 3H11.64C7.56706 3 5.5306 3 4.2653 4.2653Z" fill="white"/>\n    <path id="logoIcon" d="M12.6095 16C8.55576 16 6.09636 13.1823 6 8.5H8.05309C8.1171 11.9395 9.67903 13.397 10.8764 13.6967V8.5H12.8439V11.4683C13.9988 11.3401 15.2076 9.98991 15.614 8.5H17.5505C17.2406 10.3321 15.9246 11.6823 14.9948 12.2392C15.9253 12.6895 17.4225 13.8682 18 16H15.8714C15.4219 14.5749 14.321 13.4712 12.8446 13.3213V16H12.6095Z" fill="#0077FF"/>\n  </svg>\n';
var spinnerSvg = '\n  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 14.6472 8.10214 15.2793 8.3002 15.8802C8.4731 16.4047 8.18807 16.9701 7.66355 17.143C7.13902 17.3159 6.57365 17.0308 6.40074 16.5063C6.13628 15.7041 6 14.8606 6 14C6 9.58172 9.58172 6 14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22Z" fill="currentColor"/>\n  </svg>\n';
var getOneTapTemplate = function(param) {
    var width = param.width, height = param.height, iframeHeight = param.iframeHeight, borderRadius = param.borderRadius, login = param.login, skin = param.skin, scheme = param.scheme, contentId = param.contentId, lang = param.lang, renderOAuthList = param.renderOAuthList, providers = param.providers, setStatsButtonType = param.setStatsButtonType;
    return function(id) {
        var textIconLimit = 0;
        var textLongLimit = 0;
        var textShortWidth = 0;
        var textLongWidth = 0;
        var initialText = short.getShortLang(contentId, lang);
        var shortText = index.providerLang;
        var longText = long.getLongLang(contentId, lang);
        var textPadding = 8;
        var padding = styles.getButtonPadding(height);
        var fontSize = styles.getButtonFontSize(height);
        var logoSize = styles.getButtonLogoSize(height);
        var containerEl = document.createElement("div");
        var buttonEl = document.createElement("button");
        setTimeout(function() {
            buttonEl.classList.add("VkIdWebSdk__button_animation_".concat(id));
        }, 100);
        buttonEl.classList.add("VkIdWebSdk__button_".concat(id));
        buttonEl.classList.add("VkIdWebSdk__button_reset_".concat(id));
        login && (buttonEl.onclick = login);
        var btnInEl = document.createElement("span");
        btnInEl.classList.add("VkIdWebSdk__button_in_".concat(id));
        var contentEl = document.createElement("span");
        contentEl.classList.add("VkIdWebSdk__button_content_".concat(id));
        var logoEl = document.createElement("span");
        logoEl.classList.add("VkIdWebSdk__button_logo_".concat(id));
        logoEl.innerHTML = logoSvg;
        var textContainerEl = document.createElement("span");
        textContainerEl.classList.add("VkIdWebSdk__button_text_".concat(id));
        var textEl = document.createElement("span");
        textEl.innerText = initialText;
        var textLongEl = document.createElement("span");
        textLongEl.innerText = longText;
        var textShortEl = document.createElement("span");
        textShortEl.innerText = shortText;
        var spinnerEl = document.createElement("span");
        spinnerEl.classList.add("VkIdWebSdk__button_spinner_".concat(id));
        spinnerEl.innerHTML = spinnerSvg;
        var oauthListEl = document.createElement("div");
        oauthListEl.classList.add("VkIdWebSdk__oauthList_container_".concat(id));
        var getTextWidth = function(clientWidth) {
            return clientWidth + 2 * textPadding + 2 * padding + 2 * logoSize;
        };
        var handleLoaded = function() {
            var ANIMATION_TIMEOUT = 0;
            var renderedOauthList = false;
            var addOauthList = function() {
                var _providers;
                if (((_providers = providers) === null || _providers === void 0 ? void 0 : _providers.length) && !containerEl.contains(oauthListEl)) {
                    containerEl.appendChild(oauthListEl);
                    !renderedOauthList && renderOAuthList({
                        lang: lang,
                        scheme: scheme,
                        container: oauthListEl,
                        oauthList: providers,
                        styles: {
                            borderRadius: borderRadius,
                            height: height
                        }
                    });
                    renderedOauthList = true;
                }
            };
            var observeCallback = function() {
                var hasTextContainer = contentEl.contains(textContainerEl);
                var hasShortText = textContainerEl.contains(textShortEl);
                var hasLongText = textContainerEl.contains(textLongEl);
                var containerWidth = containerEl.clientWidth;
                if (hasTextContainer && containerWidth < textIconLimit) {
                    if (containerEl.contains(oauthListEl)) {
                        containerEl.removeChild(oauthListEl);
                    }
                    setStatsButtonType("icon");
                    buttonEl.setAttribute("style", "width: ".concat(height, "px;"));
                    textContainerEl.remove();
                    spinnerEl.remove();
                }
                if (!hasTextContainer && containerWidth >= textIconLimit) {
                    buttonEl.removeAttribute("style");
                    contentEl.appendChild(textContainerEl);
                    contentEl.appendChild(spinnerEl);
                }
                if (!hasShortText && containerWidth < textLongLimit) {
                    textContainerEl.style.width = "".concat(textShortWidth, "px");
                    textLongEl.dataset.active = "";
                    textShortEl.dataset.active = "true";
                    setTimeout(function() {
                        // Дожидаемся анимации и меняем элементы
                        textLongEl.remove();
                        textContainerEl.appendChild(textShortEl);
                    }, ANIMATION_TIMEOUT);
                }
                if (!hasLongText && containerWidth >= textLongLimit) {
                    textContainerEl.style.width = "".concat(textLongWidth, "px");
                    textShortEl.dataset.active = "";
                    textLongEl.dataset.active = "true";
                    setTimeout(function() {
                        // Дожидаемся анимации и меняем элементы
                        textShortEl.remove();
                        textContainerEl.appendChild(textLongEl);
                    }, ANIMATION_TIMEOUT);
                    addOauthList();
                }
                setStatsButtonType("default");
            };
            var observer = new ResizeObserver_es(functions.debounce(observeCallback, 500));
            observer.observe(containerEl);
            var oneTap = document.getElementById(id);
            if (oneTap) {
                oneTap.appendChild(containerEl);
                containerEl.appendChild(buttonEl);
                buttonEl.appendChild(btnInEl);
                btnInEl.appendChild(contentEl);
                contentEl.appendChild(logoEl);
                contentEl.appendChild(textContainerEl);
                contentEl.appendChild(spinnerEl);
                textContainerEl.appendChild(textEl);
                textContainerEl.appendChild(textLongEl);
                textContainerEl.appendChild(textShortEl);
                textShortWidth = textShortEl.clientWidth;
                textLongWidth = textLongEl.clientWidth;
                textIconLimit = getTextWidth(textEl.clientWidth);
                textLongLimit = getTextWidth(textLongWidth);
                textEl.remove();
                textLongEl.remove();
                textShortEl.remove();
                observeCallback();
                ANIMATION_TIMEOUT = 250;
            }
        };
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", handleLoaded);
        } else {
            setTimeout(handleLoaded, 0);
        }
        return '\n<div id="'.concat(id, '" data-test-id="oneTap" data-scheme="').concat(scheme, '" data-skin="').concat(skin, '">\n  <style>\n    :root #').concat(id, " {\n      --onetap--button_background: #0077FF;\n      --onetap--button_border: none;\n      --onetap--background_hover: #0071F2;\n      --onetap--text_and_spinner: #FFF;\n      --onetap--logo_icon: #0077FF;\n      --onetap--logo_background: #FFF;\n    }\n\n    :root #").concat(id, "[data-scheme=light][data-skin=primary] {\n      --onetap--background_hover: #0071F2;\n      --onetap--background_active: #0069E1;\n    }\n\n    :root #").concat(id, "[data-scheme=dark][data-skin=primary] {\n      --onetap--background_hover: #097EFF;\n      --onetap--background_active: #1385FF;\n    }\n\n    :root #").concat(id, "[data-scheme=light][data-skin=secondary] {\n      --onetap--button_background: rgba(255, 255, 255, 0.12);\n      --onetap--button_border: 1px solid rgba(0, 0, 0, 0.12);\n      --onetap--background_hover: #F5F5F7;\n      --onetap--background_active: #EBECEF;\n      --onetap--text_and_spinner: #000;\n      --onetap--logo_icon: #FFF;\n      --onetap--logo_background: #0077FF;\n    }\n\n    :root #").concat(id, "[data-scheme=dark][data-skin=secondary] {\n      --onetap--button_background: transparent;\n      --onetap--button_border: 1px solid rgba(255, 255, 255, 0.12);\n      --onetap--background_hover: rgba(255, 255, 255, 0.06);\n      --onetap--background_active: rgba(255, 255, 255, 0.1);\n      --onetap--logo_icon: #FFF;\n      --onetap--logo_background: #0077FF;\n    }\n\n    #").concat(id, " {\n      position: relative;\n      width: ").concat(width ? "".concat(width, "px") : "100%", ";\n      min-width: ").concat(height, "px;\n    }\n\n    #").concat(id, "[data-state=loaded] {\n      height: ").concat(iframeHeight, "px;\n    }\n\n    #").concat(id, " iframe {\n      position: absolute;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      pointer-events: none;\n      border: none;\n      color-scheme: auto;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_reset_").concat(id, " {\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      color: inherit;\n      font: inherit;\n      line-height: normal;\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      -webkit-appearance: none;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_").concat(id, " {\n      padding: ").concat(padding, "px;\n      height: ").concat(height, "px;\n      width: 100%;\n      border-radius: ").concat(borderRadius, "px;\n      box-sizing: border-box;\n      overflow: hidden;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_animation_").concat(id, " {\n      transition: .2s ease;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_").concat(id, ":hover {\n      cursor: pointer;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_").concat(id, " {\n      background: var(--onetap--button_background);\n      border: var(--onetap--button_border);\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_").concat(id, ":focus,\n    #").concat(id, " .VkIdWebSdk__button_").concat(id, ":hover {\n      background: var(--onetap--background_hover);\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_").concat(id, ":active {\n      background: var(--onetap--background_active);\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_in_").concat(id, " {\n      display: inline-block;\n      width: 100%;\n      height: 100%;\n      min-width: max-content;\n      transition: width 0.5s;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_content_").concat(id, " {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      height: 100%;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_logo_").concat(id, ",\n    #").concat(id, " .VkIdWebSdk__button_spinner_").concat(id, ",\n    #").concat(id, " .VkIdWebSdk__button_logo_").concat(id, " > svg,\n    #").concat(id, " .VkIdWebSdk__button_spinner_").concat(id, " > svg {\n      width: ").concat(logoSize, "px;\n      height: ").concat(logoSize, "px;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_spinner_").concat(id, " > svg {\n      position: absolute;\n      right: ").concat(padding, "px;\n      animation: vkIdSdkButtonSpinner 0.7s linear infinite;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_text_").concat(id, ' {\n      font-family: -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;\n      font-weight: 500;\n      font-size: ').concat(fontSize, "px;\n      transition: .2s;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_text_").concat(id, " > span {\n      opacity: 0;\n      display: inline-block;\n      padding: 0 ").concat(textPadding, "px;\n      transition: .5s;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_text_").concat(id, " > span[data-active=true] {\n      opacity: 1;\n    }\n\n    #").concat(id, " .VkIdWebSdk__button_text_").concat(id, ",\n    #").concat(id, " .VkIdWebSdk__button_spinner_").concat(id, " {\n      color: var(--onetap--text_and_spinner);\n    }\n\n    .VkIdWebSdk__oauthList_container_").concat(id, " {\n      margin-top: 16px;\n    }\n\n    #").concat(id, " #logoBg {\n      fill: var(--onetap--logo_background);\n    }\n\n    #").concat(id, " #logoIcon {\n      fill: var(--onetap--logo_icon);\n    }\n\n    #").concat(id, "[data-state=not_loaded] .VkIdWebSdk__button_in_").concat(id, " {\n      width: 0;\n    }\n\n    #").concat(id, "[data-state=not_loaded] .VkIdWebSdk__button_spinner_").concat(id, " {\n      transition: .2s;\n      opacity: 0;\n      pointer-events: none;\n      width: 0;\n    }\n\n    #").concat(id, "[data-state=loaded] .VkIdWebSdk__oauthList_container_").concat(id, " {\n      display: none;\n    }\n\n    #").concat(id, "[data-state=loaded] iframe {\n      position: initial;\n      opacity: 100;\n      pointer-events: all;\n    }\n\n    #").concat(id, "[data-state=loaded] .VkIdWebSdk__button_").concat(id, ' {\n      display: none;\n    }\n\n    @keyframes vkIdSdkButtonSpinner {\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  </style>\n  <iframe width="100%" height="100%" />\n</div>\n  ');
    };
};

exports.getOneTapTemplate = getOneTapTemplate;
