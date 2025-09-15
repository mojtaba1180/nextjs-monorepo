# 🚀 Add New Endpoint Prompt

## نحوه استفاده

این prompt آماده استفاده است. فقط اطلاعات endpoint خود را جایگزین کنید و به AI بدهید:

---

## 📝 Prompt آماده

```
من می‌خوام یک endpoint جدید به framework package اضافه کنم. لطفا مراحل زیر رو به ترتیب انجام بده:

1. **تحلیل endpoint**: endpoint رو بررسی کن و مشخصاتش رو تعیین کن
2. **افزودن به API_ENDPOINTS**: endpoint رو به api-endpoints.ts اضافه کن
3. **ایجاد Route Structure**: فولدر و فایل‌های مورد نیاز رو بساز
4. **تعریف Types**: تمام interfaceها و typeهای مربوط به endpoint رو تعریف کن
5. **ایجاد توابع API**: توابع GET، POST، PUT، DELETE رو بساز
6. **ایجاد React Query Hooks**: هوک‌های مربوط به endpoint رو بساز
7. **Export و Build**: endpoint رو export کن و build کن
8. **تست**: مطمئن شو همه چیز درست کار می‌کنه

**Endpoint Information:**

**Endpoint Name:** [نام endpoint - مثلاً: users, orders, categories]
**Base Path:** [مسیر پایه - مثلاً: /users, /orders, /categories]
**Description:** [توضیح کوتاه endpoint]

**API Endpoints:**
- LIST: [مسیر لیست - مثلاً: /users]
- DETAIL: [مسیر جزئیات - مثلاً: /users/{id}]
- SEARCH: [مسیر جستجو - مثلاً: /users/search]
- CREATE: [مسیر ایجاد - مثلاً: /users]
- UPDATE: [مسیر به‌روزرسانی - مثلاً: /users/{id}]
- DELETE: [مسیر حذف - مثلاً: /users/{id}]
- BULK_DELETE: [مسیر حذف دسته‌ای - مثلاً: /users/bulk]

**Response Example:**
{
  "result": {
    "status": "success",
    "message": "[پیام موفقیت]"
  },
  "entries": [
    {
      "id": "[شناسه]",
      "name": "[نام]",
      "email": "[ایمیل]",
      "role": "[نقش]",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "metadata": {
    "totalRows": 100,
    "pageCount": 10
  }
}

**Request Examples:**

// Create Request
{
  "name": "[نام]",
  "email": "[ایمیل]",
  "password": "[رمز عبور]",
  "role": "[نقش]",
  "isActive": true
}

// Update Request
{
  "id": "[شناسه]",
  "name": "[نام جدید]",
  "email": "[ایمیل جدید]",
  "role": "[نقش جدید]"
}

// Query Parameters
{
  "pageNo": 1,
  "rowCount": 10,
  "search": "[جستجو]",
  "role": "[نقش]",
  "isActive": true
}
```

---

## 🎯 مثال کامل - Users

```
من می‌خوام یک endpoint جدید به framework package اضافه کنم. لطفا مراحل زیر رو به ترتیب انجام بده:

1. **تحلیل endpoint**: endpoint رو بررسی کن و مشخصاتش رو تعیین کن
2. **افزودن به API_ENDPOINTS**: endpoint رو به api-endpoints.ts اضافه کن
3. **ایجاد Route Structure**: فولدر و فایل‌های مورد نیاز رو بساز
4. **تعریف Types**: تمام interfaceها و typeهای مربوط به endpoint رو تعریف کن
5. **ایجاد توابع API**: توابع GET، POST، PUT، DELETE رو بساز
6. **ایجاد React Query Hooks**: هوک‌های مربوط به endpoint رو بساز
7. **Export و Build**: endpoint رو export کن و build کن
8. **تست**: مطمئن شو همه چیز درست کار می‌کنه

**Endpoint Information:**

**Endpoint Name:** users
**Base Path:** /users
**Description:** مدیریت کاربران سیستم

**API Endpoints:**
- LIST: /users (لیست کاربران)
- DETAIL: /users/{id} (جزئیات کاربر)
- SEARCH: /users/search (جستجوی کاربران)
- CREATE: /users (ایجاد کاربر)
- UPDATE: /users/{id} (به‌روزرسانی کاربر)
- DELETE: /users/{id} (حذف کاربر)
- BULK_DELETE: /users/bulk (حذف دسته‌ای)

**Response Example:**
{
  "result": {
    "status": "success",
    "message": "Users retrieved successfully"
  },
  "entries": [
    {
      "id": "user-1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "metadata": {
    "totalRows": 100,
    "pageCount": 10
  }
}

**Request Examples:**

// Create User
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user",
  "isActive": true
}

// Update User
{
  "id": "user-1",
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "role": "admin"
}

// Query Parameters
{
  "pageNo": 1,
  "rowCount": 10,
  "search": "john",
  "role": "admin",
  "isActive": true
}
```

