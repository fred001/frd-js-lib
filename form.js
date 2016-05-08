var FormField2=extend2(UI2,function(self){

  self.create_field_html=function(){
    return '<input  class="form-control field"  type="text" value="" />';
  };

  self.create_html=function(){
    self.html=$('<div class="form-group">'
      +'<label class="col-sm-2 control-label" data-id="label"></label>'
      +'<div data-id="field" class="col-sm-10">'
      +'</div>'
    +'</div>');

    self.label=self.html.get2("label");

    var html=self.create_field_html();
    self.field=$(html);
    self.html.get2("field").append(self.field)

    //alert(self.html);
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

var FormText2=extend2(FormField2,function(self){
  self.create_field_html=function(){
    return '<input class="form-control "  type="text" value="" />';
  };
});
var FormHidden2=extend2(FormField2,function(self){
  self.create_field_html=function(){
    return '<input class="form-control "  type="hidden" value="" />';
  };

  self.create_html=function(){
    self.html=$('<div class="form-group">'
      +'<div data-id="field" class="col-sm-10">'
      +'</div>'
    +'</div>');


    var html=self.create_field_html();
    self.field=$(html);
    self.html.get2("field").append(self.field)

    return self.html;
  };

  self._label='';
  self.set_label=function(label){
     self._label=label;
  };

  self.set_value=function(value){
     return self._label;
  };


});
var FormPassword2=extend2(FormField2,function(self){
  self.create_field_html=function(){
    return '<input class="form-control "  type="password" value="" />';
  };
});


var FormTextarea2=extend2(FormField2,function(self){
  self.create_field_html=function(){

    return '<textarea class="form-control" rows="10"></textarea>';
  };
});


var FormSelect2=extend2(FormField2,function(self){
  self.options={};
  self.default_option='';

  self.create_field_html=function(){
    return '<select class="form-control" type="text" value="" />';
  };

  //self.create_html=function(){
    //var html='<div class="form-group">'
    //+'<label class="col-sm-2 control-label" data-id="label"></label>'
    //+'<div data-id="field" class="col-sm-10">'
    //+'</div>'
    //+'</div>';

    //self.html=$(html);


    //self.label=self.html.get2("label");
    //var html=self.create_field_html();
    //self.field=$(html);
    //self.html.get2("field").append(self.field)


    //for(var k in self.options)
    //{
      //if(k == self.default_option)
      //{
        //self.field.append('<option selected value="'+k+'">'+self.options[k]+'</option>');
      //}
      //else
      //{
      //  self.field.append('<option value="'+k+'">'+self.options[k]+'</option>');
     // }
    //}


    //return self.html;

  //};



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


var FormEditor2=extend2(FormField2,function(self){
  self.name='';


  self.create_html=function(){
    self.editor=Editor2.create();

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

//var form=Form(); 

var Form2=extend2(UI2,function(self){
  self.fields={};

  //alert(self.__init__);
  //self.__init__=function() {
      //alert(self.create_html);
  //},
  //alert(self.__init__);

  self.create_html=function(){
     if(self.html) return self.html;

    var html=$('<form data-id="form" class="form-horizontal">');

    self.html=html;
    return html;
  };

  self.add_field=function(type,name,label){

    if(type == "select")
    {
      var field=FormSelect2.create();
    }
    else if(type == "text")
    {
      var field=FormText2.create();
    }
    else if(type == "password")
    {
      var field=FormPassword2.create();
    }
    else if(type == "hidden")
    {
      var field=FormHidden2.create();
    }
    else if(type == "textarea")
    {
      var field=FormTextarea2.create();
    }
    else if(type == "editor")
    {
      var field=FormEditor2.create();
    }
    else
    {
      alert('unknown type'+type);
    }

    var html=field.get_html();
    field.set_label(label);
    field.set_name(name);
    self.fields[name]=field;

    self.html.append(html)
    //self.add_child(field);

    return self.get_field(name);
  };

  self.get_field=function(name){return self.fields[name];};
  self.remove_field=function(name){
    var field=self.fields[name];
    field.html.remove();

    delete self.fields[name];
  };

  self.get_params=function(){

    var params={};

    for(var i in self.fields)
    {
      var field=self.fields[i];
      params[field.get_name()]=field.get_value();
    }

    return params;
  };

  self.set_params=function(params){

    for(var name in params)
    {
      self.fields[name].set_value(params[name]);
    }

  };

  self.set_params=function(name,value){

    self.fields[name].set_value(value);

  };

  /*
  self.add_button=function(name,label,style){

    var html='<button class="btn '+style+'" data-id="'+name+'" type="button">'+label+'</button>';

    self.footer.append(html);

  };

  self.bind_button=function(name,event,callback){

    self.footer.get2(name).bind(event,callback);

  };
  */


});

