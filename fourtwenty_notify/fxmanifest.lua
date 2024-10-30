fx_version 'cerulean'
game 'gta5'

name 'fourtwenty_notify'
description 'Notification System'
author 'FourTwentyDev'
version '1.0.0'

ui_page 'html/index.html'

client_scripts {
    'client/main.lua'
}

server_scripts {
    'server/main.lua'
}

shared_scripts {
    'config.lua'
}

files {
    'html/index.html',
    'html/script.js',
    'html/styles.css'
}