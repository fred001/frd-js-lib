var TableUI=extend(Class,function(self){
  self.html=$('<table>'
  +'<thead data-id="head"></thead>'
  +'<tbody data-id="body"></tbody>'
  +'<tfoot data-id="foot"></tfoot>'
  +'</table>');

  self.head=self.html.get2("head");
  self.body=self.html.get2("body");
  self.foot=self.html.get2("foot");



  self.add_header=function(){
    var tr=$("<tr></tr>");

    for(var i in arguments)
    {
      tr.append("<th>"+arguments[i]+"</th>");
    }


    self.head.append(tr);
  };

  self.add_row=function(){
    var tr=$("<tr></tr>");

    for(var i in arguments)
    {
      tr.append("<td>"+arguments[i]+"</td>");
    }


    self.body.append(tr);
  };

  self.render=function(){
    return '<table class="table">'+self.html.html()+'<table>';
  };


});
