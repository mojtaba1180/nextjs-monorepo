# Framework Package

یک پکیج framework کامل برای مدیریت API calls، data fetching و state management در monorepo.

## ویژگی‌ها

- ✅ **TypeScript کامل** - تمام تایپ‌ها و interfaceها
- ✅ **React Query integration** - کش هوشمند و background updates
- ✅ **HTTP Client مرکزی** - مدیریت token و error handling
- ✅ **Generic Hooks** - قابلیت استفاده مجدد
- ✅ **Provider Pattern** - آسان برای setup
- ✅ **Route Structure** - سازماندهی منظم API calls

## نصب

```bash
# در هر app که می‌خواهید استفاده کنید
pnpm add @workspace/framework
```

## استفاده

### 1. Setup Provider

```tsx
// app/layout.tsx یا _app.tsx
import { FrameworkProvider } from "@workspace/framework/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FrameworkProvider>
      {children}
    </FrameworkProvider>
  );
}
```

### 2. استفاده از Hooks

```tsx
// components/ProductList.tsx
import { useProductsQuery, useCreateProductMutation } from "@workspace/framework/routes/products";

export function ProductList() {
  const { data, isLoading, error } = useProductsQuery({
    pageNo: 1,
    rowCount: 10,
    isActive: true,
  });

  const createProduct = useCreateProductMutation();

  const handleCreate = async () => {
    await createProduct.mutateAsync({
      name: "New Product",
      description: "Product description",
      price: 100,
      categoryId: "cat-1",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.entries.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
      <button onClick={handleCreate}>Create Product</button>
    </div>
  );
}
```

## ساختار

```
packages/framework/
├── src/
│   ├── types/           # Core types
│   ├── utils/           # HTTP client, endpoints, generic hooks
│   ├── providers/       # Framework provider
│   ├── routes/          # API route implementations
│   │   └── products/    # Example route
│   │       ├── type.ts  # Route-specific types
│   │       ├── get.ts   # GET functions
│   │       ├── post.ts  # POST/PUT functions
│   │       ├── delete.ts # DELETE functions
│   │       ├── query.ts # React Query hooks
│   │       └── index.ts # Exports
│   └── index.ts         # Main exports
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## افزودن Route جدید

### 1. ایجاد پوشه Route

```bash
mkdir packages/framework/src/routes/users
```

### 2. ایجاد فایل‌های مورد نیاز

```typescript
// type.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
}

// get.ts
export function GetUsersList(): Promise<APIHttpType<IUser[]>> {
  return APIHttp.get(API_ENDPOINTS.USERS.LIST);
}

// post.ts
export function CreateUser(userData: ICreateUserRequest): Promise<APIHttpType<IUser>> {
  return APIHttp.post(API_ENDPOINTS.USERS.CREATE, userData);
}

// query.ts
export const useUsersQuery = () =>
  useGenericQuery(GetUsersList, ["get-users-list"]);

export const useCreateUserMutation = () =>
  useGenericMutation(CreateUser, ["get-users-list"]);
```

### 3. Export در index.ts

```typescript
// routes/users/index.ts
export * from "./type";
export * from "./get";
export * from "./post";
export * from "./query";
```

## قوانین استفاده

### ✅ باید انجام دهید:

1. **همیشه از `API_ENDPOINTS` استفاده کنید**
2. **توابع خام در `get.ts`/`post.ts`**
3. **هوک‌ها در `query.ts`**
4. **تایپ‌ها در `type.ts`**
5. **استفاده از generic hooks**

### ❌ نباید انجام دهید:

1. **هاردکد endpoint** - `APIHttp.get("/users")` ❌
2. **مستقیم APIHttp در UI** - فقط از hooks استفاده کنید
3. **تایپ any** - همیشه interface تعریف کنید
4. **Query key تکراری**

## Environment Variables

```env
NEXT_PUBLIC_REST_API_ENDPOINT=https://api.example.com
```

## Dependencies

- `axios` - HTTP client
- `@tanstack/react-query` - Data fetching
- `react` - React hooks
- `react-dom` - React DOM

## Build

```bash
pnpm build
```

## Development

```bash
pnpm dev
```
