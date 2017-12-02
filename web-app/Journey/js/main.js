window.onload = function() {
	var mailParameter = GetURLParameter('mail');
	if (mailParameter == "sent") {
		alert('Message sent! I will respond as fast as possible.');
	}
	if (mailParameter == "error") {
		alert('An Error occurred. Please try later again!');
	}
}

function validateForm() {
	var fname = document.forms["contact-form"]["name"].value;
	var fmail = document.forms["contact-form"]["email"].value;
	var fsubject = document.forms["contact-form"]["subject"].value;
	var fmessage = document.forms["contact-form"]["message"].value;

	if (fname == null || fname == "" || fmail == null || fmail == "" || fsubject == null || fsubject == "" || fsubject.length < 3 || fmessage == null || fmessage == "" || fmessage.length < 10) {
		document.getElementById("incomplete-form-alert").style.display = "block";
		return false;
	}
}

// fetch URL parameters using jQuery
function GetURLParameter(parameter) {
	var pageURL = window.location.search.substring(1);
	var urlVariables = pageURL.split('&');
	for (var i = 0; i < urlVariables.length; i++)
	{
		var parameterName = urlVariables[i].split('=');
		if (parameterName[0] == parameter)
		{
			return parameterName[1];
		}
	}
}

function showModalFor(element) {
	var parent = element.parentNode;
	var content = $("#" + parent.id + ":not(.mobile-link)").first().clone();
	var contentURL = $("#" + parent.id + " a").attr("href");

	$('#projectModal a.btn').attr('href', contentURL)
	$('#projectModal .modal-body').html(content);
	$('#projectModal').modal('toggle');
}
