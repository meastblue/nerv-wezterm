/**
 * Nerv WezTerm Theme Generator v1.0.0
 * Generates TOML color scheme files + Lua plugin matching nerv-zed palettes
 */

import { writeFileSync, mkdirSync } from "fs";
import { colord as c } from "colord";

// =============================================================================
// TYPES
// =============================================================================

interface SyntaxColors {
  blue: string; green: string; greenAlt: string; orange: string;
  pink: string; purple: string; red: string; salmon: string;
  turquoise: string; yellow: string;
}

interface SurfaceColors {
  crust: string; mantle: string; base: string;
  surface0: string; surface1: string; surface2: string;
}

interface TextColors {
  overlay0: string; overlay1: string; overlay2: string;
  subtext0: string; subtext1: string; text: string;
}

interface NervPalette {
  name: string;
  identifier: string;
  appearance: "dark" | "light" | "hc";
  colors: SyntaxColors;
  surfaces: SurfaceColors;
  texts: TextColors;
  accent: string;
}

// =============================================================================
// HELPERS
// =============================================================================

function surfacesDark(base: string): SurfaceColors {
  return {
    crust: c(base).darken(0.04).toHex(),
    mantle: c(base).darken(0.02).toHex(),
    base,
    surface0: c(base).lighten(0.05).toHex(),
    surface1: c(base).lighten(0.10).toHex(),
    surface2: c(base).lighten(0.15).toHex(),
  };
}

function surfacesLight(base: string): SurfaceColors {
  return {
    crust: c(base).darken(0.08).toHex(),
    mantle: c(base).darken(0.04).toHex(),
    base,
    surface0: c(base).darken(0.10).toHex(),
    surface1: c(base).darken(0.15).toHex(),
    surface2: c(base).darken(0.20).toHex(),
  };
}

function textsDark(base: string): TextColors {
  return {
    overlay0: c(base).lighten(0.25).toHex(),
    overlay1: c(base).lighten(0.35).toHex(),
    overlay2: c(base).lighten(0.45).toHex(),
    subtext0: c(base).lighten(0.55).toHex(),
    subtext1: c(base).lighten(0.60).toHex(),
    text: c(base).lighten(0.70).desaturate(0.01).toHex(),
  };
}

function textsLight(base: string, primary: string): TextColors {
  return {
    overlay0: c(base).darken(0.25).toHex(),
    overlay1: c(base).darken(0.35).toHex(),
    overlay2: c(base).darken(0.45).toHex(),
    subtext0: c(base).darken(0.50).toHex(),
    subtext1: c(base).darken(0.55).toHex(),
    text: c(primary).darken(0.40).desaturate(0.3).toHex(),
  };
}

function dark(name: string, id: string, colors: SyntaxColors, base: string, accent: string, appearance: "dark" | "hc" = "dark"): NervPalette {
  return { name, identifier: id, appearance, colors, surfaces: surfacesDark(base), texts: textsDark(base), accent };
}

function light(name: string, id: string, colors: SyntaxColors, base: string, accent: string): NervPalette {
  return { name, identifier: id, appearance: "light", colors, surfaces: surfacesLight(base), texts: textsLight(base, accent), accent };
}

// =============================================================================
// COLOR PALETTES (exact from nerv-zed)
// =============================================================================

const qadrColors: SyntaxColors = {
  blue: "#69C3FF", green: "#3CEC85", greenAlt: "#A4EF58", orange: "#FF955C",
  pink: "#F38CEC", purple: "#B78AFF", red: "#E35535", salmon: "#FF738A",
  turquoise: "#22ECDB", yellow: "#EACD61",
};

const orbitalColors: SyntaxColors = {
  blue: "#78dce8", green: "#a9dc76", greenAlt: "#b7d175", orange: "#fc9867",
  pink: "#e991e3", purple: "#ab9df2", red: "#fc6a67", salmon: "#ff6188",
  turquoise: "#78e8c6", yellow: "#ffd866",
};

