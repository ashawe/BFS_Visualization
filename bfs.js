$( document ).ready(function() {

	var ROW_NUM = 25;	// number of rows
	var COL_NUM = 50;	// number of cells in 1 row

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
});