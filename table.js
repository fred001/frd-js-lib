//bind event on result
var Table=extend(Class,function(self){

   self.table=null;
   self.trs=null;
   self.tr_choosed=null;

   self.run=function(table){
      self.table=table;
      if(self.table.length == 0)
      {
         alert('empty selector: '+selector); 
      }

      self.trs=self.table.find("tbody").find("tr");

      self.bind_event();
   };

   self.active_tr=function(tr) {
      tr.addClass("active");
   };

   self.unactive_tr=function(tr){
      tr.removeClass("active");
   };

   self.highlight_tr=function(tr) {
      tr.addClass("info");
   };

   self.unhighlight_tr=function(tr){
      tr.removeClass("info");
   };

   self.get_choosed_tr=function(){
      return self.trs.eq(self.choosed_tr_no);
   };

   self.bind_event=function(){

      self.trs.mouseover(function(){
         self.active_tr($(this));
      });

      self.trs.mouseout(function(){
         self.unactive_tr($(this));
      });

      self.trs.click(function(){
         var tr=$(this);
         var tr_choosed=self.get_choosed();

         if(tr_choosed)
         {
            if(tr_choosed != tr)
            {
               self.unhighlight_tr(tr_choosed);
               self.highlight_tr(tr);
               self.set_choosed(tr)
            }
            else
            {
               self.unhighlight_tr(tr_choosed);
               self.set_choosed(null)
            }

         }
         else
         {
            self.highlight_tr(tr);
            self.set_choosed(tr)
         }
      });
   };


   self.set_choosed=function(tr){  self.tr_choosed=tr };
   self.get_choosed=function(){  return self.tr_choosed };

});

