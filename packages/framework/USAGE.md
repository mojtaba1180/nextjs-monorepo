# Framework Package - راهنمای استفاده

## نصب و راه‌اندازی

### 1. اضافه کردن به پروژه

```bash
# در package.json پروژه خود
pnpm add @workspace/framework
```

### 2. تنظیم Environment Variables

```bash
# در root پروژه خود فایل .env.local ایجاد کنید
NEXT_PUBLIC_REST_API_ENDPOINT=https://your-api-url.com
```

### 3. اضافه کردن Provider

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

## استفاده از Hooks

### Query Hooks (GET requests)

```tsx
import { useProductsQuery } from "@workspace/framework/routes/products";

function ProductList() {
  const { data, isLoading, error } = useProductsQuery({
    pageNo: 1,
    rowCount: 10,
    isActive: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.entries.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Mutation Hooks (POST/PUT/DELETE)

```tsx
import { useCreateProductMutation } from "@workspace/framework/routes/products";

function CreateProductForm() {
  const createProduct = useCreateProductMutation();

  const handleSubmit = async (formData) => {
    try {
      await createProduct.mutateAsync({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        categoryId: formData.categoryId,
      });
      alert("Product created successfully!");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={createProduct.isPending}
      >
        {createProduct.isPending ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}
```

## افزودن Route جدید

### 1. ایجاد پوشه Route

```bash
mkdir packages/framework/src/routes/users
```

### 2. ایجاد فایل‌های مورد نیاز

#### type.ts
```typescript
export interface IUser {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserListParams {
  pageNo?: number;
  rowCount?: number;
  search?: string;
  isActive?: boolean;
}
```

#### get.ts
```typescript
import { APIHttp, API_ENDPOINTS } from "../../utils";
import { APIHttpPaginatedType } from "../../types";
import { IUser, IUserListParams } from "./type";

export function GetUsersList(
  params?: IUserListParams
): Promise<APIHttpPaginatedType<IUser>> {
  return APIHttp.get(API_ENDPOINTS.USERS.LIST, {
    params: {
      pageNo: params?.pageNo || 1,
      rowCount: params?.rowCount || 10,
      search: params?.search,
      isActive: params?.isActive,
    },
  });
}
```

#### post.ts
```typescript
import { APIHttp, API_ENDPOINTS } from "../../utils";
import { APIHttpType } from "../../types";
import { IUser, ICreateUserRequest } from "./type";

export function CreateUser(
  userData: ICreateUserRequest
): Promise<APIHttpType<IUser>> {
  return APIHttp.post(API_ENDPOINTS.USERS.CREATE, userData);
}
```

#### query.ts
```typescript
import { useGenericQueryWithParams, useGenericMutation } from "../../utils";
import { GetUsersList } from "./get";
import { CreateUser } from "./post";
import { IUserListParams, ICreateUserRequest } from "./type";

export const useUsersQuery = (params?: IUserListParams) =>
  useGenericQueryWithParams(
    GetUsersList,
    ["get-users-list"],
    params || {},
    {
      enabled: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );

export const useCreateUserMutation = () =>
  useGenericMutation(
    CreateUser,
    ["get-users-list"],
    {
      onSuccess: (data) => {
        console.log("User created successfully:", data);
      },
      onError: (error) => {
        console.error("Failed to create user:", error);
      },
    }
  );
```

#### index.ts
```typescript
export * from "./type";
export * from "./get";
export * from "./post";
export * from "./query";
```

### 3. Export در main index

```typescript
// packages/framework/src/index.ts
export * from "./routes/users";
```

## قوانین مهم

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

## مثال کامل

```tsx
// components/UserManagement.tsx
import { 
  useUsersQuery, 
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation 
} from "@workspace/framework/routes/users";

export function UserManagement() {
  const { data: users, isLoading } = useUsersQuery({
    pageNo: 1,
    rowCount: 20,
    isActive: true,
  });

  const createUser = useCreateUserMutation();
  const updateUser = useUpdateUserMutation();
  const deleteUser = useDeleteUserMutation();

  const handleCreate = async (userData) => {
    await createUser.mutateAsync(userData);
  };

  const handleUpdate = async (userId, userData) => {
    await updateUser.mutateAsync({ id: userId, ...userData });
  };

  const handleDelete = async (userId) => {
    await deleteUser.mutateAsync(userId);
  };

  return (
    <div>
      {/* UI components */}
    </div>
  );
}
```

## مزایای این ساختار

1. **مرکزی‌سازی** - تمام endpointها در یک جا
2. **تایپ‌سفتی** - TypeScript کامل
3. **قابلیت استفاده مجدد** - Generic hooks
4. **مدیریت خطا** - Interceptors مرکزی
5. **کش هوشمند** - React Query
6. **سازماندهی** - ساختار منظم و قابل پیش‌بینی
