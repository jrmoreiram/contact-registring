$(function () {
 
	$( "#inputEmail" ).blur(function() {
		ValidateEmail($(this).val(), false);
	
	});
	
	$( "#inputCpf" ).blur(function() {
		ValidateCpf(this.value, false);
	});
		
	$( "#btClear" ).click(function() {
		ClearFields();
    });
	
	$('#contactRecord').submit(function( event ){
			
			if($("#inputName").val() == ""){
				   alert("Preencha o campo Nome!");
				   $( "#inputName" ).focus();
				   
			   }else if($("#inputEmail").val() == ""){
				   alert("Preencha o campo Email!");
				   $( "#inputEmail" ).focus();
				   
			   }else if($("#inputBirthDate").val() == ""){
				   alert("Preencha o campo Data Nascimento!");
				   $( "#inputBirthDate" ).focus();
				   
			   }else if($("#inputCpf").val() == ""){
				   alert("Preencha o campo CPF!");
				   $( "#inputCpf" ).focus();
				   
			   }else{
				   
				if(ValidateEmail($("#inputEmail").val(), false)){
					
					if(ValidateCpf($("#inputCpf").val(), false)){
						
						var $this = $( this );
						
						var tr = '<tr>'+
						'<td>'+ "<input id='btDelete' class='btn btn-dark' type='button' value='Excluir' onclick='DeleteRow(this.parentNode.parentNode.rowIndex);'>" +'</td>'+
						'<td>'+$this.find("input[name='name']").val()+'</td>'+
						'<td>'+$this.find("input[name='email']").val()+'</td>'+
						'<td>'+$this.find("input[name='birthdate']").val()+'</td>'+
						'<td>'+$this.find("input[name='cpf']").val()+'</td>'+
						'<td>'+$this.find("input[name='city']").val()+'</td>'+
						'<td>'+$this.find("select[name='coutry'] option:selected").text()+'</td>'+
						'<td>'+$this.find("textarea[name='endereco']").val()+'</td>'+
						'</tr>'
						$('#grid').find('tbody').append( tr );
					
						ClearFields();
						EditRow();
				
						return false;
					}
				}
			}
		
			return false;
	});
});

function EditRow(){
	
	$("td").dblclick(function () {
        var conteudoOriginal = $(this).text();
         
        $(this).addClass("celulaEmEdicao");
        $(this).html("<input type='text' value='" + conteudoOriginal + "' />");
        $(this).children().first().focus();
 
        $(this).children().first().keypress(function (e) {
            if (e.which == 13) {
				e.preventDefault();
				var novoConteudoFormatted = $(this).val();
				var novoConteudo = novoConteudoFormatted.replace(".", "").replace(".", "").replace("-", "");
				
				if(isNumber(novoConteudo, true)){
					if(ValidateCpf(novoConteudoFormatted, true)){
						$(this).parent().text(novoConteudoFormatted);
						$(this).parent().removeClass("celulaEmEdicao");
					}
				}else{
					if(ValidateEmail(novoConteudoFormatted, true)){
						$(this).parent().text(novoConteudoFormatted);
						$(this).parent().removeClass("celulaEmEdicao");
					}
				}
		    }
        });
         
		$(this).children().first().blur(function(){
			$(this).parent().text(conteudoOriginal);
			$(this).parent().removeClass("celulaEmEdicao");
		});
	});
}
  

function DeleteRow(row){

    var r = confirm("Deseja realmente exluir este contato?");
    if (r == true) {
       document.getElementById("grid").deleteRow(row);
    } else {
       return false;
    }
}

function ClearFields(){
	$("#inputName").val("");
	$("#inputEmail").val("");
	$("#inputCpf").val("");
	$("#inputCity").val("");
	$("#txtEndereco").val("");
	$("#inputBirthDate").val("");
	$('#selectCoutry').val("Vazio");
}

function ValidateCpf(cpfValue, isEdition){
	
		   cpfFormattedValue = cpfValue;
		   erro = new String;
		   cpfValue = cpfValue.replace('.', '');	
		   cpfValue = cpfValue.replace('.', ''); 
		   cpfValue = cpfValue.replace('-', ''); 	
		   
			if (cpfValue.length == 11)
			{	
					var nonNumbers = /\D/;
			
					if (nonNumbers.test(cpfValue)) 
					{
						erro = "A verificacao de CPF suporta apenas números!";
					}
					else
					{
							if (cpfValue == "00000000000" || 
								cpfValue == "11111111111" || 
								cpfValue == "22222222222" || 
								cpfValue == "33333333333" || 
								cpfValue == "44444444444" || 
								cpfValue == "55555555555" || 
								cpfValue == "66666666666" || 
								cpfValue == "77777777777" || 
								cpfValue == "88888888888" || 
								cpfValue == "99999999999") {
									
								erro = "Número de CPF inválido!"
							}
			
							var a = [];
							var b = new Number;
							var c = 11;
		 
							for (i=0; i<11; i++){
									a[i] = cpfValue.charAt(i);
									if (i < 9) b += (a[i] * --c);
							}
			
							if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
							b = 0;
							c = 11;
			
							for (y=0; y<10; y++) b += (a[y] * c--); 
			
							if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
			
							if ((cpfValue.charAt(9) != a[9]) || (cpfValue.charAt(10) != a[10])) {
								
								erro = "Número de CPF inválido!";
							}
					}
			}
			else
			{
				if(cpfValue.length == 0)
					return false
				else
					erro = "Número de CPF inválido!";
			}
			if (erro.length > 0) {
				alert(erro);
				
				if(!isEdition){
					$( "#inputCpf" ).css({
					"border": "1px solid red",
					});
				}
				
				return false;
			}
			
			if(!isEdition){
				$( "#inputCpf" ).css({
				"border": "1px solid #CED4DA",
				});
		
				$("#inputCpf").val(cpfFormattedValue); 	
			}			
			
			return true;	
}

