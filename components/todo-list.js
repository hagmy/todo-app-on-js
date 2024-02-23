class TodoList extends HTMLElement {
  static observedAttributes = ["todolist"];

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  /**
   * ドキュメントが作成されたタイミングで DOM 要素を設定する
   * see: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks
   */

  connectedCallback() {
    this.initialRender();
  }

  /** カスタムプロパティに変更があった場合に呼び出される */

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "todolist":
        this.render();
        break;
    }
  }

  /** ゲッターとセッター */

  get todoList() {
    // setAttribute 時に string に変換されるため配列化する
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    const todoListArray = this.getAttribute("todoList")?.split(",");
    return todoListArray;
  }
  set todoList(value) {
    this.setAttribute("todolist", value);
  }

  /** DOM 要素の設定 */

  initialRender() {
    this.dispatchEvent(
      new CustomEvent("todo-list-initial-render", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.todoList || this.todoList.length < 1) {
      this.shadowRoot.innerHTML = `<ul></ul>`;
      return;
    }

    const todoListHTML = this.todoList?.map((todo) => {
      return `
        <li>${todo}</li>
      `;
    });
    this.shadowRoot.innerHTML = `<ul>${todoListHTML?.join("")}</ul>`;
  }
}

customElements.define("todo-list", TodoList);