const djinnColors: SyntaxColors = {
  blue: "#28A9FF", green: "#42DD76", greenAlt: "#b7d175", orange: "#FF7135",
  pink: "#E66DFF", purple: "#A95EFF", red: "#D62C2C", salmon: "#FF478D",
  turquoise: "#14E5D4", yellow: "#FFB638",
};

const saharaColors: SyntaxColors = {
  blue: "#7fd7f5", green: "#AFEA7B", greenAlt: "#A4EF58", orange: "#ffaa7d",
  pink: "#e4a3df", purple: "#bc98ff", red: "#fd604f", salmon: "#EC7886",
  turquoise: "#22D3B1", yellow: "#F5DF76",
};

const nebulaColors: SyntaxColors = {
  blue: "#11B7D4", green: "#00a884", greenAlt: "#3585bb", orange: "#d4770c",
  pink: "#d46ec0", purple: "#a85ff1", red: "#E35535", salmon: "#c62f52",
  turquoise: "#38c7bd", yellow: "#c7910c",
};

const evaColors: SyntaxColors = {
  blue: "#4493c5", green: "#5fa052", greenAlt: "#8ab648", orange: "#e8641b",
  pink: "#d44a8a", purple: "#9b59b6", red: "#e01a1a", salmon: "#e84545",
  turquoise: "#2ba5a5", yellow: "#d4a017",
};

const adamColors: SyntaxColors = {
  blue: "#4493c5", green: "#2ecc71", greenAlt: "#8ab648", orange: "#e8641b",
  pink: "#d44a8a", purple: "#9b59b6", red: "#e01a1a", salmon: "#e84545",
  turquoise: "#2ba5a5", yellow: "#d4a017",
};

const magiColors: SyntaxColors = {
  blue: "#3a7a8c", green: "#4a8c5c", greenAlt: "#6aac7c", orange: "#e85d04",
  pink: "#8a5a8a", purple: "#7a6aaa", red: "#c44a3a", salmon: "#d46a5a",
  turquoise: "#5a9a8c", yellow: "#d4a017",
};

const nurBaseColors: SyntaxColors = {
  blue: "#0073d1", green: "#189433", greenAlt: "#5e8516", orange: "#d06200",
  pink: "#e022b4", purple: "#8737e6", red: "#d03333", salmon: "#e8386a",
  turquoise: "#009999", yellow: "#bb9600",
};

const nurSorbetColors: SyntaxColors = {
  blue: "#0076c5", green: "#008b17", greenAlt: "#668b07", orange: "#b96000",
  pink: "#c121a4", purple: "#7522d3", red: "#d12525", salmon: "#da2a5f",
  turquoise: "#008f8f", yellow: "#c08403",
};

const hcDarkColors: SyntaxColors = {
  blue: "#7fd7f5", green: "#AFEA7B", greenAlt: "#A4EF58", orange: "#ffaa7d",
  pink: "#e4a3df", purple: "#bc98ff", red: "#fd604f", salmon: "#EC7886",
  turquoise: "#22D3B1", yellow: "#F5DF76",
};

const hcStormColors: SyntaxColors = {
  blue: "#82c4ff", green: "#9dffbd", greenAlt: "#A4EF58", orange: "#ffaf94",
  pink: "#f1c6ee", purple: "#b8b3ff", red: "#ff7e70", salmon: "#f994bf",
  turquoise: "#22D3B1", yellow: "#fff0a6",
};

const hcIvoryColors: SyntaxColors = {
  blue: "#0aa3d6", green: "#41ad4e", greenAlt: "#589f11", orange: "#e3946a",
  pink: "#f08ad9", purple: "#b377e3", red: "#ee5f50", salmon: "#ed7b89",
  turquoise: "#00b696", yellow: "#e39c03",
};

// =============================================================================
// ALL 31 PALETTES
// =============================================================================

