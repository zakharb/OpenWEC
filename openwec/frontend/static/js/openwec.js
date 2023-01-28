// table
function loadTable(table, url, tds, search_input){
  fetch(url)
    .then((response) => response.json())
    .then((data) => fillTable(table, data, tds, url, search_input))
}

function fillTable(table, data, tds, url, search_input){
  table = document.getElementById(table)
  body = table.getElementsByTagName('tbody')[0]
  body.innerHTML = ''
  data.forEach(e => {
    row = body.insertRow()
    row.setAttribute("id", e._id)
    row.dataset.url = url
    addRow(row, e, tds)
  })
  searchRow(search_input)
}

function expandTable(table){
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    table = document.getElementById(table)
    //trs = table.getElementsByTagName("tr")
    trs = document.getElementsByTagName("tr")
    for (i = 1, j = 0; i < trs.length && j < 20; i++) {
      if ((trs[i].dataset.found = true) && (trs[i].style.display)) {
        trs[i].style.display = ""
        j++
      }
    }
  }
}

function updateRow(table_name, data){
  table = document.getElementById(table_name)
  body = table.getElementsByTagName('tbody')[0]
  thead = table.getElementsByTagName('thead')[0]
  tds = thead.getElementsByTagName('th')
  td_names = []
  for (i = 1; i < tds.length; i++){
    td_names.push(tds[i].dataset.name)
  }
  row = document.getElementById(data['_id'])
  if (!row) {
    row = body.insertRow()
  }
  addRow(row, data, td_names)
}

function addRow(row, data, tds){
  row.innerHTML=`
  <td>
    <input 
      class="form-check-input bg-secondary-subtle" 
      type="checkbox" 
      onclick="checkRow(this)"
      id="check_row"
      value="` + data._id + `">
  </td>`
  for (td of tds) {
    td_html = `<td onclick="showEditModal(this)">` + data[td] + `</td>`
    row.innerHTML += td_html
  }
}

function searchRow(search_input) {
  input = document.getElementById(search_input)
  filter = input.value.toUpperCase()
  tr = document.getElementsByTagName("tr")
  for (i = 1; i < tr.length; i++) {
    tds = tr[i].getElementsByTagName("td")
    ths = tr[i].getElementsByTagName("th")
    tr[i].style.display = "none"
    matched = false
    if (ths.length > 0) {
      matched = true
    }
    else {
      for (j = 0; j < tds.length; j++) {
        td = tds[j]
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          matched = true
          break
        }
      }
    }
    if (matched == true) {
      tr[i].style.display = ""
      tr[i].dataset.found = true
    }
    else {
      tr[i].style.display = "none"
      tr[i].dataset.found = false
    }
    if (i > 20) {
      tr[i].style.display = "none"
    }
  }
}

function checkRow(e){
  panel = document.getElementById('panel')
  panel.classList.add('d-none')
  second_panel = document.getElementById('second_panel')
  second_panel.classList.remove('d-none')
  checked_count = document.getElementById('checked_count')
  if (checked_count){
    count = checked_count.textContent
  }
  if (e.checked){
    count++
  }
  else{
    count--
  }
  if (count == 0 ){
    check_allrow = document.getElementById('check_allrow')
    check_allrow.checked = false
    second_panel.classList.add('d-none')
    panel.classList.remove('d-none')
  }
  checked_count.textContent = count
}

function checkAllRow(e){
  panel = document.getElementById('panel')
  second_panel = document.getElementById('second_panel')
  checked_count = document.getElementById('checked_count')
  panel.classList.add('d-none')
  second_panel.classList.remove('d-none')
  tr = document.getElementsByTagName("tr")
  count = 0
  for (i = 1; i < tr.length; i++) {
    if (tr[i].style.display != "none"){
      if (e.checked){
        tr[i].children[0].children[0].checked = true
        count++
      }
      else{
        tr[i].children[0].children[0].checked = false
        count == 0
      }
    }
  }
  if (count == 0 ){
    second_panel.classList.add('d-none')
    panel.classList.remove('d-none')
  }  
  checked_count.textContent = count
}

