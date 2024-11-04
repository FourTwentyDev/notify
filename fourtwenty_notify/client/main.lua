function SendConfigToNUI()
    SendNUIMessage({
        action = 'setConfig',
        config = Config
    })
end

AddEventHandler('onClientResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end
    
    Citizen.CreateThread(function()
        Citizen.Wait(5000)
        SendConfigToNUI()
                SendNUIMessage({
            action = 'enableSounds'
        })
        SendNUIMessage({
            action = 'setVolume',
            volume = 0.1
        })
    end)
end)


function notify(title, message, notifyType, duration)
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

exports('notify', notify)

RegisterNetEvent('reside_notify:notify')
AddEventHandler('reside_notify:notify', function(title, message, notifyType, duration)
    notify(title, message, notifyType, duration)
end)

RegisterCommand('notifysound', function(source, args)
    if args[1] then
        if args[1] == 'on' then
            SendNUIMessage({
                action = 'enableSounds'
            })
        elseif args[1] == 'off' then
            SendNUIMessage({
                action = 'disableSounds'
            })
        elseif args[1] == 'volume' and args[2] then
            local volume = tonumber(args[2])
            if volume and volume >= 0 and volume <= 100 then
                SendNUIMessage({
                    action = 'setVolume',
                    volume = volume / 100
                })
            end
        end
    end
end)

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