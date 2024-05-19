//variables globales iniciar juego
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reinicio")
const botonMascotasJugador = document.getElementById("boton-mascota")

const botonReinicia = document.getElementById("boton-reinicia")

//variables globales seleccionar mascota jugador
const sectionSeleccionarMascota = document.getElementById("selec_mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

//variables globales seleccionar mascota enemigo 
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

//variables globales combate
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

//variables globales crear mensaje
const sectionsMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques") 


//variables globales
let mokepones = []
let ataqueJugador = []
let opcionDeMokepones
let ataqueEnemigo = []


let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3


let inputAcuarius
let inputCaprin 
let inputLeox 
let mascotaDelJugador
let mascotaDelJugadorObjeto
let AtaquesMokepon

let botonFuego 
let botonAgua 
let botonTierra 
let botones = []

let ataquesMokeponEnemigo 
let indexAtaqueJugador
let indexAtaqueEnemigo

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "./mapaFAv.jpg"

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 80
const anchoMaximoDelMapa = 500

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 80
}

alturaQueBuscamos = anchoDelMapa * 450 / 450

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


//clase
class Mokepon{
constructor (nombre,foto,vida, fotomapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho= 80
        this.alto= 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotomapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}

//mascotas jugador (descripcion fisica)
let acuarius = new Mokepon ("ACUARIUS", "./ACUARIUS-removebg-preview.png" , 5, "./ACUARIUS-removebg-preview.png")
let caprin = new Mokepon ("CAPRIN", "./CAPRIN-N.png", 5, "./CAPRIN-N.png")
let leox = new Mokepon ("LEOX" , "./LEOX-removebg-preview.png" , 5, "./LEOX-removebg-preview.png" )

//mascotas enemigo (descripcion fisica)
let acuariusEnemigo = new Mokepon ("ACUARIUS", "./ACUARIUS-removebg-preview.png" , 5, "./ACUARIUS-removebg-preview.png" )
let caprinEnemigo = new Mokepon ("CAPRIN", "./CAPRIN-N.png", 5, "./CAPRIN-N.png")
let leoxEnemigo = new Mokepon ("LEOX" , "./LEOX-removebg-preview.png" , 5, "./LEOX-removebg-preview.png")

acuarius.ataques.push(
    {nombre:"💧" , id:"boton-agua"},
    {nombre:"💧" , id:"boton-agua"},
    {nombre:"💧" , id:"boton-agua"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🌿", id:"boton-tierra"},
)

acuariusEnemigo.ataques.push(
    {nombre:"💧" , id:"boton-agua"},
    {nombre:"💧" , id:"boton-agua"},
    {nombre:"💧" , id:"boton-agua"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🌿", id:"boton-tierra"},
)

caprin.ataques.push(
    {nombre:"🌿", id:"boton-tierra"},
    {nombre:"🌿", id:"boton-tierra"},
    {nombre:"🌿", id:"boton-tierra"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🔥", id:"boton-fuego"},
)

caprinEnemigo.ataques.push(
    {nombre:"🌿", id:"boton-tierra"},
    {nombre:"🌿", id:"boton-tierra"},
    {nombre:"🌿", id:"boton-tierra"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🔥", id:"boton-fuego"},
)

leox.ataques.push(
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🌿", id:"boton-tierra"}
)

leoxEnemigo.ataques.push(
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🌿", id:"boton-tierra"}
)

mokepones.push(acuarius, caprin, leox)


function iniciarJuego (){
    sectionVerMapa.style.display = "none" // es para ocultar las demas secciones y solo mostrar esta//
    sectionSeleccionarAtaque.style.display ="none" // se ocultar para iniciar solo vemos la mascota 

    botonReinicia.addEventListener("click",reiniciarJuego)

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type ="radio" name = "mascota" id= ${mokepon.nombre} />
        <label class="tarjeta_mokepon" for=${mokepon.nombre}><img src="${mokepon.foto}" alt=${mokepon.nombre}>${mokepon.nombre}</label>
        `
    
    contenedorTarjetas.innerHTML += opcionDeMokepones

        inputAcuarius = document.getElementById("ACUARIUS")
        inputCaprin = document.getElementById("CAPRIN")
        inputLeox = document.getElementById("LEOX" )
})


    sectionReiniciar.style.display="none" // para mostrar los ataques y cuales son los que elegimos vamos a la funcion de seleccionar mascotaJugador//
    botonMascotasJugador.addEventListener("click",seleccionarMascotaJugador)
}

function seleccionarMascotaJugador () {
    sectionSeleccionarMascota.style.display ="none"


    if (inputAcuarius.checked){
        spanMascotaJugador.innerHTML = inputAcuarius.id
        mascotaDelJugador = inputAcuarius.id
    } 
    else if (inputCaprin.checked){
        spanMascotaJugador.innerHTML = inputCaprin.id
        mascotaDelJugador = inputCaprin.id
    }
    else if (inputLeox.checked){
        spanMascotaJugador.innerHTML = inputLeox.id
        mascotaDelJugador = inputLeox.id
    }else {
        alert("selecciona uno")}

extraerAtaques(mascotaDelJugador)

sectionVerMapa.style.display = "flex"
iniciarMapa()
}

function extraerAtaques(mascotaDelJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaDelJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques (ataques){
    ataques.forEach ((ataque) => {
        AtaquesMokepon = `<button id=${ataque.id} class="boton-ataque BAtaque"> ${ataque.nombre} </button>
        `
        contenedorAtaques.innerHTML += AtaquesMokepon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones= document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e)=> {
            console.log(e)
            if (e.target.id === "boton-fuego") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "transparent"
                boton.disabled = true
            } else if (e.target.id === "boton-agua"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "transparent"
                boton.disabled = true
            } else if (e.target.id === "boton-tierra") {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "transparent"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo (enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
    console.log("ataques enemigo",ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push("FUEGO")
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push("AGUA")
    }else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea (){
    if (ataqueJugador.length === 5 ) {
        combate ()
    }
}


function indexAmbosOponente (jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}


function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index);
            crearMensaje("EMPATE");
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponente(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }
    revisarVidas();
}


function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("GANASTE !!");
    } else {
        crearMensajeFinal('Lo siento, perdiste :(');
    }
}

function crearMensaje (resultado){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionsMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal (resultadoFinal){
    sectionReiniciar.style.display="block"
    sectionsMensajes.innerHTML = resultadoFinal
}


function reiniciarJuego (){
    location.reload ()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas (){
    mascotaDelJugadorObjeto.x = mascotaDelJugadorObjeto.x + mascotaDelJugadorObjeto.velocidadX
    mascotaDelJugadorObjeto.y = mascotaDelJugadorObjeto.y + mascotaDelJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    mascotaDelJugadorObjeto.pintarMokepon()
    acuariusEnemigo.pintarMokepon()
    caprinEnemigo.pintarMokepon()
    leoxEnemigo.pintarMokepon()
    if (mascotaDelJugadorObjeto.velocidadX !== 0 || mascotaDelJugadorObjeto.velocidadY !== 0 ){
        revisarColision(acuariusEnemigo)
        revisarColision(caprinEnemigo)
        revisarColision(leoxEnemigo)
    }
}

function moverDerecha(){
    mascotaDelJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaDelJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaDelJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaDelJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaDelJugadorObjeto.velocidadX = 0
    mascotaDelJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break

        case "ArrowDown":
            moverAbajo()
            break

        case "ArrowLeft":
            moverIzquierda()
            break

        case "ArrowRight":
            moverDerecha()
            break
    
        default:
            break
    }
}

function iniciarMapa (){

    mascotaDelJugadorObjeto = obtenerObjetoMascota(mascotaDelJugador)

    intervalo = setInterval(pintarCanvas,50)

    window.addEventListener("keydown",sePresionoUnaTecla)

    window.addEventListener("keyup",detenerMovimiento)
}

function obtenerObjetoMascota(){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaDelJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota= mascotaDelJugadorObjeto.y + 50
    const abajoMascota= mascotaDelJugadorObjeto.y + mascotaDelJugadorObjeto.alto - 25
    const derechaMascota= mascotaDelJugadorObjeto.x + mascotaDelJugadorObjeto.ancho - 25
    const izquierdaMascota= mascotaDelJugadorObjeto.x +50
    

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
            return    
    } 
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una coalision")
    sectionSeleccionarAtaque.style.display ="flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)

}

window.addEventListener("load", iniciarJuego) 
