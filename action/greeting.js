var Action=
{
	response:function(req,value){
		 return {
		 	text:"Hello, how can I help?",
		 	request:
		 	{
		 		text:value
		 	}
		 }
	}
};
module.exports=Action;