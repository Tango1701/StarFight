
var scene, material, geometry, mesh, ball, tronco, plano, nave, renderer, cube, cube0, cube1, cube2;
var luzesLigadas = false

var paredeEsquerda = new THREE.Object3D();
var paredeDireita = new THREE.Object3D();
var paredeSideInimigo = new THREE.Object3D();

var tela = document.getElementById("opcoes")

// Criar o cubo
var cubeGeometry = new THREE.BoxGeometry(19, 40, 40);
var cubeMaterial = new THREE.MeshBasicMaterial({ color: "#00BFFF", wireframe: false });
cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Criar o cubo
var cubeGeometry0 = new THREE.BoxGeometry(19, 40, 40);
var cubeMaterial0 = new THREE.MeshBasicMaterial({ color: "#00BFFF", wireframe: false });
cube0 = new THREE.Mesh(cubeGeometry0, cubeMaterial0);

// Criar o Superior
var cubeGeometry2 = new THREE.BoxGeometry(33, 110, 5);
var cubeMaterial2 = new THREE.MeshPhongMaterial({ color: "white", wireframe: false });
cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);

function createCamera(i) {
   'use strict'
   if (i == 1) {
      camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera1.position.set(10, 130, 400);
      camera1.lookAt(0, 0, 0);
      follow = false
      movel = false
      return camera1;
   }
   if (i == 2) {
      camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera2.position.set(300, 100, 50);
      camera2.lookAt(0, 0, 0);
      follow = false
      movel = false
      return camera2;
   }
   if (i == 3) {
      camera3 = new THREE.OrthographicCamera(
         window.innerWidth / -2,
         window.innerWidth / 2,
         window.innerHeight / 2,
         window.innerHeight / -2, 1, 1000);
      camera3.position.set(0, 500, 50);
      camera3.lookAt(0, 0, 0);
      follow = false
      movel = false
      return camera3;
   }
   if (i == 4) {
      // Camera Movel
      camera4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
      camera4.position.set(0, 270, -600);
      camera4.lookAt(0, 0, 0);
      follow = false
      movel = true
      return camera4;
   }
   if (i == 5) {
      // Segue a bala
      camera5 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera5.position.set(goodGuy.position.x, goodGuy.position.y, goodGuy.position.z + 100);
      movel = false
      follow = true
      return camera5;
   }
}

function createScene() {
   'use strict'
   scene = new THREE.Scene();
   scene.add(new THREE.AxisHelper(20));



   cuboCriacao();
   paredeEsquerda.add(cube0);
   paredeDireita.add(cube);
   paredeSideInimigo.add(cube2)

   // Plano
   material = new THREE.MeshPhongMaterial();
   const bumpTexture = new THREE.TextureLoader().load("../IMG/tiles.jpg")
   material.bumpMap = bumpTexture
   material.bumpScale = 4

   geometry = new THREE.BoxGeometry(1200, 1, 730);
   var espaco = new THREE.Mesh(geometry, material);
   espaco.receiveShadow = true;

   //  Ajustar o plano de forma a atingir a posicao e rotacao correcta
   espaco.position.set(0, -70, -30);
   espaco.rotation.y = 0.00;
   scene.add(espaco);
   scene.add(paredeDireita);
   scene.add(paredeEsquerda);
   scene.add(paredeSideInimigo);


   var artista = protagonista.criaProtagonista();

   // Posicionar os gajos
   artista.position.z = 230;
   artista.position.y = -10;

   // ======================================== //

   // Luzes
   if (directionalLight != null)
      scene.add(directionalLight);

   scene.add(holofote1);
   scene.add(avlo1)

   scene.add(holofote2)
   scene.add(avlo2)

   scene.add(holofote3)
   scene.add(avlo3)

   scene.add(holofote4)
   scene.add(avlo4)


   // =======================================//

   //Mudando a posicoes
   GeraBandidos()

   if (badGuy == null)
      tela.style.display = "flex"

   goodGuy = artista;
   goodGuy.castShadow = true; //default is false
   goodGuy.receiveShadow = false; //default
}

//  Variaveis globais (dentro deste escopo) representado os personagens 
var badGuy = [];   // Vilao
var goodGuy;     //protagonista
var enemysDown = 0;
var badGuyLife = [];
//  Velocidade da bala
var vBala = 50

// Decrementar a velocidade da bala a cada segundo
function BulletSpeedControl() {
   setInterval(() => {
      if (vBala > 0)
         vBala -= 5
      if (vBala < 20)
         vBala = 50
   }, 1000);
}

function GeraBandidos() {
   for (let index = 0, valor = -245; index <= 7; index++) {

      var bandido = vilao.criaVilao();
      bandido.castShadow = true; //default is false
      bandido.receiveShadow = false; //default
      badGuy[index] = bandido;
      badGuyLife[index] = 2;//Vida do vilão

      //Frente
      if (index % 2 == 0) {
         badGuy[index].position.z = valor + 30;
         if ((index - 2) >= 0) {
            badGuy[index].position.x = badGuy[index - 2].position.x + 80;
         }
      }
      //Tras
      else {
         badGuy[index].position.z = valor - 30;
         if ((index - 2) >= 0) {
            badGuy[index].position.x = badGuy[index - 2].position.x - 80;
         }
      }

   }
}

