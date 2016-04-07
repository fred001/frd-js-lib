GLOBAL_BASEURL="/";

/*** Ajax ***/
function request(request_url,params,callback)
{

   var params=params||{};

   $.ajax({
      type:'GET',
      url:request_url,
      data:params,
      dataType:"json",
      success:function(response){


         if(response.error == 1)
         {
            error(response.error_msg);
         }
         else
         {
            if(callback) callback(response);
         }

      },

      error:function(response){

         error(response);
      }

   });
   //if failed
   //
   //callback
   //if error
   //if success

}

function request_post(request_url,params,callback)
{
   var params=params||{};

   $.ajax({
      type:'POST',
      url:request_url,
      data:params,
      dataType:"json",
      success:function(response){


         if(response.error == 1)
         {
            error(response.error_msg);
         }
         else
         {
            if(callback) callback(response);
         }

      },

      error:function(response){

         error(response);
      }

   });
   //if failed
   //
   //callback
   //if error
   //if success

}



function error(data)
{
   if(data)
   {
      alert(data);
   }
   else
   {
      alert('unknown error');
   }

   console.log("Error");
   console.log(data);
}

/*** Template ***/

function load_template(name,params,callback)
{
   request(Page._url_template,params,function(response){

      Page._templates[name]=response.data;


      if(callback) callback(response);

   });
}

function get_template(name,params)
{

   if(Page._templates[name])
   {
      return Page._templates[name];
   }
   else
   {
      error("template not exists");
   }
}


function url(path,params)
{
   if(path != false)
   {
      path=trim(path,"/");
   }

   path=ENV['GLOBAL_BASEURL']+path;

   query=http_build_query(params);

   if(query == false)
   {
      return path;
   }
   else 
   {
      if(strpos(path,"?") !== false)
      {
         return path+"&"+query;
      }
      else
      {
         return path+"?"+query;
      }
   }
}
function get_evt_key(evt)
{
   return evt.key;
}

function reload_page()
{
   location.reload();
}

function today()
{
   var date=new Date();
   var day=substr("00"+date.getDate(),-2);

   var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day;

   return today;
}

function format_date(date,format)
{
   if(!format) format="%Y-%m-%d";

   var day=substr("00"+date.getDate(),-2);
   var month=substr("00"+(date.getMonth()+1),-2);
   var year=date.getFullYear();

    var str=format.replace("%Y",year);
    str=str.replace("%m",month);
    str=str.replace("%d",day);

   return str;
}


function today_day()
{
   var date=new Date();
   var day=substr("00"+date.getDate(),-2);

   return day;
}

function Html(tag,attrs,text)
{
   var attr_str='';

   // if is_array(attrs)
   if(typeof attrs == 'object' )
   {
      for(var i in attrs)
      {
         attr_str+=' '+i+'='+'"'+attrs[i]+'"';
      }
   }

   if(text)
   {
      //'<{tag} {attr_str}>{text}</{tag}>';
      var html='<'+tag+' '+attr_str+'>'+text+'</'+tag+'>';
   }
   else
   {
      var html='<'+tag+' '+attr_str+'/>';
   }

   return html;
}



function call_api(api_name,params,callback)
{
   params['_name']=api_name;
   request_post(url("api"),params,callback);
}


function pagination(pagination)
{
   var total=pagination['total'];
   var pagecount=pagination['pagecount'];
   var page=pagination['page'];
   var baseurl=pagination['baseurl'];



  var page_total=Math.ceil(total/pagecount);

  if(page > page_total ) page=page_total;
  if(page < 1 ) page=1;

  var i,x=2; 

  var pages=[];


  for(i=page-x; i< (page+x+1) ; i++)
  {
        if( i > 0 && i <= page_total)
        {
              pages.push(i);
        }
  }


  var html='<div class="row">'
    +'<ul class="pagination">'
    +'<li>'
    +'<a data-page="1" href="'+baseurl+'?page=1" aria-label="First">'
    +'<span aria-hidden="true">&laquo;</span>'
    +'</a>'
    +'</li>';

    for(var i=0;i<pages.length;i++)
    {
          var curpage=pages[i];

          if(page == curpage)
          {
                var classname="active";
          }
          else
          {
                var classname="";
          }

          html+='<li class="'+classname+'"><a data-page="'+curpage+'" href="'+baseurl+'?page='+curpage+'">'+curpage+'</a></li>';
    }


    html+='<li>'
    +'<a data-page="'+page_total+'" href="'+baseurl+'?page='+page_total+'" aria-label="Last">'
    +'<span aria-hidden="true">&raquo;</span>'
    +'</a>'
    +'</li>';

    //html+='<li><a href="#" style="width:0px;border-top:none;border-bottom:none">&nbsp;</a></li>';
    html+='<li><a href="#" onclick="return false;" style="padding-top:2px;padding-bottom:2px;"><input data-id="jump-page" type="text" style="width:50px" value=""></a></li><li> <a data-page="jump">跳转</a>  </li>';


    html+='<li><a href="#" style="width:100px;border-top:none;border-bottom:none">&nbsp;</a></li>'
    +'<li><a href="#" >页数:'+page_total+'</a></li>'
    +'<li><a href="#" >项数:'+total+'</a></li>'

    html+='</ul>';

        


    html+='</nav>';
  return html;
}

//__ will replace  " "
function split(str)
{
   var arr=str.split(/ +/g)

   var new_arr=[];
   for(var i=0;i<arr.length;i++)
   {
      new_arr.push(arr[i].replace("__"," "));
   }


   return new_arr;
}


function parse_s_str(str)
{
   str=trim(str," ");
   if(str[0] == '(' && str[str.length-1] == ')')
   {
      str=str.substr(1,str.length-2);
      var arr=split(str);
      cmd=arr[0];
      arr.shift();

      var func_name="html_"+cmd;


      return call_user_func_array(func_name,arr);
   }
   else
   {
      //var arr=split(str);

      //return false;

      return str;
   }
}

//params:  url 
function html_img()
{
  var url=arguments[0];

  return '<img src="'+url+'" />';
}

function html_b()
{
   var str=arguments[0];
   return  '<b>'+str+'</b>';
}

function richtext_convert_text(str)
{
   if(!str) return str;
   //需要转换 标题，粗体，列表，图片
   var arr=str.split(/(.*)/g);
   for(var i=0;i<arr.length;i++)
   {
      arr[i]=nl2br(parse_s_str(arr[i]));
   }

   return arr.join("");
}


function page_render_pagination(pagination_data)
{
   if(pagination_data['total'] > pagination_data['pagecount'])
   {
      pagination_data['baseurl']=url('account');
      var html=pagination(pagination_data);

      $("body").get2("pagination").html(html);


      $("body").get2("pagination").find("a").click(function(){

         page=$(this).attr("data-page");
         if(page == 'jump')
         {
            var jump_page=$("body").get2("pagination").get2("jump-page").val();

            if(jump_page)
            {
               page=parseInt(jump_page);
               page_reload();
            }

         }
         else if(page)
         {
            page_list();
         }

         return false;
      });


      $("body").get2("pagination").get2("jump-page").keyup(function(evt){

         if(get_evt_key(evt) == "Enter")
         {
            var jump_page=$("body").get2("pagination").get2("jump-page").val();

            if(jump_page)
            {
               page=parseInt(jump_page);
               page_reload();
            }
         }


      });
   }
   else
   {
      $("body").get2("pagination").html('');
   }

}

function page_reload()
{
   page_list();
}
