import React from 'react';
import { DollarSign, Clock, User, CheckCircle, Unlock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({
    job,
    customer,
    status,
    onAction,
    isApplied = false,
    variant = 'browse' // 'browse' or 'application'
}) => {
    if (!job) return null;

    return (
        <div className="glass-card animate-fade-in job-card">
            <div className="job-card-header">
                <h3 className="job-title">{job.title}</h3>
                <span className="badge badge-success price-badge">
                    <DollarSign size={14} /> {job.priceRange}
                </span>
            </div>

            <div className="job-meta">
                <span className="badge category-badge">
                    {job.category}
                </span>
                {job.location && (
                    <span className="job-location">
                        <MapPin size={14} /> {job.location}
                    </span>
                )}
            </div>

            {variant === 'browse' && (
                <div className="job-customer-link">
                    <Link to={`/profile/${job.customerId}`}>
                        <User size={14} className="icon-primary" />
                        <span>{customer?.name || 'Customer'}</span>
                    </Link>
                </div>
            )}

            <p className="job-description">
                {job.description}
            </p>

            <div className="job-card-footer">
                {variant === 'browse' ? (
                    <>
                        <div className="job-time">
                            <Clock size={14} /> Posted today
                        </div>
                        {isApplied ? (
                            <button className="btn btn-interest-shown" disabled>
                                Interest Shown
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => onAction(job.id)}
                            >
                                Show Interest
                            </button>
                        )}
                    </>
                ) : (
                    <div className="application-status-area">
                        <div className="status-indicator">
                            <CheckCircle size={14} />
                            Status: <span className="status-text">{status}</span>
                        </div>

                        {status === 'pending' && (
                            <div className="status-action-wrapper">
                                <div className="badge badge-warning">Awaiting Choice</div>
                                <Link to={`/profile/${job.customerId}`} className="text-link-sm">View Profile</Link>
                            </div>
                        )}

                        {status === 'selected' && (
                            <button
                                onClick={() => onAction(job.id)}
                                className="btn btn-primary btn-unlock"
                            >
                                <Unlock size={16} /> Pay $2.99 to Unlock
                            </button>
                        )}

                        {status === 'unlocked' && (
                            <div className="unlocked-details">
                                <p className="unlocked-label">Unlocked Details</p>
                                <p className="unlocked-name">{customer?.name}</p>
                                <p className="unlocked-contact">{customer?.email}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobCard;
