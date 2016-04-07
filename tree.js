function object_len(o)
{
   if(o)
   {
      return Object.keys(o).length;
   }
   else
   {
      return 0;
   }
}

function tree_node(id,name)
{
   return {
      'parent_id':null,
      'id':id,
      'name':name,
      'children':[],
      'open':true,
   };
}

var Tree=extend(Class,function(self){
   var root=tree_node(0,"ROOT");
   self.data=root;
   self.node_index={0:root};

   self.insert=function(parent_id,node){
      node.parent_id=parent_id;

      if(!self.node_index[parent_id].children)
      {
         self.node_index[parent_id].children=[];
      }

      self.node_index[parent_id].children.push(node);
      self.node_index[node.id]=node;

      //console.log(self.data);
   };

   self.delete=function(id){
      var node=self.node_index[id];

      for(var i in self.node_index[node.parent_id].children)
      {
         if(self.node_index[node.parent_id].children[i].id == id)
         {
            self.node_index[node.parent_id].children.splice(i,1);
            break;
         }
      }

      delete self.node_index[id];
   };

   self.update=function(id,attrs){
      var node=self.node_index[id];
      for(var k in attrs)
      {
         self.node_index[id][k]=attrs[k];
      }
   };

   self.serialize=function(){
      return self.data;
   };

   self.get_data=function(){return self.data};

   self.unserialize=function(str){
      self.data=JSON.parse(str);
      self.node_index={};

      self.node_index[self.data.id]=self.data;

      function node_index_children(children)
      {
         for(var k in children)
         {
            var child=children[k];
            self.node_index[child.id]=child;

            node_index_children(child.children);
         }
      }

      node_index_children(self.data.children);

      //console.log(self.node_index);
   };

   self.move_up=function(id,prev_id){
      var parent_id=self.node_index[id].parent_id;


      var k1=false;
      var k2=false;

      var children=self.node_index[parent_id].children;
      for(var k in children)
      {
         if(children[k].id == id)
         {
            k1=k;
            break;
         }
      }

      for(var k in children)
      {
         if(children[k].id == prev_id)
         {
            k2=k;
            break;
         }
      }

      //alert(id+"  "+prev_id);
      //alert(k1+"  "+k2);

      if(k1 && k2)
      {
         var tmp=children[k1];
         children[k1]=children[k2];
         children[k2]=tmp;

      }
   };

   self.move_down=function(id,next_id){
      var parent_id=self.node_index[id].parent_id;


      var k1=false;
      var k2=false;

      var children=self.node_index[parent_id].children;
      for(var k in children)
      {
         if(children[k].id == id)
         {
            k1=k;
            break;
         }
      }

      for(var k in children)
      {
         if(children[k].id == next_id)
         {
            k2=k;
            break;
         }
      }

      //alert(id+"  "+next_id);
      //alert(k1+"  "+k2);

      if(k1 && k2)
      {
         var tmp=children[k1];
         children[k1]=children[k2];
         children[k2]=tmp;

      }
   };

   self.change_parent=function(id,new_parent_id){

      var new_parent=self.node_index[new_parent_id];
      var parent_id=self.node_index[id].parent_id;
      var cur_parent=self.node_index[parent_id];


      if(!new_parent['children'])
      {
         new_parent['children']=[];
      }

      new_parent['children'].push(self.node_index[id]);
      self.node_index[id].parent_id=new_parent.id;

      //alert(id+"  "+new_parent_id);

      for(var i in cur_parent.children)
      {
         if(cur_parent.children[i].id == id)
         {
            cur_parent.children.splice(i,1);
            //console.log(cur_parent);
            break;
         }
      }


      //remove from old parent
      //add to new parent

   };

   self.close=function(id){

      self.node_index[id].open=0;
   };

   self.open=function(id){
      self.node_index[id].open=1;

   };
});


