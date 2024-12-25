// Developer: Nelson Siu nsiu@grupocargo.com
// JSON load 'https://raw.githubusercontent.com/cargoaidev/reception/main/sku/sku.json'

let skuData = [];  


async function jsonLoad() {
   try {
         const response = await fetch('https://raw.githubusercontent.com/cargoaidev/reception/main/sku/sku.json');
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         skuData = await response.json(); // Store the JSON data globally
         console.log('JSON data loaded:', skuData);
         skuOptions();
   } catch (error) {
         console.error('Error loading JSON:', error);
   }
}


function skuOptions() {
   const datalist = document.getElementById('sku-list');
   skuData.forEach(skuItem => {
         const option = document.createElement('option');
         option.value = `${skuItem.nombre} - SKU: ${skuItem.sku}`;
         datalist.appendChild(option);
   });
}


function displaySkuDetails(selectedValue) {
console.log('Selected value:', selectedValue); 
const skuPart = selectedValue.split(' - SKU: ')[1];
console.log('Extracted SKU part:', skuPart); 

if (skuPart) {
      const sku = parseInt(skuPart, 10); 
      console.log('Converted SKU to integer:', sku); 
      const skuItem = skuData.find(item => parseInt(item.sku, 10) === sku);
      console.log('Found SKU item:', skuItem); 
      if (skuItem) {
         document.getElementById('sku').textContent = `SKU: ${skuItem.sku}`;
         document.getElementById('dv').textContent = `DV: ${skuItem.dv}`;
         document.getElementById('nombre').textContent = `Nombre: ${skuItem.nombre}`;
         document.getElementById('alergeno').textContent = `Alérgeno: ${skuItem.alergeno || "No especificado"}`;
         document.getElementById('rotacion').textContent = `Rotación: ${skuItem.rotacion || "No especificado"}`;
         document.getElementById('estiba').textContent = `Estiba: ${skuItem.estiba || "No especificada"}`;
      };
}
};


function clearSkuDetails() {
   document.getElementById('sku-select').value = '';
   document.getElementById('sku').textContent = '';
   document.getElementById('dv').textContent = '';
   document.getElementById('nombre').textContent = '';
   document.getElementById('alergeno').textContent = '';
   document.getElementById('rotacion').textContent = '';
   document.getElementById('estiba').textContent = '';
};


document.getElementById('sku-select').addEventListener('input', function() {
displaySkuDetails(this.value);
});


window.onload = jsonLoad;