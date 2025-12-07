# Mock WebSocket Server

The Mock WebSocket Server provides simulated financial market data for the Real-Time Streaming Micro-Frontend application.

## Overview

This Node.js/Express server with WebSocket support provides:

- **Real-time WebSocket streaming** of trade data using Protocol Buffers
- **REST API endpoints** for search, candlestick charts, and blotter data
- **Mock financial data** for stocks, bonds, and ETFs
- **Automatic data updates** to simulate live market conditions

## Architecture

The server combines HTTP REST APIs with WebSocket real-time streaming:

### WebSocket (Port 4000)

- **Protocol**: WebSocket with Protocol Buffer serialization
- **Data**: Real-time trade updates for financial instruments
- **Frequency**: Updates every 1 second with randomized price movements

### HTTP REST API (Port 4000)

- **Search Endpoint**: `/search` - Financial instrument search
- **Candles Endpoint**: `/candles` - Historical candlestick data
- **Blotter Endpoint**: `/blotter` - Trade blotter data

## Features

### Real-Time Data Streaming

- **Protocol Buffers**: binary serialization for trade data
- **Continuous Updates**: automatic price and quantity updates every second
- **Full Dataset**: initial snapshot of all instruments on connection

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - HTTP server framework
- **WebSocket (ws)** - Real-time communication
- **Protocol Buffers** - Binary serialization
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the mock server:**

   ```bash
   npm run start:mock
   ```

   The server will start on `http://localhost:4000`

## Usage

### Development Workflow

For full development with the MFE ecosystem:

```bash
# From the project root
npm run dev:all
```

This starts:

- Mock WebSocket server (port 4000)
- Shell application (port 8000)
- All remote MFEs (ports 5001-5003)

## Configuration

### Environment Variables

- **PORT**: Server port (default: 4000)
- **CORS_ORIGIN**: Allowed CORS origin (default: http://localhost:8000)


