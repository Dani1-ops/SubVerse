/*=========================
      HEADER
=========================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/*=========================
      CARROSSEL
=========================*/

const slides = document.querySelector(".slides");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const gap = 25;
const card = document.querySelector(".produto");

let largura = card.offsetWidth + gap;
let animando = false;

window.addEventListener("resize", () => {
    largura = card.offsetWidth + gap;
});

next.addEventListener("click", () => {

    if(animando) return;

    animando = true;

    slides.style.transition = ".5s";

    slides.style.transform = `translateX(-${largura}px)`;

});

prev.addEventListener("click", () => {

    if(animando) return;

    animando = true;

    const ultimo = slides.lastElementChild;

    slides.prepend(ultimo);

    slides.style.transition = "none";

    slides.style.transform = `translateX(-${largura}px)`;

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            slides.style.transition = ".5s";

            slides.style.transform = "translateX(0)";

        });

    });

});

slides.addEventListener("transitionend", () => {

    if(slides.style.transform === `translateX(-${largura}px)`){

        slides.append(slides.firstElementChild);

    }

    slides.style.transition = "none";

    slides.style.transform = "translateX(0)";

    animando = false;

});


/*=========================
      MOVER
=========================*/

function mover() {

    slides.style.transition = ".6s";

    slides.style.transform =
        `translateX(${-tamanho * index}px)`;

}


/*=========================
      BOTÕES
=========================*/

next.addEventListener("click", () => {

    if (index >= todos.length - 1) return;

    index++;

    mover();

});

prev.addEventListener("click", () => {

    if (index <= 0) return;

    index--;

    mover();

});


/*=========================
   LOOP INFINITO
=========================*/

slides.addEventListener("transitionend", () => {

    if (todos[index].id === "primeiro-clone") {

    slides.style.transition = "none";

    index = 1;

    slides.style.transform = `translateX(${-tamanho * index}px)`;

}

if (todos[index].id === "ultimo-clone") {

    slides.style.transition = "none";

    index = todos.length - 2;

    slides.style.transform = `translateX(${-tamanho * index}px)`;

}

});

window.addEventListener("resize", () => {

    tamanho = produtos[0].offsetWidth + 25;

    slides.style.transition = "none";

    slides.style.transform =
        `translateX(${-tamanho * index}px)`;

});


/*=========================
      AUTOPLAY
=========================*/

let auto = setInterval(() => {

    next.click();

},4000);

const carousel = document.querySelector(".carousel");

carousel.addEventListener("mouseenter",()=>{

    clearInterval(auto);

});

carousel.addEventListener("mouseleave",()=>{

    auto = setInterval(()=>{

        next.click();

    },4000);

});


/*=========================
      RESPONSIVO
=========================*/

window.addEventListener("resize", () => {

    tamanho = produtos[0].offsetWidth + 25;

    slides.style.transition = "none";

    slides.style.transform =
        `translateX(${-tamanho * index}px)`;

});

/*=========================
      BOLINHAS
=========================*/

const dotsContainer = document.querySelector(".dots");

const dots = [];

for(let i = 0; i < produtos.length; i++){

    const dot = document.createElement("span");

    dot.classList.add("dot");

    if(i === 0){

        dot.classList.add("active");

    }

    dot.addEventListener("click",()=>{

        index = i + 1;

        mover();

        atualizarDots();

    });

    dotsContainer.appendChild(dot);

    dots.push(dot);

}

function atualizarDots(){

    dots.forEach(dot=>dot.classList.remove("active"));

    let realIndex = index - 1;

    if(realIndex < 0){

        realIndex = produtos.length - 1;

    }

    if(realIndex >= produtos.length){

        realIndex = 0;

    }

    dots[realIndex].classList.add("active");

}

slides.addEventListener("transitionend", atualizarDots);


/*=========================
        DRAG
=========================*/

let pressionado = false;

let inicioX;

let moverX;

let anteriorTranslate;

slides.addEventListener("mousedown",(e)=>{

    pressionado = true;

    inicioX = e.pageX;

    anteriorTranslate = -tamanho * index;

    slides.style.transition = "none";

});

