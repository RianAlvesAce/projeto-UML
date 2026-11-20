/* ===== Modelo (classes do UML: Laboratório, Reserva, Professor) ===== */
const MIN_AULA_REGULAR = 30; // Mudança de requisito: capacidade < 30 não aceita "Aula regular"
const professor = { nome: "Rafael Pacheco", matricula: "20260001" };
const laboratorios = [
  { id: 1, nome: "Laboratório 01", local: "Bloco A · Sala 103", capacidade: 30, disponivel: true },
  { id: 2, nome: "Laboratório 02", local: "Bloco A · Sala 105", capacidade: 40, disponivel: false },
  { id: 3, nome: "Laboratório 03", local: "Bloco B · Sala 201", capacidade: 25, disponivel: true }
];
const horarios = ["08:00","10:00","14:00","16:00","19:00"];
const tipos = { regular: "Aula regular", pratica: "Aula prática", monitoria: "Monitoria", pesquisa: "Pesquisa" };
const reservas = []; // só em memória (sem banco/backend)

const $ = id => document.getElementById(id);
const aceitaRegular = lab => lab.capacidade >= MIN_AULA_REGULAR;
const fmtData = iso => { const [y,m,d] = iso.split("-").map(Number);
  return new Date(y, m-1, d).toLocaleDateString("pt-BR", { day:"numeric", month:"short", year:"numeric" }).replace(/\./g,""); };
const hojeISO = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset()*60000).toISOString().slice(0,10); };
const esc = s => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ===== Navegação ===== */
function ir(pagina){
  $("page-labs").hidden = pagina !== "labs";
  $("page-reservas").hidden = pagina !== "reservas";
  document.querySelectorAll(".nav").forEach(b => {
    if (b.dataset.page === pagina) b.setAttribute("aria-current","page"); else b.removeAttribute("aria-current");
  });
  window.scrollTo(0,0);
}
document.querySelectorAll("[data-page]").forEach(b => b.addEventListener("click", () => ir(b.dataset.page)));

/* ===== RF01: cards ===== */
function renderLabs(){
  const q = $("busca").value.trim().toLowerCase();
  const lista = laboratorios.filter(l => l.nome.toLowerCase().includes(q) || l.local.toLowerCase().includes(q));
  $("contagem").innerHTML = `<b>${lista.length}</b> ${lista.length === 1 ? "espaço encontrado" : "espaços encontrados"}`;
  $("grid").innerHTML = lista.length ? lista.map(l => `
    <article class="card ${l.disponivel ? "" : "off"} ${aceitaRegular(l) ? "" : "small"}">
      <div class="card-top"><div class="ico"><svg><use href="#i-flask"/></svg></div>
        <span class="pill ${l.disponivel ? "" : "off"}">${l.disponivel ? "Disponível" : "Indisponível"}</span></div>
      <p class="loc">${l.local}</p><h3>${l.nome}</h3>
      <div class="cap"><svg><use href="#i-users"/></svg><div><small>CAPACIDADE</small><b>${l.capacidade} alunos</b></div></div>
      ${aceitaRegular(l) ? "" : `<p class="note">Disponível para práticas, monitorias e pesquisas.</p>`}
      ${l.disponivel
        ? `<button class="btn blue" data-reservar="${l.id}">Reservar laboratório <svg><use href="#i-arrow"/></svg></button>`
        : `<button class="btn" disabled>Sem disponibilidade</button>`}
    </article>`).join("") : `<p class="empty">Nenhum laboratório encontrado para “${esc($("busca").value)}”.</p>`;
}
$("busca").addEventListener("input", renderLabs);
$("grid").addEventListener("click", e => { const b = e.target.closest("[data-reservar]"); if (b) abrirForm(+b.dataset.reservar); });

/* ===== RF05: reservas ===== */
function renderReservas(){
  const n = reservas.length;
  $("navCount").textContent = n; $("stAtivas").textContent = n;
  $("stRegistros").textContent = `${n} ${n === 1 ? "registro encontrado" : "registros encontrados"}`;
  $("tabela").hidden = !n; $("vazio").hidden = !!n;
  $("stStatus").textContent = n ? "Tudo certo" : "Sem reservas";
  const ord = [...reservas].sort((a,b) => (a.data+a.hora).localeCompare(b.data+b.hora));
  $("stProx").textContent = n ? fmtData(ord[0].data) : "—";
  $("corpo").innerHTML = ord.map(r => `
    <tr ${r.novo ? 'class="new"' : ""}>
      <td data-l="LABORATÓRIO"><span class="lab-cell"><span class="ico"><svg><use href="#i-flask"/></svg></span>${r.lab.nome}</span></td>
      <td data-l="DATA">${fmtData(r.data)}</td><td data-l="HORÁRIO">${r.hora}</td>
      <td data-l="FINALIDADE"><span><b>${tipos[r.tipo]}</b><small>${esc(r.detalhe)}</small></span></td>
      <td data-l="STATUS"><span class="pill">Confirmada</span></td>
    </tr>`).join("");
  reservas.forEach(r => r.novo = false);
}

