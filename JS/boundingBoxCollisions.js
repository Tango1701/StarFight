var bboxFirst,bboxSecond;

function calculandoAsColisoes(dados) { 

   if (dados == 'direita') {
   // Criando novas BoundingBox nos dois objectos
   bboxFirst = new THREE.Box3().setFromObject(nave);
   bboxSecond = new THREE.Box3().setFromObject(paredeEsquerda);
   
   if(bboxFirst.isIntersectionBox(bboxSecond)){
      return true;
   }

   return false;

  }else if (dados == 'esquerda'){
    // Criando novas BoundingBox nos dois objectos
    bboxFirst = new THREE.Box3().setFromObject(nave);
    bboxSecond = new THREE.Box3().setFromObject(paredeDireita);

    if(bboxFirst.isIntersectionBox(bboxSecond)){
      return true;
   }
   
   return false;

   }
   
   return false; 
   
 }