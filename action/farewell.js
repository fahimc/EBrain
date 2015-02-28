var Action=
{
	response:function(req,value){
		 return {
		 	text:"bye",
		 	request:
		 	{
		 		text:value
		 	}
		 }
	}
};
module.exports=Action;