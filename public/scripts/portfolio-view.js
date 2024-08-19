document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const dropdown = document.getElementById('dropdown');
    const addSymbolBtn = document.getElementById('add-symbol-btn');
    const addNewRowBtn = document.getElementById('add-new-row-btn');
    const portfolioTableBody = document.querySelector('.portfolio-table tbody');
    let selectedSymbol = null;

    // Handle search input to show dropdown with ticker suggestions
    searchBox.addEventListener('input', async () => {
        const searchTerm = searchBox.value.trim();

        if (searchTerm.length > 0) {
            try {
                const response = await fetch(`/search-tickers?q=${encodeURIComponent(searchTerm)}`);
                const tickers = await response.json();

                dropdown.innerHTML = '';

                tickers.forEach(ticker => {
                    const option = document.createElement('div');
                    option.className = 'dropdown-item';
                    option.textContent = `${ticker.symbol} - ${ticker.name}`;
                    option.dataset.symbol = ticker.symbol;
                    dropdown.appendChild(option);
                });

                dropdown.style.display = 'block';
                positionDropdown(); // Ensure dropdown is positioned correctly

            } catch (error) {
                console.error('Error fetching tickers:', error);
            }
        } else {
            dropdown.innerHTML = '';
            dropdown.style.display = 'none';
        }
    });

    // Handle symbol selection from dropdown
    dropdown.addEventListener('click', (event) => {
        if (event.target.classList.contains('dropdown-item')) {
            selectedSymbol = event.target.dataset.symbol;
            searchBox.value = selectedSymbol;
            dropdown.style.display = 'none';
            addSymbolBtn.disabled = false;
        }
    });

    // Handle 'Add Symbol' button click
    addSymbolBtn.addEventListener('click', () => {
        if (selectedSymbol) {
            const lastRow = portfolioTableBody.querySelector('tr:last-of-type');
            if (lastRow) {
                lastRow.querySelector('.symbol-input').value = selectedSymbol;
                searchBox.value = '';
                selectedSymbol = null;
                addSymbolBtn.disabled = true;
            }
        }
    });

    // Handle 'Add New Row' button click
    addNewRowBtn.addEventListener('click', () => {
        console.log('Adding new row'); // Debugging log
        addNewSymbolRow();
    });

    // Function to add a new row to the portfolio table
    function addNewSymbolRow() {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td><input type="text" class="symbol-input" /></td>
            <td><input type="number" min="0" step="1" class="shares-input" /></td>
            <td><input type="number" step="0.01" class="price-input" /></td>
            <td><input type="number" step="0.01" class="last-price-input" /></td>
            <td class="market-value">0.00</td>
            <td class="total-cost">0.00</td>
            <td class="today-gain">0.00</td>
            <td class="total-gain">0.00</td>
            <td class="status">Status</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        portfolioTableBody.appendChild(newRow);
    }

    // Handle row deletion
    portfolioTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            portfolioTableBody.removeChild(row);
        }
    });

    // Update row calculations based on input values
    function updateRowCalculations(row) {
        const shares = parseFloat(row.querySelector('.shares-input').value) || 0;
        const purchasePrice = parseFloat(row.querySelector('.price-input').value) || 0;
        const lastPrice = parseFloat(row.querySelector('.last-price-input').value) || 0;

        const marketValue = shares * lastPrice;
        const totalCost = shares * purchasePrice;
        const todayGain = (lastPrice - purchasePrice) * shares;
        const totalGain = todayGain;

        row.querySelector('.market-value').textContent = marketValue.toFixed(2);
        row.querySelector('.total-cost').textContent = totalCost.toFixed(2);
        row.querySelector('.today-gain').textContent = todayGain.toFixed(2);
        row.querySelector('.total-gain').textContent = totalGain.toFixed(2);
    }

    // Update calculations when inputs change
    portfolioTableBody.addEventListener('input', (event) => {
        if (event.target.classList.contains('symbol-input') ||
            event.target.classList.contains('shares-input') ||
            event.target.classList.contains('price-input') ||
            event.target.classList.contains('last-price-input')) {
                
            updateRowCalculations(event.target.closest('tr'));
        }
    });

    // Position the dropdown menu correctly
    function positionDropdown() {
        const rect = searchBox.getBoundingClientRect();
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.width = `${searchBox.offsetWidth}px`;
    }
});