// Controla o comportamento da bala a cada frame. Simula o disparo
function bulletControl() {
   if (bala != null) {
      bala.position.z -= vBala
      if (bala.position.z < -380) {
         bala.position.z += vBala;
         bala.position.y -= 20;
         //scene.remove(bala)
         onAir = false
      } else {
         onAir = true
      }
   }
}

// Determina a arma selecionada
function gunControl() {
   if (selecionado == "c")
      posicao = { x: goodGuy.position.x, y: goodGuy.position.y + 10, z: goodGuy.position.z }
   if (selecionado == "e")
      posicao = { x: goodGuy.position.x - 25, y: goodGuy.position.y, z: goodGuy.position.z };
   if (selecionado == "d")
      posicao = { x: goodGuy.position.x + 25, y: goodGuy.position.y, z: goodGuy.position.z };
}

//Reset da posição dos Inimigos
function reset() {

   //Mudando a posicoes
   for (let index = 0, valor = -245; index <= 7; index++) {
      //Frente
      if (index % 2 == 0) {
         badGuy[index].position.z = valor + 30;
         if ((index - 2) >= 0) {
            badGuy[index].position.x = badGuy[index - 2].position.x + 80;
         }
      }
      //Tras
      else {
         badGuy[index].position.z = valor - 30;
         if ((index - 2) >= 0) {
            badGuy[index].position.x = badGuy[index - 2].position.x - 80;
         }
      }
   }
}

// Define o lado actual do movimento do vilao
var ladoInimigo = "d"
var _ladoInimigo = "d"
// Define o lado actual do movimento do Hero
var lado = "d"
// Define o comportamento do movimento do vilao
function badGuyComportamento() {

   //Resetar a posição dos Inimigos
   reset();

   let move = 1


   for (let index = 0; index <= 7; index++) {

      move = 4;

      if (index % 2 == 0) {
         if (ladoInimigo == "d") {
            badGuy[index].position.x += move
         }
         if (badGuy[index].position.x >= 520) {
            ladoInimigo = "e"
         }
         if (ladoInimigo == "e") {
            badGuy[index].position.x -= move;
         }
         if (badGuy[index].position.x <= -520) {
            ladoInimigo = "d"
         }
      } else {
         if (_ladoInimigo == "d") {
            badGuy[index].position.x -= move;
         }
         if (_ladoInimigo == "e") {
            badGuy[index].position.x += move;
         }
         if (badGuy[index].position.x <= -520) {
            _ladoInimigo = "e"
         }
         if (badGuy[index].position.x >= 520) {
            _ladoInimigo = "d"
         }
      }
   }

   //Resetar a posição dos Inimigos
   reset();
}

// Velocidade da camera
var passo = 0

// O nome ja indica ne? kkkkk
function CameraMovel() {
   if (movel) {
      passo += 0.01
      c.position.x = 360 * Math.sin(passo);
      c.position.z = 360 * Math.cos(passo);
      c.lookAt(0, 0, 0)
   }
}

//Camera que Segue a bala
function CameraFollow() {
   if (follow && bala != null) {
      c.position.set(bala.position.x, bala.position.y, bala.position.z + 50);
      c.lookAt(bala.position.x, bala.position.y, bala.position.z);
   }
}

function animate() {
   'use strict';

   downHero()
   BalasInimigas()
   bulletControl()
   gunControl()
   badGuyComportamento()
   CameraMovel()
   CameraFollow()
   render();
   if (!paused)
      requestAnimationFrame(animate);

   downEnemy();
}

var dead = 0
var end = false

function downEnemy() {
   for (let index = 0; index <= badGuy.length; index++) {

      // Criando novas BoundingBox nos dois objectos
      let balaBounding = new THREE.Box3().setFromObject(bala);
      let badGuyBounding = new THREE.Box3().setFromObject(badGuy[index]);

      if (balaBounding.isIntersectionBox(badGuyBounding)) {

         badGuyLife[index]--;

         //Remover se a vida zerar
         if (badGuyLife[index] == 0) {
            scene.remove(bala)
            scene.remove(balaBounding)
            scene.remove(badGuy[index])
            scene.remove(badGuyBounding)
            enemysDown++;//Acrescentando o número de Inimigos
         }

         //Apresentar a tela de reinicio do jogo
         if (enemysDown == 8) {
            tela.style.display = "flex"
            dead = 0
            end = true
            enemysDown = 0

            for (let i = 0; i <= 7; i++) {
               badGuyLife[i] =2
            }
            LimparCena()
         }

      }

   }
}

function downHero() {
   var hits = 0
   for (let index = 0; index < balaInimiga.length; index++) {

      // Criando novas BoundingBox nos dois objectos
      let balaBounding = new THREE.Box3().setFromObject(balaInimiga[index]);
      let heroBounding = new THREE.Box3().setFromObject(nave);

      if (heroBounding.isIntersectionBox(balaBounding)) {
         scene.remove(balaInimiga[index])
         hits += 1
         //  vida -= 1
         document.getElementById("life").value -= hits

         if (document.getElementById("life").value <= 0) {
            document.getElementById("life").value = 0
            document.getElementById("opcoes").style.display = "flex"
            end = true
            LimparCena()
         }

      }

   }
}

