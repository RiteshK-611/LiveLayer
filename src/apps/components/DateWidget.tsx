import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import {
  AppPersistentState,
  DateWidgetSettings,
  FontOption,
} from "../types/wallpaper";

interface DateWidgetProps {
  settings: DateWidgetSettings;
  onSettingsChange: (settings: DateWidgetSettings) => void;
}

const DateWidget: React.FC<DateWidgetProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pollState = async () => {
      try {
        const state: AppPersistentState = await invoke("load_app_state");
        if (state.date_widget_settings) {
          if (state.date_widget_settings.enabled !== settings.enabled) {
            onSettingsChange(state.date_widget_settings);
          }
        }
      } catch (error) {
        console.error("Error polling date widget state:", error);
      }
    };

    const interval = setInterval(pollState, 1000);
    return () => clearInterval(interval);
  }, [settings.enabled, onSettingsChange]);

  const fontOptions: FontOption[] = [
    { name: "Megrim", value: "Megrim", type: "google" },
    { name: "Major Mono Display", value: "Major Mono Display", type: "google" },
    { name: "Sankofa Display", value: "Sankofa Display", type: "google" },
    { name: "Macondo", value: "Macondo", type: "google" },
    { name: "Arial", value: "Arial", type: "local" },
    { name: "Times New Roman", value: "Times New Roman", type: "local" },
  ];

  const handleToggleWidget = async () => {
    try {
      setLoading(true);

      // Use the shared toggle command from Rust
      await invoke("toggle_date_widget");

      // Update local state to reflect the toggle
      const state: AppPersistentState = await invoke("load_app_state");
      if (state.date_widget_settings) {
        onSettingsChange(state.date_widget_settings);
      }
    } catch (error) {
      console.error("Error toggling date widget:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = async (
    key: keyof DateWidgetSettings,
    value: any
  ) => {
    const newSettings = { ...settings, [key]: value };
    onSettingsChange(newSettings);
    await invoke("update_date_widget_state", { settings: newSettings });

    // If widget is enabled, update it with new settings
    if (settings.enabled) {
      try {
        await invoke("update_widget_property", {
          key: key,
          value: value.toString(),
        });
      } catch (error) {
        console.error("Error updating date widget:", error);
      }
    }
  };

  return (
    <div className="date-widget-container">
      <div className="section">
        <div className="widget-controls">
          <div className="control-rows">
            <span className="control-label">Enable this widget</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={handleToggleWidget}
                disabled={loading}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="control-rows">
            <span className="control-label">Lock widget</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.locked}
                onChange={(e) =>
                  handleSettingChange("locked", e.target.checked)
                }
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="control-rows">
            <span className="control-label">Time</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.show_time}
                onChange={(e) =>
                  handleSettingChange("show_time", e.target.checked)
                }
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="control-rows">
            <span className="control-label">Bold text</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.bold_text}
                onChange={(e) =>
                  handleSettingChange("bold_text", e.target.checked)
                }
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="control-rows">
            <span className="control-label">Scale</span>
            <div className="scale-control">
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={settings.scale}
                onChange={(e) =>
                  handleSettingChange("scale", parseFloat(e.target.value))
                }
                className="scale-slider"
              />
              <span className="scale-value">{settings.scale.toFixed(1)}x</span>
            </div>
          </div>

          <div className="control-rows">
            <span className="control-label">Change color</span>
            <div className="color-control">
              <input
                type="color"
                value={settings.color}
                onChange={(e) => handleSettingChange("color", e.target.value)}
                className="color-picker"
              />
            </div>
          </div>

          <div className="control-rows">
            <span className="control-label">Date font</span>
            <select
              value={settings.font}
              onChange={(e) => handleSettingChange("font", e.target.value)}
              className="font-select">
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-rows">
            <span className="control-label">Align</span>
            <select
              value={settings.alignment}
              onChange={(e) => handleSettingChange("alignment", e.target.value)}
              className="align-select">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateWidget;