const palettes: NervPalette[] = [
  // Qadr (3)
  dark("Qadr Fajr", "qadr-fajr", qadrColors, "#1c2433", "#8196b5"),
  dark("Qadr Layl", "qadr-layl", qadrColors, "#222A38", "#9DACC3"),
  dark("Qadr Najm", "qadr-najm", qadrColors, "#111422", "#8eb0e6"),

  // Orbital (3)
  dark("Orbital Terra", "orbital-terra", orbitalColors, "#262329", "#b0a2a6"),
  dark("Orbital Steel", "orbital-steel", orbitalColors, "#1e212b", "#98a2b5"),
  dark("Orbital Stone", "orbital-stone", orbitalColors, "#2A2D33", "#9AA2A6"),

  // Djinn (2)
  dark("Djinn Ifrit", "djinn-ifrit", djinnColors, "#171131", "#A680FF"),
  dark("Djinn Void", "djinn-void", djinnColors, "#141417", "#AAAAAA"),

  // Sahara (2)
  dark("Sahara Onyx", "sahara-onyx", saharaColors, "#181820", "#dbdeea"),
  dark("Sahara Cosmos", "sahara-cosmos", saharaColors, "#151f27", "#dbefff"),

  // Nebula (5)
  dark("Nebula Sapphire", "nebula-sapphire", nebulaColors, "#111418", "#11B7D4"),
  dark("Nebula Amber", "nebula-amber", nebulaColors, "#111418", "#c7910c"),
  dark("Nebula Crimson", "nebula-crimson", nebulaColors, "#111418", "#c62f52"),
  dark("Nebula Jade", "nebula-jade", nebulaColors, "#111418", "#38c7bd"),
  dark("Nebula Violet", "nebula-violet", nebulaColors, "#111418", "#a85ff1"),

  // Eva (6)
  dark("Eva", "eva", evaColors, "#0a0a0a", "#e01a1a"),
  dark("Eva Unit-01", "eva-unit-01", evaColors, "#0d0a14", "#9b59b6"),
  dark("Eva Unit-02", "eva-unit-02", evaColors, "#140a0a", "#e8641b"),
  dark("Eva Terminal", "eva-terminal", evaColors, "#0a0f0a", "#5fa052"),
  dark("Eva Geofront", "eva-geofront", evaColors, "#0a0a10", "#4493c5"),
  dark("Eva Soft", "eva-soft", evaColors, "#1a1214", "#e01a1a"),

  // Magi (3)
  dark("Magi Melchior", "magi-melchior", magiColors, "#0a1612", "#e85d04"),
  dark("Magi Balthasar", "magi-balthasar", magiColors, "#0a1216", "#3a7a8c"),
  dark("Magi Casper", "magi-casper", magiColors, "#0f1610", "#d4a017"),

  // Adam (6)
  dark("Adam", "adam", adamColors, "#0a0a0a", "#2ecc71"),
  dark("Adam Oasis", "adam-oasis", adamColors, "#0a100f", "#1abc9c"),
  dark("Adam Eden", "adam-eden", adamColors, "#0f0e0a", "#d4b42a"),
  dark("Adam Jade", "adam-jade", adamColors, "#080d0b", "#27ae60"),
  dark("Adam Soft", "adam-soft", adamColors, "#121a14", "#2ecc71"),
  dark("Adam Midnight", "adam-midnight", adamColors, "#0a0a0a", "#58d68d"),

  // Nūr (6)
  light("Nūr", "nur", nurBaseColors, "#f3f4f5", "#22a5c9"),
  light("Nūr Cherry", "nur-cherry", nurSorbetColors, "#f1e8eb", "#d1174f"),
  light("Nūr Mint", "nur-mint", nurSorbetColors, "#edf3ee", "#2a9b7d"),
  light("Nūr Grape", "nur-grape", nurSorbetColors, "#dad9eb", "#422eb0"),
  light("Nūr Peach", "nur-peach", nurSorbetColors, "#f5ece6", "#d4652a"),
  light("Nūr Lavender", "nur-lavender", nurSorbetColors, "#eee8f3", "#7b4fbf"),

  // HC (4)
  dark("HC Obsidian", "hc-obsidian", hcDarkColors, "#0e0e12", "#dbdeea", "hc"),
  dark("HC Storm", "hc-storm", hcStormColors, "#0c2a42", "#9dffd9", "hc"),
  dark("HC Abyss", "hc-abyss", hcDarkColors, "#080810", "#f0f0ff", "hc"),
  // HC Ivory is special — light with custom UI colors
  (() => {
    const p = light("HC Ivory", "hc-ivory", hcIvoryColors, "#f5f8fc", "#444c54");
    p.appearance = "hc";
    // Override with exact Zed values
    p.texts = {
      overlay0: c("#f5f8fc").darken(0.25).toHex(),
      overlay1: c("#f5f8fc").darken(0.35).toHex(),
      overlay2: c("#f5f8fc").darken(0.45).toHex(),
      subtext0: c("#f5f8fc").darken(0.50).toHex(),
      subtext1: c("#f5f8fc").darken(0.55).toHex(),
      text: "#272d34",
    };
    return p;
  })(),
];

