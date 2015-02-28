var dclassify = require('dclassify');
var natural = require('natural');
var classifier;

var Classify=
{
	init:function(){
		 classifier = new natural.BayesClassifier();
		this.naturalLearn('hello','greeting');
		this.naturalLearn('hi','greeting');
		this.naturalLearn('eikon','greeting');
		this.naturalLearn('bye','farewell');
		this.naturalLearn('latest price','ric');
		this.naturalLearn('current price','ric');
	},
	naturalLearn:function(value,category){
		if(this.checkClassifier(value))return;
		classifier.addDocument(value,category);
		classifier.train();
	},
	checkClassifier:function(value){
		for(var a=0;a<classifier.docs.length;a++){
			var text =classifier.docs[a].text.length>0?classifier.docs[a].text.join(" "):classifier.docs[a].text;
			if(text==value){
				console.log("already have this value");
				return true;
			}
		}
		return false;
	},
	find:function(value){
		return classifier.classify(value);
	}
};
Classify.init();
module.exports=Classify;