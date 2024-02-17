let font;
let img;
let lixo;
let imagempersonagem;
let personagem;
let v = 60;
let pontuacao = 0;
let jogoAtivo = true;
let speechRec; //variavel para a voz

var canvas;
var ecra = 0; //primeiro ecra

let lixos = [];

function preload() {
  font = loadFont("assets/VT323-Regular.ttf");
  img = loadImage("assets/jardim.png");
  imagempersonagem = loadImage("assets/jogador.png");
  lixo = loadImage("assets/lixo.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight); //para fazer o fundo responsivo
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(font);


  //estas variáveis e a função gotspeech foram modificadas apartir de: https://editor.p5js.org/piecesofuk/sketches/SyBpNOJTb
  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  let continuous = true;
  let interimResults = true;
  speechRec.start(continuous, interimResults);


  // movimentar o personagem
  function gotSpeech() {
    if (speechRec.resultValue) {
      console.log(speechRec.resultString);
      let t = speechRec.resultString;

      let d1 = t.substring(0, 1);
      let d = d1.toLowerCase(t);
      if (d == "l") personagem.moveLeft(v);
      if (d == "r") personagem.moveRight(v);
      if (d == "u") personagem.moveUp(v);
      if (d == "d") personagem.moveDown(v);

    }

  }
  personagem = new Personagem();
}


//primeiro ecra
function ecrainicio() {
  //butão
  background(191, 215, 234);
  fill(255, 112, 166);
  noStroke();
  rect(width / 2, height / 2 + 80, 250, 50, 5);

  //texto
  fill(0);
  textSize(90);
  text("TRASH PICKUP", width / 2, height / 2 - 20);
  textSize(26);
  text("click here to start", width / 2, height / 2 + 76);
  textSize(26);
  fill(215, 38, 56);
  text("THERE IS NO PLANET B, SO HELP SAVE THIS ONE!", width / 2, height / 2 + 300);
}

function mousePressed() {
  if (
    mouseX > width / 2 - 125 &&
    mouseX < width / 2 + 80 + 125 &&
    mouseY > height / 2 - 25 &&
    mouseY < height / 2 + 80 + 25
  )
    ecra = 1;
}

function draw() {
  if (ecra == 0) {
    //ecra de inicio
    ecrainicio();
  } else if (ecra == 1) {
    //ecra de jogo

    background(189, 228, 167);
    image(img, width / 2, height / 2, width - 200, height - 100);
    imageMode(CENTER);
    personagem.desenha();

    // desenhar lixos
    if (jogoAtivo){
      for (let i = 0; i < lixos.length; i++) {
        let lixoAtual = lixos[i];
        image(lixo, lixoAtual.x, lixoAtual.y, 130, 90); // imagem lixo
        lixoAtual.y += lixoAtual.v; //velocidade
        print(lixoAtual.y);

        //colisões
        let distancia = dist(personagem.x, personagem.y, lixoAtual.x, lixoAtual.y);
        let raioPersonagem = 60; //raios
        let raioLixo = 42;
        let raioTotal = raioPersonagem + raioLixo;

        // Verificar colisão
        if (distancia <= raioTotal) {
          pontuacao++;
          lixos.splice(i, 1);
        }

        // Verificar se o lixo ultrapassou os limites da tela
        if (lixoAtual.y > height) {
          jogoAtivo = false;
          break;
        }
      }
    }

    //pontuação
    textSize(32);
    fill(225, 85, 84);
    text("SCORE: " + pontuacao, 150, 29);

    //texto
    textSize(32);
    fill(4, 113, 166);
    text("TRY USING YOUR VOICE TO CONTROL THE CHARACTER AND PICK UP THE TRASH BEFORE FALLING!", 800, 30);

    // array para os lixos
    if (lixos.length < 10) {
      for (let i = 0; i < 10 - lixos.length; i++) {
        let novoLixo = {
          x: random(200, 1300),
          v: random(0.5, 1),
          y: random(-height / 2, 0),
        };
        lixos.push(novoLixo);
      }
    }
  }
}


//este código foi modificado apartir de: https://editor.p5js.org/piecesofuk/sketches/SyBpNOJTb
class Personagem {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  desenha() {
    image(imagempersonagem, this.x, this.y, 200, 200);
  }

  moveLeft(n) {
    this.x -= n;
  }

  moveRight(n) {
    this.x += n;
  }

  moveUp(n) {
    this.y -= n;
  }

  moveDown(n) {
    this.y += n;

  }
}

