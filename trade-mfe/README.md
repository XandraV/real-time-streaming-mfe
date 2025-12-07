# Trading Micro Frontend

A trading interface that provides real-time market data, instrument selection. This micro frontend combines interactive charts, instrument grids, and a trading widget.

## Features

- Real-time candlestick charts with TradingView Lightweight Charts
- Interactive instrument grid with AG Grid
- Trade execution widget
- Redux state management
- WebSocket-based real-time data
- Responsive design

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **AG Grid** - Data grid component
- **Material-UI** - UI component library
- **Lightweight Charts** - Financial charting library
- **Protocol Buffers** - Efficient data serialization
- **RxJS** - Reactive programming
- **Styled Components** - CSS-in-JS styling
- **Module Federation** - Micro frontend architecture

## Prerequisites

- Node.js 18+
- npm or yarn
- Access to the mock WebSocket server (running on port 4000)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the mock WebSocket server** (from project root):
   ```bash
   npm run start:mock --prefix mock-ws-server
   ```

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production and start preview server

## Usage

### Standalone Development

When running independently, the trading interface provides:

- **Trade Widget**: Order placement and execution
- **Instrument Grid**: Market data display with sorting/filtering
- **Candlestick Charts**: Real-time price visualization
- **WebSocket Integration**: Live market data updates

## Module Federation

This MFE exposes the `./TradeApp` module and shares the following dependencies.

## Configuration

The application uses the following ports and endpoints:

- **Development Server**: Port 5002
- **WebSocket Server**: Port 4000
- **Shell Application**: Port 8000 (when integrated)

## Key Components

- **TradeWidget**: Order entry and execution interface
- **InstrumentGrid**: Market data display with real-time updates
- **CandlestickChart**: Interactive price charts with technical indicators

## Data Flow

1. **Market Data**: WebSocket streams provide real-time price updates
2. **User Actions**: Trade orders are sent via REST API
3. **State Management**: Redux handles application state
4. **UI Updates**: React Query manages server state and caching

## Project Structure

```
src/
├── components/
│   ├── TradeWidget/     # Order execution interface
│   │   ├── TradeWidget.tsx
│   │   └── CandlestickChart.tsx
│   └── InstrumentGrid/  # Market data grid
├── redux/
│   ├── services/        # API service definitions
│   ├── store.ts         # Redux store configuration
│   └── types.ts         # TypeScript type definitions
├── hooks/               # Custom React hooks
├── proto/               # Protocol buffer definitions
└── App.tsx             # Main application component
```
