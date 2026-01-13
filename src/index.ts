/**
 * Nube WezTerm Theme Generator
 * Generates TOML color scheme files for WezTerm
 */

import { writeFileSync, mkdirSync } from "fs";
import { colord as c } from "colord";

// =============================================================================
// TYPES
// =============================================================================

interface SyntaxColors {
  blue: string;
  green: string;
  greenAlt: string;
  orange: string;
  pink: string;
  purple: string;
  red: string;
  salmon: string;
  turquoise: string;
  yellow: string;
}

interface SurfaceColors {
  crust: string;
  mantle: string;
  base: string;
  surface0: string;
  surface1: string;
  surface2: string;
}

interface TextColors {
  overlay0: string;
  overlay1: string;
  overlay2: string;
  subtext0: string;
  subtext1: string;
  text: string;
}

interface NubePalette {
  name: string;
  identifier: string;
  dark: boolean;
  colors: SyntaxColors;
  surfaces: SurfaceColors;
  texts: TextColors;
  accent: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateSurfacesDark(base: string): SurfaceColors {
  return {
    crust: c(base).darken(0.04).toHex(),
    mantle: c(base).darken(0.02).toHex(),
    base: base,
    surface0: c(base).lighten(0.05).toHex(),
    surface1: c(base).lighten(0.10).toHex(),
    surface2: c(base).lighten(0.15).toHex(),
  };
}

function generateSurfacesLight(base: string): SurfaceColors {
  return {
    crust: c(base).darken(0.08).toHex(),
    mantle: c(base).darken(0.04).toHex(),
    base: base,
    surface0: c(base).darken(0.10).toHex(),
    surface1: c(base).darken(0.15).toHex(),
    surface2: c(base).darken(0.20).toHex(),
  };
}

function generateTextsDark(base: string): TextColors {
  return {
    overlay0: c(base).lighten(0.25).toHex(),
    overlay1: c(base).lighten(0.35).toHex(),
    overlay2: c(base).lighten(0.45).toHex(),
    subtext0: c(base).lighten(0.55).toHex(),
    subtext1: c(base).lighten(0.60).toHex(),
    text: c(base).lighten(0.70).desaturate(0.01).toHex(),
  };
}

function generateTextsLight(base: string, primary: string): TextColors {
  return {
    overlay0: c(base).darken(0.25).toHex(),
    overlay1: c(base).darken(0.35).toHex(),
    overlay2: c(base).darken(0.45).toHex(),
    subtext0: c(base).darken(0.50).toHex(),
    subtext1: c(base).darken(0.55).toHex(),
    text: c(primary).darken(0.40).desaturate(0.3).toHex(),
  };
}

// =============================================================================
// PALETTES
// =============================================================================

const auroraColors: SyntaxColors = {
  blue: "#69C3FF", green: "#3CEC85", greenAlt: "#A4EF58", orange: "#FF955C",
  pink: "#F38CEC", purple: "#B78AFF", red: "#E35535", salmon: "#FF738A",
  turquoise: "#22ECDB", yellow: "#EACD61",
};

const emberColors: SyntaxColors = {
  blue: "#78dce8", green: "#a9dc76", greenAlt: "#b7d175", orange: "#fc9867",
  pink: "#e991e3", purple: "#ab9df2", red: "#fc6a67", salmon: "#ff6188",
  turquoise: "#78e8c6", yellow: "#ffd866",
};

const neonColors: SyntaxColors = {
  blue: "#28A9FF", green: "#42DD76", greenAlt: "#b7d175", orange: "#FF7135",
  pink: "#E66DFF", purple: "#A95EFF", red: "#D62C2C", salmon: "#FF478D",
  turquoise: "#14E5D4", yellow: "#FFB638",
};

const eclipseColors: SyntaxColors = {
  blue: "#4db0f7", green: "#a5b82e", greenAlt: "#97e24c", orange: "#e8913b",
  pink: "#df96d9", purple: "#858bf7", red: "#f45645", salmon: "#f154a0",
  turquoise: "#26bbae", yellow: "#e2ae10",
};

const depthsColors: SyntaxColors = {
  blue: "#5fb2df", green: "#97c892", greenAlt: "#A4EF58", orange: "#DC8255",
  pink: "#d194cd", purple: "#978dd6", red: "#B4552D", salmon: "#ee5d75",
  turquoise: "#59c6c8", yellow: "#f6cc73",
};

const espressoColors: SyntaxColors = {
  blue: "#6EDDD6", green: "#9DCC57", greenAlt: "#7E9E2D", orange: "#ffa777",
  pink: "#E480AD", purple: "#9991F1", red: "#f24343", salmon: "#f77a6a",
  turquoise: "#3ceaa8", yellow: "#f7d979",
};

const crystalColors: SyntaxColors = {
  blue: "#7fd7f5", green: "#AFEA7B", greenAlt: "#A4EF58", orange: "#ffaa7d",
  pink: "#e4a3df", purple: "#bc98ff", red: "#fd604f", salmon: "#EC7886",
  turquoise: "#22D3B1", yellow: "#F5DF76",
};

const daylightColors: SyntaxColors = {
  blue: "#0073d1", green: "#189433", greenAlt: "#5e8516", orange: "#d06200",
  pink: "#e022b4", purple: "#8737e6", red: "#d03333", salmon: "#e8386a",
  turquoise: "#009999", yellow: "#bb9600",
};

const sorbetColors: SyntaxColors = {
  blue: "#0076c5", green: "#008b17", greenAlt: "#668b07", orange: "#b96000",
  pink: "#c121a4", purple: "#7522d3", red: "#d12525", salmon: "#da2a5f",
  turquoise: "#008f8f", yellow: "#c08403",
};

const palettes: NubePalette[] = [
  // Aurora family
  { name: "Aurora Frost", identifier: "aurora-frost", dark: true, colors: auroraColors,
    surfaces: generateSurfacesDark("#1c2433"), texts: generateTextsDark("#1c2433"), accent: "#8196b5" },
  { name: "Aurora Storm", identifier: "aurora-storm", dark: true, colors: auroraColors,
    surfaces: generateSurfacesDark("#222A38"), texts: generateTextsDark("#222A38"), accent: "#9DACC3" },
  { name: "Aurora Berry", identifier: "aurora-berry", dark: true, colors: auroraColors,
    surfaces: generateSurfacesDark("#111422"), texts: generateTextsDark("#111422"), accent: "#8eb0e6" },
  // Ember family
  { name: "Ember Terra", identifier: "ember-terra", dark: true, colors: emberColors,
    surfaces: generateSurfacesDark("#262329"), texts: generateTextsDark("#262329"), accent: "#b0a2a6" },
  { name: "Ember Steel", identifier: "ember-steel", dark: true, colors: emberColors,
    surfaces: generateSurfacesDark("#1e212b"), texts: generateTextsDark("#1e212b"), accent: "#98a2b5" },
  { name: "Ember Stone", identifier: "ember-stone", dark: true, colors: emberColors,
    surfaces: generateSurfacesDark("#2A2D33"), texts: generateTextsDark("#2A2D33"), accent: "#9AA2A6" },
  // Neon family
  { name: "Neon Grape", identifier: "neon-grape", dark: true, colors: neonColors,
    surfaces: generateSurfacesDark("#171131"), texts: generateTextsDark("#171131"), accent: "#A680FF" },
  { name: "Neon Void", identifier: "neon-void", dark: true, colors: neonColors,
    surfaces: generateSurfacesDark("#141417"), texts: generateTextsDark("#141417"), accent: "#AAAAAA" },
  // Eclipse
  { name: "Eclipse", identifier: "eclipse", dark: true, colors: eclipseColors,
    surfaces: generateSurfacesDark("#132c34"), texts: generateTextsDark("#132c34"), accent: "#47cfc4" },
  // Depths
  { name: "Depths", identifier: "depths", dark: true, colors: depthsColors,
    surfaces: generateSurfacesDark("#1a2b34"), texts: generateTextsDark("#1a2b34"), accent: "#97c892" },
  // Espresso
  { name: "Espresso", identifier: "espresso", dark: true, colors: espressoColors,
    surfaces: generateSurfacesDark("#292423"), texts: generateTextsDark("#292423"), accent: "#F09177" },
  // Crystal family
  { name: "Crystal Onyx", identifier: "crystal-onyx", dark: true, colors: crystalColors,
    surfaces: generateSurfacesDark("#181820"), texts: generateTextsDark("#181820"), accent: "#dbdeea" },
  { name: "Crystal Cosmos", identifier: "crystal-cosmos", dark: true, colors: crystalColors,
    surfaces: generateSurfacesDark("#151f27"), texts: generateTextsDark("#151f27"), accent: "#dbefff" },
  // Light themes
  { name: "Daylight", identifier: "daylight", dark: false, colors: daylightColors,
    surfaces: generateSurfacesLight("#f3f4f5"), texts: generateTextsLight("#f3f4f5", "#22a5c9"), accent: "#22a5c9" },
  { name: "Sorbet Cherry", identifier: "sorbet-cherry", dark: false, colors: sorbetColors,
    surfaces: generateSurfacesLight("#f1e8eb"), texts: generateTextsLight("#f1e8eb", "#d1174f"), accent: "#d1174f" },
  { name: "Sorbet Mint", identifier: "sorbet-mint", dark: false, colors: sorbetColors,
    surfaces: generateSurfacesLight("#edf3ee"), texts: generateTextsLight("#edf3ee", "#2a9b7d"), accent: "#2a9b7d" },
  { name: "Sorbet Grape", identifier: "sorbet-grape", dark: false, colors: sorbetColors,
    surfaces: generateSurfacesLight("#dad9eb"), texts: generateTextsLight("#dad9eb", "#422eb0"), accent: "#422eb0" },
];

// =============================================================================
// TOML GENERATOR
// =============================================================================

function generateToml(p: NubePalette): string {
  const { colors, surfaces, texts, accent, dark } = p;

  // For light themes, use different cursor colors
  const cursorFg = dark ? surfaces.crust : surfaces.base;
  const cursorBg = colors.salmon;

  return `[colors]
ansi = [
  '${dark ? surfaces.surface1 : texts.subtext1}',
  '${colors.red}',
  '${colors.green}',
  '${colors.yellow}',
  '${colors.blue}',
  '${colors.pink}',
  '${colors.turquoise}',
  '${dark ? texts.subtext1 : surfaces.surface2}',
]
background = '${surfaces.base}'
brights = [
  '${dark ? surfaces.surface2 : texts.subtext0}',
  '${colors.red}',
  '${colors.green}',
  '${colors.yellow}',
  '${colors.blue}',
  '${colors.pink}',
  '${colors.turquoise}',
  '${dark ? texts.subtext0 : surfaces.surface1}',
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
fg_color = '${dark ? surfaces.crust : "#ffffff"}'
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
name = 'Nube ${p.dark ? "Dark" : "Light"} - ${p.name}'
`;
}

// =============================================================================
// LUA PLUGIN GENERATOR
// =============================================================================

function generateLuaColors(p: NubePalette): string {
  const { colors, surfaces, texts, accent, name, identifier } = p;
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
  const colorEntries = palettes.map(p => generateLuaColors(p)).join("\n");
  const mappingEntries = palettes.map(p => `\t["${p.identifier}"] = "Nube ${p.dark ? "Dark" : "Light"} - ${p.name}",`).join("\n");

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
\t
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
\t\tflavor = "aurora-frost",
\t\taccent = nil,
\t\tsync = false,
\t\tsync_flavors = { light = "daylight", dark = "aurora-frost" },
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

// Ensure directories exist
mkdirSync("./dist", { recursive: true });
mkdirSync("./plugin", { recursive: true });

// Generate TOML files
for (const palette of palettes) {
  const toml = generateToml(palette);
  const filename = `./dist/nube-${palette.identifier}.toml`;
  writeFileSync(filename, toml);
  console.log(`✓ Generated ${filename}`);
}

// Generate Lua plugin
const luaPlugin = generateLuaPlugin();
writeFileSync("./plugin/init.lua", luaPlugin);
console.log(`✓ Generated ./plugin/init.lua`);

console.log(`\n✅ Generated ${palettes.length} WezTerm color schemes`);
