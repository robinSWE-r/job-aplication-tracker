
const jobs = [
    { id: 1, companyName: 'Mobile First Corp', position: 'React Native Developer', location: 'Remote', type: 'Full-time', salary: '$130,000 - $175,000', description: 'Build cross-platform mobile applications using React Native. Work on products used by millions worldwide.', status: 'none' },
    { id: 2, companyName: 'WebFlow Agency', position: 'Web Designer & Developer', location: 'Los Angeles, CA', type: 'Part-time', salary: '$80,000 - $120,000', description: 'Create stunning web experiences for high-profile clients. Must have portfolio and modern web design experience.', status: 'none' },
    { id: 3, companyName: 'DataViz Solutions', position: 'Data Visualization Specialist', location: 'Boston, MA', type: 'Full-time', salary: '$125,000 - $165,000', description: 'Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.', status: 'none' },
    { id: 4, companyName: 'CloudFirst Inc', position: 'Backend Developer', location: 'Seattle, WA', type: 'Full-time', salary: '$140,000 - $190,000', description: 'Design and maintain scalable backend systems using Python and AWS.', status: 'none' },
    { id: 5, companyName: 'Innovation Labs', position: 'UI/UX Engineer', location: 'Austin, TX', type: 'Full-time', salary: '$110,000 - $150,000', description: 'Create beautiful and functional user interfaces for our suite of products.', status: 'none' },
    { id: 6, companyName: 'MegaCorp Solutions', position: 'JavaScript Developer', location: 'New York, NY', type: 'Full-time', salary: '$130,000 - $170,000', description: 'Build enterprise applications with JavaScript and modern frameworks.', status: 'none' },
    { id: 7, companyName: 'StartupXYZ', position: 'Full Stack Engineer', location: 'Remote', type: 'Full-time', salary: '$120,000 - $160,000', description: 'Join our fast-growing startup and work on our core platform. Experience with Node.js and React required.', status: 'none' },
    { id: 8, companyName: 'TechCorp Industries', position: 'Senior Frontend Developer', location: 'San Francisco, CA', type: 'Full-time', salary: '$130,000 - $175,000', description: 'Build scalable web applications using React and TypeScript.', status: 'none' },
];

let currentTab = 'all';

const jobsList = document.getElementById('jobs-list');
const headerJobCount = document.getElementById('header-job-count');
const emptyState = document.getElementById('empty-state');

function updateCounts() {
    const total = jobs.length;
    const interview = jobs.filter(j => j.status === 'Interview').length;
    const rejected = jobs.filter(j => j.status === 'Rejected').length;

    document.getElementById('count-all-large').textContent = total;
    document.getElementById('count-interview-large').textContent = interview;
    document.getElementById('count-rejected-large').textContent = rejected;
    const list = getCurrentList();
    headerJobCount.textContent = list.length;
}
function getCurrentList() {
    if (currentTab === 'all') return jobs;
    return jobs.filter(j => j.status === (currentTab === 'interview' ? 'Interview' : 'Rejected'));
}

function renderJobs() {
    const list = getCurrentList();
    headerJobCount.textContent = list.length;

    if (list.length === 0) {
        jobsList.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    jobsList.classList.remove('hidden');
    emptyState.classList.add('hidden');

    jobsList.innerHTML = '';

    for (const job of list) {
        const card = document.createElement('div');
        card.className = 'relative bg-white border border-slate-100 rounded-lg p-6';

        const trash = document.createElement('button');
        trash.className = 'absolute right-4 top-4 p-2 rounded-full hover:bg-slate-50 text-slate-400';
        trash.title = 'Delete job';
        trash.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/></svg>';
        trash.onclick = () => { deleteJob(job.id); };
        card.appendChild(trash);

        const left = document.createElement('div');
        left.innerHTML = `
          <h3 class="text-lg font-semibold text-slate-800">${escapeHtml(job.companyName)}</h3>
          <div class="text-sm text-slate-500 mt-1">${escapeHtml(job.position)}</div>

          <div class="mt-3 text-xs text-slate-400 flex gap-3">
            <div>${escapeHtml(job.location)}</div>
            <div>•</div>
            <div>${escapeHtml(job.type)}</div>
            <div>•</div>
            <div>${escapeHtml(job.salary)}</div>
          </div>

          <div class="mt-4 inline-block text-xs px-3 py-1 rounded bg-slate-100 text-slate-600">${job.status === 'none' ? 'NOT APPLIED' : job.status.toUpperCase()}</div>

          <p class="mt-4 text-sm text-slate-600">${escapeHtml(job.description)}</p>
        `;
        card.appendChild(left);

        // Buttons and status
        const footer = document.createElement('div');
        footer.className = 'mt-4 flex items-center justify-between';

        const actions = document.createElement('div');
        const btnInterview = document.createElement('button');
        btnInterview.className = 'px-3 py-1 rounded text-sm border btn-interview inline-flex items-center gap-2';
        btnInterview.textContent = 'INTERVIEW';
        btnInterview.onclick = () => toggleStatus(job.id, 'Interview');

        const btnRejected = document.createElement('button');
        btnRejected.className = 'ml-3 px-3 py-1 rounded text-sm border btn-rejected inline-flex items-center gap-2';
        btnRejected.textContent = 'REJECTED';
        btnRejected.onclick = () => toggleStatus(job.id, 'Rejected');

        actions.appendChild(btnInterview);
        actions.appendChild(btnRejected);
        footer.appendChild(actions);

        const statusBadge = document.createElement('div');
        statusBadge.className = 'text-sm text-slate-500';
        statusBadge.innerHTML = 'Status: <strong class="status-text">' + (job.status === 'none' ? '—' : escapeHtml(job.status)) + '</strong>';
        footer.appendChild(statusBadge);

        card.appendChild(footer);

        // Apply active styles
        if (job.status === 'Interview') {
            btnInterview.classList.add('bg-emerald-600', 'text-white', 'border-transparent');
        } else if (job.status === 'Rejected') {
            btnRejected.classList.add('bg-red-500', 'text-white', 'border-transparent');
        }

        jobsList.appendChild(card);
    }

    updateCounts();
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function toggleStatus(id, newStatus) {
    const idx = jobs.findIndex(j => j.id === id);
    if (idx === -1) return;
  
    if (jobs[idx].status === newStatus) jobs[idx].status = 'none';
    else jobs[idx].status = newStatus;


    if (jobs[idx].status === 'Interview') setActiveTab('interview');
    else if (jobs[idx].status === 'Rejected') setActiveTab('rejected');
    else setActiveTab('all');

    renderJobs();
}

function deleteJob(id) {
    const idx = jobs.findIndex(j => j.id === id);
    if (idx === -1) return;
    jobs.splice(idx, 1);

    renderJobs();
}


function setActiveTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => {
        if (b.dataset.tab === tab) {
            b.classList.add('bg-blue-600', 'text-white');
        } else {
            b.classList.remove('bg-blue-600', 'text-white');
        }
    });
    renderJobs();
}

document.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', () => setActiveTab(b.dataset.tab)));


updateCounts();
renderJobs();

