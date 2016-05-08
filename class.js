/*
 * 1, 所有class 均以Class2为基准扩展
 * 2，class的方法只支持覆盖或者继承，不同时支持两者
 *    比如 父对象定义了某方法，子对象不定义，则是继承
 *    如子对象也定义，则是覆盖，覆盖是彻底消除父对象方法的存在
 *
 *    __init__ 是一个特殊方法
 *    扩展的时候传入 create(false) 禁止父对象调用
 *    等到对象创建实例的时候，则会调用
 *    此时若子对象定义了，则是调用子对象的，若是父对象定义了，则是调用父对象的
 *
 *    相当于一个抽象函数，共享与所有子对象
 *    若不想要用父对象的抽象函数，只能子对象覆盖之
 */
var Class2={
   //>>>1/4 static attributes

   //<<<1/4 static attributes

   //init : default undefined = true ，true means call __init__
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

         extend:function(func){
            func(self);
         },


      });
      //<<<4/4 define object
      

      //obj.init();

      return obj;
   },
};

function extend2(inherit,func_init)
{
   var NewClass={
      //>>>1/4 static attributes

      //<<<1/4 static attributes

      create:function(init){
        if(init === undefined ) init = true;

         //>>>2/4 create or inherit
         //<<<2/4 create or inherit

         if(typeof inherit.create == "function")
         {
            var obj=inherit.create(false);
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

         if(init == true)
         {
           if(obj.__init__) obj.__init__()
         }

         //if(typeof func == "function") func(self);
         //if(obj.init) call_user_func_array(obj.init,arguments);

         return obj;
      },


   };

   return NewClass;
}



/*
var o=Class.create();


var Class2=extend2(Class,function(self){
self.name="frd";
self.show=function(){
alert(self.name);
};
});

*/

