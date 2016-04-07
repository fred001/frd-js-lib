var Template=extend(Class,function(self){

   self.vars=[];
   self.t="";

   self.init=function(name){

      self.t=TEMPLATES[name];
   };

   self.set_var=function(k,v){
      self.vars[k]=v;
   };

   self.get_vars=function(){
      return self.vars;

   };

   self.render=function(){
      var t=self.t;
      for(k in self.vars)
      {
         v=self.vars[k];
         k=k.toUpperCase();
         t=t.replace(k,v);
      }

      return t;
   };

});
