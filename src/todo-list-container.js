// https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements

class TodoListContainer extends HTMLElement {
  constructor() {
    super();

    this.todoList = ["reading novels", "playing soccer"];
    this.newTodo = "";
  }

  /** イベントリスナーの登録 */

  connectedCallback() {
    // <todo-list> 初回時のレンダー
    this.addEventListener("todo-list-initial-render", this.onPaintTodoList);
    // <todo-create-box> の入力があったときに発火
    this.addEventListener("set-new-todo", this.onSetNewTodo);
    // <todo-create-box> の add ボタン押下時に発火
    this.addEventListener("add-new-todo", this.onAddTodo);
  }

  /** プロパティ変更 */

  onSetNewTodo(event) {
    this.newTodo = event.detail.newTodo;
  }

  onAddTodo() {
    if (this.newTodo === "") return;

    this.todoList = [...this.todoList, this.newTodo];
    this.newTodo = "";

    this.onPaintTodoList();
    this.onResetInputValue();
  }

  /** 子要素やそれらの属性の変更 */

  // for <todo-list>
  onPaintTodoList() {
    const todoListElement = this.querySelector("todo-list");
    todoListElement.todoList = this.todoList;
  }
  // for <todo-create-box>
  onResetInputValue() {
    const inputElement = this.querySelector("todo-create-box");
    inputElement.value = "";
  }
}

/**
 * コンポーネント (カスタムエレメント) の定義
 * see: https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define
 */

customElements.define("todo-list-container", TodoListContainer);
