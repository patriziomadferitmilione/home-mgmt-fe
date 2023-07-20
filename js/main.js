// Get references to the button, overlay, popup container, form, and table
const openPopupBtn = document.getElementById('openPopupBtn')
const overlay = document.getElementById('overlay')
const popupContainer = document.getElementById('popupContainer')
const form = document.querySelector('form')
const tableBody = document.querySelector('table tbody')

// Add an event listener to the button
openPopupBtn.addEventListener('click', function () {
  // Show the overlay and popup by setting their display styles to 'block'
  overlay.style.display = 'block'
  popupContainer.style.display = 'block'
})

// Close the popup and overlay when the overlay is clicked
overlay.addEventListener('click', function () {
  overlay.style.display = 'none'
  popupContainer.style.display = 'none'
})

// Handle form submission
form.addEventListener('submit', function (event) {
  event.preventDefault() // Prevent form submission

  // Get the form input values
  const descrizioneInput = document.getElementById('descrizione')
  const paganteInput = document.getElementById('pagante')
  const giornoInput = document.getElementById('giorno')
  const meseInput = document.getElementById('mese')
  const spesaInput = document.getElementById('spesa')

  const descrizione = descrizioneInput.value
  const pagante = paganteInput.value
  const giorno = parseInt(giornoInput.value)
  const mese = parseInt(meseInput.value)
  const spesa = parseFloat(spesaInput.value.replace(/[^0-9.-]+/g, ''))

  // Validate input values
  if (
    !descrizione ||
    !pagante ||
    isNaN(giorno) ||
    isNaN(mese) ||
    isNaN(spesa)
  ) {
    alert('Please fill in all the required fields with valid values.')
    return
  }

  // Retrieve existing data from LocalStorage
  const storedData = JSON.parse(localStorage.getItem('tableData')) || []

  // Create a new entry object
  const newEntry = {
    id: storedData.length + 1,
    descrizione: descrizione,
    pagante: pagante,
    giorno: giorno,
    mese: mese,
    spesa: spesa,
  }

  // Add the new entry to the data array
  storedData.push(newEntry)

  // Save the updated data to LocalStorage
  localStorage.setItem('tableData', JSON.stringify(storedData))

  // Update the table
  updateTable(storedData)

  // Reset the form
  form.reset()

  // Close the popup
  overlay.style.display = 'none'
  popupContainer.style.display = 'none'

  // Optionally, display a success message or perform any other desired actions
})

// Function to update the table with the data
function updateTable(data) {
  // Get the table body
  const tableBody = document.querySelector('table tbody')

  // Clear existing table rows
  tableBody.innerHTML = ''

  // Loop through the data and create table rows
  data.forEach((item) => {
    const newRow = document.createElement('tr')

    const dataCell = document.createElement('td')
    dataCell.textContent = `${item.giorno}/${item.mese}`

    const paganteCell = document.createElement('td')
    paganteCell.textContent = item.pagante

    const descrizioneCell = document.createElement('td')
    descrizioneCell.textContent = item.descrizione

    const spesaCell = document.createElement('td')
    spesaCell.textContent = item.spesa

    newRow.appendChild(dataCell)
    newRow.appendChild(paganteCell)
    newRow.appendChild(descrizioneCell)
    newRow.appendChild(spesaCell)

    tableBody.appendChild(newRow)
  })
}

// Retrieve and display existing data on page load
document.addEventListener('DOMContentLoaded', function () {
  const storedData = JSON.parse(localStorage.getItem('tableData')) || []
  updateTable(storedData)
})
