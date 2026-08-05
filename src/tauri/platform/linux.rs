#[cfg(target_os = "linux")]
pub fn set_desktop_underlay(window: &tauri::WebviewWindow, underlay: bool) -> Result<(), String> {
    use gtk::prelude::GtkWindowExt;

    // ponytail: Wayland compositors may ignore this hint; add compositor protocols only when a tested target requires one.
    window
        .gtk_window()
        .map_err(|error| error.to_string())?
        .set_type_hint(if underlay {
            gdk::WindowTypeHint::Desktop
        } else {
            gdk::WindowTypeHint::Normal
        });

    Ok(())
}
