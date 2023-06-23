var bouton = document.querySelector('.bouton');
var boutonStop = document.querySelector('.bouton_stop');
var timerContainer = document.querySelector('.timer_container');
var timer = document.querySelector('.timer');
var nbSecondes = document.querySelector('.secondes');
var cpt = 0;
var isPaused = false;
var isRunning = false; 

const pause = () => {
	isPaused = !isPaused;
	boutonStop.textContent = isPaused ? 'Reprendre' : 'Pause';

	start();
};

const handleSecondes = async (e) => {
	e.preventDefault();
	if(isNaN(nbSecondes.value)){
		nbSecondes.value="";
		return;
	}
	
	
	cpt = nbSecondes.value * 60;
	//nbSecondes.value = '';
	var num = await convertCpt(cpt);
	timer.textContent = `${num}`;
	nbSecondes.value = '';
	bouton.addEventListener('click', start);
};

const convertCpt = async (result) => {
	let secondesRestantes = result;
	let heure = Math.floor(secondesRestantes / 3600);
	let sec = Math.floor(secondesRestantes % 60);
	let min = Math.floor(secondesRestantes / 60);
	let realMin = Math.floor(min % 60);

	let secondesTexte = sec < 10 ? `0${sec}` : `${sec}`;
	let minTexte = realMin < 10 ? `0${realMin}` : `${realMin}`;
	let heureTexte = heure < 10 ? `0${heure}` : `${heure}`;
	//console.log(`${heure}h ${minTexte}min ${secondesTexte}sec`);

	let resultat = `${heureTexte}:${minTexte}:${secondesTexte}`;
	return resultat;
};

const espaceSeconds = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (cpt > 0) {
				cpt--;
			}
			resolve(cpt);
		}, 0);
	});
};

const start = async () => {
	isRunning = true;
	if(isRunning){
		bouton.removeEventListener("click",start);
	}
	if (isPaused) {
		return;
	}

	const result = await espaceSeconds();
	var resultToHMS = await convertCpt(result);
	timer.textContent = resultToHMS;
	if (!isPaused && cpt > 0) {
		setTimeout(start, 1000);
	}else{
		isRunning = false;
	}
};

bouton.addEventListener('click', start);

boutonStop.addEventListener('click', pause);

// demander min ou sec ou heures et choisir conversion
// pouvoir arrêter le timer  (mettre pause et recommencer)
// et quand on submit arrête gogo
// ne pas pouvoir commencer plusieurs fois
// pause 2 fois rapidement ne doit pas accélerer
