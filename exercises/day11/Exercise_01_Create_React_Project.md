# D11 Exercise 01 — Create the React Project

## Goal

Create the starting React project for the Support Desk Ticket UI.

## Scenario

The backend is now ready. Today, you will start building the frontend.

Your frontend project will be called:

```text
support-desk-ui
```

## Task

Create a Vite React app:

```bash
npm create vite@latest support-desk-ui -- --template react
cd support-desk-ui
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Expected result

You should see the default Vite React page.

## Then clean it up

Replace the default content with:

```jsx
export default function App() {
  return <h1>Support Desk UI</h1>;
}
```

## Submit

Screenshot of your browser showing `Support Desk UI`.
