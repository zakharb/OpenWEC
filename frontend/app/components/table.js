import vTablePanel from './table_panel.js';
import vTableFilter from './table_filter.js';
import vModal from './modal.js';

function makeThead(tds){
  let thead = `
    <th>
      <input 
        class="form-check-input bg-secondary-subtle" 
        type="checkbox" 
        onclick="checkAllRow(this)"
        id="check_allrow">
    </th>`
  for (const [key, value] of Object.entries(tds)) {
    thead += `
      <th
        data-name="${key}"
        onclick="sortTableByColumn(this)">
        ${value}
      </th>`
  }
  return thead
}

export class vTable extends HTMLElement {
  constructor() {
    super();
    this.table_id = "";
    this.table_name = "";
    this.table_url = "";
    this.table_row_id = "";
    this.table_tds = "";
    this.modal_inputs = "";
    this.modal_title = "";
  }

  connectedCallback() {
    this.table_id = this.getAttribute("table_id");
    this.table_name = this.getAttribute("table_name");
    this.table_url = this.getAttribute("table_url");
    this.table_row_id = this.getAttribute("table_row_id");
    this.table_tds = JSON.parse(this.getAttribute("table_tds"));
    this.modal_inputs = this.getAttribute("modal_inputs");
    this.modal_title = this.dataset.modal_title;
    this.render();
    loadTable(this.table_id)
    document.addEventListener('scroll', function () {
        expandTable("table")
    }, { passive: true });
  }

  render() {
    const thead = makeThead(this.table_tds)
    this.innerHTML = `
      <div class="table-responsive" 
           id="${this.table_id}"
           data-url="${this.table_url}"
           data-rowid="${this.table_row_id}">
        <v-table-panel
          table_name=${this.table_name}
        ></v-table-panel>
        <table class="table">
          <thead>
            <tr>
              ${thead}
            </tr>    
          </thead>
          <tbody>
          </tbody>
        </table>
        <v-modal
          modal_inputs=${this.modal_inputs}
          modal_title=${this.modal_title}
        ></v-modal>
        <v-table-filter
          modal_inputs=${this.modal_inputs}
        ></v-table-filter>
      </div>
    `;
  }
}

customElements.define("v-table", vTable);