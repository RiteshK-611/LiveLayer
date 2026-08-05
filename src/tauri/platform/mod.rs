#[cfg(target_os = "windows")]
pub mod windows;

#[cfg(target_os = "macos")]
pub mod macos;

#[cfg(target_os = "linux")]
pub mod linux;

pub fn set_window_as_desktop_underlay(
    window: &tauri::WebviewWindow,
    underlay: bool,
) -> Result<(), String> {
    let (sender, receiver) = std::sync::mpsc::sync_channel(1);
    let window = window.clone();

    window
        .run_on_main_thread(move || {
            #[cfg(target_os = "windows")]
            let result = windows::set_desktop_underlay(&window, underlay);
            #[cfg(target_os = "macos")]
            let result = macos::set_desktop_underlay(&window, underlay);
            #[cfg(target_os = "linux")]
            let result = linux::set_desktop_underlay(&window, underlay);

            let _ = sender.send(result);
        })
        .map_err(|error| error.to_string())?;

    receiver
        .recv()
        .map_err(|error| error.to_string())?
}
