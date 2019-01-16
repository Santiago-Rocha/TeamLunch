$(function(){
    
    $('#whoForm').submit( function(e){
        e.preventDefault();
        var action = $(this).attr( "action" );
        var method = $(this).attr("method");
        var data = $(this).serialize();
        $.ajax({
            method: method,
            url: action,
            data: data,
            success: function(data){
                console.log(data);
                var text = $("#turn").text().replace("...",data[0].docs[0].name+" "+data[0].docs[0].last_name)
                $("#turn").text(text)
            }
          });
    });
})
