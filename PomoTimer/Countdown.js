const CountdownEl = document.getElementById('countdown');

// var contadorMinutos = 10;
// var tempo = contadorMinutos * 60;

// var minDescanso = 10;
// var tempoDescanso = minDescanso * 60;

var contadorMinutos = document.getElementById("foco-minutos").value;
var contadorSegundosFoco = document.getElementById("foco-segundos").value;
var tempo = (contadorMinutos * 60) + contadorSegundosFoco;

var minDescanso = document.getElementById("descanso-minutos").value;
var contadorSegundosDescanso = document.getElementById("descanso-segundos").value;
var tempoDescanso = (minDescanso * 60) + contadorSegundosDescanso;

var botaoStart = document.getElementById("btn_start");

var statusPomo = document.getElementById("status");

var intervalo;

var intervaloDescanso;

var soundStatus = document.getElementById("checkbox-input")

// ===> Arrumar pause na função de Descanso e fazer com que o timer reinicie ao terminar o primeiro contador e o primeiro descanso. <=== 

botaoStart.addEventListener('click', startContador);

// SOUND

const alarm = document.querySelector('audio')
alarm.volume = 0.2



function startContador() {

    contadorMinutos = document.getElementById("foco-minutos").value;
    parseFloat(contadorMinutos);
    console.log('Contador minutos foco: ', contadorMinutos)
    contadorSegundosFoco = document.getElementById("foco-segundos").value;
    parseFloat(contadorSegundosFoco);
    console.log('Contador segundos foco: ',contadorSegundosFoco)
    tempo = parseFloat(contadorMinutos) * 60 + parseFloat(contadorSegundosFoco);
    console.log('Tempo dps de fazer a conta: ',tempo)

    minDescanso = document.getElementById("descanso-minutos").value;
    parseFloat(minDescanso);
    contadorSegundosDescanso = document.getElementById("descanso-segundos").value;
    parseFloat(contadorSegundosDescanso);
    tempoDescanso = (parseFloat(minDescanso) * 60) + parseFloat(contadorSegundosDescanso);

    // contadorMinutos = 10;
    // tempo = contadorMinutos * 60;
    // minDescanso = 10;
    // tempoDescanso = minDescanso * 60;

    // document.body.style.backgroundColor = '#00524F'; -> Troca a cor do background
    
    twitter_button = document.getElementById("twitter-button")
    twitter_button.style.display = "none"




    console.log("Valor do input: ", soundStatus)



    // // Prévia do término
    // var dataAtual = new Date();
    // var horas_data = dataAtual.getHours();
    // var minutos_data = dataAtual.getMinutes();
    // var segundos_data = dataAtual.getSeconds();
    // let horaparamin = (horas_data * 60)
    // let minparaseg = (horaparamin * 60)
    // let segundos = minpraseg
    //let xxxx = parseFloat(tempo) + parseFloat(segundos)


    // Fazer função que entra com os segundos e sai com horas, minutos e segundos (Separados)

    // Validando se o input foi preenchido
    if(contadorMinutos.length == 0)
    {
        alert("Selecione um número válido.")
        clearInterval(intervalo)
    }

    console.log('Iniciou')
    console.log('Hora de Focar!')
    intervalo = setInterval(attContador, 1000)

    botaoStart.innerText = "Pausar";
    statusPomo.innerHTML = 'Hora de focar!';

    botaoStart.removeEventListener('click', startContador)
    botaoStart.addEventListener('click', Pause);
    document.body.style.backgroundColor = "#";
}

function continuarDescanso() {
    intervalo = setInterval(attContador, 1000)
    botaoStart.removeEventListener('click', continuarDescanso);
    botaoStart.addEventListener('click', Pause);

    botaoStart.innerHTML = 'Pausar'

    console.log('Pausou')
    statusPomo.innerHTML = 'Hora de focar!';
}

