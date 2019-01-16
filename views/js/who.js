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
                var text = data.length == 1  ? data[0].nick_name  : data[0].nick_name +" y "+data[1].nick_name;
                $("#turn").text("Hoy Calienta "+text);
            }
          });
    });
})