function LimparCena() {
   for (var i = scene.children.length - 1; i >= 0; i--) {
      obj = scene.children[i];
      scene.remove(obj);
   }
}

function render() {
   'use strict'
   renderer.render(scene, c);
}

function init() {
   'use strict'
   renderer = new THREE.WebGLRenderer({ antialias: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFSoftShadowMap;
   document.body.appendChild(renderer.domElement);

   createScene();

   render();

   // window.addEventListener("resize",onResize);
   window.addEventListener("keydown", onKeyDown);

}

// A bala
var bala

// A posicao inicial da bala
var posicao;
var bulletCount = 0

// Cria uma nova bala a cada vez que o user prime a tecla de disparo
function Dispara() {
   if (!onAir) {
      material = new THREE.MeshBasicMaterial({ color: "black", wireframe: false });
      geometry = new THREE.SphereGeometry(5, 5, 5);
      bala = new THREE.Mesh(geometry, material);
      bala.position.set(posicao.x, posicao.y, posicao.z)
      scene.add(bala)
      bulletCount += 1
      document.getElementById("bullets").value = bulletCount
   }
}

// Movimento do Heroi (Do Jeito que o prof quêr)
function PlayerControl() {
   let move = 0
   let destino = 100
   setInterval(() => {
      move++
      if (calculandoAsColisoes('direita')) {
         lado == "e"
         nave.position.set(nave.position.x - 2, nave.position.y, nave.position.z)
      } else if (calculandoAsColisoes('esquerda')) {
         lado == "d"
         nave.position.set(nave.position.x + 2, nave.position.y, nave.position.z)
      } else {
         if (move < destino) {
            if (lado == "e") {
               nave.position.set(nave.position.x - 1, nave.position.y, nave.position.z)
            }
            if (lado == "d") {
               nave.position.set(nave.position.x + 1, nave.position.y, nave.position.z)
            }
         } else {
            nave.rotation.set(0, 0, 0)
         }
      }
   }, 10);
   move = 0
}

function onKeyDown(e) {
   'use strict';
   switch (e.keyCode) {

      case 37: //Move o protagonista para a esquerda
         lado = "e"
         PlayerControl()
         break;
      case 39: //Move o protagonista para a direita
         lado = "d"
         PlayerControl()
         break;
      case 49: // Seleciona a camera frontal
         c = createCamera(1);
         break;
      case 50: // Seleciona a camera Lateral
         c = createCamera(2);
         break;
      case 51: // Seleciona a camera do topo
         c = createCamera(3);
         break;
      case 52: // Seleciona a camera movel
         c = createCamera(4);
         break;
      case 53: // Seleciona a camera movel
         c = createCamera(5);
         break;
      case 32: //  dispara
         Dispara();
         break;
      case 81: // Seleciona arma a esquerda
         selecionado = "e"
         TrocaArma()
         break;
      case 87: // Seleciona arma do centro
         selecionado = "c"
         TrocaArma()
         break;
      case 69: // Seleciona arma a direita
         selecionado = "d"
         TrocaArma()
         break;
      case 76: // Liga e desliga as luzes
         ligaLuzes()
         break;
      case 55: // Liga e desliga as luzes
         LigaDesliga(holofote1)
         break;
      case 56: // Liga e desliga as luzes
         LigaDesliga(holofote2)
         break;
      case 57: // Liga e desliga as luzes
         LigaDesliga(holofote3)
         break;
      case 48: // Liga e desliga as luzes
         LigaDesliga(holofote4)
         break;
      case 83: // Pausa o jogo
         paused = !paused
         MenuPausa()
         animate()
         break;
      case 82: // Recarregar o Jogo
         LimparCena()
         recarregar()
         break;
   }

}

function TrocaArma() {
   nave.remove(canhaoP)
   canhaoPrincipal(nave)

   nave.remove(canhaoE)
   canhaoEsquerda(nave)

   nave.remove(canhaoD)
   canhaoDireita(nave)
}

function DisparoInimigo() {
   if (!end)
      for (let index = 0; index < badGuy.length; index++) {
         material = new THREE.MeshBasicMaterial({ color: "black", wireframe: false });
         geometry = new THREE.SphereGeometry(5, 5, 5);
         balaInimiga[index] = new THREE.Mesh(geometry, material);
         balaInimiga[index].position.set(badGuy[index].position.x, badGuy[index].position.y, badGuy[index].position.z + 20)
         scene.add(balaInimiga[index])
      }

}
var balaInimiga = []

function BalasInimigas() {
   for (let index = 0; index < badGuy.length; index++) {
      if (balaInimiga[index] != null) {
         balaInimiga[index].position.z += 25
         if (balaInimiga[index].position.z > 400) {
            scene.remove(balaInimiga[index])
         }
      }
   }
}

function shoot() {
   setInterval(() => {
      DisparoInimigo()
   }, 5000);
}

shoot()
