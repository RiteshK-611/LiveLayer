# LiveLayer

A modern, minimalistic wallpaper manager with video support and customizable date widgets built with Tauri and React.

## Overview

LiveLayer is a cross-platform desktop application that brings beautiful wallpapers and an elegant date/time overlay to your desktop. Built with Rust (Tauri) for the backend and React with TypeScript for the frontend, it offers a lightweight and performant solution for customizing your desktop experience.

## Features

### 🖼️ Wallpaper Management
- **Multi-format Support**: 
  - Images: JPG, JPEG, PNG, BMP, WEBP, TIFF, TGA
  - Videos: MP4, WEBM, AVI, MOV, MKV
  - Animated: GIF
- **Live Wallpapers**: Set videos as your desktop background with seamless playback
- **Auto-Change Slideshow**: Automatically cycle through your wallpaper collection with customizable intervals
- **Drag-and-Drop**: Easily add wallpapers by dragging files into the application
- **Wallpaper Preview**: View all your wallpapers in a grid layout before setting them
- **Persistent Storage**: Your wallpaper collection is saved and persists across app restarts

### 🗓️ Date Widget
- **Customizable Display**: Toggle date and time visibility independently
- **Multiple Fonts**: Choose from Google Fonts (Megrim, Major Mono Display, Sankofa Display, Macondo) and system fonts (Arial, Times New Roman)
- **Appearance Options**:
  - Adjustable scale (0.5x - 1.5x)
  - Custom color picker for text
  - Text alignment (left, center, right)
  - Bold text toggle
- **Position & Lock**: Drag to reposition the widget anywhere on screen, and lock it in place
- **Transparent Background**: Seamlessly blends with your wallpaper
- **Always Available**: Widget persists on desktop and can be toggled from system tray or main window

### ⚙️ System Integration
- **System Tray**: Quick access to key features without opening the main window
  - Show/Hide Settings window
  - Toggle Date Widget
  - Stop Video Wallpaper
  - Quit application
- **Auto-start**: Optional auto-start on system boot
- **Persistent State**: All settings and preferences are saved automatically
- **Background Operation**: Runs quietly in the background with minimal resource usage

### 🎨 User Interface
- **Clean Design**: Modern, intuitive interface with tab-based navigation
- **Tab Navigation**: Switch between Wallpaper Manager and Date Widget settings
- **Real-time Preview**: See changes to the date widget immediately
- **Responsive Controls**: Smooth interactions and visual feedback

## Installation

### Download Pre-built Binaries

