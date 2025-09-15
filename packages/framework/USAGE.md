# 📖 Framework Package Usage

راهنمای کامل استفاده از framework package.

## 🚀 شروع سریع

### 1. نصب
```bash
pnpm add @workspace/framework
```

### 2. Setup Provider
```tsx
import { FrameworkProvider } from "@workspace/framework";

export default function RootLayout({ children }) {
  return (
    <FrameworkProvider>
      {children}
    </FrameworkProvider>
  );
}
```

### 3. استفاده از Generic Hooks
```tsx
import { useGenericQuery, useGenericMutation } from "@workspace/framework";

function MyComponent() {
  const { data, isLoading, error } = useGenericQuery(
    () => fetch('/api/users'),
    ['users']
  );

  const createUser = useGenericMutation(
    (userData) => fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
    ['users']
  );

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      
      <button onClick={() => createUser.mutate({ name: 'John' })}>
        Create User
      </button>
    </div>
  );
}
```

## 🔧 Core Components

### Types
```typescript
import { 
  BaseResponseType, 
  PaginatedResponse, 
  APIHttpType, 
  APIHttpPaginatedType,
  HookOptions,
  MutationOptions 
} from "@workspace/framework";
```

### Utils
```typescript
import { 
  API_ENDPOINTS, 
  APIHttp,
  useGenericQuery,
  useGenericQueryWithParams,
  useGenericMutation,
  useGenericMutationWithOptimisticUpdate 
} from "@workspace/framework";
```

### Providers
```typescript
import { FrameworkProvider, useQueryClient } from "@workspace/framework";
```

## 🎯 افزودن Endpoint جدید

برای افزودن endpoint جدید، از prompt آماده استفاده کنید:

**[➕ افزودن Endpoint جدید](../../prompts/docs/add-endpoint/)**

## 📚 داکیومنت‌اسیون کامل

برای راهنمای کامل و مثال‌های عملی، به داکیومنت‌اسیون مراجعه کنید:

**[📖 داکیومنت‌اسیون Framework Package](../../apps/docs/content/docs/framework/)**

---

**آماده‌اید شروع کنید؟ [داکیومنت‌اسیون](../../apps/docs/content/docs/framework/) را مطالعه کنید! 🚀**