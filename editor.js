var Editor2=extend2(UI2,function(self){
   self.name='';


   self.create_html=function(){
      self.html=$($("#js-template-editor").html());
      return self.html;
   };

   self.bind_events=function(){
      self.editarea=self.html.get2("editarea");
      self.viewarea=self.html.get2("viewarea");

      self.html.find("[data-id=tab-title]").click(function (e) {
         e.preventDefault()
         var name=$(this).attr('data-name');

         if(name == "viewarea")
         {
            self.viewarea.html(self.convert_text());
         }
      });

   };
   self.get_name=function(){
      return self.name;
   };
   self.set_name=function(name){
      self.name=name;
   };

   self.get_value=function(){
      return self.editarea.val();
   };
   self.set_value=function(text){
      self.editarea.val(text);
   };

   self.convert_text=function() {
      //需要转换 标题，粗体，列表，图片
      var str=self.editarea.val();
      return richtext_convert_text(str);
   };

});
