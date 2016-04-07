var Dialog=extend(Class,function(self){
   var template=get_template('dialog');


   self.html=$(template);
   self.body=self.html.get2("body");
   self.footer=self.html.get2("footer");

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

   self.init=function(message){
      self.body.html(message);
   };

   self.show=function(){

      self.html.show();
   };

   self.close=function(){
      self.html.hide();
   };

   self.loading=function(){
      self.body.html('<strong>loading......</strong>');
   };

   self.add_button=function(name,label,style){

      var html='<button class="btn '+style+'" data-id="'+name+'" type="button">'+label+'</button>';

      self.footer.append(html);

   };

   self.bind_button=function(name,event,callback){

      self.footer.get2(name).bind(event,callback);

   };



});

var Alert=extend(Dialog,function(self){
   self.body.html(message);

   self.add_button("ok","OK","btn-primary");
   self.footer.get2("ok").bind("click",self.close);
});


var Confirm=extend(Dialog,function(self){
   self.init=function(message,callback){
      self.body.html(message);

      self.add_button("ok","OK","btn-primary");
      self.add_button("cancel","Cancel","");

      self.on_ok=function(){
         if(callback) callback(self);
      };

      self.on_cancel=function(){
         self.close();
      };

      self.footer.get2("ok").bind("click",self.on_ok);
      self.footer.get2("cancel").bind("click",self.on_cancel);
   };

});


function dialog()
{
  var Dialog=extend(Class,function(self){
    var template=get_template('dialog');


    self.html=$(template);
    self.body=self.html.get2("body");
    self.footer=self.html.get2("footer");

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

    self.init=function(message){
      self.body.html(message);
    };

    self.show=function(){

      self.html.show();
    };

    self.close=function(){
      self.html.hide();
    };

    self.loading=function(){
      self.body.html('<strong>loading......</strong>');
    };

    self.add_button=function(name,label,style){

      var html='<button class="btn '+style+'" data-id="'+name+'" type="button">'+label+'</button>';

      self.footer.append(html);

    };

    self.bind_button=function(name,event,callback){

      self.footer.get2(name).bind(event,callback);

    };



  });

  return Dialog.create();
}
