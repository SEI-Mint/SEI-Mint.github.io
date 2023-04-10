(function(){

	var Default = {};
	Default.Event = {}
	Default.Event.Event = function(Event)
	{
		Event = Event || window.event;

		if(Event){
			switch(Event.type){
				case "keydown":
					var Code = Event.which || Event.keyCode;
					switch(Code){
						case 123:
							Event.preventDefault();
							Event.stopPropagation();
							break;
						case 67:
						case 73:
							if(Event.shiftKey && Event.ctrlKey){
								Event.preventDefault();
								Event.stopPropagation();
								
								alert("不要偷看我拉 >///<");
							}
							break;
						default:
							break;
					}
					break;
				case "contextmenu":
					Event.preventDefault();
					Event.stopPropagation();
					break;	
			}
		}
	};
	Default.Event.Init = function()
	{
		var Self = Default.Event;
		["contextmenu", "keydown"].forEach(function(Action, Index, List){
			document.body.addEventListener(Action, Self.Event);
		});
	};
	
	var Onload = window.onload;
	window.onload = function()
	{
		if((typeof Onload).toLocaleString() == "function"){
			Onload();
		}
		Default.Event.Init();
	}

})();