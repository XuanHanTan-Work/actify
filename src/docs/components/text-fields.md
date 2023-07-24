---
title: Text fields
---

# Text fields

## Text fields let users enter text into a UI

# Usage

<usage name="text-fields"></usage>

```jsx
import { TextField } from 'actify'

export default () => {
  return (
    <>
      <TextField label="filled" placeholder="placeholder" />
      <TextField variant="outlined" label="outlined" placeholder="placeholder" />
      <TextField variant="outlined" disabled label="disabled" placeholder="placeholder" />
    </>
  )
}
```