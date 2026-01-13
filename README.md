# Nube Theme for WezTerm

<p align="center">
  <strong>A cozy and vibrant color scheme collection for <a href="https://wezfurlong.org/wezterm/">WezTerm</a></strong>
</p>

<p align="center">
  17 themes with TOML configs and Lua plugin support
</p>

---

## Features

- **17 Color Schemes** — Matching the Nube Theme for Zed
- **Two Installation Methods** — Simple TOML or advanced Lua plugin
- **System Appearance Sync** — Auto-switch dark/light with OS
- **Full Customization** — Override colors and tokens per-theme
- **Programmatic Generation** — Built with TypeScript for consistency

---

## Themes

### Dark Themes (13)

| Family | Themes | Description |
|--------|--------|-------------|
| **Aurora** | Frost, Storm, Berry | Cool blue-gray northern lights |
| **Ember** | Terra, Steel, Stone | Warm glowing embers |
| **Neon** | Grape, Void | Electric vibrant colors |
| **Crystal** | Onyx, Cosmos | High contrast accessibility |
| — | Eclipse | Warm teal sunset |
| — | Depths | Deep ocean vibes |
| — | Espresso | Coffee-inspired browns |

### Light Themes (4)

| Family | Themes | Description |
|--------|--------|-------------|
| — | Daylight | Clean bright classic |
| **Sorbet** | Cherry, Mint, Grape | Soft pastel tones |

---

## Installation

### Method 1: TOML Files (Simple)

Copy theme files directly to WezTerm:

```bash
# Clone repository
git clone https://github.com/nube/nube-wezterm.git

# Copy themes to WezTerm colors directory
mkdir -p ~/.config/wezterm/colors
cp nube-wezterm/dist/*.toml ~/.config/wezterm/colors/
```

Then in `~/.wezterm.lua`:

```lua
return {
  color_scheme = "Nube Dark - Aurora Frost",
}
```

### Method 2: Lua Plugin (Advanced)

Install as a WezTerm plugin:

```bash
# Clone to plugins directory
git clone https://github.com/nube/nube-wezterm.git \
  ~/.config/wezterm/plugins/nube
```

Then in `~/.wezterm.lua`:

```lua
local wezterm = require("wezterm")
local nube = require("plugins.nube.plugin")

local config = {}
if wezterm.config_builder then
  config = wezterm.config_builder()
end

nube.apply_to_config(config, {
  flavor = "aurora-frost",
})

return config
```

---

## Available Flavors

```lua
-- Dark themes
"aurora-frost"    "aurora-storm"    "aurora-berry"
"ember-terra"     "ember-steel"     "ember-stone"
"neon-grape"      "neon-void"
"crystal-onyx"    "crystal-cosmos"
"eclipse"         "depths"          "espresso"

-- Light themes
"daylight"
"sorbet-cherry"   "sorbet-mint"     "sorbet-grape"
```

---

## Plugin Options

### Basic Usage

```lua
nube.apply_to_config(config, {
  flavor = "aurora-frost",
})
```

### Custom Accent Color

```lua
nube.apply_to_config(config, {
  flavor = "aurora-frost",
  accent = "pink",  -- Use any palette color as accent
})
```

### System Appearance Sync

Automatically switch between dark and light themes:

```lua
nube.apply_to_config(config, {
  sync = true,
  sync_flavors = {
    light = "daylight",
    dark = "aurora-frost",
  },
})
```

### Color Overrides

Customize specific colors per theme:

```lua
nube.apply_to_config(config, {
  flavor = "aurora-frost",
  color_overrides = {
    ["aurora-frost"] = {
      base = "#000000",      -- Override background
      accent = "#ff0000",    -- Override accent
    },
  },
})
```

### Token Overrides

Override WezTerm-specific tokens:

```lua
nube.apply_to_config(config, {
  flavor = "aurora-frost",
  token_overrides = {
    ["aurora-frost"] = {
      cursor_bg = "#ff0000",
      cursor_fg = "#ffffff",
      selection_bg = "#333333",
    },
  },
})
```

### Full Configuration Example

```lua
local wezterm = require("wezterm")
local nube = require("plugins.nube.plugin")

local config = wezterm.config_builder()

nube.apply_to_config(config, {
  -- Theme selection
  flavor = "neon-void",

  -- Custom accent
  accent = "pink",

  -- Sync with OS appearance
  sync = true,
  sync_flavors = {
    light = "sorbet-mint",
    dark = "neon-void",
  },

  -- Color customizations
  color_overrides = {
    ["neon-void"] = {
      base = "#0a0a0a",
    },
  },

  -- Token customizations
  token_overrides = {
    ["neon-void"] = {
      cursor_bg = "#ff00ff",
    },
  },
})

return config
```

---

## Color Palette

Each theme includes these color keys:

| Key | Usage |
|-----|-------|
| `blue` | Primary accent, links |
| `green` | Success, strings |
| `red` | Errors, deletions |
| `yellow` | Warnings, highlights |
| `orange` | Secondary accent |
| `pink` | Special elements |
| `purple` | Violet tones |
| `salmon` | Warm accent |
| `turquoise` | Cyan/teal tones |
| `text` | Main foreground |
| `base` | Main background |
| `surface0-2` | Elevated surfaces |
| `overlay0-2` | Muted text |

---

## Development

### Prerequisites

- [Bun](https://bun.sh) v1.1.0+
- TypeScript

### Build

```bash
# Install dependencies
bun install

# Generate theme files
bun run build

# Watch mode
bun run dev
```

### Project Structure

```
nube-wezterm/
├── src/
│   └── index.ts          # Main generator (palettes + generation)
├── plugin/
│   └── init.lua          # Generated Lua plugin
├── dist/                  # Generated TOML files
│   ├── nube-aurora-frost.toml
│   ├── nube-aurora-storm.toml
│   └── ... (17 total)
├── package.json
└── tsconfig.json
```

### Generated Output

| Output | Purpose |
|--------|---------|
| `dist/*.toml` | Direct WezTerm color schemes |
| `plugin/init.lua` | Lua module for advanced usage |

### TOML Structure

```toml
[colors]
ansi = ["#000000", ...]      # Standard ANSI 0-7
brights = ["#555555", ...]   # Bright ANSI 0-7
background = "#1c2433"
foreground = "#d0d7e4"
cursor_bg = "#ff738a"
cursor_fg = "#151b26"
selection_bg = "#374764"
selection_fg = "#d0d7e4"

[colors.indexed]
16 = "#ff955c"               # Extended orange
17 = "#ff738a"               # Extended salmon

[colors.tab_bar]
background = "#151b26"
# ... active_tab, inactive_tab, etc.

[metadata]
name = "Nube Dark - Aurora Frost"
author = "meastblue"
```

---

## Theme Comparison with Zed

This theme collection is designed to match **Nube Theme for Zed**, providing a consistent visual experience across your editor and terminal.

| Zed Theme | WezTerm Flavor |
|-----------|----------------|
| Nube Dark - Aurora Frost | `aurora-frost` |
| Nube Dark - Neon Void | `neon-void` |
| Nube Light - Daylight | `daylight` |
| ... | ... |

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/meastblue"><strong>meastblue</strong></a>
</p>
