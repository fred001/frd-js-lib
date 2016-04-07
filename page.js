/*** Page ***/
var Page={
   _templates:{},
   _url_template:"/index.php/template",


   _init_functions:[],

   add_init:function(func){
      this._init_functions.push(func);
   },

   init:function(){
      for(var k in this._init_functions)
      {
         var func=this._init_functions[k];
         func();
      }

      this._init_functions=[];
   },

};


Page._templates['dialog']=''
  +'<div style="width:300px;position:fixed;top:200px">'
  +'<div class="modal-dialog" style="">'
  +'<div class="modal-content">'
  +'<div data-id="body" class="modal-body" style="text-align:center">'
  +'</div>'
  +'<div data-id="footer" class="modal-footer">'
  +'</div>'
  +'</div><!-- /.modal-content -->'
  +'</div><!-- /.modal-dialog -->'
  +'</div>';
