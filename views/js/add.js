$(function(){
    
    $('#addForm').submit( function(e){
        e.preventDefault();
        var action = $(this).attr( "action" );
        var method = $(this).attr("method");
        var data = $(this).serialize();
        $.ajax({
            method: method,
            url: action,
            data: data,
            success: function(data){
                alert("soy la monda");
            }
          });
    });
})
