import React from 'react';
import { Check, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentInterestItem = ({ student, application, onSelect, isJobResolved }) => {
    const isThisStudentSelected = application.status === 'selected' || application.status === 'unlocked';

    return (
        <div className={`interest-item ${isThisStudentSelected ? 'selected-item' : ''}`}>
            <div className="interest-info">
                <p className="student-name">{student?.name}</p>
                <div className="skill-pills">
                    {student?.skills?.map((skill, i) => (
                        <span key={i} className="skill-pill">{skill}</span>
                    ))}
                </div>
                <Link to={`/profile/${student?.id}`} className="text-link-sm">View Full Profile</Link>
            </div>

            <div className="interest-actions">
                {application.status === 'pending' && !isJobResolved && (
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onSelect(application.id)}
                    >
                        Select & Hire
                    </button>
                )}
                {application.status === 'selected' && (
                    <span className="status-note pending">Awaiting payment...</span>
                )}
                {application.status === 'unlocked' && (
                    <span className="status-note success">
                        <Check size={16} /> Connecting
                    </span>
                )}
            </div>
        </div>
    );
};

export default StudentInterestItem;
