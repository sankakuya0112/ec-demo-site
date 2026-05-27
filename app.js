const products = [
  {
    id: "p01",
    name: "はじめての木製つみきセット",
    category: "toys",
    label: "あそび",
    price: 5800,
    image: "assets/images/product-01.jpg",
    summary: "小さな手でも持ちやすい、やさしい色合いのつみきセット。",
    stock: "在庫あり",
    leadTime: "2営業日以内",
    option: "ギフト対応"
  },
  {
    id: "p02",
    name: "おでかけキッズリュック",
    category: "care",
    label: "くらし",
    price: 4200,
    image: "assets/images/product-02.jpg",
    summary: "通園や週末のおでかけに使いやすい軽量リュック。",
    stock: "在庫あり",
    leadTime: "翌営業日",
    option: "名入れ可"
  },
  {
    id: "p03",
    name: "おやすみ絵本ギフト",
    category: "gifts",
    label: "ギフト",
    price: 3600,
    image: "assets/images/product-03.jpg",
    summary: "寝る前の親子時間に贈りやすい絵本とカードのセット。",
    stock: "残りわずか",
    leadTime: "3営業日以内",
    option: "ラッピング"
  },
  {
    id: "p04",
    name: "色あそびクレヨンボックス",
    category: "learning",
    label: "まなび",
    price: 2400,
    image: "assets/images/product-04.jpg",
    summary: "発色がやさしく、初めてのお絵かきにも使いやすいセット。",
    stock: "在庫あり",
    leadTime: "翌営業日",
    option: "まとめ買い"
  },
  {
    id: "p05",
    name: "ベビーお祝いスターター",
    category: "gifts",
    label: "ギフト",
    price: 8900,
    image: "assets/images/product-05.jpg",
    summary: "出産祝いや内祝い提案に使える、雑貨を詰めたギフト箱。",
    stock: "在庫あり",
    leadTime: "4営業日以内",
    option: "熨斗対応"
  },
  {
    id: "p06",
    name: "ふわふわブランケット",
    category: "care",
    label: "くらし",
    price: 5200,
    image: "assets/images/product-06.jpg",
    summary: "保育園やお昼寝用にも提案しやすい、肌ざわりのよい布小物。",
    stock: "在庫あり",
    leadTime: "2営業日以内",
    option: "カラー選択"
  },
  {
    id: "p07",
    name: "かずとかたちの知育カード",
    category: "learning",
    label: "まなび",
    price: 1800,
    image: "assets/images/product-07.jpg",
    summary: "年齢別おすすめ表示や関連商品の提案に向いた知育カード。",
    stock: "在庫あり",
    leadTime: "翌営業日",
    option: "年齢目安"
  },
  {
    id: "p08",
    name: "おままごとキッチン小物",
    category: "toys",
    label: "あそび",
    price: 6400,
    image: "assets/images/product-08.jpg",
    summary: "シリーズ販売やセット割の見せ方を確認しやすいサンプル商品。",
    stock: "取り寄せ",
    leadTime: "5営業日以内",
    option: "セット販売"
  },
  {
    id: "p09",
    name: "親子クラフトキット",
    category: "learning",
    label: "まなび",
    price: 3300,
    image: "assets/images/product-09.jpg",
    summary: "季節イベントやワークショップ連動の商品として見せやすいキット。",
    stock: "在庫あり",
    leadTime: "3営業日以内",
    option: "季節限定"
  },
  {
    id: "p10",
    name: "通園お名前シールセット",
    category: "care",
    label: "くらし",
    price: 1500,
    image: "assets/images/product-10.jpg",
    summary: "オプション入力や備考欄の運用を想定しやすい定番商品。",
    stock: "在庫あり",
    leadTime: "4営業日以内",
    option: "名入れ"
  },
  {
    id: "p11",
    name: "ファーストトイギフト",
    category: "gifts",
    label: "ギフト",
    price: 7200,
    image: "assets/images/product-11.jpg",
    summary: "ギフト包装、メッセージカード、配送日の指定を見せやすい商品。",
    stock: "在庫あり",
    leadTime: "2営業日以内",
    option: "メッセージ"
  },
  {
    id: "p12",
    name: "ころころ木のくるま",
    category: "toys",
    label: "あそび",
    price: 2800,
    image: "assets/images/product-12.jpg",
    summary: "商品詳細ページで素材や安全性の説明を追加しやすい玩具。",
    stock: "在庫あり",
    leadTime: "翌営業日",
    option: "素材表示"
  }
];

