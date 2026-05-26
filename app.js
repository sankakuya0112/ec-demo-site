const products = [
  {
    id: "p01",
    name: "アーバンモビリティセット",
    category: "wellness",
    label: "ヘルス",
    price: 42800,
    image: "assets/images/product-01.jpg",
    summary: "日々の移動を軽やかにする、使いやすさ重視のサンプル商品。",
    stock: "在庫あり",
    leadTime: "2営業日以内",
    option: "カラー選択"
  },
  {
    id: "p02",
    name: "ライトキャリーバッグ",
    category: "lifestyle",
    label: "暮らし",
    price: 12800,
    image: "assets/images/product-02.jpg",
    summary: "店舗らしいセレクト感を演出しやすい、軽量バッグのサンプル。",
    stock: "残りわずか",
    leadTime: "3営業日以内",
    option: "ギフト対応"
  },
  {
    id: "p03",
    name: "季節のフードギフト",
    category: "food",
    label: "食品",
    price: 4980,
    image: "assets/images/product-03.jpg",
    summary: "ギフト、定期便、セット販売などの見せ方に使いやすい商品。",
    stock: "在庫あり",
    leadTime: "翌営業日",
    option: "熨斗対応"
  },
  {
    id: "p04",
    name: "デイリーケアパック",
    category: "lifestyle",
    label: "暮らし",
    price: 8900,
    image: "assets/images/product-04.jpg",
    summary: "まとめ買いや法人購入のサンプルに向いた日用品セット。",
    stock: "在庫あり",
    leadTime: "2営業日以内",
    option: "ケース販売"
  },
  {
    id: "p05",
    name: "ワークサポートチェア",
    category: "office",
    label: "法人向け",
    price: 31800,
    image: "assets/images/product-05.jpg",
    summary: "法人向け備品、見積依頼、複数配送の説明に使える商品。",
    stock: "取り寄せ",
    leadTime: "5営業日以内",
    option: "見積対応"
  },
  {
    id: "p06",
    name: "コンフォートウェア",
    category: "lifestyle",
    label: "暮らし",
    price: 7600,
    image: "assets/images/product-06.jpg",
    summary: "サイズやカラーのバリエーション表示に向いたサンプル商品。",
    stock: "在庫あり",
    leadTime: "翌営業日",
    option: "サイズ選択"
  },
  {
    id: "p07",
    name: "リラックスホームセット",
    category: "wellness",
    label: "ヘルス",
    price: 15600,
    image: "assets/images/product-07.jpg",
    summary: "暮らしの悩みに寄り添う商品説明や比較表の例にできます。",
    stock: "在庫あり",
    leadTime: "3営業日以内",
    option: "比較表示"
  },
  {
    id: "p08",
    name: "プレミアムケアツール",
    category: "office",
    label: "法人向け",
    price: 24600,
    image: "assets/images/product-08.jpg",
    summary: "仕様表、保証情報、導入相談の導線を見せやすい商品。",
    stock: "在庫あり",
    leadTime: "4営業日以内",
    option: "保証付き"
  },
  {
    id: "p09",
    name: "ファミリー消耗品セット",
    category: "lifestyle",
    label: "暮らし",
    price: 6200,
    image: "assets/images/product-09.jpg",
    summary: "定期購入、まとめ買い割引、配送頻度の表示に向いた商品。",
    stock: "在庫あり",
    leadTime: "翌営業日",
    option: "定期便"
  },
  {
    id: "p10",
    name: "オフィス衛生スターター",
    category: "office",
    label: "法人向け",
    price: 18800,
    image: "assets/images/product-10.jpg",
    summary: "部署単位の購入や請求書払いを想定した法人向けサンプル。",
    stock: "在庫あり",
    leadTime: "2営業日以内",
    option: "請求書払い"
  },
  {
    id: "p11",
    name: "ウェルネスギフトボックス",
    category: "food",
    label: "食品",
    price: 9800,
    image: "assets/images/product-11.jpg",
    summary: "ギフトラッピング、メッセージカード、複数配送に展開可能。",
    stock: "在庫あり",
    leadTime: "3営業日以内",
    option: "ギフト包装"
  },
  {
    id: "p12",
    name: "スマートホーム備品",
    category: "wellness",
    label: "ヘルス",
    price: 22400,
    image: "assets/images/product-12.jpg",
    summary: "機能説明、動画、よくある質問の追加に向いたサンプル商品。",
    stock: "取り寄せ",
    leadTime: "5営業日以内",
    option: "動画説明"
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
const filterButtons = document.querySelectorAll("[data-category]");
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

  if (state.sort === "priceLow") {
    list = [...list].sort((a, b) => a.price - b.price);
  }

  if (state.sort === "priceHigh") {
    list = [...list].sort((a, b) => b.price - a.price);
  }

  return list;
}

function renderProducts() {
  const list = filteredProducts();

  if (!list.length) {
    grid.innerHTML = `<div class="empty-note">条件に一致する商品がありません。</div>`;
    return;
  }

  grid.innerHTML = list.map((product) => `
    <article class="product-card">
      <button class="product-media" type="button" data-open-product="${product.id}" aria-label="${product.name}の詳細を見る">
        <img src="${product.image}" alt="${product.name}">
      </button>
      <div class="product-body">
        <span class="product-tag">${product.label}</span>
        <h3>${product.name}</h3>
        <p>${product.summary}</p>
        <div class="product-actions">
          <strong class="price">${formatYen(product.price)}</strong>
          <button class="small-button" type="button" data-add-cart="${product.id}">追加</button>
          <button class="detail-button" type="button" data-open-product="${product.id}">詳細</button>
        </div>
      </div>
    </article>
  `).join("");
}

function cartEntries() {
  return [...state.cart.entries()].map(([id, quantity]) => ({
    product: getProduct(id),
    quantity
  })).filter((entry) => entry.product);
}

function cartTotal() {
  return cartEntries().reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
}

function cartQuantity() {
  return cartEntries().reduce((sum, entry) => sum + entry.quantity, 0);
}

function addToCart(id) {
  const current = state.cart.get(id) || 0;
  state.cart.set(id, current + 1);
  renderCart();
  showToast(`${getProduct(id).name}をカートに追加しました。`);
}

function changeQuantity(id, difference) {
  const current = state.cart.get(id) || 0;
  const next = current + difference;

  if (next <= 0) {
    state.cart.delete(id);
  } else {
    state.cart.set(id, next);
  }

  renderCart();
}

function cartLineTemplate(product, quantity, controls = false) {
  const controlsMarkup = controls
    ? `<div class="qty-controls" aria-label="${product.name}の数量">
        <button type="button" data-cart-action="decrease" data-id="${product.id}">-</button>
        <span>${quantity}</span>
        <button type="button" data-cart-action="increase" data-id="${product.id}">+</button>
      </div>`
    : `<span>${quantity}点</span>`;

  return `
    <div class="cart-line">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <strong>${product.name}</strong>
        <span>${formatYen(product.price)}</span>
      </div>
      ${controlsMarkup}
    </div>
  `;
}

function renderCart() {
  const entries = cartEntries();
  const total = cartTotal();
  cartCount.textContent = String(cartQuantity());
  cartSubtotal.textContent = formatYen(total);
  drawerSubtotal.textContent = formatYen(total);
  receiptTotal.textContent = formatYen(total);

  if (!entries.length) {
    const empty = `<p class="empty-note">商品を追加すると、ここに内容が表示されます。</p>`;
    miniCart.innerHTML = empty;
    drawerItems.innerHTML = empty;
    receiptLines.innerHTML = `<p class="empty-note">カートの商品が注文確認に反映されます。</p>`;
    return;
  }

  miniCart.innerHTML = entries.slice(0, 3).map((entry) => cartLineTemplate(entry.product, entry.quantity)).join("");
  drawerItems.innerHTML = entries.map((entry) => cartLineTemplate(entry.product, entry.quantity, true)).join("");
  receiptLines.innerHTML = entries.map((entry) => `
    <div class="receipt-line">
      <div>
        <strong>${entry.product.name}</strong>
        <span>${entry.quantity}点 / ${entry.product.option}</span>
      </div>
      <strong>${formatYen(entry.product.price * entry.quantity)}</strong>
    </div>
  `).join("");
}

function openCart() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
}

