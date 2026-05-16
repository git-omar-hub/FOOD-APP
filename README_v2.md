# FOOD-APP — Refactor Additions (v2)

## Form Validation

Forms now use **react-hook-form** + **zod** for validation.

- **Add food** (`Admin/src/pages/Add/Add.jsx`) — validates name, description, price, category
- **Login / Sign up** (`Frontend/src/Components/loginPopup/LoginPopup.jsx`) — email format, password length, name length
- **Place order** (`Frontend/src/Components/pages/PlaceOrder/PlaceOrder.jsx`) — validates all delivery fields, phone min 10 digits

Schema definitions live at the top of each file using `z.object()`.

## Toasts

**react-toastify** replaced with **sonner**.

```jsx
import { toast } from "sonner";
toast.success("Added to cart");
toast.error("Backend is offline");
```

### Trigger points

| Action | Toast |
|---|---|
| Add to cart | ✅ Success |
| Remove from cart | ℹ️ Neutral |
| Sign in / Sign up | ✅ Success |
| Sign out | ℹ️ Neutral |
| Coupon submitted | ℹ️ Neutral / ❌ Error |
| Place order | ❌ Error on failure |
| Payment verified | ✅ Success / ❌ Error |
| Backend network error | ❌ Descriptive message |
| Cart sync failure | ❌ Warning |
| Redirected from checkout (no auth) | ❌ "Please sign in" |
| Redirected from checkout (empty cart) | ❌ "Your cart is empty" |

### Dynamic Island animation

Toasts drop from above with a spring overshoot curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) and scale in from 0.85, styled as dark pill-shaped banners at top-center with backdrop blur.

## Shared Components

### FormField
`FormField/FormField.jsx` — wraps inputs/textareas with `react-hook-form`'s `register`, displays validation errors.

```jsx
<FormField name="email" type="email" placeholder="Email" register={register} error={errors.email} />
```

### Modal
`Modal/Modal.jsx` — overlay modal with Escape key close, backdrop click close, body scroll lock.

```jsx
<Modal open={true} onClose={() => setShow(false)} title="Title">
  {children}
</Modal>
```

Copied to both `Admin/src/components/` and `Frontend/src/Components/`.

## Checkout Guard

**Cart page** (`Frontend/src/Components/pages/Cart/Cart.jsx`) now checks auth and cart state before navigating to `/order`:

- Not signed in → toast + stay on cart
- Empty cart → toast + stay on cart
- Passes → navigate to `/order`

## Error Handling

Previously silent `.catch(console.log)` calls replaced with user-facing toasts:

- **`StoreContext`** — cart add/remove/get failures show toast
- **`verify.jsx`** — wrapped in try/catch with toast
- **`MyoRders.jsx`** — wrapped in try/catch + checks `res.data.success`
- **`PlaceOrder.jsx`** — distinguishes network errors from server errors

## Dependencies Added

```
@hookform/resolvers  react-hook-form  sonner  zod
```
