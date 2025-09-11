# Iranian Phone Number Validation

این سیستم validation شماره تلفن ایرانی را پشتیبانی می‌کند.

## فرمت‌های پشتیبانی شده

### 1. شماره‌های معتبر ایرانی:
- `09123456789` - فرمت استاندارد (11 رقم)
- `9123456789` - بدون صفر ابتدا (10 رقم)
- `+989123456789` - با کد کشور (13 رقم)

### 2. فرمت‌های نمایش:
- **ورودی**: `09123456789`
- **نمایش**: `0912 345 6789`
- **ذخیره**: `09123456789`

- **ورودی**: `+989123456789`
- **نمایش**: `+98 9123 456 789`
- **ذخیره**: `09123456789`

## نحوه استفاده

### 1. استفاده در فرم‌ها:

```tsx
import { RHFInput, commonValidations } from "@workspace/custom-ui"

<RHFInput
  name="phone"
  type="tel"
  label="شماره تلفن"
  placeholder="شماره تلفن خود را وارد کنید (مثال: 09123456789)"
  mode="phone"
  {...commonValidations.phone}
/>
```

### 2. استفاده مستقیم از validation:

```tsx
import { validationRules } from "@workspace/custom-ui"

const phoneValidation = validationRules.iranianPhone("لطفاً شماره تلفن ایرانی معتبر وارد کنید")
```

### 3. پیام‌های خطا:

```tsx
import { MESSAGES } from "@workspace/custom-ui"

// پیام‌های فارسی
const phoneRequired = MESSAGES.validation.phone.required // "شماره تلفن الزامی است"
const phoneInvalid = MESSAGES.validation.phone.invalid // "لطفاً شماره تلفن معتبر وارد کنید"
const phoneIranian = MESSAGES.validation.phone.iranian // "لطفاً شماره تلفن ایرانی معتبر وارد کنید"
```

## Regex Pattern

```javascript
/^(\+98|0)?9\d{9}$/
```

### توضیح Pattern:
- `^` - شروع رشته
- `(\+98|0)?` - کد کشور (+98) یا صفر ابتدا (اختیاری)
- `9` - باید با 9 شروع شود (شماره‌های موبایل ایرانی)
- `\d{9}` - 9 رقم بعدی
- `$` - پایان رشته

## مثال‌های معتبر:

✅ **شماره‌های معتبر:**
- `09123456789`
- `9123456789`
- `+989123456789`

❌ **شماره‌های نامعتبر:**
- `08123456789` (شروع با 8)
- `0912345678` (کمتر از 10 رقم)
- `091234567890` (بیشتر از 11 رقم)
- `1234567890` (شروع با 1)

## ویژگی‌های اضافی:

### 1. **Auto-formatting:**
- شماره‌ها به صورت خودکار فرمت می‌شوند
- فاصله‌گذاری مناسب برای خوانایی

### 2. **Auto-conversion:**
- `+989123456789` → `09123456789`
- `9123456789` → `09123456789`

### 3. **Real-time validation:**
- validation در حین تایپ
- نمایش خطاهای مناسب

## تست کردن:

```tsx
// تست شماره‌های مختلف
const testNumbers = [
  '09123456789',    // ✅ معتبر
  '9123456789',     // ✅ معتبر (تبدیل به 09123456789)
  '+989123456789',  // ✅ معتبر (تبدیل به 09123456789)
  '08123456789',    // ❌ نامعتبر
  '0912345678',     // ❌ نامعتبر
  '1234567890',     // ❌ نامعتبر
]
```

## Integration با React Hook Form:

```tsx
import { useForm } from 'react-hook-form'
import { FormProvider, RHFInput, commonValidations } from "@workspace/custom-ui"

function MyForm() {
  const methods = useForm({
    defaultValues: {
      phone: ''
    }
  })

  const onSubmit = (data) => {
    console.log('Phone:', data.phone) // همیشه فرمت 09123456789
  }

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <RHFInput
        name="phone"
        type="tel"
        label="شماره تلفن"
        placeholder="09123456789"
        mode="phone"
        {...commonValidations.phone}
      />
    </FormProvider>
  )
}
```

## نکات مهم:

1. **فرمت ذخیره**: همیشه به فرمت `09123456789` ذخیره می‌شود
2. **نمایش**: با فاصله‌گذاری مناسب نمایش داده می‌شود
3. **Validation**: فقط شماره‌های موبایل ایرانی معتبر است
4. **پیام‌ها**: تمام پیام‌ها به فارسی هستند
5. **Auto-complete**: پشتیبانی از auto-complete مرورگر

## مثال کامل:

```tsx
import { 
  FormProvider, 
  RHFInput, 
  commonValidations,
  useError,
  useToast 
} from "@workspace/custom-ui"

function PhoneForm() {
  const methods = useForm()
  const { addFieldError } = useError()
  const { success, error } = useToast()

  const onSubmit = async (data) => {
    try {
      // API call
      await api.submitPhone(data.phone)
      success('شماره تلفن با موفقیت ثبت شد')
    } catch (err) {
      addFieldError('phone', {
        field: 'phone',
        message: 'خطا در ثبت شماره تلفن',
        type: 'server'
      })
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <RHFInput
        name="phone"
        type="tel"
        label="شماره تلفن"
        placeholder="شماره تلفن خود را وارد کنید"
        mode="phone"
        {...commonValidations.phone}
      />
    </FormProvider>
  )
}
```
