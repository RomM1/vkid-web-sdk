'use strict';

var buttonLang = require('./langs/buttonLang.js');
var titleLang = require('./langs/titleLang.js');
var descriptionLang = require('./langs/descriptionLang.js');

var logoVkIdSvg = '\n  <svg width="33" height="16" viewBox="0 0 33 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M20 13H21.6479V3.5H20V13Z" fill="var(--floating--color_text_primary)"/>\n    <path d="M23.7801 13H27.474C30.4127 13 32.5 11.0326 32.5 8.24326C32.5 5.46738 30.4127 3.5 27.474 3.5H23.7801V13ZM25.4279 11.5177V4.98227H27.474C29.4377 4.98227 30.7835 6.31631 30.7835 8.24326C30.7835 10.1837 29.4377 11.5177 27.474 11.5177H25.4279Z" fill="var(--floating--color_text_primary)"/>\n    <path d="M0 7.68C0 4.05961 0 2.24942 1.12471 1.12471C2.24942 0 4.05961 0 7.68 0H8.32C11.9404 0 13.7506 0 14.8753 1.12471C16 2.24942 16 4.05961 16 7.68V8.32C16 11.9404 16 13.7506 14.8753 14.8753C13.7506 16 11.9404 16 8.32 16H7.68C4.05961 16 2.24942 16 1.12471 14.8753C0 13.7506 0 11.9404 0 8.32V7.68Z" fill="#0077FF"/>\n    <path d="M8.56331 11.66C4.91665 11.66 2.83667 9.16 2.75 5H4.57666C4.63666 8.05333 5.9833 9.34333 7.04997 9.61V5H8.77002V7.63C9.82335 7.51667 10.9299 6.32 11.3032 5H13.0233C12.7366 6.62667 11.5366 7.82667 10.6833 8.32C11.5366 8.72 12.9033 9.76667 13.4233 11.66H11.5299C11.1233 10.3933 10.11 9.41333 8.77002 9.28V11.66H8.56331Z" fill="white"/>\n  </svg>\n';
var logoVkSvg = '\n  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.2653 4.2653C3 5.5306 3 7.56707 3 11.64V12.36C3 16.4329 3 18.4694 4.2653 19.7347C5.5306 21 7.56706 21 11.64 21H12.36C16.4329 21 18.4694 21 19.7347 19.7347C21 18.4694 21 16.4329 21 12.36V11.64C21 7.56707 21 5.5306 19.7347 4.2653C18.4694 3 16.4329 3 12.36 3H11.64C7.56706 3 5.5306 3 4.2653 4.2653Z" fill="white"/>\n    <path d="M12.6095 16C8.55576 16 6.09636 13.1823 6 8.5H8.05309C8.1171 11.9395 9.67903 13.397 10.8764 13.6967V8.5H12.8439V11.4683C13.9988 11.3401 15.2076 9.98991 15.614 8.5H17.5505C17.2406 10.3321 15.9246 11.6823 14.9948 12.2392C15.9253 12.6895 17.4225 13.8682 18 16H15.8714C15.4219 14.5749 14.321 13.4712 12.8446 13.3213V16H12.6095Z" fill="#0077FF"/>\n  </svg>\n';
var closeSvg = '\n  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.71967 4.71969C5.01256 4.42679 5.48744 4.42679 5.78033 4.71969L10 8.93935L14.2197 4.71969C14.5126 4.42679 14.9874 4.42679 15.2803 4.71969C15.5732 5.01258 15.5732 5.48745 15.2803 5.78035L11.0607 10L15.2803 14.2197C15.5732 14.5126 15.5732 14.9875 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L10 11.0607L5.78033 15.2803C5.48744 15.5732 5.01256 15.5732 4.71967 15.2803C4.42678 14.9875 4.42678 14.5126 4.71967 14.2197L8.93934 10L4.71967 5.78035C4.42678 5.48745 4.42678 5.01258 4.71967 4.71969Z" fill="currentColor"/>\n  </svg>\n';
var spinnerSvg = '\n  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M14 22C13.4477 22 13 21.5523 13 21C13 20.4477 13.4477 20 14 20C17.3137 20 20 17.3137 20 14C20 10.6863 17.3137 8 14 8C10.6863 8 8 10.6863 8 14C8 14.6472 8.10214 15.2793 8.3002 15.8802C8.4731 16.4047 8.18807 16.9701 7.66355 17.143C7.13902 17.3159 6.57365 17.0308 6.40074 16.5063C6.13628 15.7041 6 14.8606 6 14C6 9.58172 9.58172 6 14 6C18.4183 6 22 9.58172 22 14C22 18.4183 18.4183 22 14 22Z" fill="currentColor"/>\n  </svg>\n';
var INTERNAL_INDENT = 12;
var getIndent = function(value) {
    if (!value || value <= INTERNAL_INDENT) {
        return 0;
    }
    return value - INTERNAL_INDENT;
};
var getFloatingOneTapTemplate = function(param) {
    var scheme = param.scheme, indent = param.indent, login = param.login, close = param.close, lang = param.lang, contentId = param.contentId, appName = param.appName, providers = param.providers, renderOAuthList = param.renderOAuthList;
    return function(id) {
        var titleText = titleLang.getTitleLang(contentId, lang, appName);
        var descriptionText = descriptionLang.getDescriptionLang(lang);
        var buttonText = buttonLang.getButtonLang(contentId, lang);
        var floatingEl = document.createElement("div");
        floatingEl.classList.add("VkIdWebSdk__floating_".concat(id));
        var containerEl = document.createElement("div");
        containerEl.classList.add("VkIdWebSdk__floating_container_".concat(id));
        var headerEl = document.createElement("div");
        headerEl.classList.add("VkIdWebSdk__floating_header_".concat(id));
        headerEl.innerHTML = logoVkIdSvg;
        var headerAppNameEl = document.createElement("span");
        headerAppNameEl.classList.add("VkIdWebSdk__floating_appName_".concat(id));
        headerAppNameEl.innerText = "\xa0\xb7\xa0".concat(appName);
        var headerCloseEl = document.createElement("div");
        headerCloseEl.classList.add("VkIdWebSdk__floating_close_".concat(id));
        var headerCloseButtonEl = document.createElement("button");
        headerCloseButtonEl.classList.add("VkIdWebSdk__floating_button_reset_".concat(id));
        headerCloseButtonEl.classList.add("VkIdWebSdk__floating_close_btn_".concat(id));
        headerCloseButtonEl.innerHTML = closeSvg;
        close && (headerCloseButtonEl.onclick = close);
        var contentEl = document.createElement("div");
        contentEl.classList.add("VkIdWebSdk__floating_content_".concat(id));
        var titleEl = document.createElement("div");
        titleEl.classList.add("VkIdWebSdk__floating_title_".concat(id));
        titleEl.innerText = titleText;
        var descriptionEl = document.createElement("div");
        descriptionEl.classList.add("VkIdWebSdk__floating_description_".concat(id));
        descriptionEl.innerText = descriptionText;
        var actionEl = document.createElement("div");
        var buttonEl = document.createElement("button");
        buttonEl.classList.add("VkIdWebSdk__floating_button_reset_".concat(id));
        buttonEl.classList.add("VkIdWebSdk__floating_button_".concat(id));
        login && (buttonEl.onclick = login);
        var buttonContentEl = document.createElement("div");
        buttonContentEl.classList.add("VkIdWebSdk__floating_button_content_".concat(id));
        var buttonLogoEl = document.createElement("span");
        buttonLogoEl.classList.add("VkIdWebSdk__floating_button_logo_".concat(id));
        buttonLogoEl.innerHTML = logoVkSvg;
        var buttonTextEl = document.createElement("span");
        buttonTextEl.classList.add("VkIdWebSdk__floating_button_text_".concat(id));
        buttonTextEl.innerText = buttonText;
        var buttonSpinnerEl = document.createElement("span");
        buttonSpinnerEl.classList.add("VkIdWebSdk__floating_button_spinner_".concat(id));
        buttonSpinnerEl.innerHTML = spinnerSvg;
        var oauthListEl = document.createElement("div");
        oauthListEl.classList.add("VkIdWebSdk__oauthList_container_".concat(id));
        var handleLoaded = function() {
            var floatingOneTap = document.getElementById(id);
            if (floatingOneTap) {
                var _providers;
                floatingOneTap.appendChild(floatingEl);
                floatingEl.appendChild(containerEl);
                containerEl.appendChild(headerEl);
                containerEl.appendChild(contentEl);
                containerEl.appendChild(actionEl);
                headerEl.appendChild(headerCloseEl);
                headerEl.appendChild(headerAppNameEl);
                headerCloseEl.appendChild(headerCloseButtonEl);
                contentEl.appendChild(titleEl);
                contentEl.appendChild(descriptionEl);
                actionEl.appendChild(buttonEl);
                buttonEl.appendChild(buttonContentEl);
                buttonContentEl.appendChild(buttonLogoEl);
                buttonContentEl.appendChild(buttonTextEl);
                buttonContentEl.appendChild(buttonSpinnerEl);
                if ((_providers = providers) === null || _providers === void 0 ? void 0 : _providers.length) {
                    containerEl.appendChild(oauthListEl);
                    renderOAuthList({
                        lang: lang,
                        scheme: scheme,
                        container: oauthListEl,
                        oauthList: providers,
                        styles: {
                            borderRadius: 8,
                            height: 36
                        }
                    });
                }
            }
        };
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", handleLoaded);
        } else {
            setTimeout(handleLoaded, 0);
        }
        return '\n<div id="'.concat(id, '" data-test-id="floatingOneTap" data-scheme="').concat(scheme, '">\n  <style>\n    :root #').concat(id, ' {\n      --floating--contaner_padding: 16px;\n      --floating--container_box_shadow: 0px 0px 2px rgba(0,0,0,.08),0px 4px 16px rgba(0,0,0,.08);\n      --floating--font_family: -apple-system,system-ui,"Helvetica Neue",Roboto,sans-serif;\n      --floating--close_button_color_transparent--hover: rgba(0,16,61,.04);\n      --floating--close_button_color_transparent--active: rgba(0,16,61,.08);\n      --floating--button_text_color: #FFFFFF;\n      --floating--button_background_color: #0077ff;\n    }\n\n    :root #').concat(id, "[data-scheme=light] {\n      --floating--color_background_modal: #ffffff;\n      --floating--color_icon_medium: #818c99;\n      --floating--color_text_primary: #000000;\n      --floating--color_text_secondary: #818c99;\n      --floating--button_background_color--hover: #0071F2;\n      --floating--button_background_color--focus: #0071F2;\n      --floating--button_background_color--active: #0069E1;\n    }\n\n    :root #").concat(id, "[data-scheme=dark] {\n      --floating--color_background_modal: #1C1D1E;\n      --floating--color_icon_medium: #b0b1b6;\n      --floating--color_text_primary: #e1e3e6;\n      --floating--color_text_secondary: #76787a;\n      --floating--button_background_color--hover: #097EFF;\n      --floating--button_background_color--focus: #097EFF;\n      --floating--button_background_color--active: #1385FF;\n      --floating--close_button_color_transparent--hover: hsla(0,0%,100%,.04);\n      --floating--close_button_color_transparent--active: hsla(0,0%,100%,.08);\n      --floating--container_box_shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.30), 0px 4px 16px 0px rgba(0, 0, 0, 0.30);\n    }\n\n    #").concat(id, " {\n      position: fixed;\n      z-index: 99999;\n    }\n\n    #").concat(id, " iframe {\n      position: absolute;\n      opacity: 0;\n      pointer-events: none;\n      border: none;\n      color-scheme: auto;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_reset_").concat(id, " {\n      border: none;\n      margin: 0;\n      padding: 0;\n      width: auto;\n      overflow: visible;\n      background: transparent;\n      color: inherit;\n      font: inherit;\n      line-height: normal;\n      -webkit-font-smoothing: inherit;\n      -moz-osx-font-smoothing: inherit;\n      -webkit-appearance: none;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_").concat(id, " {\n      padding: 12px;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_container_").concat(id, " {\n      background: var(--floating--color_background_modal);\n      border-radius: 12px;\n      padding: var(--floating--contaner_padding);\n      box-shadow: var(--floating--container_box_shadow);\n      box-sizing: border-box;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_header_").concat(id, " {\n      display: flex;\n      align-items: center;\n      position: relative;\n      padding: 2px 0;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_appName_").concat(id, " {\n      font-family: var(--floating--font_family);\n      font-weight: 400;\n      font-size: 13px;\n      line-height: 16px;\n      color: var(--floating--color_text_secondary);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_close_").concat(id, " {\n      position: absolute;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      top: -4px;\n      right: -4px;\n      height: 28px;\n      width: 28px;\n      color: var(--floating--color_icon_medium);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_close_btn_").concat(id, " {\n      width: 28px;\n      height: 28px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      transition: .15s;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_close_btn_").concat(id, ":hover {\n      cursor: pointer;\n      background: var(--floating--close_button_color_transparent--hover);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_close_btn_").concat(id, ":active {\n      background: var(--floating--close_button_color_transparent--active);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_content_").concat(id, " {\n      padding: 36px 32px;\n      text-align: center;\n      font-family: var(--floating--font_family);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_title_").concat(id, " {\n      color: var(--floating--color_text_primary);\n      font-weight: 500;\n      font-size: 20px;\n      line-height: 24px;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_description_").concat(id, " {\n      color: var(--floating--color_text_secondary);\n      font-weight: 400;\n      font-size: 15px;\n      line-height: 20px;\n      margin-top: 8px;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_").concat(id, " {\n      height: 36px;\n      width: 100%;\n      border-radius: 8px;\n      color: var(--floating--button_text_color);\n      transition: .15s;\n      cursor: pointer;\n      background: var(--floating--button_background_color);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_").concat(id, ":hover {\n      background: var(--floating--button_background_color--hover);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_").concat(id, ":focus {\n      background: var(--floating--button_background_color--focus);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_").concat(id, ":active {\n      background: var(--floating--button_background_color--active);\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_content_").concat(id, " {\n     display: flex;\n     justify-content: center;\n     align-items: center;\n     padding: 0 6px;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_logo_").concat(id, ",\n    #").concat(id, " .VkIdWebSdk__floating_button_spinner_").concat(id, " {\n      display: inline-flex;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_spinner_").concat(id, " {\n      width: 24px;\n      animation: vkIdSdkButtonSpinner 0.7s linear infinite;\n    }\n\n    #").concat(id, " .VkIdWebSdk__floating_button_text_").concat(id, " {\n      font-weight: 500;\n      line-height: 20px;\n      font-family: var(--floating--font_family);\n      font-size: 15px;\n      transition: .5s;\n      min-width: max-content;\n      margin-left: 6px;\n      text-align: center;\n    }\n\n    #").concat(id, " .VkIdWebSdk__oauthList_container_").concat(id, " {\n      margin-top: 16px;\n    }\n\n    #").concat(id, "[data-state=loaded] iframe {\n      position: initial;\n      opacity: 100;\n      pointer-events: all;\n    }\n\n    #").concat(id, "[data-state=loaded] .VkIdWebSdk__floating_").concat(id, " {\n      display: none;\n    }\n\n    #").concat(id, "[data-state=not_loaded] .VkIdWebSdk__floating_button_spinner_").concat(id, " {\n      transition: .2s;\n      opacity: 0;\n      pointer-events: none;\n      width: 0;\n    }\n\n    #").concat(id, "[data-state=loading] .VkIdWebSdk__floating_button_text_").concat(id, " {\n      flex: 1;\n    }\n\n    @media (max-width: 480px) {\n      #").concat(id, " {\n        display: flex;\n        align-items: flex-end;\n        left: 0;\n        right: 0;\n        bottom: ").concat(getIndent(indent.bottom), "px;\n        width: 100%;\n        height: 340px;\n      }\n    }\n    @media (min-width: 481px) {\n      #").concat(id, " {\n        top: ").concat(getIndent(indent.top), "px;\n        right: ").concat(getIndent(indent.right), 'px;\n        width: 384px;\n        height: 360px;\n      }\n    }\n\n    @keyframes vkIdSdkButtonSpinner {\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  </style>\n  <iframe width="100%" height="100%" />\n</div>\n  ');
    };
};

exports.getFloatingOneTapTemplate = getFloatingOneTapTemplate;
