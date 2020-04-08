$( document ).ready(function() {

	var ROW_NUM = 25;	// number of rows
	var COL_NUM = 50;	// number of cells in 1 row
	window.IS_CLICKED = false;
	window.IS_SELECTED = false;
	window.IS_START_SELECTED = false;
	window.IS_END_SELECTED = false;
	window.IS_SELECTING_START = false;
	window.IS_SELECTING_END = false;

	var elem_part1 = "<div class='row' id='r";
	var elem_part2 = "'></div>";
	var cell_part1 = "<div class='cell' id='c";
	var cell_part2 = "'></div>";

    for ( var i = 0; i < ROW_NUM; i++ ) {
    	$("#canvas").append(elem_part1 + "" + i + "" + elem_part2);
    	for( var j = 0; j < COL_NUM ; j++ ){
			$("#r" + i + "").append(cell_part1 + "" + i + "c" + j + "" + cell_part2);
    	}
    }

    $(document).mousedown(function(){
    	window.IS_CLICKED = true;
    });

    $(document).mouseup(function(){
    	window.IS_CLICKED = false;
    });

    function dragger(event,state){
		if(window.IS_CLICKED  || state == "down" ){
			if(state == "down"){	
				if(window.IS_SELECTING_START){
					$(event.target).addClass("start");
					window.IS_SELECTING_START = false;
					window.IS_START_SELECTED = true;
				}
				if(window.IS_SELECTING_END){
					$(event.target).addClass("end");
					window.IS_SELECTING_END = false;
					window.IS_END_SELECTED = true;
				}
				if(window.IS_START_SELECTED && window.IS_END_SELECTED)
					window.IS_SELECTED = true;
			}
			if( $(event.target).attr("class") == "cell" || $(event.target).attr("class") == "cell wall" ){
				$(event.target).toggleClass("wall");
			}
		}
    }

    $(".cell").each(function(){
    	$(this).mousedown(function(e){
    		dragger(e,"down");
    	});
    	$(this).mouseenter(function(e){
    		dragger(e,"enter");
    	});
    });

    $("#reset").click(function(){
		$(".cell").removeClass("wall");
		$(".cell").removeClass("start");
		$(".cell").removeClass("end");
		$(".cell").removeClass("visited");
		$(".cell").removeClass("path");
    });

    $("#clear").click(function(){
		$(".cell").removeClass("visited");
		$(".cell").removeClass("path");
    });

    $("#selectStart").click(function(){
		window.IS_SELECTING_START = true;
		$(".cell").removeClass("start");
    });

    $("#selectEnd").click(function(){
		window.IS_SELECTING_END = true;
		$(".cell").removeClass("end");
    });

    function getElement(elem,tblr){
    	var id = $(elem).attr("id"); 
    	id = id.slice(1);
    	var i = id.substr(0,id.indexOf('c'));
    	var j = id.substr(id.indexOf('c')+1);
    	switch(tblr)
    	{
    		case 't':return( $("#c" + ( i - 1 ) + "c" + j + "") );break;
    		case 'b':return( $("#c" + ( i - -1 ) + "c" + j + "") );break;
    		case 'l':return( $("#c" + i + "c" + ( j - 1 ) + "") );break;
    		case 'r':return( $("#c" + i + "c" + ( j - -1 ) + "") );break;
    	}    	
    }

    function bfs()
    {
    	if( window.found || window.arr.length == 0 ){
    		clearInterval(window.timer);
    		$("#start").prop("disabled",false);
	    	$("#clear").prop("disabled",false);
	    	$("#reset").prop("disabled",false);
	    	$("#selectStart").prop("disabled",false);
	    	$("#selectEnd").prop("disabled",false);
    		if(!window.found)
    		{
    			alert("No Path Found");
    			return;
    		}
			var currElem = "#" + $(window.endNode).attr("prev-elem");
			while( currElem != "#0" )
			{
				$(currElem).addClass("path");
				currElem = "#" + $(currElem).attr("prev-elem");
			}
			return;
    	}
    	var currElem = window.arr.shift();
					
		// top
		var top = getElement(currElem,"t");
		if($(top).hasClass("end"))
		{
			$(top).attr("prev-elem",$(currElem).attr("id"));
			window.found = true;
			return;
		}
		
		if( $(top).hasClass("cell") && !$(top).hasClass("wall") && !$(top).hasClass("visited") && !$(top).hasClass("start") && !$(top).hasClass("end"))
		{
			$(top).attr("prev-elem",$(currElem).attr("id"));
			$(top).addClass("visited");
			window.arr.push(top);
		}
		
		// left
		var left = getElement(currElem,"l");
		if($(left).hasClass("end"))
		{
			$(left).attr("prev-elem",$(currElem).attr("id"));
			window.found = true;
			return;
		}
		
		if( $(left).hasClass("cell") && !$(left).hasClass("wall") && !$(left).hasClass("visited") && !$(left).hasClass("start") && !$(left).hasClass("end"))
		{
			$(left).attr("prev-elem", $(currElem).attr("id"));
			$(left).addClass("visited");
			window.arr.push(left);
		}
		
		// bottom
		var bottom = getElement(currElem,"b");
		if($(bottom).hasClass("end"))
		{
			$(bottom).attr("prev-elem",$(currElem).attr("id"));
			window.found = true;
			return;
		}
		
		if(  $(bottom).hasClass("cell") && !$(bottom).hasClass("wall") && !$(bottom).hasClass("visited") && !$(bottom).hasClass("start") && !$(bottom).hasClass("end"))
		{
			$(bottom).attr("prev-elem",$(currElem).attr("id"));
			$(bottom).addClass("visited");
			window.arr.push(bottom);
		}
		
		// right 
		var right = getElement(currElem,"r");
		if($(right).hasClass("end"))
		{
			$(right).attr("prev-elem",$(currElem).attr("id"));
			window.found = true;
			return;
		}
		
		if(  $(right).hasClass("cell") && !$(right).hasClass("wall") && !$(right).hasClass("visited") && !$(right).hasClass("start") && !$(right).hasClass("end"))
		{
			$(right).attr("prev-elem",$(currElem).attr("id"));
			$(right).addClass("visited");
			window.arr.push(right);
		}
    }

    $("#start").click(function(){
    	$("#start").prop("disabled",true);
    	$("#clear").prop("disabled",true);
    	$("#reset").prop("disabled",true);
    	$("#selectStart").prop("disabled",true);
    	$("#selectEnd").prop("disabled",true);
		if(window.IS_SELECTED){
			window.arr = Array();
			window.startNode = $('.start');
			$(window.startNode).attr("prev-elem",0);
			window.endNode = $('.end');
			window.found = false;
			window.arr.push(window.startNode)
			if( !window.found || window.arr.length != 0 ){
				window.timer = setInterval(bfs);	
			}
		}
    });

});