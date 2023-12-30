let numPlays = 0;
let gameFinished = false;
let currentPlayer = 'X';
let currentPlays = { 
    X: [],
    O: []
};

const winningPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

$(document).ready(function () {
    $('.cell').on('click', function() {
        if (!gameFinished) {
            numPlays++;
            $(this).text(currentPlayer);
            currentPlays[currentPlayer].push(parseInt($(this).attr('data-index')));

            if (isWinner()) {
                showGameResult('Win');
            }

            if (!gameFinished && isDraw()) {
                showGameResult('draw');
            }

            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    });
});

function playAgain() {
    numPlays = 0;
    gameFinished = false;
    currentPlayer = 'X';
    currentPlays = { 
        X: [],
        O: []
    };
    $(".cell").text('');
    $(".popup").addClass("hidden"); 

}

function showGameResult(type) {
    gameFinished = true;

    if (type === 'Win') {
        $(".popup").text('Le joueur ' + currentPlayer + ' a gagné!');
        $(".popup").removeClass("hidden"); // Affiche le pop-up
    } else {
        $(".popup").text('Égalité !');
    }

    $(".popup").append('<p id="playAgain" onclick="playAgain()">Play Again?</p>');
}

function isDraw() {
    return numPlays === 9;
}

function isWinner() {
    if (numPlays < 5) {
        return false;
    }

    for (let i = 0; i < winningPositions.length; i++) {
        let isWinner = true;

        for (let j = 0; j < winningPositions[i].length; j++) {
            if ($.inArray(winningPositions[i][j], currentPlays[currentPlayer]) < 0) {
                isWinner = false;
                break;
            }
        }

        if (isWinner) {
            return true;
        }
    }

    return false;
}