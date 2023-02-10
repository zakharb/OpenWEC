function makeInputs(inputs, modal_id){
  let body = `
    <input 
      type="hidden" 
      id="${modal_id}" 
      value="">
    `
  for (const [key, value] of Object.entries(inputs)) {
    body += `
      <div class="mb-3 row">
          <input 
            type="text" 
            class="form-control bg-secondary-subtle" 
            id="${key}" 
            placeholder="${value}" 
            value="">
      </div>
    `
  }
  return body
}

export default class vTableFilter extends HTMLElement {
  constructor() {
    super();
    this.title = "";
    this.modal_id = "";
    this.modal_inputs = "";
  }

  connectedCallback() {
    this.title = this.getAttribute("title");
    this.modal_id = this.getAttribute("modal_id");
    this.modal_inputs = JSON.parse(this.getAttribute("modal_inputs"));
    this.render();
  }

  render() {
    const body = makeInputs(this.modal_inputs, this.modal_id)
    this.innerHTML = `
      <div class="offcanvas offcanvas-end" 
           tabindex="-1" 
           id="offcanvasRight" 
           aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">
            Filter
          </h5>
          <button type="button" 
                  class="btn btn-danger">
                  Apply
          </button>
          <button type="button" 
                  class="btn-close" 
                  data-bs-dismiss="offcanvas" 
                  aria-label="Close">
          </button>
        </div>
        <div class="offcanvas-body">
          ${body}
        </div>
      </div>
    `;
  }
}

customElements.define("v-table-filter", vTableFilter);