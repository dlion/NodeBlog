var Pannello = function() {};

Pannello.prototype.del = function(id) {
	$.ajax({
    	url: '/articolo/'+id,
    	type: 'DELETE',
    	success: function(result) {
        	alert("Articolo rimosso con successo");
        	document.location.reload(true);
    	}
	});
};

var p = new Pannello();

$(document).ready(function () {
	$('.delete').click(function(){
		p.del($(this).attr('rel'));
	});
});