//table
function switchPage(e) {
  fetch(e.dataset.url)
  .then((response) => response.text())
  .then((data) => document.querySelector('#page_data').innerHTML=data)
  }
  
function loadTable(table_id){
  let table = document.querySelector("#" + table_id)
  fetch(table.dataset.url)
  .then((response) => response.json())
  .then((data) => fillTable(table, data))
}

function fillTable(table, data){
  let body = table.querySelector('tbody')
  let ths = table.querySelectorAll('th')
  let row_id = table.dataset.rowid
  let tds = getTds(ths)
  body.innerHTML = ''
  for (let i = 0; i < data.length; i++){
    let row = body.insertRow()
    if ( i > 20 ) {
      row.setAttribute("style", "display:none")
    } else {
      row.setAttribute("style", "display:")
    }
    row.id = data[i][row_id]
    row.dataset.found = true
    addRow(row, data[i], tds)
  }
  table.closest(".table-responsive").querySelector('#table_count').textContent = data.length
}

function getTds(ths) {
  let tds = []
  for (let i = 1; i < ths.length; i++){
    tds.push(ths[i].dataset.name)
  }
  return tds  
}

function addRow(row, data, tds){
  row.innerHTML=`
  <td>
    <input 
      class="form-check-input bg-secondary-subtle"
      type="checkbox"
      onclick="checkRow(this)">
  </td>`
  for (td of tds) {
    row.innerHTML += `<td onclick="showEditModal(this)">` + data[td] + `</td>`
  }
}

function expandTable(table_id){
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    let table = document.querySelector("#" + table_id)
    let trs = table.querySelectorAll("tr")
    for (let i = 1, j = 0; i < trs.length && j < 20; i++) {
      if ((trs[i].dataset.found = true) && (trs[i].style.display)) {
        trs[i].style.display = ""
        j++
      }
    }
  }
}
 
function checkRow(e){
  let table = e.closest(".table-responsive")
  let panel_one = table.querySelector('#panel_one')
  let panel_two = table.querySelector('#panel_two')
  let checked_count = table.querySelector('#checked_count')
  let check_allrow = table.querySelector('#check_allrow')
  panel_one.classList.add('d-none')
  panel_two.classList.remove('d-none')
  count = checked_count.textContent
  if (e.checked) {
    count++
  } else {
    count--
  }
  if (count == 0) {
    check_allrow.checked = false
    panel_two.classList.add('d-none')
    panel_one.classList.remove('d-none')
  }
  checked_count.textContent = count
}

function checkAllRow(e){
  let table = e.closest(".table-responsive")
  let panel_one = table.querySelector('#panel_one')
  let panel_two = table.querySelector('#panel_two')
  let checked_count = table.querySelector('#checked_count')
  let trs = table.querySelectorAll("tr")
  panel_one.classList.add('d-none')
  panel_two.classList.remove('d-none')
  count = 0
  for (i = 1; i < trs.length; i++) {
    if (trs[i].style.display != "none"){
      if (e.checked) {
        trs[i].querySelector('input').checked = true
        count++
      } else {
        trs[i].querySelector('input').checked = false
        count == 0
      }
    }
  }
  if (count == 0 ){
    panel_two.classList.add('d-none')
    panel_one.classList.remove('d-none')
  }  
  checked_count.textContent = count
}

function searchRow(e) {
  let table = e.closest(".table-responsive")
  let filter = e.value.toUpperCase()
  let tbody = table.querySelector("tbody")
  let trs = tbody.querySelectorAll("tr")
  let found_count = 0
  for (let i = 0; i < trs.length; i++) {
    let tds = trs[i].querySelectorAll("td")
    trs[i].style.display = "none"
    trs[i].dataset.found = false
    for (let j = 0; j < tds.length; j++) {
      if (tds[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        trs[i].dataset.found = true
        found_count++
        if (found_count < 20) {
          trs[i].style.display = ""
        }
        break
      }
    }
  }
}

function deleteRow(e){
  let table = e.closest(".table-responsive")
  let tbody = table.querySelector("tbody")
  let trs = tbody.querySelectorAll("tr")
  let url = table.dataset.url
  trs.forEach(tr => {
    if (tr.querySelector("input").checked == true) {
      fetch(url + tr.id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
      .then((response) => tr.remove())
      .then(showToast("Success", "Deleted"))
      .catch((error) => {
        showToast("Error", "Not deleted")
        console.error('Error:', error);
      });
    }
  })
  switchPanel(table)
}

function copyRow(e){
  let table = e.closest(".table-responsive")
  let tbody = table.querySelector("tbody")
  let trs = tbody.querySelectorAll("tr")
  let url = table.dataset.url
  trs.forEach(tr => {
    let check_box = tr.querySelector("input")
    if (check_box.checked == true){
      check_box.checked = false;
      fetch(url + tr.id + "/copy")
      .then((response) => response.json())
      .then((data) => updateRow(table, data))
      .then(showToast("Success", "Copied"))
      .catch((error) => {
        showToast("Error", "Not copied")
        console.error('Error:', error);
      });
    }
  })
  switchPanel(table)
}

//panel
function switchPanel(table){
  table.querySelector('#panel_one').classList.remove('d-none')
  table.querySelector('#panel_two').classList.add('d-none')
  table.querySelector('#check_allrow').checked = false;
  table.querySelector('#checked_count').textContent = 0;
}

function updateRow(table, data){
  let body = table.querySelector('tbody')
  let ths = table.querySelectorAll('th')
  let tr_id = "[id='" + data[table.dataset.rowid] + "']"
  let tds = getTds(ths)
  let row = table.querySelector(tr_id)
  if (!row) {
    row = body.insertRow()
    row.id = data['_id']
  }
  addRow(row, data, tds)
}

// modal
function showAddModal(e){
  let table = e.closest(".table-responsive")
  let url = table.dataset.url
  let modal = table.querySelector('.modal')
  myModal = new bootstrap.Modal(modal)
  let modal_body = modal.querySelector('.modal-body')
  let inputs = modal_body.querySelectorAll('input')
  let btn = modal.querySelector('.btn-save')
  btn.dataset.url = url
  btn.dataset.method = 'POST'
  for (input of inputs) {
    input.value = ''
  }
  myModal.show()
}

function showEditModal(e){
  let table = e.closest(".table-responsive")
  let id = e.closest('tr').id
  let url = table.dataset.url
  let modal = table.querySelector('.modal')
  myModal = new bootstrap.Modal(modal)
  let modal_body = modal.querySelector('.modal-body')
  let inputs = modal_body.querySelectorAll('input')
  let btn = modal.querySelector('.btn-save')
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
  let table = e.closest(".table-responsive")
  let modal = table.querySelector('.modal')
  let modal_body = modal.querySelector('.modal-body')
  let inputs = modal_body.querySelectorAll('input')
  let data = {}
  myModal.hide()
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
    updateRow(table, data)
  })
  .then(showToast("Success", "Saved"))
  .catch((error) => {
    showToast("Error", "Not saved")
    console.error('Error:', error);
  });
}

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