// =============================================================================
// TOML GENERATOR
// =============================================================================

function labelFor(p: NervPalette): string {
  if (p.appearance === "hc") return "HC";
  if (p.appearance === "light") return "Light";
  return "Dark";
}

function generateToml(p: NervPalette): string {
  const { colors, surfaces, texts, accent } = p;
  const isDark = p.appearance !== "light";

  const cursorFg = isDark ? surfaces.crust : surfaces.base;
  const cursorBg = colors.salmon;

  return `[colors]
ansi = [
  '${isDark ? surfaces.surface1 : texts.subtext1}',
  '${colors.red}',
  '${colors.green}',
  '${colors.yellow}',
  '${colors.blue}',
  '${colors.pink}',
  '${colors.turquoise}',
  '${isDark ? texts.subtext1 : surfaces.surface2}',
]
background = '${surfaces.base}'
brights = [
  '${isDark ? surfaces.surface2 : texts.subtext0}',
  '${colors.red}',
  '${colors.green}',
  '${colors.yellow}',
  '${colors.blue}',
  '${colors.pink}',
  '${colors.turquoise}',
  '${isDark ? texts.subtext0 : surfaces.surface1}',
]
compose_cursor = '${colors.orange}'
cursor_bg = '${cursorBg}'
cursor_border = '${cursorBg}'
cursor_fg = '${cursorFg}'
foreground = '${texts.text}'
scrollbar_thumb = '${surfaces.surface2}'
selection_bg = '${surfaces.surface2}'
selection_fg = '${texts.text}'
split = '${texts.overlay0}'
visual_bell = '${surfaces.surface0}'

[colors.indexed]
16 = '${colors.orange}'
17 = '${colors.salmon}'

[colors.tab_bar]
background = '${surfaces.crust}'
inactive_tab_edge = '${surfaces.surface0}'

[colors.tab_bar.active_tab]
bg_color = '${accent}'
fg_color = '${isDark ? surfaces.crust : "#ffffff"}'
intensity = 'Normal'
italic = false
strikethrough = false
underline = 'None'

[colors.tab_bar.inactive_tab]
bg_color = '${surfaces.mantle}'
fg_color = '${texts.text}'
intensity = 'Normal'
italic = false
strikethrough = false
underline = 'None'

[colors.tab_bar.inactive_tab_hover]
bg_color = '${surfaces.base}'
fg_color = '${texts.text}'
intensity = 'Normal'
italic = false
strikethrough = false
underline = 'None'

[colors.tab_bar.new_tab]
bg_color = '${surfaces.surface0}'
fg_color = '${texts.text}'
intensity = 'Normal'
italic = false
strikethrough = false
underline = 'None'

[colors.tab_bar.new_tab_hover]
bg_color = '${surfaces.surface1}'
fg_color = '${texts.text}'
intensity = 'Normal'
italic = false
strikethrough = false
underline = 'None'

[metadata]
aliases = []
author = 'meastblue'
name = 'Nerv ${labelFor(p)} - ${p.name}'
`;
}

// =============================================================================
// LUA PLUGIN
// =============================================================================