Download the latest release from the [Releases](https://github.com/riteshk-611/livelayer/releases) page.

**Available installers:**
- Windows: `.msi` or `.exe` (NSIS installer)
- macOS: `.dmg` or `.app`
- Linux: `.AppImage`, `.deb`, or `.rpm`

### Build from Source

#### Prerequisites
- **Node.js**: v18 or later
- **Rust**: Latest stable version (install from [rustup.rs](https://rustup.rs))
- **System Dependencies** (Linux only):
  ```bash
  # Debian/Ubuntu
  sudo apt update
  sudo apt install libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

  # Fedora
  sudo dnf install webkit2gtk4.1-devel \
    openssl-devel \
    curl \
    wget \
    file \
    libappindicator-gtk3-devel \
    librsvg2-devel

  # Arch Linux
  sudo pacman -S webkit2gtk-4.1 base-devel curl wget file openssl appmenu-gtk-module gtk3 libappindicator-gtk3 librsvg
  ```

#### Build Steps
```bash
# Clone the repository
git clone https://github.com/riteshk-611/livelayer.git
cd livelayer

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run tauri build
```

The built application will be available in `src-tauri/target/release/bundle/`.

## Usage

### Getting Started

1. **Launch LiveLayer**: Open the application from your start menu or applications folder
2. **Add Wallpapers**: Click the "Add Wallpapers" button and select your favorite images, videos, or GIFs
3. **Set Wallpaper**: Click on any wallpaper in the grid to apply it to your desktop
4. **Configure Settings**: Use the tabs to customize wallpaper behavior and date widget appearance

### Wallpaper Manager

**Adding Wallpapers:**
- Click "Add Wallpapers" button
- Select one or multiple files (supports batch selection)
- Files are automatically added to your collection

**Setting Wallpapers:**
- Click any wallpaper thumbnail to apply it
- For videos/GIFs: A transparent overlay window is created for playback
- For images: The system wallpaper is updated directly

**Auto-Change Slideshow:**
- Toggle "Auto-change wallpaper" to enable slideshow mode
- Set interval in seconds (minimum 1 second)
- Wallpapers cycle automatically in random order
- Excludes the currently active wallpaper from rotation

**Managing Collection:**
- Delete individual wallpapers using the trash icon
- Clear all wallpapers using "Clear All" button
- Stop video wallpaper playback with "Stop Video Wallpaper" button

### Date Widget

**Enabling the Widget:**
- Toggle "Enable this widget" to show/hide the date widget
- Widget appears on your desktop with current date and time

**Customization Options:**
- **Lock widget**: Prevents accidental dragging when enabled
- **Time**: Toggle 24-hour time display on/off
- **Bold text**: Makes text bolder for better visibility
- **Scale**: Adjust size from 0.5x to 1.5x
- **Color**: Choose custom text color using color picker
- **Font**: Select from 6 available fonts
- **Alignment**: Set text alignment (left, center, right)

**Positioning:**
- Drag the widget anywhere on screen when unlocked
- Position is automatically saved
- Widget center point is tracked for accurate repositioning

### System Tray

**Right-click the tray icon to access:**
- **Show Settings**: Opens the main window
- **Hide Settings**: Hides the main window
- **Toggle Date Widget**: Quick toggle for date widget (uses default settings if not configured)
- **Stop Video Wallpaper**: Stops any playing video wallpaper
- **Quit**: Exits the application

**Left-click the tray icon:** Toggles visibility of the main window

## Architecture

### Technology Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Rust with Tauri 2.6
- **Build System**: Vite 7.0
- **State Management**: Tauri Store plugin for persistent storage
- **UI Components**: Custom React components with CSS

### Project Structure

```
LiveLayer/
├── src/
│   ├── apps/              # React application
│   │   ├── components/    # UI components
│   │   │   ├── DateWidget.tsx       # Date widget settings
│   │   │   └── WallpaperManager.tsx # Wallpaper management
│   │   ├── types/         # TypeScript type definitions
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Application entry point
│   └── tauri/             # Rust backend
│       ├── commands/      # Tauri commands (API endpoints)
│       │   ├── app_state.rs       # Persistent state management
│       │   ├── date_widget.rs     # Date widget operations
│       │   ├── files.rs           # File handling
│       │   ├── wallpaper.rs       # Wallpaper operations
│       │   └── window.rs          # Window management
│       ├── platform/      # Platform-specific code
│       │   ├── windows.rs         # Windows-specific features
│       │   ├── macos.rs           # macOS-specific features
│       │   └── linux.rs           # Linux-specific features
│       ├── state/         # Application state
│       ├── tray/          # System tray implementation
│       ├── types/         # Rust type definitions
│       └── utils/         # Utility functions
├── public/                # Static assets
│   ├── date-widget.html   # Date widget HTML template
│   └── wallpaper.html     # Video wallpaper player
├── package.json           # Node.js dependencies
├── Cargo.toml             # Rust dependencies
├── tauri.conf.json        # Tauri configuration
└── vite.config.ts         # Vite build configuration
```

### Key Components

**Tauri Commands (Rust → JavaScript bridge):**
- `load_app_state` / `save_app_state`: Persistent state management
- `get_files_info`: Extract wallpaper metadata
- `set_static_wallpaper`: Set image wallpapers
- `create_video_wallpaper` / `stop_video_wallpaper`: Video wallpaper control
- `create_date_widget` / `close_date_widget`: Date widget lifecycle
- `update_widget_property`: Real-time widget updates
- `hide_main_window`: Window visibility control

**State Management:**
- Settings stored in `livelayer-settings.json` using Tauri Store plugin
- Automatic persistence of:
  - Wallpaper collection and current wallpaper
  - Date widget settings (position, appearance, enabled state)
  - Wallpaper slideshow settings
  - Auto-start preference

**Platform Integration:**
- Windows: Native wallpaper APIs via `winapi` crate
- macOS: AppleScript for wallpaper setting
- Linux: Desktop environment detection (GNOME, KDE, XFCE, etc.)

## Known Issues

### Date Widget Toggle Sync Issue
**Problem:** The date widget toggle in the main UI window and the taskbar tray option are not synchronized. Toggling from one location doesn't update the state in the other.

**Current Behavior:**
- Toggling from UI: Properly updates UI state and creates/closes widget
- Toggling from tray: Always creates a new widget with default settings, doesn't check current state

**Root Cause:** The tray toggle (`src/tauri/tray/mod.rs`) doesn't check if the widget is currently enabled. It always calls `create_date_widget` with default settings instead of toggling between enabled/disabled states.

**Workaround:** Use the main window toggle for reliable state management.

**Planned Fix:** Implement state checking in tray menu handler to properly toggle widget on/off and sync with UI state.

## Configuration Files

### `tauri.conf.json`
- Application metadata and bundle configuration
- Window properties (size, decorations, transparency)
- Security policies and asset access
- Build and development settings
- Platform-specific installer options

### `Cargo.toml`
- Rust dependencies and features
- Tauri plugins configuration
- Build optimization settings
- Platform-specific dependencies (e.g., `winapi` for Windows)

### `package.json`
- Node.js dependencies
- Build scripts
- Application metadata

## System Requirements

- **Windows**: Windows 10 or later (x64)
- **macOS**: macOS 10.15 (Catalina) or later (Intel and Apple Silicon)
- **Linux**: Modern distribution with GTK 3.24+ and WebKitGTK 4.1
  - X11 or Wayland display server
  - Tested on Ubuntu 20.04+, Fedora 35+, Arch Linux

**Hardware Requirements:**
- 100 MB disk space
- 200 MB RAM (more for video wallpapers)
- For video wallpapers: GPU with hardware video decoding support recommended

## Development

### Running in Development Mode

```bash
npm run dev
```

This starts both the Vite development server and Tauri in development mode with hot-reload enabled.

### Building for Production

```bash
npm run tauri build
```

Optimizations applied:
- Code minification (Terser for JS, LTO for Rust)
- Binary stripping for smaller file size
- Single codegen unit for maximum optimization
- Asset bundling and compression

### Debugging

**Frontend:**
- Open DevTools in the application window (Ctrl+Shift+I or Cmd+Option+I)
- Console logs available in DevTools

**Backend:**
- Rust logs printed to terminal during development
- Use `#[cfg(debug_assertions)]` for debug-only code
- Enable Tauri debug logging: `RUST_LOG=debug npm run dev`

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code of conduct
- Development workflow
- Pull request process
- Coding standards

**Ways to Contribute:**
- Report bugs and issues
- Suggest new features
- Improve documentation
- Submit pull requests
- Test on different platforms

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

**AGPL-3.0 Summary:**
- You can use, modify, and distribute this software
- If you modify and distribute it, you must release the source code
- If you run a modified version as a network service, you must make the source available
- Changes must be documented

## Roadmap

- [ ] Fix date widget toggle synchronization between UI and tray
- [ ] Add more customization options for date widget (shadows, borders, animations)
- [ ] Implement wallpaper categories/folders
- [ ] Add support for online wallpaper sources
- [ ] Multi-monitor support with independent wallpapers
- [ ] Wallpaper effects (blur, dimming, filters)
- [ ] Scheduled wallpaper changes (time-based)
- [ ] Integration with popular wallpaper websites
- [ ] Custom widget plugins support

## Support

If you encounter any issues or have questions:
- [Open an issue](https://github.com/riteshk-611/livelayer/issues) on GitHub
- Check existing issues for known problems and solutions
- Provide detailed information: OS version, application version, steps to reproduce

## Acknowledgments

- Built with [Tauri](https://tauri.app/) - Lightweight framework for desktop applications
- UI powered by [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## Author

**Ritesh Kokam** (riteshk-611)
- GitHub: [@riteshk-611](https://github.com/riteshk-611)
- Email: riteshkokam@gmail.com

---

⭐ If you find LiveLayer useful, please consider giving it a star on GitHub!
