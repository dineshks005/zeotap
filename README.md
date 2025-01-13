# Google Sheets Clone

A powerful, web-based spreadsheet application built with React that mimics Google Sheets functionality. This application provides a robust set of features for data manipulation, formula calculations, and spreadsheet management.

## 🌟 Features

### 📊 Core Spreadsheet Features
- Dynamic grid with resizable rows and columns
- Cell selection and range selection
- Copy, cut, and paste functionality
- Undo/Redo support
- Keyboard navigation

### 📐 Formula Support
Built-in formulas including:
- Mathematical Operations
  - `=SUM(range)`
  - `=AVERAGE(range)`
  - `=MAX(range)`
  - `=MIN(range)`
  - `=COUNT(range)`
- Text Operations
  - `=TRIM(cell)`
  - `=UPPER(cell)`
  - `=LOWER(cell)`
  - `=CONCATENATE(range)`
- Data Management
  - `=REMOVE_DUPLICATES(range)`
  - `=FIND_AND_REPLACE(range, find, replace)`

### 🎨 Styling and Formatting
- Text formatting (bold, italic, underline)
- Font family and size selection
- Cell background colors
- Text alignment options
- Border customization
- Number formatting

### 📁 File Operations
- Import/Export Excel files
- Save as JSON format
- Auto-save functionality
- Multiple sheet support

### 📊 Data Visualization
- Chart creation
- Multiple chart types (Line, Bar, Pie)
- Chart customization options

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/google-sheets-clone.git
cd google-sheets-clone
Install dependencies
BASH

npm install
Start the development server
BASH

npm start
Build for production
BASH

npm run build
Install dependencies
BASH

npm install
Start the development server
BASH

npm start
Build for production
BASH

npm run build
🏗️ Project Structure

Collapse
google-sheets-clone/
├── src/
│   ├── components/
│   │   ├── Grid/
│   │   ├── Toolbar/
│   │   ├── FormulaBar/
│   │   └── Charts/
│   ├── store/
│   │   ├── actions/
│   │   └── reducers/
│   ├── utils/
│   │   ├── formulas.js
│   │   ├── fileOperations.js
│   │   └── validation.js
│   └── styles/
├── public/
└── package.json
🛠️ Technology Stack
Frontend Framework: React
State Management: Redux
Grid Component: AG-Grid
UI Components: Material-UI
Charts: Chart.js
File Handling: xlsx, file-saver
Formula Parsing: math.js
📝 Usage Examples
Basic Formula Usage
JAVASCRIPT

// Sum a range of cells
=SUM(A1:A10)

// Calculate average
=AVERAGE(B1:B5)

// Find maximum value
=MAX(C1:C20)
Styling Cells
JAVASCRIPT

// Apply multiple styles to a cell
cell.applyStyle({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
  textAlign: 'center'
});
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