const state = {
  category: "all",
  search: "",
  sort: "recommended",
  cart: new Map()
};

const grid = document.querySelector("[data-product-grid]");
const searchInput = document.querySelector("[data-search]");
const sortSelect = document.querySelector("[data-sort]");
const categoryButtons = document.querySelectorAll("[data-category]");
const cartCount = document.querySelector("[data-cart-count]");
const miniCart = document.querySelector("[data-mini-cart]");
const cartSubtotal = document.querySelector("[data-cart-subtotal]");
const drawer = document.querySelector("[data-cart-drawer]");
const drawerItems = document.querySelector("[data-drawer-items]");
const drawerSubtotal = document.querySelector("[data-drawer-subtotal]");
const receiptLines = document.querySelector("[data-receipt-lines]");
const receiptTotal = document.querySelector("[data-receipt-total]");
const modal = document.querySelector("[data-product-modal]");
const modalContent = document.querySelector("[data-modal-content]");
const toast = document.querySelector("[data-toast]");
const adminProducts = document.querySelector("[data-admin-products]");

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0
});

function formatYen(value) {
  return yen.format(value);
}

function getProduct(id) {
  return products.find((product) => product.id === id);
}

function filteredProducts() {
  const search = state.search.trim().toLowerCase();
  let list = products.filter((product) => {
    const categoryMatch = state.category === "all" || product.category === state.category;
    const searchMatch = !search || product.name.toLowerCase().includes(search) || product.summary.toLowerCase().includes(search);
    return categoryMatch && searchMatch;
  });

  if (state.sort === "priceLow") list = [...list].sort((a, b) => a.price - b.price);
  if (state.sort === "priceHigh") list = [...list].sort((a, b) => b.price - a.price);
  return list;
}

function cartEntries() {
  return [...state.cart.entries()]
    .map(([id, quantity]) => ({ product: getProduct(id), quantity }))
    .filter((entry) => entry.product);
}

function cartTotal() {
  return cartEntries().reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
}

function cartQuantity() {
  return cartEntries().reduce((sum, entry) => sum + entry.quantity, 0);
}

function renderProducts() {
  const list = filteredProducts();
  grid.innerHTML = list.length ? list.map((product) => `
    <article class="product-card">
      <button class="product-media" type="button" data-open-product="${product.id}" aria-label="${product.name}の詳細を見る">
        <img src="${product.image}" alt="${product.name}">
      </button>
      <div class="product-body">
        <span class="product-tag">${product.label}</span>
        <h3>${product.name}</h3>
        <p>${product.summary}</p>
        <div class="product-meta">
          <span>${product.stock}</span>
          <span>${product.leadTime}</span>
        </div>
        <div class="product-actions">
          <strong class="price">${formatYen(product.price)}</strong>
          <button class="small-button" type="button" data-add-cart="${product.id}">追加</button>
          <button class="detail-button" type="button" data-open-product="${product.id}">詳細</button>
        </div>
      </div>
    </article>
  `).join("") : `<div class="empty-note">条件に一致する商品がありません。</div>`;
}

