
var cards = ["captain.jpg","connor.jpg", "hawk.jpg", "hawk.jpg", "kara.jpg", "markus.jpg", "connor.jpg", "north.jpg", "captain.jpg", "markus.jpg", "north.jpg", "kara.jpg"];
cards.sort(() => 0.5 - Math.random());


//alert(cards[0]);
//consol.log(cards);

for (let i = 0; i < 12; i++) {
    document.getElementById('c' + i).addEventListener('click', function() {
        revealCard(i);
    });
}
   
var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;
let startTime;
let timerInterval;

function revealCard(nr){
	if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}
	
    let opacityValue = $('#c'+nr).css('opacity');

    if(opacityValue != 0 && lock == false){
        lock = true;

        let obraz = "url(img2/" + cards[nr] + ")";
        $('#c'+nr).css('background-image', obraz);
        $('#c'+nr).addClass('cardA');
        $('#c'+nr).removeClass('card');

        if(oneVisible == false){
            oneVisible = true;	
            visible_nr = nr;
            lock = false;
        } else {
            if(cards[visible_nr] == cards[nr]){
                setTimeout(function() { hide2Cards(nr, visible_nr); }, 750);
                //pairsLeft--;
            } else {
                setTimeout(function() { restore2Cards(nr, visible_nr); }, 1000);
            }

            turnCounter++;
            $('.score').html('Turn counter: '+turnCounter);
            oneVisible = false;
        }
    }
}
	
function hide2Cards(nr1, nr2){
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');
    pairsLeft--;

    if (pairsLeft == 0) {
        clearInterval(timerInterval);
        let timeText = $('.timer').text().replace("Time: ", "");
        $('.board').html(
            '<h1>You win!<br>Done in ' + turnCounter + ' turns<br>Time: ' + timeText + '</h1>' +
            '<button class="restart-btn">Play Again</button>'
        );

        $('.restart-btn').on('click', function() {
            location.reload();
        });
    }

    lock = false;
}


function restore2Cards(nr1, nr2) {
	$('#c'+nr1).css('background-image', 'url(img2/kar.jpg)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardA');	
	
	$('#c'+nr2).css('background-image', 'url(img2/kar.jpg)');
	$('#c'+nr2).addClass('card');
	$('#c'+nr2).removeClass('cardA');

	lock = false;	
	
}

function resetGame() {
    cards.sort(() => 0.5 - Math.random());

    oneVisible = false;
    lock = false;
    turnCounter = 0;
    pairsLeft = 6;

    let boardHtml = '';
    for (let i = 0; i < 12; i++) {
        boardHtml += '<div class="card" id="c' + i + '"></div>';
        if ((i + 1) % 4 === 0) boardHtml += '<br>';
    }
    boardHtml += '<div class="score">Turn counter: 0</div>';
    $('.board').html(boardHtml);

    for (let i = 0; i < 12; i++) {
        $('#c' + i).on('click', function() {
            revealCard(i);
        });
    }
}

function updateTimer() {
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000); 

    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    $('.timer').text(`Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
}

