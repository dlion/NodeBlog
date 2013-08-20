var Pannello = function() {};


//
// Questa funzione gestisce la creazione dei post
//

Pannello.prototype.create = function(){
	var _titolo = $("#titolo").val(),
        _testo  = $("#testo").val(),
        _categoria_id = $("#categoria_id").val();
    //
    //Add an article
	//
    
    $.post('/articolo/new', {
        titolo: _titolo,
		testo:  _testo,
		categoria_id: _categoria_id
    }, function(res) {
        alert(res);
        window.location.replace("/dashboard");
    });
};

//
// Questa funzione gestisce la modifica dei post
//

Pannello.prototype.modify = function(){
	var _titolo = $("#titolo").val(),
        _testo = $("#testo").val(),
        _categoria_id = $("#categoria_id").val(),
        _post_id = $("#id_post").val();

    //
    // Modify an Article
    //

	$.ajax({
        url: '/articolo/'+_post_id,
		type: 'PUT',
        data: {
			titolo: 	  _titolo,
			testo:  	  _testo,
			categoria_id: _categoria_id,
			id: 		  _post_id
		}, success: function (res) {
			alert(res);
            window.location.replace("/dashboard");
		}
	});
};

Pannello.prototype.del = function(id) {
	$.ajax({
    	url: '/articolo/'+id,
    	type: 'DELETE',
    	success: function(result) {
        	alert(result);
            window.location.replace("/dashboard");
    	}
	});
};

//
// Events on pages
// 

var p = new Pannello();

$(document).ready(function () {
    
    $('#create').click(function(){
		p.create();
	});
	
    $('#modify').click(function(){
		p.modify();
    });
    
	$('.delete').click(function(){
		p.del($(this).attr('rel'));
	});
});