function ValidateEmail(emailValue, isEdition){
	
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
	{
		$( "#inputEmail" ).css({
			"border": "1px solid #CED4DA",
		});
		
		return true
		
	}else if(emailValue != ""){		
		alert("Você digitou um endereço de e-mail inválido!")
		
		if(!isEdition){
			$( "#inputEmail" ).css({
			"border": "1px solid red",
			});	
		}
		
		return false
	}
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/* 

OLD ROOT PURE JAVSCRIPT.

function validaCPF(cpf) 
{
   cpfFormatted = cpf.value;
   erro = new String;
   cpf.value = cpf.value.replace('.', '');	
   cpf.value = cpf.value.replace('.', ''); 
   cpf.value = cpf.value.replace('-', ''); 	
   
	if (cpf.value.length == 11)
 	{	
 			var nonNumbers = /\D/;
 	
 			if (nonNumbers.test(cpf.value)) 
 			{
 					erro = "A verificacao de CPF suporta apenas números!";
					document.getElementById("inputCpf").value = "";	
 			}
 			else
 			{
 					if (cpf.value == "00000000000" || 
 							cpf.value == "11111111111" || 
 							cpf.value == "22222222222" || 
 							cpf.value == "33333333333" || 
 							cpf.value == "44444444444" || 
 							cpf.value == "55555555555" || 
 							cpf.value == "66666666666" || 
 							cpf.value == "77777777777" || 
 							cpf.value == "88888888888" || 
 							cpf.value == "99999999999") {
 							
							document.getElementById("inputCpf").value = "";
 							erro = "Número de CPF inválido!"
					}
 	
 					var a = [];
 					var b = new Number;
 					var c = 11;
 
 					for (i=0; i<11; i++){
 							a[i] = cpf.value.charAt(i);
 							if (i < 9) b += (a[i] * --c);
 					}
 	
 					if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
 					b = 0;
 					c = 11;
 	
 					for (y=0; y<10; y++) b += (a[y] * c--); 
 	
 					if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
 	
 					if ((cpf.value.charAt(9) != a[9]) || (cpf.value.charAt(10) != a[10])) {
						document.getElementById("inputCpf").value = "";
 						erro = "Número de CPF inválido!";
					}
 			}
 	}
 	else
 	{
 		if(cpf.value.length == 0)
 			return false
 		else
			document.getElementById("inputCpf").value = "";
 			erro = "Número de CPF inválido!";
	}
 	if (erro.length > 0) {
 			alert(erro);
 			
 			return false;
 	}
	
	document.getElementById("inputCpf").value = cpfFormatted; 	
 	return true;	
 }
 
function limparCampos() 
{
	document.getElementById("inputName").value = "";
	document.getElementById("inputEmail").value = "";
	document.getElementById("inputCpf").value = "";
	document.getElementById("inputCity").value = "";
	document.getElementById("txtEndereco").value = "";
	document.getElementById("birthDate").value = "";
}

function AddData() {
	if(document.getElementById("inputName").value == ""){
			   alert("Preencha o campo Nome!");
			   
		   }else if(document.getElementById("inputEmail").value == ""){
			   alert("Preencha o campo Email!");
			   
		   }else if(document.getElementById("birthDate").value == ""){
			   alert("Preencha o campo Data Nascimento!");
			   
		   }else if(document.getElementById("inputCpf").value == ""){
			   alert("Preencha o campo CPF!");
			   
		   }else{
			   
		   var rows = "";
			var name = document.getElementById("inputName").value;
			var email = document.getElementById("inputEmail").value;
			var cpf = document.getElementById("inputCpf").value;
			var city = document.getElementById("inputCity").value;
			var endereco = document.getElementById("txtEndereco").value;
			var birthDate = document.getElementById("birthDate").value;
			var state = document.getElementById("selectState").value ;
			
			if(ValidateEmail(email)){
				rows += "<tr><td>" + "<input type='button' value='Editar' onclick='alterRow()'>" + "<input type='button' value='Excluir' onclick='deleteRow(this.parentNode.parentNode.rowIndex)'></td></tr>" + "<tr><td>" + name + "</td></tr><tr><td>" + email + "</td></tr><tr><td>" + birthDate + "</td></tr><tr><td>" + cpf + "</td></tr><tr><td>" + city + "</td></tr><tr><td>" + state + "</td></tr><tr><td>" + endereco +  "</td></tr>";
				
				var tbody = document.querySelector("tbody");
				var tr = document.createElement("tr");

				tr.innerHTML = rows;
				tbody.appendChild(tr)
			}
	   }
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("inputEmail").value))
  {
    return (true);
  }
    alert("Você digitou um endereço de e-mail inválido!");
    return (false);
}

function deleteRow(row){
    document.getElementById('myTable').deleteRow(row);
}


function alterRow() { 

var obj = $('#myTable tbody tr').map(function() {
var $row = $(this);
var t1 = $row.find(':nth-child(1)').text();
var t2 = $row.find(':nth-child(2)').text();
var t3 = $row.find(':nth-child(3)').text();
return {
    td_1: $row.find(':nth-child(1)').text(),
    td_2: $row.find(':nth-child(2)').text(),
    td_3: $row.find(':nth-child(3)').text()
   };
}).get();

alert(obj);
}
*/
