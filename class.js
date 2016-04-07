var Class={
   //>>>1/4 static attributes

   //<<<1/4 static attributes

   create:function(){
      //>>>2/4 create or inherit
      var inherit={};
      //<<<2/4 create or inherit

      var obj=inherit;
      var parent=this;
      var self=obj;

      //>>>3/4 static attribute operation
      //this.count+=1;
      //<<<3/4 static attribute operation

      //>>>4/4 define object
      obj=$.extend(obj,{

/*
         init:function(){
         },
         */

         //overwrite run method as construct
         run:function(func){
            func(self);
         },



      });
      //<<<4/4 define object

      //obj.init();

      return obj;
   },

   //create and modify
   create2:function(func){
      //>>>2/4 create or inherit
      var inherit={};
      //<<<2/4 create or inherit

      var obj=inherit;
      var parent=this;
      var self=obj;

      //>>>3/4 static attribute operation
      //this.count+=1;
      //<<<3/4 static attribute operation

      //>>>4/4 define object
      obj=$.extend(obj,{

         init:function(){
         },

         //overwrite run method as construct
         run:function(func){
            if(func) func(self);
         },



      });
      //<<<4/4 define object

      obj.init();
      if(func) func(self);

      return obj;
   },

};

function extend(inherit,func_init)
{
   var NewClass={
      //>>>1/4 static attributes

      //<<<1/4 static attributes

      create:function(func){
         //>>>2/4 create or inherit
         //<<<2/4 create or inherit

         if(typeof inherit.create == "function")
         {
            var obj=inherit.create();
         }
         else
         {
            var obj=inherit;
         }

         //var parent=this;
         var self=obj;
         self.parent=obj;

         //>>>3/4 static attribute operation
         //this.count+=1;
         //<<<3/4 static attribute operation

         //>>>4/4 define object

         //<<<4/4 define object
         if(func_init) func_init(self);


         if(typeof func == "function") func(self);
         //if(obj.init) call_user_func_array(obj.init,arguments);

         return obj;
      },


   };

   return NewClass;
}


/*
var o=Class.create();


var o=Class.create2(function(self){
self.name="frd";
self.show=function(){
alert(self.name);
};
});

o.show();


var O=Class.extend(Class,function(self){
self.name="frd";
self.show=function(){
alert(self.name);
};
});
var o=O.create();
o.show();



var O2=extend(O,function(self){
self.show=function(){
alert("hello "+self.name);
};
});
var o=O.create();
o.show();

*/

