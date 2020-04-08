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
});