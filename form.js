var FormText=extend(UI,function(self){

  self.create_html=function(){
    self.html=$('<div class="form-group">'
      +'<label class="col-sm-2 control-label" data-id="label"></label>'
      +'<div class="col-sm-10">'
      +'<input class="form-control field"  type="text" value="" />'
      +'</div>'
    +'</div>');

    self.label=self.html.get2("label");
    self.field=self.html.find(".field:first");

    return self.html;

  };

  self.set_label=function(label){

    self.label.html(label);

  };

  self.set_value=function(value){
    self.field.val(value);
  };

  self.get_value=function(){
    return self.field.val();
  };

  self.set_text=function(text){
    self.field.text(text);
  };

  self.set_name=function(name){
    self.field.attr("name",name);
    self.field.attr("data-id",name);
  };

  self.get_name=function(name){
    return self.field.attr("name");
  };

  self.set=function(name,value){self.field.attr(name,value);};
  self.get=function(name){return self.field.attr(name);};

});

function form_text(func,html)
{
  return FormText.create();
}

function form_password()
{
  return form_text(function(self){
    self.set("type","password");
  });

}

function form_hidden()
{
  var FormHidden=extend(FormText,function(self){
     self.create_html=function(){
        self.html=$('<div class="form-group">'
           +'<label class="col-sm-2 control-label" data-id="label"></label>'
           +'<div class="col-sm-10">'
           +'<input class="form-control field"  type="hidden" value="" />'
           +'</div>'
        +'</div>');

        self.label=self.html.get2("label");
        self.field=self.html.find(".field:first");

        return self.html;

     };
  
  });

  return FormHidden.create();
}

var FormTextarea=extend(FormText,function(self){

  self.create_html=function(){
    self.html=$('<div class="form-group">'
  +'<label class="col-sm-2 control-label" data-id="label"></label>'
  +'<div class="col-sm-10">'
  +'<textarea class="form-control field" rows="10"></textarea>'
  +'</div>'
  +'</div>');

    self.label=self.html.get2("label");
    self.field=self.html.find(".field:first");

    return self.html;

  };

    self.set_value=function(value){
      self.field.val(value);
    }; 


});

function form_textarea()
{

   return FormTextarea.create();
}

var FormEditor=extend(FormText,function(self){
  self.name='';


  self.create_html=function(){
    self.editor=Editor.create();
    self.editor.create_html();
    self.add_child(self.editor);


    self.html=$('<div class="form-group">'
      +'<label class="col-sm-2 control-label" data-id="label"></label>'
      +'<div data-id="field" class="col-sm-10">'
      +'</div>'
    +'</div>');

    self.html.get2("field").append(self.editor.get_html());

    self.label=self.html.get2("label");
    self.field=self.editor;

    return self.html;

  };

  self.set_name=function(name){
    self.name=name;
  };

  self.get_name=function(name){
    return self.name;
  };

  self.set_value=function(value){
    self.field.set_value(value);
  };

  self.get_value=function(){
    return self.field.get_value();
  };


});

function form_editor()
{
  var editor=FormEditor.create();
  return editor;
}


function form_selection()
{
   var FormSelect=extend(FormText,function(self){
      self.options={};
      self.default_option='';

      self.create_html=function(){
         var html='<div class="form-group">'
         +'<label class="col-sm-2 control-label" data-id="label"></label>'
         +'<div class="col-sm-10">'
         +'<select class="form-control" type="text" value="" />'
         +'</div>'
         +'</div>';

         self.html=$(html);


         self.label=self.html.get2("label");
         self.field=self.html.find("select:first");

         for(var k in self.options)
         {
            if(k == self.default_option)
            {
               self.field.append('<option selected value="'+k+'">'+self.options[k]+'</option>');
            }
            else
            {
               self.field.append('<option value="'+k+'">'+self.options[k]+'</option>');
            }
         }


         return self.html;

      };


      self.add_option=function(value,label,is_default){

         self.options[value]=label; 

         if(is_default)
         {
            option_html='<option selected value="'+value+'">'+label+'</option>';
         }
         else
         {
            option_html='<option value="'+value+'">'+label+'</option>';
         }

         self.field.append(option_html);

         return self;
      };

      self.set_default=function(value){
         self.default_option=value;

      };


   });

   return FormSelect.create();
}

//var form=Form(); 

var Form=extend(UI,function(self){
  self.fields={};

  self.add_field=function(name,label,type){

    if(type == "select")
    {
      var field=form_selection();
    }
    else if(type == "text")
    {
      var field=form_text();
    }
    else if(type == "password")
    {
      var field=form_password();
    }
    else if(type == "hidden")
    {
      var field=form_hidden();
    }
    else if(type == "textarea")
    {
      var field=form_textarea();
    }
    else if(type == "editor")
    {
      var field=form_editor();
    }
    else
    {
      alert('unknown type'+type);
    }

    field.create_html();

    field.set_label(label);
    field.set_name(name);

    self.fields[name]=field;

    self.add_child(field);

    return self.get_field(name);
  };

  self.get_field=function(name){return self.fields[name];};
  self.get_params=function(){

    var params={};

    for(var i in self.fields)
    {
      var field=self.fields[i];
      params[field.get_name()]=field.get_value();
    }

    return params;
  };

  self.create_html=function(){
    var html=$('<form data-id="form" class="form-horizontal">');

    for(var i in self.fields)
    {
      //render_ui(html,self.fields[i]);
      html.append(self.fields[i].get_html());
      Page.add_init(self.fields[i].init);
    }

    self.html=html;
    return html;

  };


});

function form()
{
  return Form.create();
}