---

## 🎯 مثال کامل - Orders

```
من می‌خوام یک endpoint جدید به framework package اضافه کنم. لطفا مراحل زیر رو به ترتیب انجام بده:

1. **تحلیل endpoint**: endpoint رو بررسی کن و مشخصاتش رو تعیین کن
2. **افزودن به API_ENDPOINTS**: endpoint رو به api-endpoints.ts اضافه کن
3. **ایجاد Route Structure**: فولدر و فایل‌های مورد نیاز رو بساز
4. **تعریف Types**: تمام interfaceها و typeهای مربوط به endpoint رو تعریف کن
5. **ایجاد توابع API**: توابع GET، POST، PUT، DELETE رو بساز
6. **ایجاد React Query Hooks**: هوک‌های مربوط به endpoint رو بساز
7. **Export و Build**: endpoint رو export کن و build کن
8. **تست**: مطمئن شو همه چیز درست کار می‌کنه

**Endpoint Information:**

**Endpoint Name:** orders
**Base Path:** /orders
**Description:** مدیریت سفارشات

**API Endpoints:**
- LIST: /orders (لیست سفارشات)
- DETAIL: /orders/{id} (جزئیات سفارش)
- SEARCH: /orders/search (جستجوی سفارشات)
- CREATE: /orders (ایجاد سفارش)
- UPDATE: /orders/{id} (به‌روزرسانی سفارش)
- DELETE: /orders/{id} (حذف سفارش)
- BULK_DELETE: /orders/bulk (حذف دسته‌ای)

**Response Example:**
{
  "result": {
    "status": "success",
    "message": "Orders retrieved successfully"
  },
  "entries": [
    {
      "id": "order-1",
      "orderNumber": "ORD-001",
      "customerId": "customer-1",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "items": [
        {
          "id": "item-1",
          "productId": "product-1",
          "productName": "Product 1",
          "quantity": 2,
          "unitPrice": 100,
          "totalPrice": 200
        }
      ],
      "totalAmount": 200,
      "status": "pending",
      "paymentStatus": "pending",
      "shippingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "billingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "notes": "Please deliver carefully",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "metadata": {
    "totalRows": 50,
    "pageCount": 5
  }
}

**Request Examples:**

// Create Order
{
  "customerId": "customer-1",
  "items": [
    {
      "productId": "product-1",
      "productName": "Product 1",
      "quantity": 2,
      "unitPrice": 100
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "notes": "Please deliver carefully"
}

// Update Order
{
  "id": "order-1",
  "status": "confirmed",
  "paymentStatus": "paid",
  "notes": "Order confirmed and paid"
}

// Query Parameters
{
  "pageNo": 1,
  "rowCount": 10,
  "search": "ORD-001",
  "status": "pending",
  "paymentStatus": "pending",
  "customerId": "customer-1"
}
```

---

## 📋 چک‌لیست

قبل از ارسال prompt، مطمئن شوید:

- [ ] **Endpoint Name** مشخص شده
- [ ] **Base Path** مشخص شده
- [ ] **Description** نوشته شده
- [ ] **API Endpoints** کامل است
- [ ] **Response Example** واقعی است
- [ ] **Request Examples** کامل است
- [ ] تمام فیلدهای مورد نیاز مشخص شده

---

**آماده‌اید endpoint جدید اضافه کنید؟ از prompt بالا استفاده کنید! 🚀**