function deleteRow(e, table_name, search_input){
  table = document.getElementById(table_name);
  panel=document.getElementById('panel');
  second_panel=document.getElementById('second_panel');
  trs = table.getElementsByTagName("tr");
  url = e.parentElement.dataset.url
  panel.classList.remove('d-none');
  second_panel.classList.add('d-none');
  for (i = 1; i < trs.length; i++) {
    if (trs[i].style.display != "none"){
      check_box = trs[i].children[0].children[0];
      id = trs[i].id
      url = trs[i].dataset.url
      if ( check_box.checked == true){
        table.deleteRow(i);
        i--;
        fetch(url + id, {
          method: 'DELETE' 
        })
          .then((response) => {
            if (response.ok) {
              showToast("Success", "Deleted")
              return response.json()
            } else {
              showToast("Error", "Not deleted")
            }
          })
      }
    }
  }
  searchRow(search_input);
  document.getElementById('check_allrow').checked = false;
}

// function copyRow(e, table_name, search_input){
//   table = document.getElementById(table_name);
//   body=table.getElementsByTagName('tbody')[0];
//   panel=document.getElementById('panel');
//   second_panel=document.getElementById('second_panel');
//   trs = table.getElementsByTagName("tr");
//   url = e.parentElement.dataset.url
//   main_panel.classList.remove('d-none');
//   panel.classList.add('d-none');
//   for (i = 1; i < tr.length; i++) {
//     if (tr[i].style.display != "none"){
//       check_box = tr[i].children[0].children[0].children[0];
//       if ( check_box.checked == true){
//         check_box.checked = false;
//         fetch(url + check_box.value + "/copy")
//           .then((response) => {
//             return response.text();
//           })
//           .then((data) => {
//             var oData = JSON.parse(data);
//             let myAlert = document.querySelector('.toast');
//             let bsAlert = new bootstrap.Toast(myAlert);
//             insertRow(oData.doc, body)
//             document.getElementById("toast_value").innerHTML = oData.text;
//             bsAlert.show();
//           });
//       }
//     }
//   }
//   searchRow(search_input);
//   document.getElementById('check_allrow').checked = false;
// }

// toast
function showToast(header_info, body_info){
  toast = document.getElementById('toast');
  bsAlert = new bootstrap.Toast(toast);
  header = toast.getElementsByClassName("header")[0]
  header.innerHTML = header_info
  body = toast.getElementsByClassName("toast-body")[0]
  body.innerHTML = body_info
  bsAlert.show();
}

// modal
function showAddModal(e){
  url = e.dataset.url
  modal = document.getElementById('modal')
  myModal = new bootstrap.Modal(modal)
  modal_body = modal.getElementsByClassName('modal-body')[0]
  inputs = modal_body.getElementsByTagName('input')
  btn = modal.getElementsByClassName('btn-save')[0]
  btn.dataset.url = url
  btn.dataset.method = 'POST'
  for (input of inputs) {
    input.value = ''
  }
  myModal.show()
}

function showEditModal(e){
  id = e.parentElement.id
  url = e.parentElement.dataset.url
  modal = document.getElementById('modal')
  myModal = new bootstrap.Modal(modal)
  modal_body = modal.getElementsByClassName('modal-body')[0]
  inputs = modal_body.getElementsByTagName('input')
  btn = modal.getElementsByClassName('btn-save')[0]
  fetch(url + id)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      for (input of inputs) {
        input.value = data[input.id]
      }
      btn.dataset.url = url + id
      btn.dataset.method = 'PUT'
      myModal.show()
    })
}  

function saveModal(e){
  modal = document.getElementById('modal')
  myModal = bootstrap.Modal.getInstance(modal)
  modal_body = modal.getElementsByClassName('modal-body')[0]
  inputs = modal_body.getElementsByTagName('input')
  data = {}
  for (input of inputs) {
    data[input.id] = input.value
    input.value = ""
  }
  fetch(e.dataset.url, {
    method: e.dataset.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),    
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      updateRow("table", data)
    })
  myModal.hide()
}
