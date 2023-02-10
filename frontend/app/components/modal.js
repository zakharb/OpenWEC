function makeInputs(inputs, modal_id){
  let modal_body = `
    <input 
      type="hidden" 
      id="${modal_id}" 
      value="">
    `
  for (const [key, value] of Object.entries(inputs)) {
    modal_body += `
      <div class="mb-3 row">
        <label 
          for="{{ name }}" 
          class="col-sm-3 col-form-label">
          ${value}
        </label>
        <div class="col-sm-9">
          <input 
            type="text" 
            class="form-control bg-secondary-subtle" 
            id="${key}" 
            value="">
        </div>
      </div>
    `
  }
  return modal_body
}

export default class vModal extends HTMLElement {
  constructor() {
    super();
    this.modal_title = "";
    this.modal_id = "";
    this.modal_inputs = "";
  }

  connectedCallback() {
    this.modal_title = this.getAttribute("modal_title");
    this.modal_id = this.getAttribute("modal_id");
    this.modal_inputs = JSON.parse(this.getAttribute("modal_inputs"));
    this.render();
  }

  render() {
    const modal_body = makeInputs(this.modal_inputs, this.modal_id)
    this.innerHTML = `
      <div class="modal modal-lg mt-5" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this.modal_title}</h5>
              <button 
                type="button" 
                class="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close">
              </button>
            </div>
            <div class="modal-body">
              ${modal_body}
              <div class="modal-footer">
                <button 
                  type="button" 
                  class="btn btn-secondary text-dark" 
                  data-bs-dismiss="modal">
                  Close
                </button>
                <button 
                  type="button" 
                  class="btn btn-danger text-dark btn-save" 
                  data-url=""
                  onclick="saveModal(this)">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("v-modal", vModal);