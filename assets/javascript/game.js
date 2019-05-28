

//  Variables
var player;
var enemy;
var charArray = [];
var hpArray = [];
var apArray = [];
var cpArray = [];
var imgArray = [];
var cutArray = [];
var charPicked = false;
var enemyPicked = false;
var isAlive = true;
var enemyIsAlive = true;
var enemiesLeft = 3;


// Character Sheets & Constructor (using object protoypes)

function character(charName, healthPoints, atkPwr, counterAtk, charSprite, cutPortrait) {
    this.name = charName;
    this.hp = healthPoints;
    this.ap = atkPwr;
    this.cp = counterAtk;
    this.src = charSprite;
    this.cut = cutPortrait;
};

var asagi = new character("<b>Asagi</b>, <small>Sniper of Demons</small>", 100, 30, 15, "assets/images/asagi.gif", "assets/images/asagicut.png");
var bloodis = new character("<b>Bloodis</b>, <small>Great Demon Fist</small>", 250, 10, 5, "assets/images/bloodis.gif", "assets/images/bloodiscut.png");
var laharl = new character("<b>Laharl</b>, <small>Demon Overlord</small>", 120, 25, 15, "assets/images/laharl.gif", "assets/images/laharlcut.png");
var prinny = new character("<b>Prinny</b>, <small>Worthless Soul</small>", 500, 1, 50, "assets/images/prinny.gif", "assets/images/prinnycut.png");

console.log(charArray)

// Create Player/Enemy Cards

spawnChar = function() {
    
    player = charArray[i];
    console.log(player);
    
    $("#playerChar").attr("src", imgArray[i]);
    
    $("#playerCut").attr("src", cutArray[i]); 
    $("#playerCut").addClass("enter");
    
    $("#playerHealth").attr({ //checks and prints health values
        value: hpArray[i],
        max: hpArray[i],
    });
    
    $("#playerHealth").css("visibility", "visible");
    

    charArray.splice(i, 1);
    hpArray.splice(i, 1);
    apArray.splice(i, 1);
    cpArray.splice(i, 1);
    imgArray.splice(i, 1);
    cutArray.splice(i, 1);
}

spawnEnemy = function () {
   
    enemy = charArray[i];
    console.log(enemy);
    
    $("#enemyChar").attr("src", imgArray[i]);
    
    $("#enemyCut").attr("src", cutArray[i]);
    $("#enemyCut").addClass("enter");
    $("#enemyCut").removeClass("exit");

    
    $("#enemyHealth").attr({
        value: hpArray[i],
        max: hpArray[i],
    });
    
    $("#enemyHealth").css("visibility", "visible");
    
    charArray.splice(i, 1);
    hpArray.splice(i, 1);
    apArray.splice(i, 1);
    cpArray.splice(i, 1);
    imgArray.splice(i, 1);
    cutArray.splice(i, 1);
}

// Load Character Information

$("#asagi").attr(asagi)
$("#bloodis").attr(bloodis)
$("#laharl").attr(laharl)
$("#prinny").attr(prinny)

// Battle Functions

damagePhase = function(){
   
    enemy.hp -= player.ap //hp calculation
    player.hp -= enemy.cp
    
    $("#battleText1").html(player.name + " attacks for <b>" + player.ap + "</b> damage!")
    $("#battleText2").html(enemy.name + " counters for <b>" + enemy.cp + "</b> damage!")

    $("#playerHealth").attr("value", player.hp);
    $("#enemyHealth").attr("value", enemy.hp);

    if (player.hp > 0) {
        isAlive = true;
        player.ap += player.ap;
        $("#playerChar").addClass("attack");
    } else if (player.hp <= 0) {
        isAlive = false;
    }
    if (enemy.hp > 0) {
        enemyIsAlive = true;
        $("#enemyChar").addClass("attack");        
    } else if (enemy.hp <= 0) {
        $("#enemyCut").removeClass("enter")
        $("#enemyCut").addClass("exit")
        enemyIsAlive = false;
    }
    setTimeout(animationReset, 600);
}

animationReset = function() {
    $("#playerChar").removeClass("attack");
    $("#enemyChar").removeClass("attack");
}


// On Page Load


$(document).ready(function () {

charArray.push(asagi, bloodis, laharl, prinny) //// adds characters to selection pool
hpArray.push(asagi.hp, bloodis.hp, laharl.hp, prinny.hp)
apArray.push(asagi.ap, bloodis.ap, laharl.ap, prinny.ap)
cpArray.push(asagi.cp, bloodis.cp, laharl.cp, prinny.cp)
imgArray.push(asagi.src, bloodis.src, laharl.src, prinny.src)
cutArray.push(asagi.cut, bloodis.cut, laharl.cut, prinny.cut)

    // Event Listener (Choose Characters)
    $(".charBtn").on("click", function() {
        if (charPicked === false) { // if character has NOT been picked
            for (i = 0; i < charArray.length; i++) {      
                if (charArray[i].name === this.name) {
                    $(this).addClass("select");
                    spawnChar();
                    charPicked = true;
                }
            }  
        } else if (enemyPicked === false) { //after character has been picked, if enemy has NOT been picked
            for (i = 0; i < charArray.length; i++) {
                if (charArray[i].name === this.name) {
                    $(this).addClass("select");
                    spawnEnemy();
                    enemyPicked = true;
                    enemyIsAlive = true;
                }
            }
        }   
    
    
    })


    //Event Listener (Control Button functionality)
    $("#user-control").on("click", function() { 
        if (charPicked && enemyPicked) {
           damagePhase();
           console.log("Enemy HP: " + enemy.hp)
           console.log("Player HP: " + player.hp)
           if (isAlive === false) {
                $("#user-control").text("Try again?")
           } else if (enemyIsAlive === false) {
                //animate enemyChar death
                enemyPicked = false;
                enemiesLeft--;
           }
        }
    });

});