function openProduct(id) {
  const product = getProduct(id);
  modalContent.innerHTML = `
    <div class="modal-product">
      <div class="modal-product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div>
        <p class="kicker">${product.label}</p>
        <h2>${product.name}</h2>
        <strong class="price">${formatYen(product.price)}</strong>
        <p>${product.summary} 商品詳細、仕様表、FAQ、レビュー、関連商品などをここへ追加できます。</p>
        <div class="spec-list">
          <div><span>在庫</span>${product.stock}</div>
          <div><span>出荷目安</span>${product.leadTime}</div>
          <div><span>販売形式</span>${product.option}</div>
          <div><span>拡張例</span>レビュー / 動画 / 見積</div>
        </div>
        <button class="primary-button" type="button" data-add-cart="${product.id}">カートに入れる</button>
      </div>
    </div>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProduct() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function renderAdminProducts() {
  adminProducts.innerHTML = products.slice(0, 6).map((product, index) => `
    <tr>
      <td>${product.name}</td>
      <td>${product.label}</td>
      <td>${index % 3 === 0 ? "取り寄せ" : "在庫あり"}</td>
      <td><span class="status paid">公開中</span></td>
    </tr>
  `).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-cart]");
  if (addButton) {
    addToCart(addButton.dataset.addCart);
  }

  const openButton = event.target.closest("[data-open-product]");
  if (openButton) {
    openProduct(openButton.dataset.openProduct);
  }

  if (event.target.closest("[data-open-cart]")) {
    openCart();
  }

  if (event.target.closest("[data-close-cart]")) {
    closeCart();
  }

  if (event.target.closest("[data-close-cart-link]")) {
    closeCart();
  }

  if (event.target.closest("[data-close-modal]")) {
    closeProduct();
  }

  if (event.target === drawer) {
    closeCart();
  }

  if (event.target === modal) {
    closeProduct();
  }

  const cartAction = event.target.closest("[data-cart-action]");
  if (cartAction) {
    changeQuantity(cartAction.dataset.id, cartAction.dataset.cartAction === "increase" ? 1 : -1);
  }

  if (event.target.closest("[data-feature-add]")) {
    addToCart("p01");
  }

  if (event.target.closest("[data-demo-complete]")) {
    if (!cartEntries().length) {
      addToCart("p03");
    }
    showToast("デモ注文が完了しました。実際の送信や決済は行われません。");
  }

  const adminTab = event.target.closest("[data-admin-tab]");
  if (adminTab) {
    document.querySelectorAll("[data-admin-tab]").forEach((button) => button.classList.remove("active"));
    document.querySelectorAll("[data-admin-panel]").forEach((panel) => panel.classList.remove("active"));
    adminTab.classList.add("active");
    document.querySelector(`[data-admin-panel="${adminTab.dataset.adminTab}"]`).classList.add("active");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.category = button.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeProduct();
  }
});

renderProducts();
renderCart();
renderAdminProducts();
