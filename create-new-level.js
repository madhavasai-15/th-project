// Body css
$('body').css({ backgroundColor: 'rgb(40, 40, 40)', margin: 0, padding: 0 });

var PLAYER_CREATED = false;

for(var x = innerWidth/2-300; x < innerWidth/2+300; x+=62){
    for(var y = innerHeight/2-300; y < innerHeight/2+180; y+=62){
        $(`<div id="cell" style="width: 60px; height: 60px; position: absolute; left: ${x}px; top: ${y}px; transition: all .3s ease;"></div>`).appendTo('.cells');
    }
}
