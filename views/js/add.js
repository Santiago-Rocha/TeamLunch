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
                toastr.success('Accion Completa', 'Almuerzo registrado exitosamente')
            }
          });
    });

    var limit = 2;
    $("input[name='heater[]']").on('change', function(evt) {
       if($("input[name='heater[]']:checked").length > limit) {
           this.checked = false;
       }
    });
})
