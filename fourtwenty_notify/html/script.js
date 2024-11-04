let config = null;
let notificationSound = null;
let soundEnabled = true;

function initSound() {
    notificationSound = new Audio('sounds/sound.mp3');
    notificationSound.volume = 0.5;
    notificationSound.load();
}

window.addEventListener('message', function(event) {
    const data = event.data;
    
    if (data && data.action) {
        switch(data.action) {
            case 'setConfig':
                config = data.config;
                updateNotificationsPosition();
                initSound();
                break;
            case 'show':
                if (config) showNotification(data);
                break;
            case 'enableSounds':
                soundEnabled = true;
                break;
            case 'disableSounds':
                soundEnabled = false;
                break;
            case 'setVolume':
                if (notificationSound && data.volume !== undefined) {
                    notificationSound.volume = data.volume;
                }
                break;
        }
    }
});

function updateNotificationsPosition() {
    const container = document.getElementById('notifications');
    if (!container) return;
    
    switch(config.Position.x) {
        case 'left':
            container.style.left = `${config.Offset.x}px`;
            container.style.right = 'auto';
            container.style.transform = '';
            break;
        case 'center':
            container.style.left = '50%';
            container.style.right = 'auto';
            container.style.transform = 'translateX(-50%)';
            break;
        case 'right':
            container.style.right = `${config.Offset.x}px`;
            container.style.left = 'auto';
            container.style.transform = '';
            break;
    }

    switch(config.Position.y) {
        case 'top':
            container.style.top = `${config.Offset.y}px`;
            container.style.bottom = 'auto';
            if (config.Position.x === 'center') {
                container.style.transform = 'translateX(-50%)';
            }
            break;
        case 'middle':
            container.style.top = '50%';
            container.style.bottom = 'auto';
            if (config.Position.x === 'center') {
                container.style.transform = 'translate(-50%, -50%)';
            } else {
                container.style.transform = 'translateY(-50%)';
            }
            break;
        case 'bottom':
            container.style.bottom = `${config.Offset.y}px`;
            container.style.top = 'auto';
            if (config.Position.x === 'center') {
                container.style.transform = 'translateX(-50%)';
            }
            break;
    }
}

function playNotificationSound() {
    if (!soundEnabled || !notificationSound) return;

    try {
        notificationSound.currentTime = 0;
        notificationSound.play().catch(err => {
            console.warn('Error playing notification sound:', err);
        });
    } catch (error) {
        console.warn('Error with notification sound:', error);
    }
}

function showNotification(data) {
    const container = document.getElementById('notifications');
    if (!container || !data.type || !data.title || !data.message) return;

    const typeConfig = config.Types[data.type] || config.Types.info;
    
    playNotificationSound();
    
    const notification = document.createElement('div');
    notification.className = `notification ${data.type}`;

    const header = document.createElement('div');
    header.className = 'notification-header';
    header.textContent = data.title;
    header.style.background = `linear-gradient(to right, ${typeConfig.colors.from}, ${typeConfig.colors.via}, ${typeConfig.colors.to})`;

    const content = document.createElement('div');
    content.className = 'notification-content';
    content.textContent = data.message;

    const progress = document.createElement('div');
    progress.className = 'notification-progress';
    progress.style.backgroundColor = typeConfig.colors.from;
    progress.style.animation = `progress ${data.duration}ms linear`;

    content.appendChild(progress);
    notification.appendChild(header);
    notification.appendChild(content);
    
    if (config.Position.y === 'bottom') {
        container.insertBefore(notification, container.firstChild);
    } else {
        container.appendChild(notification);
    }

    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, data.duration);
}

window.addEventListener('error', function(e) {
    if (e.target instanceof HTMLAudioElement) {
        console.warn('Error loading audio file:', e.target.src);
    }
}, true);