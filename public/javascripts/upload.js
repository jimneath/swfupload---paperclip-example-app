/*
	SWFUpload Test
	--------------
	By Jim Neath
		http://jimneath.org
	Checkout the SWFUpload Docs for help
		http://demo.swfupload.org/Documentation/

*/

var Upload = {
	// The total number of files queued with SWFUpload
	files_queued: 0,
	
	/* 
	File Dialog Complete
	====================
	The fileDialogComplete event fires after the File Selection Dialog window has been 
	closed and all the selected files have been processed. The 'number of files queued' 
	argument indicates the number of files that were queued from the dialog selection 
	(as opposed to the number of files in the queue).
	
	If you want file uploading to begin automatically this is a good place to call 
	'this.startUpload()'
	*/
	file_dialog_complete: function(num_selected, num_queued)
	{
		if (num_queued > 0)
		{
			Upload.files_queued += num_queued;
			$('#upload').removeClass('disabled')
				.attr('disabled', '')
				.text('Upload ' + Upload.files_queued + ' Files');
		}
	},

	/* 
	File Queued
	====================
	The fileQueued event is fired for each file that is queued after the File Selection 
	Dialog window is closed.
	*/
	file_queued: function(file)
	{
		div = $('<div></div>').attr({ 'id': file.id, 'class': 'photo' });
		div.append($('<div></div>').attr('class', 'name').html(file.name.substring(0, 10) + '...'));
		div.append($('<div></div>').attr('class', 'status').html('pending'));
		div.append($('<div></div>').attr('class', 'progress').append($('<div></div>')));
		$('#images').prepend(div);
	},

	/* 
	Upload Start
	====================
	uploadStart is called immediately before the file is uploaded. This event provides an 
	oppurtunity to perform any last minute validation, add post params or do any other work 
	before the file is uploaded.

	The upload can be cancelled by returning 'false' from uploadStart. If you return 'true' 
	or do not return any value then the upload proceeds. Returning 'false' will cause an 
	uploadError event to fired.
	*/
	upload_start: function(file)
	{
		$('#' + file.id + ' div.status').html('Uploading...');
	},
	
	/* 
	Upload Progress
	====================
	The uploadProgress event is fired periodically by the Flash Control. This event is useful 
	for providing UI updates on the page.
	
	Note: The Linux Flash Player fires a single uploadProgress event after the entire file has 
	been uploaded. This is a bug in the Linux Flash Player that we cannot work around.
	*/
	upload_progress: function(file, bytes, total)
	{
		percent = Math.ceil((bytes / total) * 100);
		$('#' + file.id + ' div.progress div').width(percent + '%');
	},
	
	/* 
	Upload Error
	====================
	The uploadError event is fired any time an upload is interrupted or does not complete 
	successfully. The error code parameter indicates the type of error that occurred. The error 
	code parameter specifies a constant in SWFUpload.UPLOAD_ERROR.

	Stopping, Cancelling or returning 'false' from uploadStart will cause uploadError to fire. 
	Upload error will not fire for files that are cancelled but still waiting in the queue.
	*/
	upload_error: function(file, code, message)
	{
		// Just a test error message
		alert('MASSIVE ERROR!!!1');
	},
	
	/* 
	Upload Success
	====================
	uploadSuccess is fired when an upload completes and the server returns a HTTP 200 status code. 
	Any data outputted by the server is available in the server data parameter (Flash Player 9 
	version only).
	
	At this point the upload is not yet complete. Another upload cannot be started from 
	uploadSuccess.
	*/
	upload_success: function(file, data)
	{
		$('#' + file.id).html($(data).html());
	},

	/* 
	Upload Complete
	====================
	uploadComplete is always fired at the end of an upload cycle (after uploadError or uploadSuccess). 
	At this point the upload is complete and another upload can be started.
	
	If you want the next upload to start automatically this is a good place to call this.uploadStart(). 
	Use caution calling uploadStart inside the uploadComplete event if you are trying to cancel all the 
	uploads in a queue.
	*/
	upload_complete: function(file)
	{
		Upload.files_queued -= 1;
		
		if (Upload.files_queued == 0)
		{
			$('#upload').addClass('disabled')
				.attr('disabled', 'true')
				.text('Upload 0 Files');
		}
		
		// Start Next Upload
		swfu.startUpload();
	},
	
	/* ============================================
	The methods below are not used in this example.
	They are here for sake of completeness.
	=============================================*/

	/* 
	Flash Ready
	====================
	flashReady is an internal event that should not be overwritten. It is called by the Flash Control 
	to notify SWFUpload that the Flash movie has loaded and is ready to accept commands.
	*/
	flash_ready: function() {},
	
	/* 
	SWF Upload Loaded
	====================
	The swfUploadLoaded event is fired by flashReady. It is overridable. When swfUploadLoaded is called 
	it is safe to call SWFUpload methods.
	*/
	swf_upload_loaded: function() {},
	
	/* 
	File Dialog Start
	====================
	fileDialogStart is fired after selectFile for selectFiles is called. This event is fired immediately 
	before the File Selection Dialog window is displayed. However, the event may not execute until after 
	the Dialog window is closed.
	*/
	file_dialog_start: function() {},
	
	/* 
	File Queue Error
	====================
	The fileQueueError event is fired for each file that was not queued after the File Selection Dialog 
	window is closed. A file may not not be queued for several reasons such as, the file exceeds the file 
	size, the file is empty or a file or queue limit has been exceeded.

	The reason for the queue error is specified by the error code parameter. The error code corresponds to 
	SWFUpload.QUEUE_ERROR contant.
	*/
	file_queue_error: function(file, error_code, message) {},
	
	/* 
	Debug
	====================
	The debug event is called by the SWFUpload library and the Flash Control when the debug setting is set 
	to 'true'. If the debug event is not overridden then SWFUpload writes debug messages to the SWFUpload 
	console (a text box dynamically added to the end of the page body).
	*/
	debug: function(message) {}
}