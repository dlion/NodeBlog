Pannello = function(){};

Pannello.prototype.getPages = function(){
	$.getJSON('/.json', function(data){
		console.log(data[0].titolo);
		var resp = "<table><tr><td>Titolo</td><td>Modifica</td><td>Rimuovi</td></tr>";
		
		for (var i = 0 ; i < data.length; i++) {
			resp += "<tr>"+
				"<td>"+data[i].titolo+"</td>"+
				"<td>"+
				" <button onclick='"+
				"	javascipt:p.modifica(\'"+data[i].id+"\')'>"+
				"	Modifica</button>"+
				"</td>"+
				"<td>"+
				"	<button onclick='"+
				"	javascipt:p.rimuovi(\'"+data[i].id+"\')'>"+
				"	Modifica</button>"+
				"</td></tr>";	
		}
		resp += "<td>"+
				"	<button onclick=location.href='./dashboard/new'>"+
				"	Aggiungi articolo</button>"+
				"</td></tr>";	

		$("#content").html(resp);
	});
};

Pannello.prototype.modifica = function(id){

}


//this is the implementation
var p = new Pannello();

$(document).ready(function(){
	p.getPages();
});