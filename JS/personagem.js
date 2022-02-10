class Personagem{
    constructor(){}
 
    criaProtagonista() 
    { 
       
       nave = new THREE.Object3D();
 
       torso(nave);
       bico(nave);
       asa(nave,"e");
       asa(nave,"d");
       flap(nave,"d");
       flap(nave,"e");
       back(nave);
       canhaoPrincipal(nave)
       canhaoEsquerda(nave, "e")
       canhaoDireita(nave, "d")
 
       scene.add(nave);
       return nave;
 
    }
 
    criaVilao() 
    { 
       var nave = new THREE.Object3D();
 
       const posicao = [20, 0, 0];
       const angulo = [0, 0, 1.6];
 
       const anguloDeitado = [0, 0, 0];
       const posicaoDeitado = [0, 0, 0];
 
       const anguloLadoo = [0, 0, 1.6];
       const posicaoLado = [-20, 0, 0];
 
       createBall(nave);
       createPlane(nave, anguloDeitado, posicaoDeitado);
       createPlane(nave, posicaoLado, anguloLadoo);
       createPlane(nave, posicao, angulo);
 
       scene.add(nave);
       return nave;
    }
 
 }
 
 var vilao = new Personagem();
 var protagonista = new Personagem();
 
 function flap(nave, d){
    'use strict' 
     
     material = new THREE.MeshBasicMaterial({color:0x808080, wireframe:false});
     geometry = new THREE.BoxGeometry(10, 20, 2);
     mesh = new THREE.Mesh(geometry,material);
     if(d == "d"){
       mesh.position.set(30, 10, 65);
       mesh.rotation.y = 1.7;
       mesh.rotation.z = 0;
     }
     if(d == "e"){
       mesh.position.set(-30, 10, 65);
       mesh.rotation.y = 1.7;
       mesh.rotation.z = 0;
     }
    nave.add(mesh);
 }
 
 function asa(nave, d){
    'use strict' 
     
     material = new THREE.MeshLambertMaterial({color: 0x000080, wireframe:false});
     geometry = new THREE.BoxGeometry(50, 20, 2);
     var wing = new THREE.Mesh(geometry,material);
     if(d == "d"){
       wing.position.set(20, 0, 10);
       wing.rotation.x = 4.7;
       wing.rotation.z = 2.4;
     }
     if(d == "e"){
       wing.position.set(-20, 0, 10);
       wing.rotation.x = 4.7;
       wing.rotation.z = -2.4;
     }
     
     
    nave.add(wing);
 }
 
 function back(nave){
    'use strict' 
     
       material =  new THREE.MeshLambertMaterial({color: 0x000080, wireframe:false});
       geometry = new THREE.BoxGeometry(70, 20, 2);
       let backWing = new THREE.Mesh(geometry, material);
 
       backWing.position.set(0, 0, 60);
       backWing.rotation.x = 4.7;
       backWing.rotation.z = 0;
     
    nave.add(backWing);
 }
 
 function bico(nave){
    'use strict' 
     
     material = new THREE.MeshLambertMaterial({color: 0x000080, wireframe:false});
     geometry = new THREE.ConeGeometry(10, 30, 200);
     var ponta = new THREE.Mesh(geometry,material);
     ponta.position.set(0, 2, -40);
     ponta.rotation.x = 4.7;
     
    nave.add(ponta);
 }
 
 function torso(nave){
    'use strict' 
     
     material = new THREE.MeshLambertMaterial({color: 0x000080, wireframe:false});
     geometry = new THREE.CylinderGeometry(20, 10, 80);
     tronco = new THREE.Mesh(geometry,material);
     tronco.position.set(0, 0, 15) 
     tronco.rotation.x = 1.6
     
    nave.add(tronco);
 }
 
 function canhaoEsquerda(nave){
   'use strict' 
    
   if(selecionado == "e")
      material = new THREE.MeshBasicMaterial({color:0xfff333, wireframe:false});
   else
      material = new THREE.MeshBasicMaterial({color:0x808080, wireframe:false});
    
      geometry = new THREE.CylinderGeometry(3, 3, 30);
      canhaoE = new THREE.Mesh(geometry,material);
      canhaoE.position.set(-25, 0, 5) 
      canhaoE.rotation.x = 1.6
      nave.add(canhaoE);
}

function canhaoDireita(nave){
   'use strict' 
    
   if( selecionado == "d"){
      material = new THREE.MeshBasicMaterial({color:0xfff333, wireframe:false});
   }
   else
      material = new THREE.MeshBasicMaterial({color:0x808080, wireframe:false});
    
      geometry = new THREE.CylinderGeometry(3, 3, 30);
      canhaoD = new THREE.Mesh(geometry,material);
      canhaoD.position.set(25, 0, 5) 
      canhaoD.rotation.x = 1.6
      nave.add(canhaoD);
}

 function canhaoPrincipal(nave){
    'use strict' 
     
      if(selecionado == "c")
      {
         material = new THREE.MeshBasicMaterial({color:0xfff333, wireframe:false});
      }
      else
         material = new THREE.MeshBasicMaterial({color:0x808080, wireframe:false});

     geometry = new THREE.CylinderGeometry(3, 3, 30);
     canhaoP = new THREE.Mesh(geometry,material);
     canhaoP.position.set(0, 15, 10) 
     canhaoP.rotation.x = 1.6
     
    nave.add(canhaoP);
 }
 
  function createBall(nave){
     'use strict' 
     
     material = new THREE.MeshPhongMaterial({color:0x80000B, wireframe:false});
     geometry = new THREE.SphereGeometry(15,10,10);
     ball = new THREE.Mesh(geometry,material);
     ball.position.set(0, 0 ,0) 
     
    nave.add(ball);
 
  }
 
  function createPlane(nave, posicao, angulo){
     'use strict' 
     material = new THREE.MeshLambertMaterial({color:0xFFFF00, wireframe:false});
     geometry = new THREE.BoxGeometry(50,1,20);
     plano = new THREE.Mesh(geometry,material);
     plano.position.set(posicao[0], posicao[1], posicao[2]);
 
     plano.rotation.x = angulo[0];
     plano.rotation.y = angulo[1];
     plano.rotation.z = angulo[2];
 
     nave.add(plano);
  }
 