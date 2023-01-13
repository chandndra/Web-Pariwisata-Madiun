function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

function ApiCorona(){
	$.ajax({
		url: "https://covid19.mathdro.id/api/countries/indonesia/confirmed",
	    success: function(res) {
	        $("#positif").text(formatNumber(res[0].confirmed))
	        $("#recovered").text(formatNumber(res[0].recovered))
	        $("#dead").text(formatNumber(res[0].deaths))
	        $("#active").text(formatNumber(res[0].active))
	    }
	})
}

function ApiInstagram(){
	$.ajax({
		url: "https://v1.nocodeapi.com/apitest1414/instagram/hfDFJjlXpdYWnwJk?limit=9",
	    success: function(res) {
	    	for(var i=0; i < res.data.length; i++){
				var ig = res.data[i];
				var div = $('<div class="col-sm-4 col-4" style="padding: 0px;"></div>'); 
				
				var tag = "";
				tag += "<abbr title='"+ ig.caption +"'><a href='"+ ig.permalink +"' target='_blank'><img src='"+ ig.media_url +"' width='100%' height='100%'></a></abbr>";
				let su = $('#media-ig').append(div.html(tag));
			}   	
	    }
	})
}


$(document).ready(function(){
	ApiCorona();
	ApiInstagram();
	ApiTrip();
})

var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("empCode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}