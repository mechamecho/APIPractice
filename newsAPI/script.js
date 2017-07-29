/*global $*/
/*global $document*/
/*global $ajax*/
//workaround for when you put your script tag in the html head
//document is the DOM
$(document).ready(function(){
    var url="https://newsapi.org/v1/sources";
    //language and country are the parameters for the request, found in the documentation
    var data={language:"en", country:"us"};
    //var id=blank;
    $.ajax({
        url:url,
        data:data,
        type:"GET",
        success:function(response){
            // console.log(response);
            // console.log(response.sources[2]);
            var sources=response.sources;
            // console.log(sources[2]);
            var html="<select class='form-control' id='sourceOption'>";
            $.each(sources, function(index,source){
                // console.log(source);
                //will not be a problem with scope, because this will be aquired when the form is submitted, which 
                //automatically make the second ajax call
                html += "<option value='"+source.id+"'>"+source.name+"</option>";
            })
            html+= "</select>";
            // console.log(html);
            $(".form-group").html(html);
        }
    })
    //submit button
    //$('select').val()
    //$("./#/name") targetting in jquery
    $("#source").submit(function(event){
        //to prevent the page from reloading on submission, which it usually does, native javascript api method
        event.preventDefault();
        var id = $("#sourceOption").val();
        var url=" https://newsapi.org/v1/articles";
        var data={apiKey:"d588f533b2f04010b0fc0b7666e9da7b", source:id};
        $.ajax({
            url:url,
            data:data,
            type:"GET",
            //you only name a function if you are calling it more than once, otherwise you will be wasting memory
            //it will refresh the articles because the content of the html variable will change depending on the new 
            //response it gets from the api when the form is re-submitted
            success:function(response){
                // console.log(response);
                var articles=response.articles;
                var html="<ul class='list-group'>";
                //if we only put article, then article will be the index number, the first parameter will always be the index
                //regardless of what you name it
                $.each(articles, function(index, article){
                    html+="<li class='list-group-item'><a href='"+article.url+"'>"+article.title+"</li></a><article>"+article.description+"</article>"
                })
                html+="</ul>";
                $("#articles").html(html);
                
            }
        })
        
    })
});