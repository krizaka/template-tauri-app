# template-tauri-app

Start a Krizaka **Mac app** (Tauri 2) from this template. It only *wires*: the security-sensitive Rust (the folder scope, files,
the drop gate, the navigation guard) is [`krizaka-tauri-kit`](https://github.com/krizaka/krizaka-tauri-kit), the page is built
from [`@krizaka/ui`](https://ui.krizaka.com) (the web components, in the window), the pipeline is the org's reusable
`tauri-macos.yml`, and the decision is [ADR-005](https://github.com/krizaka/.github/blob/main/docs/adr/ADR-005-tauri-app-kit.md).

```bash
# Create the product's repository from this template (« Use this template »), clone it, then:
node scripts/init.mjs yomizaka "Yomizaka"      # replaces __slug__ and __Name__
pnpm install
pnpm tauri icon src-tauri/icons/source.png      # the product's own mark: use brand/<product>/avatar-1024.png
pnpm check                                       # types, UI tests, Rust tests
pnpm tauri dev
```

| File | What it is |
| :-- | :-- |
| `src-tauri/src/lib.rs` | The commands: grant, revoke and list a folder, the drop gate. Add the product's own, each resolving its paths through `Access::resolve` |
| `src-tauri/capabilities/main.json` | `core:default`, the dialog and Yomizaka-style HTTP scope to the product's own addresses: no `fs`, no shell, no opener |
| `src-tauri/entitlements.plist` | Hardened runtime, nothing opted out |
| `.github/workflows/desktop.yml` | Calls `tauri-macos.yml`: checks on every PR, the arm64 `.dmg` on a `desktop-v*` tag |

## Release and signing

A `desktop-v<version>` tag builds the `.dmg` and attaches it to the release. Until the Developer ID Application certificate and
the notarisation credentials are repository secrets (`APPLE_CERTIFICATE`, `APPLE_CERTIFICATE_PASSWORD`, `APPLE_SIGNING_IDENTITY`,
`APPLE_TEAM_ID`, `APPLE_API_ISSUER`, `APPLE_API_KEY`, `APPLE_API_KEY_P8`) the app is not signed: right-click it, then Open. An
unsigned debug build asks for the Keychain password at every launch; that is the missing signature.
