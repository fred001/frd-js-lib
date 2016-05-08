var Dialog2=extend2(UI2,function(self){

   self.create_html=function(){
      var template=$("#js-template-dialog").html();

      self.html=$(template);
      self.html.hide();

      self.head=self.html.get2("head");
      self.body=self.html.get2("body");
      self.foot=self.html.get2("foot");

      //add to page
      $("body").append(self.html);

      //calculate position (150 = 300/2)
      var left=$(window).width()/2-150;
      var top=$(window).height()/2-150;

      self.html.css("left",left+"px")
      self.html.css("top",top+"px")


      self.body.set_html=self.body.html;
      //self.footer.add_button
      //self.footer.set_align
   };

   self.get_html=function(){return self.html;};

   self.show=function(){

      self.html.show();
   };

   self.close=function(){
      self.html.hide();
   };

   self.loading=function(){
      self.body.html('<strong>loading......</strong>');
   };

   self.get_head=function(){ return self.head; };
   self.get_body=function(){ return self.body; };
   self.get_foot=function(){ return self.foot; };

   self.head_set_title=function(title){self.head.html(title)};
   self.body_set_html=function(html){self.body.html(html)};

   self.foot_add_button=function(name,label,style){

      var html='<button class="btn '+style+'" data-id="'+name+'" type="button">'+label+'</button>';

      self.foot.append(html);

   };

   self.foot_bind_button=function(name,event,callback){

      self.foot.get2(name).bind(event,callback);

   };

});

var Alert2=extend2(Dialog2,function(self){
/*
   self.__init__=function(){
      self.create_html();
      self.init();
      self.bind_events();
   };
   */

   self.set_msg=function(msg){
      self.head_set_title("Alert");
      self.foot_add_button("ok","OK","btn-primary");
      self.foot_bind_button("ok","click",self.close);

      self.body_set_html(msg);
   };

});


var Confirm2=extend2(Dialog2,function(self){
   self.set_msg=function(message,callback){
      self.head_set_title("Confirm");
      self.body_set_html(message);

      self.foot_add_button("ok","OK","btn-primary");
      self.foot_add_button("cancel","Cancel","");

      self.on_ok=function(){
         self.close();
         if(callback) callback(self);
      };

      self.on_cancel=function(){
         self.close();
      };

      self.foot_bind_button("ok","click",self.on_ok);
      self.foot_bind_button("cancel","click",self.on_cancel);
   };

});


