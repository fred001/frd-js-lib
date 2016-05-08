//var _frd_js_lib_page=null; //global variable ,the lib depends on this variable save variable 
/*
 *
 * 核心方法：
 *   render_ui （TARGET，UI）： 将一个ui对象放到某位置（dom)去 
 *   set_setting/get_setting : 设置setting
 *   add_init: 增加一个init 函数
 *   init: 在页面底部执行所有init函数
 **/
var Frd=extend2(Class2,function(self){

  self.name='';
  self.set_name=function(name){self.name=name};
  self.get_name=function(){return self.name};

  self.setting={};
  self.set_setting=function(name,value){self.setting[name]=value;};
  self.get_setting=function(name){return self.setting[name]};





  //self.templates={ };

  self.init_functions=[];
  self.add_init=function(func){
    self.init_functions.push(func);
  };

  self.init=function(){
    for(var k in self.init_functions)
    {
      var func=self.init_functions[k];
      func(self);
    }

    self.init_functions=[];
  };

  self.save_var=function(page_name,name,default_value) {
    var prefix="page."+page_name+".";

    var value=localStorage.getItem(prefix+name);
    if(value === null) return default_value;

    return value;
  };

  self.load_var=function(page_name,name,value){
    var prefix="page."+page_name+".";
    localStorage.setItem(prefix+name,value);
  };

  self.render_ui=function(target,ui){
    target.append(ui.get_html());
  };

});




/*
var frd=Frd.create()
*/
