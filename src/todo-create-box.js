class TodoCreateBox extends HTMLElement {
  /** カスタムプロパティの監視 (camelCase は使用できない) */

  static observedAttributes = ["value"];

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.render();

    this.input = this.shadowRoot.querySelector("#input");
    this.button = this.shadowRoot.querySelector("#button");
  }

  connectedCallback() {
    this.input.addEventListener("input", this.onSetNewTodo);
    this.button.addEventListener("click", this.onAddTodo);
  }

  /**
   * カスタムプロパティに変更があった場合に呼び出される
   * see: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes
   */

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "value":
        this.input.value = newValue;
        break;
    }
  }

  /** ゲッターとセッター */

  get value() {
    return this.getAttribute("value");
  }
  set value(text) {
    this.setAttribute("value", text);
  }

  /**
   * カスタムイベントを発火するメソッド群
   * dispatchEvent: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
   * CustomEvent: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
   */

  onSetNewTodo(event) {
    this.dispatchEvent(
      new CustomEvent("set-new-todo", {
        bubbles: true, // イベントのバブリング (親要素に伝播) をする
        composed: true, // この shadow DOM の外側の要素に対してもイベントを伝える
        detail: {
          newTodo: event.target.value, // リスナーは event.detail.newTodo でここで登録した値を受け取ることができる
        },
      })
    );
  }

  onAddTodo(_event) {
    this.dispatchEvent(
      new CustomEvent("add-new-todo", {
        bubbles: true,
        composed: true,
      })
    );
  }

  /** DOM 要素の設定 */

  render() {
    this.shadowRoot.innerHTML = `
      <input id="input" value=${!!this.value ? this.value : ""}>
      <button id="button">add</button>
    `;
  }
}

customElements.define("todo-create-box", TodoCreateBox);
