
// ========================================================== //

                    // Luz Directional

var  directionalLight = new THREE.DirectionalLight( 0xffffff, .3);
directionalLight.castShadow = true; 


function ligaLuzes(){
    directionalLight.visible = !directionalLight.visible
}


// =================================================================//

                        // Holofotes e alvos

const holofote1 = new THREE.SpotLight( 0xffffff );
holofote1.position.set( 0, 1, 0 );
const avlo1 = new THREE.Object3D();
avlo1.position.set( 10, 10, 0 )

holofote1.target = avlo1

const holofote2 = new THREE.SpotLight( 0xffffff );
holofote2.position.set( 0, 1, 0 );
const avlo2 = new THREE.Object3D();
avlo2.position.set( -10, 10, 0 )

holofote2.target = avlo2

const holofote3 = new THREE.SpotLight( 0xffffff );
holofote3.position.set( 0, 1, 0 );
const avlo3 = new THREE.Object3D();
avlo3.position.set( 0, 10, 10 )

holofote3.target = avlo3

const holofote4 = new THREE.SpotLight( 0xffffff );
holofote4.position.set( 0, 1, 0 );
const avlo4 = new THREE.Object3D();
avlo4.position.set( 0, 10, -10 )

holofote4.target = avlo4

// Liga e desliga os 4 holofotes
function LigaDesliga(holofote){
    holofote.visible = !holofote.visible
}

// ================================================= //