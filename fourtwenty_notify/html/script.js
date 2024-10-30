// Global configuration object
let config = null;

// Listen for messages from FiveM client
window.addEventListener('message', function(event) {
    const data = event.data;
    
    if (data && data.action) {
        if (data.action === 'setConfig') {
            config = data.config;
            updateNotificationsPosition();
        } else if (data.action === 'show' && config) {
            showNotification(data);
        }
    }
});

/**
 * Updates the position of the notifications container based on config
 */
function updateNotificationsPosition() {
    const container = document.getElementById('notifications');
    
    // Handle horizontal positioning
    switch(config.Position.x) {
        case 'left':
            container.style.left = `${config.Offset.x}px`;
            container.style.transform = '';
            break;
        case 'center':
            container.style.left = '50%';
            container.style.transform = 'translateX(-50%)';
            break;
        case 'right':
            container.style.right = `${config.Offset.x}px`;
            container.style.left = 'auto';
            container.style.transform = '';
            break;
    }

    // Handle vertical positioning
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

/**
 * Creates and displays a new notification
 * @param {Object} data - Notification data including title, message, type, and duration
 */
function showNotification(data) {
    const typeConfig = config.Types[data.type] || config.Types.info;
    const container = document.getElementById('notifications');
    
    // Create notification elements
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

    // Assemble notification
    content.appendChild(progress);
    notification.appendChild(header);
    notification.appendChild(content);
    
    // Add to container (at top or bottom depending on position)
    if (config.Position.y === 'bottom') {
        container.insertBefore(notification, container.firstChild);
    } else {
        container.appendChild(notification);
    }

    // Remove notification after duration
    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, data.duration);
}