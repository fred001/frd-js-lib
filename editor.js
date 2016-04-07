var Editor=extend(UI,function(self){
    self.name='';


   self.create_html=function(){
      self.html=$('<div data-id="editor">'
      +'<!-- Nav tabs -->'
      +'<ul class="nav nav-tabs" role="tablist">'
      +'   <li role="presentation" class="active"><a data-id="tab-title" href="#editarea" aria-controls="Edit" role="tab" data-name="editarea" data-toggle="tab">Edit</a></li>'
      +'   <li role="presentation"><a data-name="viewarea" data-id="tab-title" href="#viewarea" aria-controls="View" role="tab" data-toggle="tab">View</a></li>'
      +'</ul>'
      +'<!-- Tab panes -->'
      +'<div class="tab-content">'
      +'   <div role="tabpanel" class="tab-pane active" id="editarea">'
      +'      <textarea data-id="editarea" rows="10" cols="30"></textarea>'
      +'   </div>'
      +'   <div role="tabpanel" class="tab-pane" id="viewarea" style="border:solid thin #cccccc;padding:5px;">'
      +'      <div data-id="viewarea" >'
      +'      </div>'
      +'   </div>'
      +'</div>'
      +'</div>');

      return self.html;
   };
   self.init=function(){
      self.editarea=self.html.get2("editarea");
      self.viewarea=self.html.get2("viewarea");

      self.html.find("[data-id=tab-title]").click(function (e) {
         e.preventDefault()
         var name=$(this).attr('data-name');

         //alert(name);
         if(name == "viewarea")
         {
            self.viewarea.html(self.convert_text());
         }
      });

   };
   self.get_name=function(){
      return self.name;
   };
   self.set_value=function(name){
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
      return richtext_convert_text(str)
   };

});
