var reader;
var output;
let deBegin = `<p class=MsoNormal>De-begin</p>`;
let deEnd = `<p class=MsoNormal>De-end</p>`;
let daBegin = `<p class=MsoNormal>Da-begin</p>`;
let daEnd = `<p class=MsoNormal>Da-end</p>`;

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
		reader.onload = function (e) {
			output = e.target.result;
			convert(output);
			// console.log(output);
			// displayContents(output);
		};//end onload()
		reader.readAsText(filePath.files[0]);
	}//end if html5 filelist support
	else if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
		try {
			reader = new ActiveXObject("Scripting.FileSystemObject");
			var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
			output = file.ReadAll(); //text contents of file
			file.Close(); //close file "input stream"
			console.log(output);
			// displayContents(output);
		} catch (e) {
			if (e.number == -2146827859) {
				alert('Unable to access local files due to browser security settings. ' +
					'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
					'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
			}
		}
	}
	else { //this is where you could fallback to Java Applet, Flash or similar
		return false;
	}
	return true;
}

function convert(output) {
	var content = output.replace(/\n+/g, ' ')
	// content = content.replace(/>\s*</g, '><');
	var exec1 = getIndices(content, deBegin);
	var exec2 = getIndices(content, deEnd);
	var exec3 = getIndices(content, daBegin);
	var exec4 = getIndices(content, daEnd);
	
	console.log(exec1);
	console.log(exec2);
	console.log(exec3);
	console.log(exec4);
	
	for(let i=0; i<exec1.length; i++) {
	    var html = content.slice(exec1[i]+deBegin.length, exec2[i]);
	    document.getElementById('de').innerHTML += html;
	}
	
	for(let i=0; i<exec3.length; i++) {
	    var html = content.slice(exec3[i]+daBegin.length, exec4[i]);
	    document.getElementById('da').innerHTML += html;
	}
}



function getIndices(haystack, needle){
	var returns = [];
	var position = 0;
	while(haystack.indexOf(needle, position) > -1){
		var index = haystack.indexOf(needle, position);
		returns.push(index);
		position = index + needle.length;
	}
	return returns;
}