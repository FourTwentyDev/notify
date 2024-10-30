-- Send configuration to NUI when resource starts
local function SendConfigToNUI()
    SendNUIMessage({
        action = 'setConfig',
        config = Config
    })
end

-- Initialize configuration when resource starts
AddEventHandler('onClientResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end
    
    Citizen.CreateThread(function()
        Citizen.Wait(5000)
        SendConfigToNUI()
    end)
end)

-- Main notification function
function notify(title, message, notifyType, duration)
    -- Default to info type if invalid type is provided
    if not Config.Types[notifyType] then
        notifyType = 'info'
    end
    
    SendNUIMessage({
        action = 'show',
        title = title or Config.Types[notifyType].label,
        message = message or '',
        type = notifyType,
        duration = duration or 5000
    })
end

-- Export the notify function for other resources
exports('notify', notify)

-- Register event handler for server-triggered notifications
RegisterNetEvent('reside_notify:notify')
AddEventHandler('reside_notify:notify', function(title, message, notifyType, duration)
    notify(title, message, notifyType, duration)
end)

-- Test commands (comment out or remove for production)
RegisterCommand('testinfo', function()
    notify("Garage", "Vehicle stored successfully", 'info', 7500)
end)

RegisterCommand('testsuccess', function()
    notify("Bank", "Transaction completed successfully", 'success', 7500)
end)

RegisterCommand('testwarning', function()
    notify("Fuel", "Vehicle fuel is running low", 'warning', 7500)
end)

RegisterCommand('testerror', function()
    notify("Error", "Failed to connect to server", 'error', 7500)
end)