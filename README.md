# NERV Theme for WezTerm

Elegant, vibrant color schemes for [WezTerm](https://wezfurlong.org/wezterm/).

## Installation

### As a WezTerm plugin

```lua
local nerv = require("nerv")

nerv.apply_to_config(config, {
  flavor = "aurora-frost",
  sync = true,
  sync_flavors = { light = "daylight", dark = "aurora-frost" },
})
```

### Manual TOML installation

Copy the `.toml` files from `dist/` to your WezTerm color schemes directory.

## Variants

**Dark:** Aurora Frost · Aurora Storm · Aurora Berry · Ember Terra · Ember Steel · Ember Stone · Neon Grape · Neon Void · Eclipse · Depths · Espresso · Crystal Onyx · Crystal Cosmos

**Light:** Daylight · Sorbet Cherry · Sorbet Mint · Sorbet Grape

## Building from Source

```bash
bun install
bun run build
```

## License

MIT — by [meastblue](https://github.com/meastblue)
