var reader;
var output;
let deBegin = `<p class=MsoNormal>De-begin</p>`;
let deEnd = `<p class=MsoNormal>De-end</p>`;
let daBegin = `<p class=MsoNormal>Da-begin</p>`;
let daEnd = `<p class=MsoNormal>Da-end</p>`;
let listIdDeDa = [];
var json = [];
let fileNameUploaded = '';
let fileNameDocUploaded = '';

function checkFileAPI() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		console.log('success');
		reader = new FileReader();
		return true;
	} else {
		alert('The File APIs are not fully supported by your browser. Fallback required.');
		return false;
	}
}

function readText(filePath) {
	output = ""; //placeholder for text output
	if (filePath.files && filePath.files[0]) {
		fileNameUploaded = filePath.files[0].name.split('.')[0];
		reader.onload = function (e) {
			output = e.target.result;
			convert(output);
		};//end onload()
		reader.readAsText(filePath.files[0]);
	} else { //this is where you could fallback to Java Applet, Flash or similar
		return false;
	}
	return true;
}

function uploadDocFile(filePath) {
	if (filePath.files && filePath.files[0]) {
		fileNameDocUploaded = filePath.files[0].name.split('.')[0];
		let file = filePath.files[0];

		let formData = new FormData();
		formData.append(fileNameDocUploaded, file, file.name);

		jQuery.ajax({
			url: '/upload/photos',
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
			success: function (res) {
				alert('Upload Doc File Success!')
			}
		});
	}
}

function convert(output) {
	var content = output.replace(/\n+/g, ' ')
	// content = content.replace(/>\s*</g, '><');
	var exec1 = getIndices(content, deBegin);
	var exec2 = getIndices(content, deEnd);
	var exec3 = getIndices(content, daBegin);
	var exec4 = getIndices(content, daEnd);

	for (let i = 0; i < exec1.length; i++) {
		listIdDeDa.push(`cau${i + 1}-de`);
		listIdDeDa.push(`cau${i + 1}-da`);

		let tamDe = content.slice(exec1[i] + deBegin.length, exec2[i])
		document.getElementById('result').innerHTML += `
			<div id='cau${i + 1}-de'>
				${tamDe}
			</div>
		`
		let tamDa = content.slice(exec3[i] + deBegin.length, exec4[i])
		document.getElementById('result').innerHTML += `
			<div id='cau${i + 1}-da'>
				${tamDa}
			</div>
		`
	}
	change2Canvas();
}

// Func find all Index of String
function getIndices(haystack, needle) {
	var returns = [];
	var position = 0;
	while (haystack.indexOf(needle, position) > -1) {
		var index = haystack.indexOf(needle, position);
		returns.push(index);
		position = index + needle.length;
	}
	return returns;
}

// Func change html by DIV to Canvas and convert to Blob
function change2Canvas() {
	for (let item of listIdDeDa) {
		html2canvas(document.getElementById(item))
			.then(canvas => {
				changeCanvas2Blob(canvas, `${item}.png`);
			})
	}
}
// Convert canvas type to File type (Blob)
function changeCanvas2Blob(canvas, name) {

	let item = {
		canvas: null,
		blob: null
	};
	item.canvas = canvas;
	canvas.toBlob((blob) => {
		blob.lastModifiedDate = new Date();
		blob.name = name;
		item.blob = blob;
		json.push(item);
	}, "image/png");

}

function uploadImage() {
	var formData = new FormData();
	for (let item of json) {
		let file = item.blob;
		formData.append(fileNameUploaded, file, file.name);
	}

	jQuery.ajax({
		url: '/upload/photos',
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		success: function (res) {
			// alert('Upload Success!')
		}
	});
	$('#result').html(`
		<h2>Upload Images Success!</h2>
	`)
}
