var UI=extend(Class,function(self){
   self.html=null;//jquery object
   self.name="ui";

   self.children=[];

   self.add_child=function(child){
      self.children.push(child);

   };

   self.create_html=function(){

      self.html=null;

      return self.html;
   };

   self.get_html=function(){
      return self.html;
   };

   self.init=function(){
      self.init_children();
   };

   self.init_children=function(){
      for(var i=0;i<self.children.length; i++)
      {
         self.children[i].init();
      }
   
   };

});

function render_ui(target,ui)
{
   target.append(ui.create_html());
   Page.add_init(ui.init);
}

var FrdUITheme=extend(Class,function(self){
   self.setting={
      'button.class':'btn',
      'table.class':'table',

   };

   self.set=function(name,value){self.setting[name]=value;};
   self.get=function(name){return self.setting[name]; };


});

var FrdUI=extend(Class,function(self){
   self.theme=null;


   self.set_theme=function(theme){self.theme=theme;};
   self.get_theme=function(){ return self.theme; };

   //methods
   self.html=function(tag,attrs,text){
      if(text)
      {
         //'<{tag} {attr_str}>{text}</{tag}>';
      }
      else
      {
         //'<{tag} {attr_str}/>';
      }

   };

   self.button=function(text,attrs){
      attrs['class']=self.theme.get("button.class");


      var attr_str='';
      for(var i in attrs)
      {
         attr_str+=' '+i+'='+'"'+attrs[i]+'"';
      }

      var html='<button'+attr_str+'>'+text+'</button>';

      return html;
   };

   self.createForm=function(init_func){

      return Form.create();

   };
   self.createTable=function(){};


   //init
   self.set_theme(FrdUITheme.create());

});




var GLDate=extend(UI,function(self){
   self.create_html=function(){
      self.html=$('<input class="form-control" style="" type="text" />');

      return self.html;
   };

   self.init=function(){
      self.html.glDatePicker({
         showAlways:true,
         //cssName:"darkneon"
         cssName:"flatwhite",
         selectableDOW:null,
         dowOffset:1,
         dowNames:null,
         monthNames:null,
         selectedDate: null,
         monthNames:[ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
         '12' ],

         beforeRender:self.highlight_days,
         afterRender:self.afterRender,
         onClick:self.onclick,
      });

      //等待渲染完成
      while(!self.gldate)
      {
         self.gldate=self.get_html().data("glDatePicker");
      }


      self.afterRender();
   };

   self.afterRender=function(){
      if(self.gldate)
      {
         self.highlight_days();
         self.gldate.highlight_days();
      }
   };

   self.onclick=function(el,cell,date,data){
      //self.highlight_days();
      //self.gldate.highlight_days();

      el.val(format_date(date));
   };

   self.highlight_days=function(){
      //self.get_gldate().options.highlight_days=[1,2,3]
   };

   self.get_gldate=function(){

      return self.gldate;
   };

   self.get_year=function(){
      return self.get_gldate().calendar.find("[data-id=year]").text();
   };

   self.get_month=function(){
      return self.get_gldate().calendar.find("[data-id=month]").text();
   };

   self.get_day=function(){
      return self.get_gldate().calendar.find(".selected").text();
   };


   self.get_value=function(){

      return self.html.val();

   };

   self.select_day=function(){

      return self.html.val();
   };

});
