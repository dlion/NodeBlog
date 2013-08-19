var Pannello = function() {};

/***
 * Questa funzione cancella i post
 */
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

/***
 * Questa funzione gestisce la creazione dei post
 */
Pannello.prototype.create = function(){
	var _titolo 			= $("#titolo").val();
	var _testo  			= $("#testo").val();
	var _categoria_id	= $("#categoria_id").val();
	$.post('/articolo/',
		{
			titolo: 	  _titolo,
			testo:  	  _testo,
			categoria_id: _categoria_id
		}, 
		function (res) {
			alert("Articolo inserito correttamente");
		});
}

/***
 * Questa funzione gestisce la creazione dei post
 */
Pannello.prototype.modify = function(){
	var _titolo 			= $("#titolo").val();
	var _testo  			= $("#testo").val();
	var _categoria_id		= $("#categoria_id").val();
	var _id 				= $("#id").val();

	$.ajax({
		url: '/articolo/'+_id,
		type: 'PUT',
		data: {
			titolo: 	  _titolo,
			testo:  	  _testo,
			categoria_id: _categoria_id,
			id: 		  _id
		}, 
		success: function (res) {
			alert("Articolo modificato correttamente");
		}
	});
};


//gestisce la parte 

var p = new Pannello();

$(document).ready(function () {
	$('.delete').click(function(){
		p.del($(this).attr('rel'));
	});
	$('#create').click(function(){
		p.create();
	});
	$('#modify').click(function(){
		p.modify();
	});
});