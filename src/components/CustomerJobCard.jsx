import React from 'react';
import { DollarSign, Users, Check } from 'lucide-react';
import StudentInterestItem from './StudentInterestItem';
import { storage } from '../services/storage';

const CustomerJobCard = ({ job, onSelectStudent }) => {
    const isJobResolved = job.applications.some(a => a.status === 'selected' || a.status === 'unlocked');

    return (
        <div className="glass-card animate-fade-in customer-job-card">
            <div className="job-header-section">
                <div className="flex-between">
                    <div>
                        <h3 className="job-title-lg">{job.title}</h3>
                        <div className="job-meta-row">
                            <span className="meta-item"><DollarSign size={14} /> {job.priceRange}</span>
                            <span className="badge badge-surface">{job.category}</span>
                        </div>
                    </div>
                    {isJobResolved && (
                        <div className="badge badge-success resolved-badge">
                            <Check size={14} /> Student Selected
                        </div>
                    )}
                </div>
                <p className="job-description-full">{job.description}</p>
            </div>

            <div className="applicants-section">
                <h4 className="section-title">
                    <Users size={16} className="icon-primary" />
                    Interested Students ({job.applications.length})
                </h4>

                {job.applications.length === 0 ? (
                    <p className="empty-mini">No students have shown interest yet.</p>
                ) : (
                    <div className="interest-list">
                        {job.applications.map(app => (
                            <StudentInterestItem
                                key={app.id}
                                application={app}
                                student={storage.getUserById(app.studentId)}
                                onSelect={onSelectStudent}
                                isJobResolved={isJobResolved}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerJobCard;
