#[cfg(target_os = "macos")]
pub fn set_desktop_underlay(window: &tauri::WebviewWindow, underlay: bool) -> Result<(), String> {
    use objc2::{msg_send, runtime::AnyObject};
    use std::{ffi::c_void, os::raw::c_ulong};

    #[link(name = "CoreGraphics", kind = "framework")]
    unsafe extern "C" {
        fn CGWindowLevelForKey(key: i32) -> i32;
    }

    let ns_window = window.ns_window().map_err(|error| error.to_string())? as *mut c_void as *mut AnyObject;

    unsafe {
        let level = if underlay {
            // CGWindowLevelKey::DesktopWindow keeps the window behind ordinary app windows.
            CGWindowLevelForKey(2) - 1
        } else {
            // CGWindowLevelKey::NormalWindow restores an interactive window.
            CGWindowLevelForKey(4)
        };
        let (): () = msg_send![ns_window, setLevel: level];

        let behavior: c_ulong = msg_send![ns_window, collectionBehavior];
        let underlay_behavior = 1 << 0 | 1 << 4 | 1 << 6;
        let behavior = if underlay {
            behavior | underlay_behavior
        } else {
            behavior & !underlay_behavior
        };
        let (): () = msg_send![ns_window, setCollectionBehavior: behavior];
    }

    Ok(())
}
