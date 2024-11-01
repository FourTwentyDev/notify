# FourTwenty Notify 🔔

A sleek and modern notification system for FiveM servers featuring smooth animations, gradient styling, and flexible positioning options.

## Features 🌟

- **Smooth Animations**: 
  - Progress bars with timing indicators
  - Fade in/out transitions
  - Gradient-based styling effects

- **Flexible Positioning**: 
  - 9 different position combinations
  - Customizable offset settings
  - Left/Center/Right horizontal alignment
  - Top/Middle/Bottom vertical alignment

- **Notification Types**: 
  - Success (Green gradients)
  - Error (Red gradients)
  - Info (Blue gradients)
  - Warning (Yellow gradients)
  - Primary (Purple gradients)
  - Secondary (Gray gradients)

- **Technical Features**:
  - Optimized performance (0.00ms idle)
  - Easy integration with exports
  - Server-side and client-side support
  - Fully configurable styling
  - No dependencies required

## Installation 💿

1. Download the latest release from GitHub
2. Extract to your server's `resources` directory
3. Add `ensure fourtwenty_notify` to your `server.cfg`
4. Configure the script using `config.lua`

## Usage 🎮

### Client-Side Examples

```lua
-- Basic notification
exports['fourtwenty_notify']:notify("Title", "Message", "info", 5000)

-- Test commands (included)
/testinfo      -- Shows an info notification
/testsuccess   -- Shows a success notification
/testwarning   -- Shows a warning notification
/testerror     -- Shows an error notification
```

### Server-Side Examples

```lua
-- Send to specific player
exports['fourtwenty_notify']:notify(source, "Title", "Message", "success", 7500)
```

## Configuration 🔧

### Main Configuration
```lua
Config.Position = {
    x = "left",    -- Options: "left", "center", "right"
    y = "middle"   -- Options: "top", "middle", "bottom"
}

Config.Offset = {
    x = 20,
    y = 0
}
```

### Notification Types Configuration
```lua
Config.Types = {
    success = {
        label = "Success",
        colors = {
            from = "#22c55e",
            via = "#16a34a",
            to = "#22c55e"
        }
    },
    -- Additional types configured similarly
}
```

## Integration Examples 💡

### ESX Integration
```lua
-- Register as ESX shared object
ESX.ShowNotification = function(message)
    exports['fourtwenty_notify']:notify("ESX", message, "info", 5000)
end
```

### QBCore Integration
```lua
-- Register as QB shared object
QBCore.Functions.Notify = function(message, type)
    exports['fourtwenty_notify']:notify("QBCore", message, type, 5000)
end
```

## Support 🤝

For support, please:
1. Join our [Discord](https://discord.gg/fourtwenty)
2. Visit our website: [www.fourtwenty.dev](https://fourtwenty.dev)
3. Create an issue on GitHub

## Contributing 🤲

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
Made with ❤️ by [FourTwentyDev](https://fourtwenty.dev)