function renderCart() {
  const entries = cartEntries();
  cartCount.textContent = String(cartQuantity());
  cartSubtotal.textContent = formatYen(cartTotal());
  drawerSubtotal.textContent = formatYen(cartTotal());

  const empty = `<p class="empty-note">商品を追加すると、ここに内容が表示されます。</p>`;
  const miniHtml = entries.length ? entries.map((entry) => `
    <div class="mini-line">
      <span>${entry.product.name} × ${entry.quantity}</span>
      <strong>${formatYen(entry.product.price * entry.quantity)}</strong>
    </div>
  `).join("") : empty;
  miniCart.innerHTML = miniHtml;

  drawerItems.innerHTML = entries.length ? entries.map((entry) => `
    <div class="drawer-item">
      <img src="${entry.product.image}" alt="${entry.product.name}">
      <div>
        <strong>${entry.product.name}</strong>
        <span>${formatYen(entry.product.price)}</span>
        <div class="quantity-control">
          <button type="button" data-qty-minus="${entry.product.id}">-</button>
          <span>${entry.quantity}</span>
          <button type="button" data-qty-plus="${entry.product.id}">+</button>
          <button type="button" data-remove="${entry.product.id}">削除</button>
        </div>
      </div>
    </div>
  `).join("") : empty;

  receiptLines.innerHTML = entries.length ? entries.map((entry) => `
    <div class="receipt-line">
      <span>${entry.product.name} × ${entry.quantity}</span>
      <strong>${formatYen(entry.product.price * entry.quantity)}</strong>
    </div>
  `).join("") : `<p class="empty-note">カートに商品を入れると注文確認の表示が変わります。</p>`;
  receiptTotal.textContent = formatYen(cartTotal());
}

function addToCart(id) {
  state.cart.set(id, (state.cart.get(id) || 0) + 1);
  renderCart();
  showToast(`${getProduct(id).name}をカートに追加しました。`);
}

function changeQuantity(id, diff) {
  const next = (state.cart.get(id) || 0) + diff;
  if (next <= 0) state.cart.delete(id);
  else state.cart.set(id, next);
  renderCart();
}

function openCart() {
  drawer.classList.add("active");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function closeCart() {
  drawer.classList.remove("active");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
}

function openProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  modalContent.innerHTML = `
    <div class="modal-layout">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <span class="product-tag">${product.label}</span>
        <h2>${product.name}</h2>
        <p>${product.summary}</p>
        <dl class="detail-list">
          <div><dt>価格</dt><dd>${formatYen(product.price)}</dd></div>
          <div><dt>在庫</dt><dd>${product.stock}</dd></div>
          <div><dt>出荷目安</dt><dd>${product.leadTime}</dd></div>
          <div><dt>オプション</dt><dd>${product.option}</dd></div>
        </dl>
        <button class="primary-button" type="button" data-add-cart="${product.id}">カートに追加</button>
      </div>
    </div>
  `;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("active");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("active"), 2400);
}

function renderAdminProducts() {
  adminProducts.innerHTML = products.slice(0, 6).map((product) => `
    <tr>
      <td>${product.name}</td>
      <td>${product.label}</td>
      <td>${product.stock}</td>
      <td><span class="status paid">公開中</span></td>
    </tr>
  `).join("");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  const addId = target.dataset.addCart;
  const openId = target.dataset.openProduct;
  const category = target.dataset.category;

  if (addId) addToCart(addId);
  if (openId) openProduct(openId);
  if (target.matches("[data-open-cart]")) openCart();
  if (target.matches("[data-close-cart]")) closeCart();
  if (target.matches("[data-close-modal]")) closeModal();
  if (target.matches("[data-feature-add]")) addToCart("p01");
  if (target.matches("[data-demo-complete]")) showToast("デモ注文が完了しました。実際の保存・送信は行われません。");
  if (target.dataset.qtyPlus) changeQuantity(target.dataset.qtyPlus, 1);
  if (target.dataset.qtyMinus) changeQuantity(target.dataset.qtyMinus, -1);
  if (target.dataset.remove) {
    state.cart.delete(target.dataset.remove);
    renderCart();
  }
  if (category) {
    state.category = category;
    categoryButtons.forEach((button) => button.classList.toggle("active", button.dataset.category === category));
    renderProducts();
  }
  if (target.dataset.adminTab) {
    document.querySelectorAll("[data-admin-tab]").forEach((button) => button.classList.toggle("active", button === target));
    document.querySelectorAll("[data-admin-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.adminPanel === target.dataset.adminTab));
  }
});

searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  renderProducts();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  renderProducts();
});

drawer.addEventListener("click", (event) => {
  if (event.target === drawer) closeCart();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeModal();
  }
});

renderProducts();
renderCart();
renderAdminProducts();
