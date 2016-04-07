var Callback=extend(Class,function(self){

   self.params={};
   self.names=[];
   self.functions=[];

   self.add=function(name,func){
      this.names.push(name);
      this.functions.push(func);

   };

   self.run=function(){
      var func=this.functions[0];
      func.__callback=self;
      func();

   };

   self.call=function(name){

   };

   self.setParam=function(k,v){

   };

   self.getParam=function(k,default_value){

   };


});


/*
var callback=Callback.create();
callback.add("main",show_confirm);
callback.add("confirm_yes",confirm_yes);
callback.add("confirm_no",confirm_no);

callback.run();
*/
