const CountdownEl = document.getElementById('countdown');

let contadorMinutos = 0.05;
let tempo = contadorMinutos * 60;

var botao = document.getElementById("btn");

var statusPomo = document.getElementById("status");

var intervalo;

var intervaloDescanso;

// ===> Arrumar pause na função de Descanso e fazer com que o timer reinicie ao terminar o primeiro contador e o primeiro descanso. <=== 

let minDescanso = 0.1;
let tempoDescanso = minDescanso * 60;

botao.addEventListener('click', startContador);

function startContador() {
    console.log('Iniciou')
    botao.removeEventListener('click', startContador);
    botao.addEventListener('click', Pause);

    intervalo = setInterval(attContador, 1000);

    botao.innerText = "Pausar";

    statusPomo.innerHTML = 'Hora de focar!';
}

function attContador() {
    let minutos = Math.floor(tempo/60);
    let segundos = tempo % 60;

    segundos = segundos < 10 ? '0' + segundos:segundos;

    CountdownEl.innerHTML = `${minutos}:${segundos}`;

    tempo !== 0 ? (tempo--) : ( clearInterval(intervalo), botao.innerText = "Iniciar descanso",  startDescanso() );
}

function Pause() {
    console.log('Pausou')
    botao.removeEventListener('click', Pause);
    botao.addEventListener('click', startContador);
    botao.innerText = "Iniciar";
    statusPomo.innerHTML = 'Timer pausado';

    clearInterval(intervalo);
    console.log(intervalo);
}

// - UNTIL HERE IS WORKING -

function startDescanso() {
    console.log('Deseja iniciar o descanso?')
    botao.removeEventListener('click', Pause);
    botao.addEventListener('click', iniciarDescanso);
}

function iniciarDescanso() {
    console.log('Descanso iniciado')
    intervaloDescanso = setInterval(Descanso, 999);
}

function Descanso() {
    console.log("DESCANSO");
    botao.innerText = "Pausar"
    statusPomo.innerHTML = 'Hora do descanso!';

    botao.removeEventListener('click', Descanso);
    botao.addEventListener('click', PauseDescanso);

    let minutos = Math.floor(tempoDescanso/60);
    let segundos = tempoDescanso % 60;

    segundos = segundos < 10 ? '0' + segundos : segundos;
    
    if (tempoDescanso !== 0) {
        tempoDescanso--;
        console.log(tempoDescanso);
    }
    if (tempoDescanso == 0) {
        clearInterval(intervaloDescanso);
        botao.removeEventListener('click', PauseDescanso);
        botao.addEventListener('click', startContador);
        
        let contadorMinutos = 0.05;
        let tempo = contadorMinutos * 60;
        botao.innerText = "Reiniciar Pomodoro";
    }

    CountdownEl.innerHTML = `${minutos}:${segundos}`;
}

function PauseDescanso() {
    clearInterval(intervaloDescanso);
    console.log(intervaloDescanso);

    console.log('Pausou o descanso')
    botao.removeEventListener('click', PauseDescanso);
    botao.addEventListener('click', iniciarDescanso);
    botao.innerText = "Voltar para o descanso";
}