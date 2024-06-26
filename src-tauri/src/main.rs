/*
use tauri::Manager;

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}


#[tauri::command]
fn test_app_handle(app: tauri::AppHandle) {
    app.emit_all("event-name", Payload { message: "Tauri is awesome!".into() }).unwrap();
}

// Also in main.rs
fn main() {
  tauri::Builder::default()
  .setup(|app| {
   
 
    use global_hotkey::{GlobalHotKeyManager, hotkey::{HotKey, Modifiers, Code}, GlobalHotKeyEvent};

    let handle = app.handle();

    // initialize the hotkeys manager
    let manager = GlobalHotKeyManager::new().unwrap();
    
    // construct the hotkey
    let hotkey = HotKey::new(Some(Modifiers::SHIFT), Code::KeyD);
    
    // register it
    let _ = manager.register(hotkey);
    
    if let Ok(event) = GlobalHotKeyEvent::receiver().try_recv() {
        println!("{:?}", event);
        test_app_handle(handle);
    }
    


    Ok(())
})
    // This is where you pass in your commands
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
*/
#[tauri::command]
fn my_custom_command() {
  println!("I was invoked from JS!");
}

fn main() {
  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![my_custom_command])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}