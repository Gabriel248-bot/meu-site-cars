const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

const frases = [
  "KA-CHOW! ⚡",
  "Eu sou velocidade! 🏎️💨",
  "Nunca subestime um carro vermelho! 🔥",
  "Radiator Springs é minha casa!",
  "Eu fui feito pra correr!",
  "O Mate é meu melhor amigo... não contem pra ele."
];

botao.addEventListener("click", () => {
  const aleatorio = Math.floor(Math.random() * frases.length);
  mensagem.textContent = frases[aleatorio];
});

// Controle das abas
const botoesAbas = document.querySelectorAll(".aba-btn");
const abas = document.querySelectorAll(".aba");
const instrucao = document.getElementById("instrucao");

botoesAbas.forEach(btn => {
  btn.addEventListener("click", () => {
    const alvo = btn.dataset.aba;

    instrucao.classList.remove("ativa");

    abas.forEach(aba => aba.classList.remove("ativa"));

    document.getElementById(alvo).classList.add("ativa");
  });
});
