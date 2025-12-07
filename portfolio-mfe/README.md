# Portfolio Micro Frontend

This micro frontend is currently in early development. The basic Module Federation setup is complete, and the component is ready for feature implementation.

## Features

Future development will include:

- Portfolio holdings display
- Account performance metrics
- Real-time position updates

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling
- **Module Federation** - Micro frontend architecture

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   The portfolio MFE will be available at `http://localhost:5001`

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production and start preview server

## Usage

### Standalone Development

Currently displays a placeholder Portfolio component.

## Module Federation

This MFE exposes the `./PortfolioApp` module and shares the following dependencies.

## Configuration

- **Development Server**: Port 5001
- **WebSocket Server**: Port 4000
- **Shell Application**: Port 8000 (when integrated)

## Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite environment types
```
