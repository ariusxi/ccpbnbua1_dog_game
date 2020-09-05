
var height = 400;
var width = 100;

const limit_x = $(document).width() - 100;
const limit_y = $(document).height() - 210;

let home_x = 1;
let home_y = 1;

let currentPointsPlayer = 0;

const getRandomNumber = (minimum, maximum) => {
	return Math.random() * (maximum - minimum) + minimum 
}

const updatePositionHome = () => {
	// Atualizando a posição da casa e acordo com os limites da tela
	home_x = getRandomNumber(limit_x, 1);
	home_y = getRandomNumber(limit_y, 1);

	console.log(`Atualizou a casa para X: ${home_x}, Y: ${home_y}`);

	// Atualizando a posição X e Y da casa
	$('#casa').css('top', `${home_y}px`);
	$('#casa').css('left', `${home_x}px`);
}


// Atualizando a pontuação atual do jogador
const updatePointsPlayer = () => {
	$("#points p").text(`Pontuação: ${++currentPointsPlayer}`);
}

// Verificando se a div tem colisão com a outra
const hasCollision = (firstElement, secondElement) => {
	const firstElementAxisX = firstElement.offset().left;
	const firstElementAxisY = firstElement.offset().top;

	const secondElementAxisX = secondElement.offset().left;
	const secondElementAxisY = secondElement.offset().top;

	return (
		firstElementAxisX >= secondElementAxisX - 100 && 
		firstElementAxisX <= secondElementAxisX + 100
	) && (
		firstElementAxisY >= secondElementAxisY - 100 && 
		firstElementAxisY <= secondElementAxisY + 100
	)
}

// Movendo o cachorro pela tela
const moveDog = (keyPressed) => {
	const moveFunction = ((currentKey) => ({
		'37': () => {
			width = width - 30;
			$("#cachorro").css("margin-left", width + 'px');
		},
		'38': () => {
			height = height - 30;
			$("#cachorro").css("margin-top", height + 'px');
		},
		'39': () => {
			width = width + 30;
			$("#cachorro").css("margin-left", width + 'px');
		},
		'40': () => {
			height = height + 30;
			$("#cachorro").css("margin-top", height + 'px');
		},
	})[currentKey])

	// Pegando a função de qual direção ele vai morrer o cachorro
	const directionFunction = moveFunction(keyPressed.toString())

	return directionFunction()
}

// Quando a tela estiver carregada, ele pega uma posição aleatória para casa
$(document).ready(function(event) {
	updatePositionHome();
})

// Toda vez que for na pressionado a tela
$(document).keydown(function (event) {
	const currentKeyPressed = event.which

	const dog = $("#cachorro");
	const house = $("#casa");

	if (currentKeyPressed == 39) {
		dog.css('transform', 'scaleX(1)');
	} else {
		dog.css('transform', 'scaleX(-1)');
	}

	if (
		(height < limit_y && width < limit_x || [37, 38].includes(currentKeyPressed))
	) {
		moveDog(currentKeyPressed);

		if (hasCollision(dog, house)) {
			updatePositionHome();
			updatePointsPlayer();
		}
	}
});