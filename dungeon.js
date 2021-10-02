// Body css
$('body').css({ backgroundColor: 'rgb(40, 40, 40)', margin: 0, padding: 0 });
// Checking Level
if(!window.localStorage.getItem('L')){ 
    window.localStorage.setItem('L', '1'); 
    window.location.reload(); 
    window.location.hash = '1'; 
} else { 
    window.location.hash = `${parseInt(window.localStorage.getItem('L'))}`; 
};
const levelUp = (window.localStorage.getItem('L')) ? parseInt(window.localStorage.getItem('L'))+1 : 2;
// Variables
const cordinates = [];
let width, height;
// Level Index
const levelsIndex = parseInt(window.location.hash.substring(1))-1;
// Getting x and y and storing them in cordinates and getting width and height of the dungeon
for(var x = innerWidth/2-(levels[levelsIndex].width / 2 * 60); x < innerWidth/2+(levels[levelsIndex].width / 2 * 60); x+=65){
    // Getting width of the dungeon
    width = x > innerWidth/2+(levels[levelsIndex].width / 2 * 60)-65 ? x : 0;
    for(var y = innerHeight/2-(levels[levelsIndex].height / 2 * 60); y < innerHeight/2+(levels[levelsIndex].height / 2 * 60); y+=65){
        // Getting height of the dungeon
        height = y > innerHeight/2+(levels[levelsIndex].height / 2 * 60)-65 ? y : 0;
        // Pushing x, y to cordinates
        cordinates.push({x, y});
    }
}
// Creating all tiles
cordinates.map((cordinate, index) => $(` <tile> <img id="${index}" class="tile" style="width: 60px; height: 60px; position: absolute; left: ${cordinate.x}px; top: ${cordinate.y}px" src="svg/tile.svg"/> </tile> `).appendTo('.tiles'));
// Replacing some tiles with stones
levels[levelsIndex].stones.map(stone => $(`#${stone}`).replaceWith(` <stone> <img id="${stone}" style="width: 60px; height: 60px; position: absolute; left: ${$(`#${stone}`).css('left')}; top: ${$(`#${stone}`).css('top')}" src="svg/stone.svg" /> </stone>`));
// Creating monsters
levels[levelsIndex].monsters.map((monster, index) => $(` <zombie> <img id="${monster.mob}-${index}" style="width: 60px; height: 60px; position: absolute; left: ${cordinates[monster.position].x}px; top: ${cordinates[monster.position].y}px" src="svg/${monster.mob}.svg" /> </zombie> `).appendTo('.monsters'))
// Removing the tile under the Treasure Element
$(`#${levels[ levelsIndex].treasure}`).remove();
// Creating Treasure Element
$(` <treasure> <img id="treasure-closed" style="position: absolute; left: ${cordinates[levels[levelsIndex].treasure].x}px; top: ${cordinates[levels[ levelsIndex].treasure].y}px" src="svg/treasure_closed.svg"/> </treasure>`).appendTo('.main');
// Creating Player Element
$(` <player style="background-color: rgb(255, 0, 0); width: 60px; height: 60px; position: absolute; left: ${cordinates[levels[levelsIndex].player_position].x}px; top: ${cordinates[levels[levelsIndex].player_position].y}px;"></player> `).appendTo('.main');
//Updating the monster's position
setInterval(() => {
    levels[levelsIndex].monsters.map((monster, index) => {
        if(monster.mob === 'zombie'){
            // Checking if player is touching the monster
            if(parseInt($('player').css('left')) == cordinates[monster.path[monster.current_position]]?.x && parseInt($('player').css('top')) == cordinates[monster.path[monster.current_position]]?.y) {
                window.location.reload();
            }else {
                // Moving the monster
                if(monster.current_position <= monster.path.length-1){
                    $(`#zombie-${index}`).css({left: cordinates[monster.path[monster.current_position]].x, top: cordinates[monster.path[monster.current_position]].y});
                    monster.current_position++;
                }else {
                    monster.current_position = 0;
                }
            }
        }
    });
}, 200);
// Check if keys are pressed or not
document.addEventListener('keydown', function (event){
    // Player position
    let player = {x: parseInt($('player').css('left')), y: parseInt($('player').css('top'))};
    // Treasure position
    let treasure = {x: parseInt($('#treasure-closed').css('left')), y: parseInt($('#treasure-closed').css('top'))};
    // Function when player is at treasure
    const player_is_at_treasure = () => {
        if(parseInt(window.localStorage.getItem('L')) < levels.length-1){
            $('#treasure-closed').remove();
            $(` <treasure> <img id="treasure-open" style="position: absolute; left: ${cordinates[levels[levelsIndex].treasure].x}px; top: ${cordinates[levels[levelsIndex].treasure].y}px" src="svg/treasure_opened.svg"/> </treasure>`).appendTo('.main');
            window.location.reload();
            window.localStorage.setItem('L', levelUp);
        }else {
            window.location.href = 'completed.html';
        }
    }
    // X position function of player
    const left = () => {
        if(event.keyCode === 68 && player.x < width){
            // Player is allowed to move
            let go = true;
            // Checking if there are any stones/walls in the direction
            levels[levelsIndex].stones.map(stone => {
                // There is a stone/wall ahead so, player is stopped
                if(player.x+65 === parseInt($(`#${stone}`).css('left')) && player.y === parseInt($(`#${stone}`).css('top'))) go = false;
            });
            // Checking if ahead is treasure. if yes, function is called
            if(player.x+65 === treasure.x && player.y === treasure.y) player_is_at_treasure();
            // If player is allowed to then, player is moved
            if(go) return player.x+=65;
        }else if(event.keyCode === 65 && player.x > cordinates[0].x){
            // Player is allowed to move
            let go = true;
            // Checking if there are any stones/walls in the direction
            levels[levelsIndex].stones.map(stone => {
                // There is a stone/wall ahead so, player is stopped
                if(player.x-65 === parseInt($(`#${stone}`).css('left')) && player.y === parseInt($(`#${stone}`).css('top'))) go = false;
            });
            // Checking if ahead is treasure. if yes, function is called
            if(player.x-65 === treasure.x && player.y === treasure.y) player_is_at_treasure();
            // If player is allowed to then, player is moved
            if(go) return player.x-=65;
        }
    }
    // Y position function of player
    const top = () => {
        if(event.keyCode === 83 && player.y < height){
            // Player is allowed to move
            let go = true;
            // Checking if there are any stones/walls in the direction
            levels[levelsIndex].stones.map(stone => {
                // There is a stone/wall ahead so, player is stopped
                if(player.x === parseInt($(`#${stone}`).css('left')) && player.y+65 === parseInt($(`#${stone}`).css('top'))) go = false;
            });
            // Checking if ahead is treasure. if yes, function is called
            if(player.x === treasure.x && player.y+65 === treasure.y) player_is_at_treasure();
            // If player is allowed to then, player is moved
            if(go) return player.y+=65;
        }else if(event.keyCode === 87 && player.y > cordinates[0].y){
            // Player is allowed to move
            let go = true;
            // Checking if there are any stones/walls in the direction
            levels[levelsIndex].stones.map(stone => {
                // There is a stone/wall ahead so, player is stopped
                if(player.x === parseInt($(`#${stone}`).css('left')) && player.y-65 === parseInt($(`#${stone}`).css('top'))) go = false;
            });
            // Checking if ahead is treasure. if yes, function is called
            if(player.x === treasure.x && player.y-65 === treasure.y) player_is_at_treasure();
            // If player is allowed to then, player is moved
            if(go) return player.y-=65;
        }
    }
    // Player is Moved
    $('player').css({ left: left(), top: top() });
});