function luaColors(p: NervPalette): string {
  const { colors, surfaces, texts, accent, identifier } = p;
  return `\t["${identifier}"] = {
\t\trosewater = "${colors.salmon}",
\t\tflamingo = "${colors.orange}",
\t\tpink = "${colors.pink}",
\t\tmauve = "${colors.purple}",
\t\tred = "${colors.red}",
\t\tmaroon = "${colors.salmon}",
\t\tpeach = "${colors.orange}",
\t\tyellow = "${colors.yellow}",
\t\tgreen = "${colors.green}",
\t\tteal = "${colors.turquoise}",
\t\tsky = "${colors.blue}",
\t\tsapphire = "${colors.blue}",
\t\tblue = "${colors.blue}",
\t\tlavender = "${colors.purple}",
\t\ttext = "${texts.text}",
\t\tsubtext1 = "${texts.subtext1}",
\t\tsubtext0 = "${texts.subtext0}",
\t\toverlay2 = "${texts.overlay2}",
\t\toverlay1 = "${texts.overlay1}",
\t\toverlay0 = "${texts.overlay0}",
\t\tsurface2 = "${surfaces.surface2}",
\t\tsurface1 = "${surfaces.surface1}",
\t\tsurface0 = "${surfaces.surface0}",
\t\tbase = "${surfaces.base}",
\t\tmantle = "${surfaces.mantle}",
\t\tcrust = "${surfaces.crust}",
\t\taccent = "${accent}",
\t},`;
}

