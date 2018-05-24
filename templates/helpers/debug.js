module.exports = function (context, option) { 
  console.log("CURRENT CONTEXT");
  console.log(this);
 
  if (option) {
	console.log("--------------------");
    console.log("VALUE");
    console.log(context);
  }
  console.log("====================");
};