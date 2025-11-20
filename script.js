/* script.js - funcionalidades completas
   - abas com instrução que desaparece
   - som gerado por WebAudio ao clicar
   - dark mode toggle com localStorage
   - menu hambúrguer
   - animação do logo e mcqueen minimal
   - acessibilidade por teclado
*/

document.addEventListener("DOMContentLoaded", () => {

  // elementos
  const botao = document.getElementById("botao");
  const mensagem = document.getElementById("mensagem");
  const botoesAbas = document.querySelectorAll(".aba-btn");
  const abas = document.querySelectorAll(".aba");
  const instrucao = document.getElementById("instrucao") || document.getElementById("instrucao");
  const darkToggle = document.getElementById("darkToggle");
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");
  const logo95 = document.getElementById("logo95");
  const mcqueenAnim = document.getElementById("mcqueenAnim");

  /* ---------- SOUND: simple beep using WebAudio ---------- */
  const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;
  function playClickTone(freq = 880, duration = 0.06){
    if(!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0.0001;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    gain.gain.linearRampToValueAtTime(0.12, now + 0.001);
    osc.start(now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.stop(now + duration + 0.02);
  }

  /* ---------- DARK MODE (toggle + localStorage) ---------- */
  const LS_KEY = "mcqueen_theme_dark";
  function setDarkMode(on){
    if(on) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    try { localStorage.setItem(LS_KEY, on ? "1" : "0"); } catch(e){}
    if(darkToggle) darkToggle.setAttribute("aria-pressed", on ? "true" : "false");
  }
  // init from storage
  let saved = null;
  try { saved = localStorage.getItem(LS_KEY); } catch(e){}
  if(saved === "1") setDarkMode(true);
  else setDarkMode(false);

  if(darkToggle){
    darkToggle.addEventListener("click", () => {
      const now = document.body.classList.contains("dark");
      setDarkMode(!now);
      // small sound
      playClickTone(660, 0.05);
    });
  }

  /* ---------- Hamburger mobile menu ---------- */
  if(hamburger && mainNav){
    hamburger.addEventListener("click", () => {
      const open = hamburger.classList.toggle("open");
      if(open) {
        mainNav.style.display = "flex";
        hamburger.setAttribute("aria-expanded","true");
      } else {
        mainNav.style.display = "";
        hamburger.setAttribute("aria-expanded","false");
      }
      playClickTone(760, 0.04);
    });

    // collapse nav initially on small screens
    if(window.innerWidth < 700){
      mainNav.style.display = "none";
    }
    window.addEventListener("resize", () => {
      if(window.innerWidth >= 700) mainNav.style.display = "flex";
      else mainNav.style.display = "";
    });
  }

  /* ---------- ABAS: abrir e instrução ---------- */
  function abrirAba(id){
    if(!id) return;
    // hide instruction if present
    if(instrucao) instrucao.classList.remove("ativa");
    // hide all
    abas.forEach(a => {
      a.classList.remove("ativa");
      a.setAttribute("aria-hidden","true");
    });
    // open target
    const alvo = document.getElementById(id);
    if(alvo){
      alvo.classList.add("ativa");
      alvo.setAttribute("aria-hidden","false");
      // ensure visible on mobile
      setTimeout(()=> alvo.scrollIntoView({behavior:"smooth", block:"start"}), 80);
    }
  }

  // events binding
  botoesAbas.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = btn.dataset.aba;
      abrirAba(id);
      // close menu on mobile when clicking
      if(hamburger && hamburger.classList.contains("open")){
        hamburger.classList.remove("open");
        if(mainNav) mainNav.style.display = "none";
      }
      playClickTone(980, 0.05);
    });

    btn.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); }
    });
  });

  // open by hash (#copapistao etc)
  const initialHash = window.location.hash.replace("#","");
  if(initialHash) {
    abrirAba(initialHash);
  }

  /* ---------- FRASES (botao) ---------- */
  if(botao && mensagem){
    const frases = [
      "KA-CHOW! ⚡",
      "Eu sou velocidade! 🏎️💨",
      "Nunca subestime um carro vermelho! 🔥",
      "Radiator Springs é minha casa!",
      "Eu fui feito pra correr!",
      "O Mate é meu melhor amigo... não contem pra ele."
    ];
    botao.addEventListener("click", () => {
      const i = Math.floor(Math.random() * frases.length);
      mensagem.textContent = frases[i];
      playClickTone(1200 - (i*40), 0.045);
    });
  }

  /* ---------- LOGO interaction ---------- */
  if(logo95){
    logo95.addEventListener("mouseenter", ()=> logo95.style.transform = "rotate(-6deg) scale(1.02)");
    logo95.addEventListener("mouseleave", ()=> logo95.style.transform = "rotate(0) scale(1)");
  }

  /* ---------- MCQUEEN MINI-ANIMATION CLICK ---------- */
  if(mcqueenAnim){
    mcqueenAnim.addEventListener("click", () => {
      // short "dash" effect
      mcqueenAnim.animate([
        { transform: "translateY(0) scale(1)"},
        { transform: "translateY(-6px) scale(1.02)"},
        { transform: "translateY(0) scale(1)"}
      ], { duration: 500, easing: "cubic-bezier(.2,.9,.3,1)"});
      playClickTone(1040, 0.04);
    });
  }

  /* ---------- accessibility improvement: focus outline for keyboard nav ---------- */
  document.addEventListener("keydown", (e) => {
    if(e.key === "Tab") document.body.classList.add("show-focus");
  });

}); // DOMContentLoaded end
