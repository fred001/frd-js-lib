(function($) {
   // Code goes here

   $.fn.extend({
      get2:function(data_id){

         var element=this.find("[data-id="+data_id+"]");

         if(element.length == 0)
         {
            throw "data-id="+data_id+" not exists";
         }

         return $(element[0]); //return first
      },

/*
      add_tds:function()
      {
         for(var k in arguments)
         {
            var row=data[k];

            var html='<tr data-id="'+row['id']+'">'
            +'<th>'+row['domain']+'</th><td>'+row['username']+'</td><td>'+row['password']+'</td><td>'+row['comment']+'</    td>'
            +'</tr>';

            tbody.append(html);
         }
      }
      */



   });

})(jQuery);

