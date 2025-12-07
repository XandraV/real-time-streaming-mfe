# Shell App

This React-based Shell application serves as the main container for the Real-Time Streaming Micro-Frontend (MFE) architecture. It provides navigation and hosts remote MFE applications using Module Federation.

## Overview

- Provides a navigation interface
- Loads and displays remote micro-frontend applications
- Maintains state persistence across navigation using KeepAlive routes
- Serves as the entry point for the entire MFE ecosystem

## Architecture

The shell uses Module Federation to dynamically load the following remote applications:
- **Trade MFE**: Trading interface with candlestick charts
- **Portfolio MFE** : Portfolio management and analytics
- **Blotter MFE**: Real-time trade blotter with grid display

## Features

- **Navigation**: Clean navigation with Dashboard, Trade, Portfolio, and Watchlist sections
- KeepAlive routing maintains component state during navigation
- Styled with Material-UI and custom CSS
- Integration with WebSocket server for live data streaming
- Seamless loading of remote applications

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

   The shell will be available at `http://localhost:8000`

## Usage

### Development Workflow

For full development with all MFEs, use the root project script:

```bash
npm run dev:all
```

This will start:
- Shell app (port 8000)
- Mock server (port 4000)
- Build all remote MFEs

### Individual Development

If working on the shell only:

```bash
npm run dev
```
