# D11 Exercise 05 — useEffect, Loading and Error UI

## Goal

Use `useEffect` to fetch public API information from the backend.

## Backend requirement

Start the Day 10 backend:

```bash
mvn spring-boot:run
```

## Add Vite proxy

Update `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
```

## Create API helper

Create:

```text
src/services/api.js
```

Function:

```js
export async function fetchApiInfo() {
  const response = await fetch('/api/v1/info');

  if (!response.ok) {
    throw new Error('Failed to load API info');
  }

  return response.json();
}
```

## Requirements

Show:

- Loading message while fetching
- Error message if backend is stopped
- API name/version if successful

## Submit

Screenshot of successful state and error state.
