/*
 * 核心接口方法：
 *   create_html  :创建 self.html 变量，此变量是ui的html部分
 *   bind_events  :绑定self.html上的事件
 *
 * 
 *
 */
var UI2=extend2(Class2,function(self){
   self.html=null;//jquery object
   self.name="ui";

/*
   self.children=[];
   self.add_child=function(child){
      self.children.push(child);

   };
   */

   self.__init__=function(){
     self.create_html();
     self.bind_events();

   };

   self.create_html=function(){
      self.html=null;
      return self.html;
   };

   self.bind_events=function(){
   };

   self.get_html=function(){
      return self.html;
   };

/*
   self.init=function(){
      self.init_children();
   };

   self.init_children=function(){
      for(var i=0;i<self.children.length; i++)
      {
         self.children[i].init();
      }
   
   };
   */

});
