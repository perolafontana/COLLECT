// Chave usada no localStorage
const STORAGE_KEY = "collect_items";

// Recupera itens salvos
function getItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// Salva novo item
function saveItem(item) {
  const items = getItems();
  items.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Renderiza galeria com filtro
function renderGallery(filterCategory = "todos") {
  const el = document.querySelector("#gallery");
  if (!el) return;

  const items = getItems();
  const filtered = filterCategory === "todos"
    ? items
    : items.filter(i => i.categoria === filterCategory);

  el.innerHTML = filtered.map(i => `
    <div class="item">
      <img src="${i.foto || ""}" alt="${i.nome || "Item"}" onerror="this.src='';">
      <div class="meta">
        <div class="name">${i.nome || "Sem nome"}</div>
        <div class="small">Categoria: ${i.categoria}</div>
        <div class="small">Tipo: ${i.tipo || "-"}</div>
        <div class="small">Data: ${i.data || "-"}</div>
      </div>
    </div>
  `).join("");
}

// Configura filtro da galeria
function setupFilters() {
  const select = document.querySelector("#filterCategoria");
  if (!select) return;
  select.addEventListener("change", () => renderGallery(select.value));
}

// Cadastro de coleção
function handleCadastroSubmit() {
  const form = document.querySelector("#formCadastroItem");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const file = data.get("foto");
    let fotoURL = "";
    if (file && file.size > 0) {
      fotoURL = URL.createObjectURL(file);
    }

    const item = {
      nome: data.get("nome"),
      categoria: data.get("categoria"),
      tipo: data.get("tipo"),
      data: data.get("data"),
      foto: fotoURL
    };
    saveItem(item);

    // Vai direto para a galeria na página principal
    window.location.href = "principal.html#galeria";
  });
}

// Fluxos de login, cadastro e senha
function handleAuthFlows() {
  const loginForm = document.querySelector("#formLogin");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Aqui você poderia validar credenciais
      window.location.href = "principal.html";
    });
  }

  const cadastroForm = document.querySelector("#formCadastro");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "principal.html";
    });
  }

  const senhaForm = document.querySelector("#formSenha");
  if (senhaForm) {
    senhaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Se existir uma conta com este e-mail, enviaremos instruções.");
    });
  }

  // Botões de login social
  document.querySelectorAll("[data-social]").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "account-link.html";
    });
  });
}

// Se houver hash na URL, rola até a seção
function scrollToHash() {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  renderGallery("todos");
  handleCadastroSubmit();
  handleAuthFlows();
  scrollToHash();
});
