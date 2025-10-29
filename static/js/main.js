// Developer: Siu engineer.siu@gmail.com

let skuData = [];
let skuTable = [];

// Fetch and load JSON data
async function jsonLoad() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/cargoaidev/reception@main/sku/sku.json');
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
        // Convert sku to string to ensure proper matching
        option.value = `${item.nombre} - SKU: ${item.sku.toString()}`;
        skuList.appendChild(option);
    });
}

// Render table with filtered data
function renderTable(filteredData) {
    const tableBody = document.getElementById('sku-table-body');
    tableBody.innerHTML = ''; 

    if (filteredData.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">ESCRIBISTE MAL O NO EXISTE</td></tr>`;
        return;
    }

    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.sku}</td>
            <td>${item.nombre}</td>
            <td>${item.apilabilidad}</td>
            <td>${item.dv}</td>                      
            <td>${item.estiba || "No especificada"}</td>
            <td>${item.rotacion || "No especificado"}</td>
            <td>${item.alergeno || "No especificado"}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filter and display matching SKUs based on input
document.getElementById('sku-select').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase().trim();
    
    // If empty, show all data
    if (searchTerm === '') {
        renderTable(skuTable);
        return;
    }

    const searchTerms = searchTerm.split(/\s+/); 

    const filteredData = skuData.filter(item => {
        const skuString = item.sku.toString().toLowerCase();
        const nombreString = item.nombre.toLowerCase();
        const searchString = `${nombreString} ${skuString}`;
        
        return searchTerms.every(term => searchString.includes(term));
    });

    renderTable(filteredData);
});

// Clear input and reset table
function clearSkuDetails() {
    document.getElementById('sku-select').value = '';
    renderTable(skuTable);
}

// Initialize on page load
window.onload = jsonLoad;