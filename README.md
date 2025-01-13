# Google Sheets Clone

A lightweight web-based spreadsheet application that mimics core Google Sheets functionality. Built for easy data management, calculations, and collaboration.

## Features

### 🔢 Core Spreadsheet Features
- Dynamic spreadsheet grid with resizable cells
- Formula calculations and cell references 
- Copy, cut, paste functionality
- Keyboard navigation
- Multi-cell selection

### ✨ Formula Support
Built-in formulas including:
- `=SUM(range)` - Add numbers
- `=AVERAGE(range)` - Calculate average
- `=MAX(range)` - Find maximum value
- `=MIN(range)` - Find minimum value
- `=COUNT(range)` - Count numbers
- `=TRIM(cell)` - Remove whitespace
- `=UPPER(cell)` - Convert to uppercase
- `=LOWER(cell)` - Convert to lowercase

### 🎨 Styling Options
- Text formatting (bold, italic)
- Font family and size
- Cell colors and borders
- Text alignment
- Number formatting

### 📁 File Operations  
- Import/Export Excel files
- Save as JSON
- Auto-save functionality
- Multiple sheet support

## Technologies Used
- React
- Redux
- AG-Grid
- Material UI
- Chart.js

## Getting Started

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/sheets-clone.git

# Install dependencies  
cd sheets-clone
npm install

# Start development server
npm start
Usage
Enter data directly into cells
Use '=' to start formulas
Select cells/ranges for operations
Format using toolbar options
Save work using file menu
Project Structure

sheets-clone/
├── src/             # Source code
├── components/      # React components  
├── store/          # Redux store
├── utils/          # Helper functions
└── styles/         # CSS styles
License
This project is licensed under the MIT License

Made with by Dinesh KS
