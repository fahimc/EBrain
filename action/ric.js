var Action=
{
	response:function(req,value){
		 return {
		 	text:"The current price is 0.15",
		 	request:
		 	{
		 		text:value
		 	}
		 }
	}
};
module.exports=Action;