window.addEventListener("mouseup",()=>{

    if(!pressionado) return;

    pressionado = false;

    const distancia = moverX - inicioX;

    if(distancia < -100){

        index++;

    }

    if(distancia > 100){

        index--;

    }

    mover();

});

window.addEventListener("mousemove",(e)=>{

    if(!pressionado) return;

    moverX = e.pageX;

    const distancia = moverX - inicioX;

    slides.style.transform =
    `translateX(${anteriorTranslate + distancia}px)`;

});


/*=========================
      TOUCH
=========================*/

let touchInicio = 0;

let touchFim = 0;

slides.addEventListener("touchstart",(e)=>{

    touchInicio = e.touches[0].clientX;

});

slides.addEventListener("touchmove",(e)=>{

    touchFim = e.touches[0].clientX;

});

slides.addEventListener("touchend",()=>{

    const distancia = touchFim - touchInicio;

    if(distancia < -60){

        index++;

    }

    if(distancia > 60){

        index--;

    }

    mover();

});


/*=========================
  ATUALIZA DENTRO DO LOOP
=========================*/

slides.addEventListener("transitionend",()=>{

    atualizarDots();

});

/*=========================
      MODAL PRODUTO
=========================*/

const modal = document.getElementById("produtoModal");

const modalImg = document.getElementById("modalImg");
const modalNome = document.getElementById("modalNome");
const modalPreco = document.getElementById("modalPreco");
const modalDescricao = document.getElementById("modalDescricao");
const modalTecido = document.getElementById("modalTecido");

const fechar = document.querySelector(".close");

document.querySelectorAll(".produto").forEach(produto=>{

    produto.addEventListener("click",()=>{

        modalImg.src = produto.dataset.img;

        modalNome.textContent = produto.dataset.nome;

        modalPreco.textContent = produto.dataset.preco;

        modalDescricao.textContent = produto.dataset.descricao;

        modalTecido.textContent = produto.dataset.tecido;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/*=========================
      FECHAR MODAL
=========================*/

fechar.addEventListener("click",()=>{

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

});

modal.addEventListener("click",(e)=>{

    if(e.target === modal){

        modal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});


/*=========================
        ESC
=========================*/

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        modal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});


/*=========================
   SELEÇÃO TAMANHOS
=========================*/

const tamanhos = document.querySelectorAll(".tamanhos button");

tamanhos.forEach(btn=>{

    btn.addEventListener("click",()=>{

        tamanhos.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

    });

});


/*=========================
     SELEÇÃO CORES
=========================*/

const cores = document.querySelectorAll(".cor");

cores.forEach(cor=>{

    cor.addEventListener("click",()=>{

        cores.forEach(c=>c.classList.remove("active"));

        cor.classList.add("active");

    });

});


/*=========================
 FILTRO PRODUTOS.HTML
=========================*/

const params = new URLSearchParams(window.location.search);

const tecido = params.get("tecido");

if(tecido){

    const cards = document.querySelectorAll(".grid-produtos .produto");

    cards.forEach(card=>{

        if(card.dataset.tecido !== tecido){

            card.style.display = "none";

        }

    });

    const titulo = document.getElementById("tituloPagina");

    const descricao = document.getElementById("descricaoPagina");

    if(titulo){

        if(tecido === "algodao"){

            titulo.textContent = "Coleção Algodão";

            descricao.textContent =
            "Confira todas as camisetas produzidas em 100% algodão.";

        }

        if(tecido === "suedine"){

            titulo.textContent = "Coleção Suedine";

            descricao.textContent =
            "Confira todas as camisetas produzidas em suedine premium.";

        }

    }

}


/*=========================
    BOTÃO COMPRAR
=========================*/

const comprar = document.querySelector(".comprar");

if(comprar){

    comprar.addEventListener("click",()=>{

        const tamanhoSelecionado =
        document.querySelector(".tamanhos .active");

        if(!tamanhoSelecionado){

            alert("Selecione um tamanho.");

            return;

        }

        alert(
            "Produto adicionado ao carrinho!\n\n" +
            "Tamanho: " +
            tamanhoSelecionado.textContent
        );

    });

}