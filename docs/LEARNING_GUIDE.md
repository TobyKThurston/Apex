# Learning Guide for Apex Terminal

This guide helps students understand the concepts used in this project.

## Prerequisites

Before diving in, you should understand:

- **JavaScript basics**: Variables, functions, arrays, objects
- **HTML/CSS**: Basic web page structure
- **Git**: Version control basics

## Core Concepts Explained

### 1. React Components

**What is a component?**
A component is a reusable piece of UI. Think of it like a LEGO block.

```typescript
// A simple component
function Button() {
  return <button>Click me</button>;
}

// Using the component
<Button />
```

**Why use components?**
- Reusable code
- Easier to maintain
- Better organization

### 2. Props (Properties)

Props are how you pass data to components:

```typescript
// Component that accepts props
function MarketCard({ name, price }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
    </div>
  );
}

// Using the component with props
<MarketCard name="Bitcoin" price={50000} />
```

### 3. State

State is data that can change over time:

```typescript
function Counter() {
  // count is the state value
  // setCount is the function to update it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### 4. useEffect Hook

`useEffect` runs code after the component renders:

```typescript
useEffect(() => {
  // This code runs after component renders
  console.log('Component rendered!');
  
  // Optional: cleanup function
  return () => {
    console.log('Component will unmount');
  };
}, []); // Empty array = run once on mount
```

**Common use cases:**
- Fetching data
- Setting up subscriptions
- Updating document title

### 5. Async/Await

Handling asynchronous operations (like API calls):

```typescript
// Without async/await (harder to read)
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

// With async/await (easier to read)
try {
  const response = await fetch('/api/data');
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

### 6. TypeScript Types

TypeScript adds types to JavaScript:

```typescript
// JavaScript (no types)
function add(a, b) {
  return a + b;
}

// TypeScript (with types)
function add(a: number, b: number): number {
  return a + b;
}
```

**Benefits:**
- Catch errors before running code
- Better IDE autocomplete
- Self-documenting code

### 7. Next.js App Router

Next.js 13+ uses the App Router:

```
app/
  dashboard/
    page.tsx      # Route: /dashboard
    layout.tsx    # Layout for /dashboard/*
  about/
    page.tsx      # Route: /about
```

**Key features:**
- File-based routing
- Server components by default
- Built-in optimizations

### 8. Server vs Client Components

**Server Component:**
```typescript
// app/dashboard/page.tsx
// Runs on server, can access env vars
export default async function Dashboard() {
  const data = await fetchData(); // Server-side
  return <DashboardClient data={data} />;
}
```

**Client Component:**
```typescript
// app/dashboard/dashboard-client.tsx
'use client'; // This makes it a client component

export default function DashboardClient({ data }) {
  const [selected, setSelected] = useState(null); // Can use hooks
  return <div>...</div>;
}
```

## Project-Specific Concepts

### 1. Sharp Wallet Alignment

**What is it?**
A metric (0.00-1.00) showing how much sharp wallets agree.

**How is it calculated?**
```typescript
// If 7 wallets say YES and 2 say NO:
const yesSharps = 7;
const noSharps = 2;
const totalSharps = 9;

// Alignment = max(yes, no) / total
const alignment = Math.max(7, 2) / 9; // = 0.78 (78%)
```

**Why does it matter?**
Higher alignment suggests stronger consensus among successful traders.

### 2. Price Fetching

**The problem:**
Market list API doesn't include prices. We need to fetch them separately.

**The solution:**
1. Get list of markets
2. Extract token ID from each market
3. Fetch price for each token
4. Combine data

**Code example:**
```typescript
// Step 1: Get markets
const markets = await getMarkets();

// Step 2 & 3: Fetch prices in parallel
const prices = await Promise.all(
  markets.map(market => getPrice(market.tokenId))
);

// Step 4: Combine
const marketsWithPrices = markets.map((market, i) => ({
  ...market,
  price: prices[i]
}));
```

### 3. Filtering Markets

**Why filter?**
- Some markets don't have valid prices
- We only want to show markets with real data
- Better user experience

**How:**
```typescript
// Filter out markets with fallback price (0.5)
const validMarkets = markets.filter(m => m.price !== 0.5);
```

## Common Patterns

### Pattern 1: Loading States

```typescript
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  async function fetchData() {
    setLoading(true);
    const result = await getData();
    setData(result);
    setLoading(false);
  }
  fetchData();
}, []);

if (loading) return <div>Loading...</div>;
if (!data) return <div>No data</div>;
return <div>{/* Show data */}</div>;
```

### Pattern 2: Error Handling

```typescript
try {
  const data = await fetchData();
  // Use data
} catch (error) {
  // Handle error
  console.error('Failed to fetch:', error);
  // Show error message to user
}
```

### Pattern 3: Conditional Rendering

```typescript
{isLoading ? (
  <div>Loading...</div>
) : hasError ? (
  <div>Error occurred</div>
) : (
  <div>Show data</div>
)}
```

## Debugging Tips

### 1. Console Logging

```typescript
console.log('Variable:', variable);
console.log('Object:', { key: value });
console.table(arrayOfObjects);
```

### 2. React DevTools

- Install React DevTools browser extension
- Inspect component props and state
- See component tree

### 3. Network Tab

- Open browser DevTools
- Go to Network tab
- See API requests/responses
- Check for errors

### 4. TypeScript Errors

- Red squiggles = type errors
- Hover to see error message
- Fix types to resolve

## Learning Path

### Week 1: Basics
- [ ] Understand React components
- [ ] Learn about props and state
- [ ] Practice with simple components

### Week 2: Data Fetching
- [ ] Learn async/await
- [ ] Understand API calls
- [ ] Practice fetching data

### Week 3: Next.js
- [ ] Learn App Router
- [ ] Understand server vs client components
- [ ] Practice routing

### Week 4: TypeScript
- [ ] Learn basic types
- [ ] Understand interfaces
- [ ] Practice type annotations

### Week 5: Project Deep Dive
- [ ] Read through codebase
- [ ] Understand data flow
- [ ] Make small changes

## Resources

- [React Documentation](https://react.dev)
- [Next.js Learn](https://nextjs.org/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org)

## Practice Exercises

1. **Add a new component**: Create a simple card component
2. **Fetch data**: Make an API call and display results
3. **Add state**: Create a counter component
4. **Handle errors**: Add error handling to API calls
5. **Style it**: Add Tailwind CSS classes

## Questions to Ask Yourself

- What does this code do?
- Why was it written this way?
- How could it be improved?
- What happens if this fails?
- How does data flow through this?

## Getting Help

1. Read the code comments
2. Check the documentation files
3. Search for similar code
4. Ask questions (GitHub issues)
5. Experiment and learn

Happy coding! 🚀
