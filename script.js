document.addEventListener('DOMContentLoaded', () => {
    const rows = 20;
    const cols = 10;
    const sheet = document.getElementById('sheet');
    const formulaBar = document.getElementById('formula-bar');
    const colorPicker = document.getElementById('color-picker');
    const backgroundToggle = document.getElementById('background-toggle');
    const fileOptions = document.getElementById('file-options');
    const openFileInput = document.getElementById('open-file');
    const boldButton = document.getElementById('bold');
    const italicButton = document.getElementById('italic');
    const fontSizeSelector = document.getElementById('font-size');
    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');
    const chartCanvas = document.getElementById('myChart');

    let selectedCell = null;
    let undoStack = [];
    let redoStack = [];

    // Generate grid
    function generateGrid() {
        sheet.innerHTML = '';
        for (let r = 0; r <= rows; r++) {
            const row = document.createElement('tr');
            for (let c = 0; c <= cols; c++) {
                const cell = document.createElement(r === 0 || c === 0 ? 'th' : 'td');
                if (r === 0 && c > 0) {
                    cell.textContent = String.fromCharCode(64 + c); // Column Headers (A, B, C, ...)
                } else if (c === 0 && r > 0) {
                    cell.textContent = r; // Row Headers (1, 2, 3, ...)
                } else if (r > 0 && c > 0) {
                    cell.contentEditable = true; // Make the cell editable
                }
                row.appendChild(cell);
            }
            sheet.appendChild(row);
        }
    }

    generateGrid();

    // Add event listener for cell selection
    sheet.addEventListener('click', (e) => {
        if (e.target.tagName === 'TD') {
            if (selectedCell) selectedCell.classList.remove('selected');
            selectedCell = e.target;
            selectedCell.classList.add('selected');
            formulaBar.value = selectedCell.textContent; // Show content in the formula bar
        }
    });

    // File Options Dropdown handling
    fileOptions.addEventListener('change', (e) => {
        const option = e.target.value;

        switch (option) {
            case 'save':
                saveFile();
                break;
            case 'open':
                openFileInput.click();
                break;
            case 'new':
                generateGrid();
                break;
            default:
                break;
        }

        // Reset dropdown after selection
        fileOptions.selectedIndex = 0;
    });

    // Save file function
    function saveFile() {
        const data = [];
        for (let r = 1; r <= rows; r++) {
            const rowData = [];
            for (let c = 1; c <= cols; c++) {
                const cell = sheet.rows[r]?.cells[c];
                rowData.push(cell ? cell.textContent : '');
            }
            data.push(rowData);
        }

        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'spreadsheet.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Open file function
    openFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = JSON.parse(event.target.result);
                populateGrid(data);
            };
            reader.readAsText(file);
        }
    });

    // Populate grid with data
    function populateGrid(data) {
        generateGrid();
        data.forEach((rowData, r) => {
            rowData.forEach((cellData, c) => {
                const cell = sheet.rows[r + 1]?.cells[c + 1];
                if (cell) cell.textContent = cellData;
            });
        });
    }

    // Save the current state for undo/redo
    function saveState() {
        const data = [];
        for (let r = 1; r <= rows; r++) {
            const rowData = [];
            for (let c = 1; c <= cols; c++) {
                const cell = sheet.rows[r]?.cells[c];
                rowData.push(cell ? cell.textContent : '');
            }
            data.push(rowData);
        }
        undoStack.push(JSON.stringify(data));
        redoStack = []; // Clear redo stack on new action
    }

    // Undo function
    undoButton.addEventListener('click', () => {
        if (undoStack.length > 0) {
            redoStack.push(undoStack.pop());
            const previousState = undoStack[undoStack.length - 1];
            if (previousState) {
                populateGrid(JSON.parse(previousState));
            }
        }
    });

    // Redo function
    redoButton.addEventListener('click', () => {
        if (redoStack.length > 0) {
            const nextState = redoStack.pop();
            if (nextState) {
                undoStack.push(nextState);
                populateGrid(JSON.parse(nextState));
            }
        }
    });

    // Call saveState() whenever a change is made
    sheet.addEventListener('input', saveState);

    // Bold button functionality
    boldButton.addEventListener('click', () => {
        if (selectedCell) {
            selectedCell.style.fontWeight = selectedCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
        }
    });

    // Italic button functionality
    italicButton.addEventListener('click', () => {
        if (selectedCell) {
            selectedCell.style.fontStyle = selectedCell.style.fontStyle === 'italic' ? 'normal' : 'italic';
        }
    });

    // Text color picker functionality
    colorPicker.addEventListener('input', (e) => {
        if (selectedCell) {
            selectedCell.style.color = e.target.value; // Change text color
        }
    });

    // Background color toggle functionality
    backgroundToggle.addEventListener('change', () => {
        if (selectedCell) {
            selectedCell.style.backgroundColor = backgroundToggle.checked ? '#f0f0f0' : '';
        }
    });

    // Font size selector functionality
    fontSizeSelector.addEventListener('change', (e) => {
        if (selectedCell) {
            selectedCell.style.fontSize = e.target.value;
        }
    });

    // Formula bar input handling
    formulaBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const formula = formulaBar.value.trim();
            if (formula.startsWith('=')) {
                processFormula(formula.slice(1).toUpperCase()); // Remove '=' and process formula
            } else {
                selectedCell.textContent = formula;
            }
        }
    });

    // Helper to parse cell reference (e.g., A1 -> row 1, col 1)
    function getCell(ref) {
        const absoluteCol = ref.startsWith('$');
        const absoluteRow = ref.includes('$', 1);
        const col = ref.charCodeAt(absoluteCol ? 1 : 0) - 64;
        const row = parseInt(ref.slice(absoluteRow ? 2 : 1));
        return { row, col, absoluteCol, absoluteRow };
    }

    // Formula functions (SUM, AVERAGE, etc.)
    function processFormula(command) {
        const match = command.match(/(SUM|AVERAGE|MAX|MIN|COUNT|MEDIAN|MODE|ISNUMBER|ISBLANK|TRIM|UPPER|LOWER|REMOVE_DUPLICATES|FIND_AND_REPLACE|IF|CHART)$$([^)]*)$$/);
        if (!match) {
            selectedCell.textContent = 'ERROR';
            return;
        }

        const func = match[1];
        const args = match[2];

        switch (func) {
            case 'SUM':
            case 'AVERAGE':
            case 'MAX':
            case 'MIN':
            case 'COUNT':
            case 'MEDIAN':
            case 'MODE':
                processMathFunction(func, args);
                break;
            case 'ISNUMBER':
                processIsNumber(args);
                break;
            case 'ISBLANK':
                processIsBlank(args);
                break;
            case 'CHART':
                processChart(args);
                break;
            // Other cases...
        }
    }

    function processMathFunction(func, range) {
        const [start, end] = range.split(':').map(getCell);
        if (!start || !end) {
            selectedCell.textContent = 'ERROR';
            return;
        }

        let values = [];
        for (let r = start.row; r <= end.row; r++) {
            for (let c = start.col; c <= end.col; c++) {
                const cell = sheet.rows[r]?.cells[c];
                if (cell) {
                    const value = parseFloat(cell.textContent);
                    if (!isNaN(value)) values.push(value);
                }
            }
        }

        let result;
        switch (func) {
            case 'SUM':
                result = values.reduce((a, b) => a + b, 0);
                break;
            case 'AVERAGE':
                result = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
                break;
            case 'MAX':
                result = values.length ? Math.max(...values) : 'N/A';
                break;
            case 'MIN':
                result = values.length ? Math.min(...values) : 'N/A';
                break;
            case 'COUNT':
                result = values.length;
                break;
            case 'MEDIAN':
                values.sort((a, b) => a - b);
                const mid = Math.floor(values.length / 2);
                result = values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
                break;
            case 'MODE':
                const freq = {};
                let maxFreq = 0;
                let mode = null;
                values.forEach(value => {
                    freq[value] = (freq[value] || 0) + 1;
                    if (freq[value] > maxFreq) {
                        maxFreq = freq[value];
                        mode = value;
                    }
                });
                result = mode;
                break;
        }
        selectedCell.textContent = result;
    }

    function processIsNumber(cellRef) {
        const cell = getCell(cellRef);
        const target = sheet.rows[cell.row]?.cells[cell.col];
        if (target) {
            selectedCell.textContent = !isNaN(parseFloat(target.textContent));
        }
    }

    function processIsBlank(cellRef) {
        const cell = getCell(cellRef);
        const target = sheet.rows[cell.row]?.cells[cell.col];
        if (target) {
            selectedCell.textContent = target.textContent.trim() === '';
        }
    }

    function processChart(range) {
        const [start, end] = range.split(':').map(getCell);
        if (!start || !end) {
            alert('Invalid range for chart');
            return;
        }

        const labels = [];
        const data = [];

        for (let r = start.row; r <= end.row; r++) {
            for (let c = start.col; c <= end.col; c++) {
                const cell = sheet.rows[r]?.cells[c];
                if (cell) {
                    const value = parseFloat(cell.textContent);
                    if (!isNaN(value)) {
                        data.push(value);
                        labels.push(`${String.fromCharCode(64 + c)}${r}`);
                    }
                }
            }
        }

        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar', // You can change the type to 'line', 'pie', etc.
            data: {
                labels: labels,
                datasets: [{
                    label: 'Chart Data',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});