# Trade Blotter Micro Frontend

A trading blotter component that displays trade execution data. This micro frontend provides a grid-based interface for viewing trade information with on demand updates via blotter data API connections.

## Features

- AG Grid integration
- Redux state management
- React Query for API data fetching
- Refresh functionality

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **AG Grid** - Data grid component
- **Material-UI** - UI component library
- **Styled Components** - CSS-in-JS styling
- **Module Federation** - Micro frontend architecture

## Prerequisites

- Node.js 18+
- npm or yarn
- Access to the mock server (running on port 4000)

## Setup

1. **Install dependencies:**

   npm install

2. **Start the mock WebSocket server** (from project root):

   npm run start:mock --prefix mock-ws-server

3. **Start the development server:**

   npm run dev
   The blotter MFE will be available at `http://localhost:5003`

## Standalone Development Commands

- `npm run dev` - Start development server with hot reload, run application independently
- `npm run build` - Build for production and start preview server


## Module Federation

This MFE exposes the `./BlotterApp` module and shares the its dependencies.

## Configuration

The application uses the following ports and endpoints:

- **Development Server**: Port 5003
- **WebSocket Server**: Port 4000
- **Shell Application**: Port 8000 (when integrated)

## Project Structure

```
src/
├── components/
│   ├── BlotterGrid/     # Main data grid component
│   ├── BlotterWidget.tsx # Main blotter container
│   └── RefreshButton.tsx # Refresh blotter data control
├── redux/
│   ├── services/        # API service definitions
│   ├── store.ts         # Redux store configuration
│   └── types.ts         # TypeScript type definitions
└── App.tsx             # Main application component
```
