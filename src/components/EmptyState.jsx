import React from 'react';
import { SearchX, Inbox } from 'lucide-react';

const EmptyState = ({
    icon = 'inbox',
    title = "No data found",
    message = "Please check back later or try a different filter.",
    className = ""
}) => {
    const Icon = icon === 'search' ? SearchX : Inbox;

    return (
        <div className={`empty-state-container animate-fade-in ${className}`}>
            <div className="empty-state-icon">
                <Icon size={48} />
            </div>
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-message">{message}</p>
        </div>
    );
};

export default EmptyState;
