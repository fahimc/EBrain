(function(){
	var recognition = new webkitSpeechRecognition();

	window.Main=
	{
		talkingToEikon:false,
		waitTimer:null,
		init:function(){
			//this.request('/service/learn/hey/greeting');
			this.startListening();
		},
		startListening:function(){

			recognition.continuous = true;
			//recognition.interimResults = true;
			recognition.onstart = this.onSpeechStart.bind(this);
			recognition.onresult = this.onSpeechResults.bind(this);
			recognition.start();
		},
		onSpeechStart:function(event){
			console.log("translating speech");
		},
		onSpeechResults:function(event){
			clearTimeout(this.waitTimer);
			this.waitTimer=null;
			var result = event.results[event.results.length-1][0];
			console.log(result.transcript,this.talkingToEikon);
			if(!this.talkingToEikon && (result.transcript.indexOf("icon")>=0||result.transcript.indexOf("iphone")>=0))
			{
				console.log("found icon");
				this.talkingToEikon = true;
				this.ask('icon');
			}else if(this.talkingToEikon){
				this.ask(result.transcript);
			}
		},
		request:function(url){
			var xmlHttp = null;

			xmlHttp = new XMLHttpRequest();
			this.onResult(xmlHttp);
			xmlHttp.open( "GET", url, false );
			xmlHttp.send( null );
		},
		onResult:function(xmlhttp){
			xmlhttp.onreadystatechange=function()
			{
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{				
					var response = JSON.parse(xmlhttp.responseText);
					Main.speak(response.text);
				}
			}
		},
		speak:function(value)
		{
			console.log("eikon is speaking");
			var msg = new SpeechSynthesisUtterance(value);
			window.speechSynthesis.speak(msg);
			this.stopListening();
		},
		ask:function(value){
			console.log("checking server");
			this.request('/service/get/'+value);
		},
		stopListening:function(){
			if(!this.waitTimer)
			{
				this.waitTimer = setTimeout(this.stop.bind(this),100000);
			}
		},
		stop:function(){
			console.log("sleeping");
			this.talkingToEikon=false;
			clearTimeout(this.waitTimer);
			this.waitTimer=null;
		}

	};

	Main.init();
})();