function attContador() {
    let minutos = Math.floor(tempo/60);
    let segundos = tempo % 60;

    console.log('Quantidade de segundos: ',segundos)
    console.log('Tempo: ',tempo)

    console.log('Segundos: ', segundos)
    console.log('Minutos: ', minutos)
    segundos = segundos < 10 ? '0' + segundos : segundos;
    minutos = minutos < 10 ? '0' + minutos : minutos;

    CountdownEl.innerHTML = `${minutos}:${segundos}`;
    window.document.title = `${minutos}:${segundos} - PomoTimer`;


    if (tempo !== 0) {
        (tempo--)
    }

    else {
        console.log("O tempo foi zerado!")
        clearInterval(intervalo),
        ConfirmarDescanso()

        if (soundStatus.checked) {
            alarm.play();
        }
    }
}

function Pause() {
    botaoStart.removeEventListener('click', Pause);
    botaoStart.addEventListener('click', continuarDescanso);

    botaoStart.innerHTML = 'Continuar'

    console.log('Pausou')
    statusPomo.innerHTML = 'Timer pausado';

    clearInterval(intervalo);
}

function ConfirmarDescanso() {
    clearInterval(intervalo);
    console.log(intervalo)

    console.log('Confirmar descanso?')

    botaoStart.innerText = "Iniciar Descanso";
    statusPomo.innerHTML = 'Hora de descansar!';

    botaoStart.removeEventListener('click', Pause);
    botaoStart.removeEventListener('click', startContador)
    botaoStart.addEventListener('click', attContadorDescanso);

    document.body.style.backgroundColor = "#";
}

function attContadorDescanso() {
    intervalo = setInterval(Descansando, 1000)
}

function Descansando() {
    botaoStart.removeEventListener('click', Descansando)
    botaoStart.removeEventListener('click', attContadorDescanso)
    botaoStart.addEventListener('click', PauseDescanso);

    botaoStart.innerText = "Pausar Descanso";

    let minutos = Math.floor(tempoDescanso/60);
    let segundos = (tempoDescanso % 60);

    segundos = segundos < 10 ? '0' + segundos : segundos;

    minutos = minutos < 10 ? '0' + minutos : minutos;

    window.document.title = `${minutos}:${segundos} - PomoTimer`;

    CountdownEl.innerHTML = `${minutos}:${segundos}`;
    
    if (tempoDescanso !== 0) {
        console.log(tempoDescanso),
        tempoDescanso--;
    }
    else {
        clearInterval(intervalo);
        if (soundStatus.checked) {
            alarm.play();
        }
        botaoStart.removeEventListener('click', PauseDescanso),
        botaoStart.addEventListener('click', Redefine()),
        botaoStart.innerText = "Reiniciar Pomodoro";

        //  Twitter share button
        twitter_button = document.getElementById("twitter-button")
        twitter_button.style.display = 'flex'
    }
}

function PauseDescanso() {
    clearInterval(intervalo);
    console.log(intervalo);

    console.log('Pausou o descanso')
    botaoStart.removeEventListener('click', PauseDescanso);
    botaoStart.addEventListener('click', attContadorDescanso);
    botaoStart.innerText = "Voltar para o descanso";
}

function Redefine() {
    botaoStart.removeEventListener('click', Redefine)
    botaoStart.addEventListener('click', startContador)
}


// ACCORDION

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    if (window.matchMedia("(min-width: 700px)").matches) {
        /* a viewport tem pelo menos 800 pixels de largura */
        var panel = this.nextElementSibling;
        if (panel.style.display === "flex") {
          panel.style.display = "none";
        } else {
          panel.style.display = "flex";
        }
    }
    else {
        /* a viewport menos que 800 pixels de largura */
        var panel = this.nextElementSibling;
        if (panel.style.display === "none") {
          panel.style.display = "flex";
        } else {
          panel.style.display = "none";
        }
      }
  });
}

// FOCAR EM UM ELEMENTO

function focarMain() {
    document.getElementById("countdown").focus({preventScroll:false});
  }