function notify(source, title, message, notifyType, duration)
    TriggerClientEvent('fourtwenty_notify:notify', source, title, message, notifyType, duration)
end

exports('notify', notify)