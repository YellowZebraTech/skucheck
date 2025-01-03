// Developer: Siu engineer.siu@gmail.com

let skuData = [];
let skuTable = [];

// Fetch and load JSON data
async function jsonLoad() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/cargoaidev/reception/main/sku/sku.json');
        if (!response.ok) throw new Error('Refresque la página');
        skuData = await response.json();
        console.log('JSON data loaded:', skuData);
        populateDatalist(skuData);
        skuTable = skuData;
        renderTable(skuTable);
    } catch (error) {
        console.error('Error loading JSON:', error);
        document.getElementById('error-message').textContent = 'Refresque la página';
    }
}

// Populate the datalist with SKU names and SKUs
function populateDatalist(data) {
    const skuList = document.getElementById('sku-list');
    skuList.innerHTML = ''; // Clear previous entries
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = `${item.nombre} - SKU: ${item.sku}`;
        skuList.appendChild(option);
    });
}

// Render table with filtered data
function renderTable(filteredData) {
    const tableBody = document.getElementById('sku-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    if (filteredData.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">ESCRIBISTE MAL O NO EXISTE</td></tr>`;
        return;
    }

    filteredData.forEach(({ sku, dv, nombre, alergeno, rotacion, estiba }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sku}</td>
            <td>${dv}</td>
            <td>${nombre}</td>            
            <td>${rotacion || "No especificado"}</td>
            <td>${estiba || "No especificada"}</td>
            <td>${alergeno || "No especificado"}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter and display matching SKUs based on input
document.getElementById('sku-select').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase().trim();
    const searchTerms = searchTerm.split(/\s+/); // Split input into words

    const filteredData = skuData.filter(item => {
        const skuName = `${item.nombre} - SKU: ${item.sku}`.toLowerCase();
        return searchTerms.every(term => skuName.includes(term));
    });

    renderTable(filteredData);
});

// Clear input and reset table
function clearSkuDetails() {
    document.getElementById('sku-select').value = '';
    renderTable(skuTable); // Reset table to show all data
}

// Initialize on page load
window.onload = jsonLoad;
