// Mock Local Database using LocalStorage

const USERS_KEY = 'nexura_users';
const JOBS_KEY = 'nexura_jobs';
const APPLICATIONS_KEY = 'nexura_applications';

export const storage = {
  // Users
  getUsers: () => JSON.parse(localStorage.getItem(USERS_KEY)) || [],
  saveUser: (user) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return user;
  },
  getUserByEmail: (email) => {
    return storage.getUsers().find(u => u.email === email);
  },
  getUserById: (id) => {
    return storage.getUsers().find(u => u.id === id);
  },

  // Jobs
  getJobs: () => JSON.parse(localStorage.getItem(JOBS_KEY)) || [],
  saveJob: (job) => {
    const jobs = storage.getJobs();
    job.id = job.id || Date.now().toString();
    job.createdAt = job.createdAt || new Date().toISOString();
    jobs.push(job);
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
    return job;
  },
  getJobsByCustomerId: (customerId) => {
    return storage.getJobs().filter(j => j.customerId === customerId);
  },
  getJobById: (id) => {
    return storage.getJobs().find(j => j.id === id);
  },

  // Applications (Students showing interest)
  getApplications: () => JSON.parse(localStorage.getItem(APPLICATIONS_KEY)) || [],
  saveApplication: (application) => {
    const applications = storage.getApplications();
    application.id = application.id || Date.now().toString();
    application.createdAt = application.createdAt || new Date().toISOString();
    applications.push(application);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
    return application;
  },
  getApplicationsByJobId: (jobId) => {
    return storage.getApplications().filter(a => a.jobId === jobId);
  },
  getApplicationsByStudentId: (studentId) => {
    return storage.getApplications().filter(a => a.studentId === studentId);
  },
  updateApplicationStatus: (applicationId, status) => {
    const applications = storage.getApplications();
    const index = applications.findIndex(a => a.id === applicationId);
    if (index !== -1) {
      applications[index].status = status; // e.g., 'pending', 'selected', 'unlocked'
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
      return applications[index];
    }
    return null;
  }
};
