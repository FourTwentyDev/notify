function notify(source, title, message, notifyType, duration)
    TriggerClientEvent('reside_notify:notify', source, title, message, notifyType, duration)
end

exports('notify', notify)