var Dashboard = function() {};


//
// Questa funzione gestisce la creazione dei post
//

Dashboard.prototype.create = function(){
	var _titolo = $("#titolo").val(),
        _testo  = $("#testo").val(),
        _tag = $("#tag").val();
    //
    //Add an article
	//

    $.post('/articolo/new', {
        titolo: _titolo,
		testo:  _testo,
		tag: _tag
    }, function(res) {
        alert(res);
        window.location.replace("/dashboard");
    });
};

//
// Questa funzione gestisce la modifica dei post
//

Dashboard.prototype.modify = function(){
	var _titolo = $("#titolo").val(),
        _testo = $("#testo").val(),
        _tag = $("#tag").val(),
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
            tag:          _tag,
			id: 		  _post_id
		}, success: function (res) {
			alert(res);
            window.location.replace("/dashboard");
		}
	});
};

Dashboard.prototype.del = function(id) {
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

var d = new Dashboard();

$(document).ready(function () {

    $('#create').click(function(){
		d.create();
	});

    $('#modify').click(function(){
		d.modify();
    });

	$('.delete').click(function(){
		d.del($(this).attr('rel'));
	});
});
