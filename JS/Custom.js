(function(){
/***************************************************************************************************
 ===================================================================================================
    Declarations and Definitions
 ===================================================================================================
 **************************************************************************************************/
    var URL     = "https://raw.githubusercontent.com/SEI-Mint/Resource.SEI-Mint/main/";

    var URN     = {
        "Custom" : "JS/Custom.js"
    };

    var Include = {};

/***************************************************************************************************
 ===================================================================================================
    Function [ General ]
 ===================================================================================================
 **************************************************************************************************/
    var CurrentTime = function() {
        let Timestamp = (new Date()).getTime();
        return Timestamp;
    }

/***************************************************************************************************
 ===================================================================================================
    Function [ Include ]
 ===================================================================================================
 **************************************************************************************************/
    Include.Response = function(e) {
        var Target = e.target || e.srcElement || e.currentTarget;
        if(Target.readyState == 4) {
            let Element_Script = document.createElement("script");
            Element_Script.innerText = Target.responseText;
            document.body.append(Element_Script);
        }
    };

    Include.Request  = function() {
        let URI  = URL + URN["Custom"] + "?v=" + CurrentTime().toString();
        let HTTP = new XMLHttpRequest();
        let Func = function(Action, Index, List) {
            HTTP.addEventListener(Action, Include.Response);
        };
        HTTP.open("GET", URI, true);
        ["progress", "load", "error", "abort"].forEach(Func);
        HTTP.send();
    };

    Include.Request();

})();