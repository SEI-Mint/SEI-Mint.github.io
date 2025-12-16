(function (window, document) {
    class Mint {
        constructor(...args) {
            const argc = args.length;

            this.loaded = new Map();
        }

        timestamp() {
            return (new Date()).getTime();
        }

        require(path) {
            const self = this;
            const segment = path?.match(/[^\.]+/g);
            const prefix = "/";
            // const prefix = "https://raw.githubusercontent.com/SEI-Mint/Resource.SEI-Mint/refs/heads/main/";
            const extension = ".js";
            const module = segment[segment.length - 1];
            const url = prefix + segment.join('/') + extension + "?v=" + self.timestamp().toString();

            const response = function (e) {
                if (e?.target?.readyState == 4 && e.target.responseText) {
                    const eModule = document.getElementById("framework-module");
                    const eScript = document.createElement("script");
                    eScript.setAttribute("rel", "text/javascript");
                    eScript.setAttribute("path", path);
                    eScript.innerHTML = e.target.responseText;
                    eModule.appendChild(eScript);
                    self.loaded.set(path, {
                        [module]: url
                    });
                }
            };

            const request = function () {
                const http = new XMLHttpRequest();
                ["progress", "load", "error", "abort"].forEach(function (action, i, l) {
                    http.addEventListener(action, response);
                });
                http.open("GET", url, true);
                http.send();
            };

            if (!self.loaded.has(path)) {
                request();
            }
        }
    };

    const _ = function (...args) {
        return args.join(" ");
    };

    window._ = _;
    window.M = new Mint();
    M.require('JS.mint');
})(window, document);