function generateLuaPlugin(): string {
  const colorEntries = palettes.map(p => luaColors(p)).join("\n");
  const mappingEntries = palettes.map(p =>
    `\t["${p.identifier}"] = "Nerv ${labelFor(p)} - ${p.name}",`
  ).join("\n");

  return `local wezterm = require("wezterm")

local M = {}

local colors = {
${colorEntries}
}

local mappings = {
${mappingEntries}
}

function M.select(palette, flavor, accent)
\tlocal c = palette[flavor]
\tif not c then
\t\terror("Unknown flavor: " .. tostring(flavor))
\tend

\tlocal isDark = c.base:sub(2, 3):lower() < "80"
\tlocal accentColor = accent and c[accent] or c.accent

\treturn {
\t\tforeground = c.text,
\t\tbackground = c.base,

\t\tcursor_fg = isDark and c.crust or c.base,
\t\tcursor_bg = c.rosewater,
\t\tcursor_border = c.rosewater,

\t\tselection_fg = c.text,
\t\tselection_bg = c.surface2,

\t\tscrollbar_thumb = c.surface2,

\t\tsplit = c.overlay0,

\t\tansi = {
\t\t\tisDark and c.surface1 or c.subtext1,
\t\t\tc.red,
\t\t\tc.green,
\t\t\tc.yellow,
\t\t\tc.blue,
\t\t\tc.pink,
\t\t\tc.teal,
\t\t\tisDark and c.subtext1 or c.surface2,
\t\t},

\t\tbrights = {
\t\t\tisDark and c.surface2 or c.subtext0,
\t\t\tc.red,
\t\t\tc.green,
\t\t\tc.yellow,
\t\t\tc.blue,
\t\t\tc.pink,
\t\t\tc.teal,
\t\t\tisDark and c.subtext0 or c.surface1,
\t\t},

\t\tindexed = { [16] = c.peach, [17] = c.rosewater },

\t\tcompose_cursor = c.flamingo,

\t\ttab_bar = {
\t\t\tbackground = c.crust,
\t\t\tactive_tab = {
\t\t\t\tbg_color = accentColor,
\t\t\t\tfg_color = isDark and c.crust or "#ffffff",
\t\t\t},
\t\t\tinactive_tab = {
\t\t\t\tbg_color = c.mantle,
\t\t\t\tfg_color = c.text,
\t\t\t},
\t\t\tinactive_tab_hover = {
\t\t\t\tbg_color = c.base,
\t\t\t\tfg_color = c.text,
\t\t\t},
\t\t\tnew_tab = {
\t\t\t\tbg_color = c.surface0,
\t\t\t\tfg_color = c.text,
\t\t\t},
\t\t\tnew_tab_hover = {
\t\t\t\tbg_color = c.surface1,
\t\t\t\tfg_color = c.text,
\t\t\t},
\t\t\tinactive_tab_edge = c.surface0,
\t\t},

\t\tvisual_bell = c.surface0,
\t}
end

local function select_for_appearance(appearance, options)
\tif appearance:find("Dark") then
\t\treturn options.dark
\telse
\t\treturn options.light
\tend
end

local function tableMerge(t1, t2)
\tfor k, v in pairs(t2) do
\t\tif type(v) == "table" then
\t\t\tif type(t1[k] or false) == "table" then
\t\t\t\ttableMerge(t1[k] or {}, t2[k] or {})
\t\t\telse
\t\t\t\tt1[k] = v
\t\t\tend
\t\telse
\t\t\tt1[k] = v
\t\tend
\tend
\treturn t1
end

function M.apply_to_config(c, opts)
\tif not opts then
\t\topts = {}
\tend

\tlocal defaults = {
\t\tflavor = "qadr-fajr",
\t\taccent = nil,
\t\tsync = false,
\t\tsync_flavors = { light = "nur", dark = "qadr-fajr" },
\t\tcolor_overrides = {},
\t\ttoken_overrides = {},
\t}

\tlocal o = tableMerge(defaults, opts)

\tlocal color_schemes = {}
\tlocal palette = tableMerge(colors, o.color_overrides)
\tfor flavor, name in pairs(mappings) do
\t\tlocal spec = M.select(palette, flavor, o.accent)
\t\tlocal overrides = o.token_overrides[flavor] or {}
\t\tcolor_schemes[name] = tableMerge(spec, overrides)
\tend
\tif c.color_schemes == nil then
\t\tc.color_schemes = {}
\tend
\tc.color_schemes = tableMerge(c.color_schemes, color_schemes)

\tif opts.sync then
\t\tc.color_scheme = select_for_appearance(wezterm.gui.get_appearance(), {
\t\t\tdark = mappings[o.sync_flavors.dark],
\t\t\tlight = mappings[o.sync_flavors.light],
\t\t})
\t\tc.command_palette_bg_color = select_for_appearance(wezterm.gui.get_appearance(), {
\t\t\tdark = colors[o.sync_flavors.dark].crust,
\t\t\tlight = colors[o.sync_flavors.light].crust,
\t\t})
\t\tc.command_palette_fg_color = select_for_appearance(wezterm.gui.get_appearance(), {
\t\t\tdark = colors[o.sync_flavors.dark].text,
\t\t\tlight = colors[o.sync_flavors.light].text,
\t\t})
\telse
\t\tc.color_scheme = mappings[o.flavor]
\t\tc.command_palette_bg_color = colors[o.flavor].crust
\t\tc.command_palette_fg_color = colors[o.flavor].text
\tend

\tlocal window_frame = {
\t\tactive_titlebar_bg = colors[o.flavor].crust,
\t\tactive_titlebar_fg = colors[o.flavor].text,
\t\tinactive_titlebar_bg = colors[o.flavor].crust,
\t\tinactive_titlebar_fg = colors[o.flavor].text,
\t\tbutton_fg = colors[o.flavor].text,
\t\tbutton_bg = colors[o.flavor].base,
\t}

\tif c.window_frame == nil then
\t\tc.window_frame = {}
\tend
\tc.window_frame = tableMerge(c.window_frame, window_frame)
end

M.colors = colors
M.mappings = mappings

return M
`;
}

// =============================================================================
// MAIN
// =============================================================================

mkdirSync("./dist", { recursive: true });
mkdirSync("./plugin", { recursive: true });

// Clean old dist
import { readdirSync, unlinkSync } from "fs";
for (const f of readdirSync("./dist")) {
  unlinkSync(`./dist/${f}`);
}

for (const palette of palettes) {
  const toml = generateToml(palette);
  const filename = `./dist/nerv-${palette.identifier}.toml`;
  writeFileSync(filename, toml);
  console.log(`✓ ${filename}`);
}

const luaPlugin = generateLuaPlugin();
writeFileSync("./plugin/init.lua", luaPlugin);
console.log(`✓ ./plugin/init.lua`);

console.log(`\n✅ Generated ${palettes.length} Nerv WezTerm color schemes`);