var TreeUI=extend(UI,function(self){
   self.tree=Tree.create();

   self.html_node=function(node) {
      var html=$('<li data-parent-id="'+node['parent_id']+'" data-id="'+node['id']+'"></li>');
      var html_node=$('<span class=""><span>'+node['name']+'</span></span>');


      html.append(html_node);
      var children=self.html_children(node['children']);

      if(object_len(node['children'])> 0)
      {
         if(node.open == 0)
         {
            html_node.prepend('<i class="fa fa-plus"></i>');
            children.hide();
         }
         else
         {
            html_node.prepend('<i class="fa fa-minus"></i>');
         }
      }

      html.append(children);

      return html;

   };

   self.html_children=function(children){
      var list=$("<ul></ul>");

      if(children)
      {
         for(var k=0;k<children.length;k++)
         {
            var child=children[k];

            list.append(self.html_node(child));
         }
      }

      return list;
   };



   self.create_html=function(){
      //html_node
      var data=self.tree.get_data();
      var html=$('<div class="tree"></div>');

      html.append(self.html_children(data['children']));



      self.html=html;

      return self.html;
   };

   self.onchoosed=function(){};

   self.init=function(){
      self.html.find("li").on("click",function(){
         self.html.find("li").removeClass("choosed");
         $(this).addClass("choosed");

         self.onchoosed();

         return false;
      });

      self.html.find("li>span>i").on("click",function(){
         var o=$(this);

         var id=o.parent().parent("li:first").attr("data-id");
         if(o.hasClass("fa-minus"))
         {
            o.removeClass("fa-minus");
            o.addClass("fa-plus");
            o.parent("span").parent("li").children("ul").hide(200);

            self.tree.close(id);
         }
         else if(o.hasClass("fa-plus"))
         {
            o.removeClass("fa-plus");
            o.addClass("fa-minus");
            o.parent("span").parent("li").children("ul").show(200);

            self.tree.open(id);
         }

         return false;
      });

   };

   self.get_choosed=function(){
      return self.html.find("li.choosed");
   };

   self.get_value=function(){
      return self.html.find("li.choosed").attr("data-id");
   };

   self.insert=function(id,name){
      var choosed=self.get_choosed();

      var parent_id=choosed.attr("data-id");
      if(!parent_id) 
      {
         parent_id=0;
         var choosed=self.html;
      }

      //alert(parent_id);

      self.tree.insert(parent_id,tree_node(id,name));

      //console.log(self.html.find("li:first").children("ul"));

      var node=tree_node(id,name);
      node.parent_id=parent_id;

      var html=self.html_node(node);

      choosed.children("ul").append(html);

      self.init();
   };

   self.delete=function(){
      var choosed=self.get_choosed();
      var id=choosed.attr("data-id");
      if(!id) 
      {
         return ;
      }

      self.tree.delete(id);
      choosed.remove();//remove 删除本身， empty 仅删除内容
   };

   self.update=function(){
      var choosed=self.get_choosed();
      var id=choosed.attr("data-id");
      if(!id) 
      {
         return ;
      }

      var treeui=self;
      dialog().run(function(self){

         self.save=function(){
            var form=self.body.get2("form");
            var params={
               'name':form.get2("name").val(),
            };

            /*
            call_api("account.add",params,function(response){
            self.close();
            location.reload();
            });
            */

            treeui.tree.update(id,{name: form.get2("name").val()});
            choosed.find("span>span:first").text(form.get2("name").val());
            self.close();

         }

         self.body.css('text-align','left');

         var form=Form.create();
         form.add_field("name","Name","text");
         form.get_field("name").set_value(choosed.children("span").text());

         var html=form.create_html();

         self.body.append(html);
         self.add_button("save",'保存');
         self.add_button("cancel",'取消');

         self.bind_button("save","click",self.save);
         self.bind_button("cancel","click",self.close);
      });

   };



   self.serialize=function(){
      return self.tree.serialize();
   };

   self.unserialize=function(str){
      if(str)
      {
         self.tree.unserialize(str);
      }
   };


   self.move_up=function(){
      var choosed=self.get_choosed();
      var id=choosed.attr("data-id");
      if(!id) 
      {
         return ;
      }


      if(choosed.prev().length > 0)
      {
         var prev_id=choosed.prev().attr("data-id");
         choosed.prev().before(choosed);

         self.tree.move_up(id,prev_id);
      }

   };

   self.move_down=function(){
      var choosed=self.get_choosed();
      var id=choosed.attr("data-id");
      if(!id) 
      {
         return ;
      }

      if(choosed.next().length > 0)
      {
         console.log(choosed.next());

         var next_id=choosed.next().attr("data-id");
         choosed.next().after(choosed);

         self.tree.move_down(id,next_id);
      }

   };


   self.move_left=function(){
      var choosed=self.get_choosed();
      var id=choosed.attr("data-id");
      if(!id) 
      {
         return ;
      }

      var o=choosed.parent().parent().parent().parent();

      if(o.length > 0 && o.attr("data-id"))
      {
         var new_parent_id=o.attr("data-id");

         o.children("ul").append(choosed);

         self.tree.change_parent(id,o.attr("data-id"));
      }

   };


   self.move_right=function(){
      var choosed=self.get_choosed();
      var id=choosed.attr("data-id");
      if(!id) 
      {
         return ;
      }

      if(choosed.prev().length > 0)
      {
         var prev_id=choosed.prev().attr("data-id");
         var parent_id=prev_id;

         var prev=choosed.prev();
         prev.children("ul").append(choosed);

         //choosed.prev().before(choosed);

         //alert(parent_id);
         self.tree.change_parent(id,parent_id);
      }



   };

   self.change_parent=function(){
      if(!self.get_value() )
      {
         alert('please choose a node');
         return ;
      }

      var choosed=self.get_choosed();
      var choosed_id=self.get_value();
      var treeui=self;

      dialog().run(function(self){
         var field=TreeUI.create();

         self.save=function(){
            //alert(field.get_value());
            var new_parent_id=field.get_value();
            treeui.html.find("li[data-id="+new_parent_id+"]").children("ul").append(choosed);

            treeui.tree.change_parent(choosed_id,new_parent_id);

            self.close();
         };

         var form=Form.create();

         call_api("category_relation.get",{},function(r){
            field.unserialize(r.data);
            field.create_html();
            field.init();

            self.body.css("text-align","left");
            self.body.append(field.get_html());
            self.add_button("save","保存");
            self.add_button("cancel","取消");

            self.bind_button("save","click",self.save);
            self.bind_button("cancel","click",self.close);
         });


      });
   };

});

