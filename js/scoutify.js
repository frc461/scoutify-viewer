function new_team(team_number, dragons) {
    $("#accordion").append("<p></p><div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion'href='#collapse" + team_number + "'> Team " + team_number +"</a></h4></div><div id='collapse" + team_number + "'class='panel-collapse collapse'> <div class='panel-body'><table class='table table-striped'><thead><tr id='erste" + team_number + "'><th>Team Number</th></tr></thead><tbody><tr id='zweite"+ team_number +"'><td>" + team_number+"</td></tr></tbody></table></div></div>" );
    $.map(dragons, function(header,key) {
        $("#erste" + team_number).append("<th>" + key +"</th>");
	$("#zweite" + team_number).append("<td>" + header + "</th>");
    });
}


