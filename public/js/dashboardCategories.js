var Dashboard = function() {};


//
// This function allows to create categories
//

Dashboard.prototype.create = function(){
	var _title = $("#title").val(),
        _descr  = $("#descr").val();
    //
    //Add an article
	//
    
    $.post('/cat/new', {
        title: _title,
		descr:  _descr,
    }, function(res) {
        alert(res);
        window.location.replace("/dashboard/cat");
    });
};

//
// This function allows to modify categories
//

Dashboard.prototype.modify = function(){
	var _title = $("#title").val(),
        _descr = $("#descr").val(),
        _cat_id = $("#cat_id").val();

    //
    // Modify a category
    //

	$.ajax({
        url: '/cat/'+_cat_id,
		type: 'PUT',
        data: {
			title: 	_title,
			descr:  _descr
		}, success: function (res) {
			alert(res);
            window.location.replace("/dashboard/cat");
		}
	});
};

//
// This function allows you to delete categories

Dashboard.prototype.del = function(id) {
	$.ajax({
    	url: '/cat/'+id,
    	type: 'DELETE',
    	success: function(result) {
        	alert(result);
            window.location.replace("/dashboard/cat");
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
