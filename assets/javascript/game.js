

// Variables

var gladiatorName = ['Gladiator1', 'Gladiator2', 'Gladiator3', 'Gladiator4', 'Gladiator5', 'Gladiator6'];
var gladiatorHP = [2000, 1650, 1850, 1700, 1800, 1500];
var gladiatorIMG = ['Gladiator1.png', 'Gladiator2.png', 'Gladiator3.png', 'Gladiator4.png', 'Gladiator5.png', 'Gladiator6.png'];
var charDMG = [200, 165, 185, 170, 180, 150];

var userHP; var userAttack; var opponentHP; var opponentAttack;
opponents = 5;


$(".startButton").on("click", function () {
    $(this).off('click');
    gameStart();
});
$(".restartButton").on("click", function () {
    $('.messages').html(" ");
    if (startPressed = true) {
        //removes remaining characters off the board.
        for (var i = 0; i < gladiatorName.length; i++) {
            $('#' + gladiatorName[i]).remove();
        }
        opponents = 5;
        gameStart();
    }
});


// the Game-------------------------------------------


function gameStart() {

    // gladiator buttons
    for (var i = 0; i < gladiatorName.length; i++) {
        var gladiator = $('<button>');
        var gladiatorPic = $('<img>');
        gladiatorPic.attr('src', '../unit-4-game/assets/images/' + gladiatorIMG[i]);
        gladiatorPic.addClass('picStyle');
        gladiator.addClass('startStyle');
        gladiator.attr('id', gladiator[i]);
        gladiator.attr({ 'data-hp': gladiatorHP[i] });
        gladiator.attr({ 'data-hit': charDMG[i] });
        gladiator.attr({ 'data-name': gladiatorName[i] });
        var hpSpan = $('<span>').addClass('gladiatorHP').html(gladiator.data('hp'));
        gladiator.append(gladiatorName[i],gladiatorPic, hpSpan);
        $('.startBtn').append(gladiator);
    }

    $(document).on('click', '.startStyle', function () {
        userHP = $(this).data('hp');
        console.log(userHP);

        //Moves Button to 'Your Character'
        $(this).removeClass('gladiatorIMG startStyle').addClass('userStyle');
        $('.userGladiator').append($(this));
        //Moves other to 'Characters to Battle'
        for (var i = 0; i < gladiatorName.length; i++) {
            if (gladiatorName[i] != $(this).data('name')) {
                $('#' + gladiatorName[i]).removeClass('gladiatorIMG startStyle').addClass('opponentStyle');
                $('#' + gladiatorName[i] + ' span').removeClass('gladiatorHP');
                $('.oppoGladiator').append($('#' + gladiatorName[i]));
            }
        }
        chooseGladiator();
    });
}
function chooseGladiator() {
    $('.messages').html(' ');
    //clicking opponents sends them to battleMode function. 
    $(document).on('click', '.opponentStyle', function () {
        opponentHP = $(this).data('hp');
        console.log(opponentHP);
        $(this).removeClass('opponentSyle opponentGladiator').addClass('currentOpponent');
        $(this).children('span').attr('class', 'enemigoHP');
        $('.chosenOpponent').append($(this));
        //Turns off click for other opponent so that only chosenOpponent appears
        for (var i = 0; i < charName.length; i++) {
            if (charName[i] != $(this).data('name')) {
                $(document).off('click', '.opponentStyle');
            }
        }
        battleMode();
    });
}

function oppoAttack() {
    oppoGladiatorAttack = $('.currentOpponent').data('damage');
}

function displayHP() {
    $('.currentOpponent').data('hp', opponentHP);
    $('.currentOpponent span').html(opponentHP);
    $('.userStyle').data('hp', userHP);
    $('.characterHP').html(userHP);
}

function battleMode() {
    $('.hit').on('click', function () {
        oppoAttack();
        userAttack = $('.userStyle').data('hit');

        opponentHP = parseInt(opponentHP - userAttack);
        userHP = parseInt(userHP - oppoGladiatorAttack);
        displayHP();

        console.log(userHP + " " + opponentHP);
        winOrLose()
    });

}

function winOrLose(){	
	if (opponentHP <= 0 && (opponents != 0)){
		$('.messages').html("You've defeated the challenger! Click another gladiator to continue.");
		var enemy = $('.currentOpponent').data('name');
		$('#' + enemy).remove();
		chooseGladiator();
		opponents--;
		console.log(opponents);
	}
	if ((opponentHP <= 0) && (opponents == 0)){
		$('.messages').html("Congrats!!! You've destroyed every Challenger! Press 'Restart' to start a new game.");
	}
	if (userHP <= 0){
		$('.messages').html("You lost. You suck... Press 'Restart' to start a new game.");
	}	
}