/* ===== RF02: formulário ===== */
const dlg = $("dlg"), form = $("form");
function abrirForm(labId){
  form.reset(); limparErros();
  $("lab").innerHTML = `<option value="">Selecione...</option>` + laboratorios.map(l =>
    `<option value="${l.id}" ${l.disponivel ? "" : "disabled"}>${l.nome} — ${l.capacidade} alunos${l.disponivel ? "" : " (indisponível)"}</option>`).join("");
  $("hora").innerHTML = `<option value="">Selecione...</option>` + horarios.map(h => `<option>${h}</option>`).join("");
  $("data").min = hojeISO();
  if (labId) $("lab").value = labId;
  ajustarFinalidade();
  dlg.showModal(); $(labId ? "data" : "lab").focus();
}
$("novaReserva").addEventListener("click", () => abrirForm());
$("cancelar").addEventListener("click", () => dlg.close());

/* Mudança de requisito: bloqueia "Aula regular" em lab < 30 lugares */
function ajustarFinalidade(){
  const lab = laboratorios.find(l => l.id === +$("lab").value);
  const bloqueia = lab && !aceitaRegular(lab);
  const opt = $("tipo").querySelector('[value="regular"]');
  opt.disabled = !!bloqueia;
  if (bloqueia && $("tipo").value === "regular") $("tipo").value = "";
  $("h-tipo").hidden = !bloqueia;
}
$("lab").addEventListener("change", ajustarFinalidade);

function limparErros(){
  document.querySelectorAll(".field").forEach(f => f.classList.remove("bad"));
  document.querySelectorAll(".err").forEach(e => e.textContent = "");
  $("formErr").hidden = true;
}
function erro(campo, msg){ $("f-"+campo).classList.add("bad"); $("e-"+campo).textContent = msg; }

/* ===== RF03: validação ===== */
function validar(v){
  let ok = true;
  if (!v.lab) { erro("lab","Selecione um laboratório."); ok = false; }
  if (!v.data) { erro("data","Informe a data."); ok = false; }
  else if (v.data < hojeISO()) { erro("data","A data não pode estar no passado."); ok = false; }
  if (!v.hora) { erro("hora","Selecione o horário."); ok = false; }
  if (!v.tipo) { erro("tipo","Selecione a finalidade."); ok = false; }
  if (!v.detalhe) { erro("det","Descreva a atividade."); ok = false; }
  if (!ok) return false;
  if (!v.lab.disponivel) { $("formErr").textContent = "Este laboratório está indisponível."; $("formErr").hidden = false; return false; }
  if (v.tipo === "regular" && !aceitaRegular(v.lab)) {
    erro("tipo", `${v.lab.nome} tem ${v.lab.capacidade} lugares. Laboratórios com menos de ${MIN_AULA_REGULAR} alunos não podem ser reservados para aulas regulares.`); return false;
  }
  if (reservas.some(r => r.lab.id === v.lab.id && r.data === v.data && r.hora === v.hora)) {
    $("formErr").textContent = "Este laboratório já está reservado nessa data e horário. Escolha outro horário."; $("formErr").hidden = false; return false;
  }
  return true;
}

form.addEventListener("submit", e => {
  e.preventDefault(); limparErros();
  const v = { lab: laboratorios.find(l => l.id === +$("lab").value), data: $("data").value, hora: $("hora").value,
              tipo: $("tipo").value, detalhe: $("det").value.trim() };
  if (!validar(v)) return;
  reservas.push({ ...v, professor, novo: true });
  dlg.close(); renderReservas(); ir("reservas");
  /* RF04: confirmação */
  toast(`Reserva confirmada: ${v.lab.nome}, ${fmtData(v.data)} às ${v.hora}.`);
});

let t;
function toast(msg){ $("toastMsg").textContent = msg; $("toast").classList.add("show"); clearTimeout(t); t = setTimeout(() => $("toast").classList.remove("show"), 5000); }

renderLabs(); renderReservas();
