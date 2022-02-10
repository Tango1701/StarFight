//Criar os cubos a serem usados 
function cuboCriacao(){
        
    // Criar o cubo
    var cubeGeometry = new THREE.BoxGeometry(20, 110, 20);
    const texturaEsquerda = new THREE.TextureLoader().load("../IMG/monalisa.jpg")
    var cubeMaterial = new THREE.MeshBasicMaterial({map: texturaEsquerda, wireframe: false});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // Criar o cubos a direita
    var cubeGeometry0 = new THREE.BoxGeometry(20, 110, 20);
    const texturaDireita = new THREE.TextureLoader().load("../IMG/scream.jpg")
    var cubeMaterial0 = new THREE.MeshLambertMaterial({map: texturaDireita, wireframe: false});
    cube0 = new THREE.Mesh(cubeGeometry0, cubeMaterial0);

    // Criar o Inferior
    var cubeGeometry1 = new THREE.BoxGeometry(33, 110, 5);
    var cubeMaterial1 = new THREE.MeshBasicMaterial({color:"#00BFFF", wireframe: false});
    cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);

    //Os parametros da função set referente ao position do cubo são as coordenadas x,y,z

    //------ Blocos a Direita -----

    cube0.position.set(590, -50, -30);
    cube0.scale.y = 1.5;
    cube0.scale.x = 36;
    cube0.rotation.y = 1.579

   //--------------------------------

    //Blocos a Esquerda
    cube.position.set(-590, -50, -30);
    cube.scale.y = 1.5;
    cube.scale.x = 36;
    cube.rotation.y = 1.579

   //--------------------------------

    //Blocos de Baixo
    cube1.position.set(0, -50, 335);
    cube1.scale.y = 1.5;
    cube1.scale.x = 36;
    cube1.rotation.y = 0

    //--------------------------------

    //Blocos de cima
    cube2.position.set(0, -50, -395);
    cube2.scale.y = 1.5;
    cube2.scale.x = 36;
    cube2.rotation.y = 0

    //------------------------------------

    //Adiconar os cubos a cena
    scene.add(cube1);
    
}