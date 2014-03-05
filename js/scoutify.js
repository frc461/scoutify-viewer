function parse_file_new(data) {
	dragons = eval(data);

	$.map(dragons, function(dragon, i) {
		new_team(dragon.number, dragon.value, dragon.matches, dragon.name, dragon.placing);
	});
}

function expand_all() {
	console.log($(".accordion-toggle").each(function(e, t) {
		t.click();
		t.click();
		t.click();
	}));
}

function expand_and_draw_graphs() {
	console.log($(".accordion-toggle").each(function(e, t) {
		t.click();
		t.click();
		t.click();
	}));

	console.log($(".graph").each(function(e, t) {
		t.click();
	}));

	console.log($(".accordion-toggle").each(function(e, t){
		t.click();
	}));
}

function new_team(team_number, value, matches, name, rank) {
	var graph_score_array = [];
	var graph_value_array = [];
	var graph_score_count = 0;
	var graph_value_count = 0;

	var string = "<p></p>";
	string += "<div class='panel panel-default'>";
	string += "<div class='panel-heading'><h4 class='panel-title'><a id=\"toggley-thing" + team_number + "\" class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#my-collapse" + team_number + "'>" + rank + ". Team " + team_number + ": " + name + "(value: " + value + ")" + "</a></h4></div>"
	string += "<div id='my-collapse" + team_number + "'class='panel-collapse collapse'> <div class='panel-body table-body' style='overflow:auto;'>"
	string += "<span><h1 class=\"team_num\">" + team_number + "</h1><div class=\"graph_div\"><div id='graph" + team_number+ "' class='graph'></div></div></span><br>"
//old	string += "<table class='table'><thead><tr id='erste" + team_number + "'><th>Team Number</th></tr></thead><tbody id='dritte" + team_number + "'><tr id='zweite" + team_number + "-0'><td>" + team_number + "</td></tr></tbody></table>"
	string += "<table class='table'>"
	string += "<thead>"
	string +=   "<tr id='erste" + team_number + "'>"
	string +=     "<th>Match</th>"
	string +=   "</tr>"
	string += "</thead>"
	string += "<tbody id='dritte" + team_number + "'>"
	string +=   "<tr id='mobility" + team_number + "'>"
	string +=     "<td>Mobility</td>"
	string +=   "</tr>"
	string +=   "<tr id='hot" + team_number + "'>"
	string +=     "<td>Hot?</td>"
	string +=   "</tr>"
	string +=   "<tr id='auto_shot" + team_number + "'>"
	string +=     "<td>Auton Shot</td>"
	string +=   "</tr>"
	string +=   "<tr id='high" + team_number + "'>"
	string +=     "<td>High</td>"
	string +=   "</tr>"
	string +=   "<tr id='low" + team_number + "'>"
	string +=     "<td>Low</td>"
	string +=   "</tr>"
	string +=   "<tr id='pass" + team_number + "'>"
	string +=     "<td>Passes</td>"
	string +=   "</tr>"
	string +=   "<tr id='recieve" + team_number + "'>"
	string +=     "<td>Recieve</td>"
	string +=   "</tr>"
	string +=   "<tr id='truss" + team_number + "'>"
	string +=     "<td>Truss</td>"
	string +=   "</tr>"
	string +=   "<tr id='catch" + team_number + "'>"
	string +=     "<td>Catch</td>"
	string +=   "</tr>"
	string +=   "<tr id='block" + team_number + "'>"
	string +=     "<td>Block</td>"
	string +=   "</tr>"
	string +=   "<tr id='value" + team_number + "'>"
	string +=     "<td>Value</td>"
	string +=   "</tr>"
	string +=   "<tr id='score" + team_number + "'>"
	string +=     "<td>Score</td>"
	string +=   "</tr>"
	string +=   "<tr id='notes" + team_number + "'>"
	string +=     "<td>notes</td>"
	string +=   "</tr>"
	string += "</tbody>"
	string += "</table>"
	string += "</div></div>"

	$("#accordion").append(string);
	// alert("#my-collapse" + team_number);

	$("#graph" + team_number).click(function() {
		$.jqplot('graph' + team_number, [graph_score_array, graph_value_array], { title: "Points Graph", axes: {xaxis: {min: 0}, yaxis: {min:0}}});
	});

	$.map(matches, function(match,match_number){

		$("#erste" + team_number).append("<th>" + match.round + "</th>");

		$("#mobility" + team_number).append("<td>" + (match.auto_mobility ? "yes" : "no") + "</td>");
		$("#hot" + team_number).append("<td>" + (match.auto_hot ? "yes" : "no") + "</td>");
		var shot;
		if(match.auto_shot == 0) shot = "Fail";
		else if(match.auto_shot == 1) shot = "High";
		else if(match.auto_shot == 2) shot = "Low";
		$("#auto_shot" + team_number).append("<td>" + shot + "</td>");
		$("#high" + team_number).append("<td>" + match.high_goals_scored + " / " + match.high_goals_attempted + "</td>");
		$("#low" + team_number).append("<td>" + match.low_goals_scored + " / " + match.low_goals_attempted + "</td>");
		$("#pass" + team_number).append("<td>" + match.passes_scored + " / " + match.passes_attempted + "</td>");
		$("#recieve" + team_number).append("<td>" + match.receives_scored + " / " + match.receives_attempted + "</td>");
		$("#truss" + team_number).append("<td>" + match.trusses_scored + " / " + match.trusses_attempted + "</td>");
		$("#catch" + team_number).append("<td>" + match.catches_scored + " / " + match.catches_attempted + "</td>");
		$("#block" + team_number).append("<td>" + match.blocks_scored + " / " + match.blocks_attempted + "</td>");
		$("#value" + team_number).append("<td>" + match.value + "</td>");
		$("#score" + team_number).append("<td>" + match.score + "</td>");
		$("#notes" + team_number).append("<td>" + match.notes + "</td>");

		graph_value_array.push(match.value);
		graph_score_array.push(match.score);
	});
}


$(function() {
	var bg = document.getElementById("fml");

	bg.addEventListener("dragenter", dragenter, false);
	bg.addEventListener("dragover", dragover, false);
	bg.addEventListener("drop", handleFileSelect, false);
});

function dragenter(e) {
	e.stopPropagation();
	e.preventDefault();
}

function dragover(e) {
	e.stopPropagation();
	e.preventDefault();
}

function abortRead() {
	reader.abort();
}

function errorHandler(evt) {
	switch(evt.target.error.code) {
	case evt.target.error.NOT_FOUND_ERR:
		alert("File Not Found!");
		break;
	case evt.target.error.NOT_READABLE_ERR:
		alert("File is not readable");
		break;
	case evt.target.error.ABORT_ERR:
		break; // noop
	default:
		alert("An error occurred while in the process of reading this file.");
	};
}

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var dt = evt.dataTransfer;
	var files = dt.files;
	var numFiles = files.length;
	var output;

	for(var i = 0, numFiles = files.length; i < numFiles; i++) {
		var file = files[i];
		var reader;

		output = file;

		reader = new FileReader();
		reader.onerror = errorHandler;
		reader.onabort = function(e) {};

		reader.onload = function(e) {
			parse_file_new(this.result);
		}

		reader.readAsText(file);
	}
}
