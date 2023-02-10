export default class vTablePanel extends HTMLElement {
  constructor() {
    super();
    this.table_name = "";
  }

  connectedCallback() {
    this.table_name = this.getAttribute("table_name");
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="row mx-4 mt-4" id="panel_one">
        <div class="col-4">
          <h4>
            ${this.table_name}
            <span 
              class="badge bg-danger text-dark shadow"
              id="table_count">
            </span>
          </h4>
        </div>
        <div class="col d-flex flex-row-reverse mb-5">
          <a 
            class="btn btn-lg btn-secondary text-dark shadow mx-1" 
            data-toggle="tooltip" 
            title="Filter"
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasRight" 
            aria-controls="offcanvasRight"
            >
            <i class="fa-solid fa-filter"></i>
          </a>
          <a 
            class="btn btn-lg btn-secondary text-dark shadow mx-1" 
            data-toggle="tooltip" 
            title="Save"
            href="">
            <i class="fas fa-file-archive"></i>
          </a>
          <a 
            class="btn btn-lg btn-danger text-dark shadow mx-1" 
            data-toggle="tooltip" 
            title="Add"
            onclick="showAddModal(this)">
            <i class="fas fa-plus"></i>
          </a>
          <input
            class="form-control bg-secondary-subtle mx-3" 
            type="text" 
            placeholder="Search..." 
            onkeyup="searchRow(this)"
            id="search_input">
        </div>                          
      </div>
      <div class="row mx-4 mt-4 d-none" id="panel_two">
        <div class="col-2">
          <h4>
            Selected
            <span 
              class="badge bg-danger text-dark shadow"
              id="checked_count">
            </span>
          </h4>
        </div>
        <div class="col d-flex flex-row-reverse mb-5">
          <a 
            class="btn btn-lg btn-danger text-dark shadow mx-1" 
            title="Delete"
            onclick="deleteRow(this)">
            <i class="fas fa-trash-alt"></i>
          </a>
          <a 
            class="btn btn-lg btn-secondary text-dark shadow mx-1" 
            title="Save"
            onclick="">
            <i class="fas fa-file-import"></i>
          </a>
          <a 
            class="btn btn-lg btn-secondary text-dark shadow mx-1" 
            title="Copy"
            onclick="copyRow(this)">
            <i class="fas fa-copy"></i>
          </a>
        </div>          
      </div>

    `;
  }
}

customElements.define("v-table-panel", vTablePanel);