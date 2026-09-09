'use client'

import { useMemo, useState } from 'react'

const repositories = [
  { name: 'platform/api', description: 'Core API service images', visibility: 'Private', tags: 18, size: '1.2 GB', updated: '12 min ago', color: 'cyan' },
  { name: 'platform/worker', description: 'Background jobs and queue consumers', visibility: 'Private', tags: 9, size: '842 MB', updated: '2 hr ago', color: 'violet' },
  { name: 'examples/python-fastapi', description: 'FastAPI container example', visibility: 'Public', tags: 4, size: '218 MB', updated: 'Yesterday', color: 'lime' },
]

const activities = [
  ['maya@cni.dev', 'pushed', 'platform/api:v1.8.2', '12 min ago'],
  ['jordan@cni.dev', 'changed visibility', 'examples/python-fastapi', 'Yesterday'],
  ['sam@cni.dev', 'pulled', 'platform/worker:latest', 'Yesterday'],
]

export default function RegistryPage() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Repositories')
  const [showCreate, setShowCreate] = useState(false)
  const filtered = useMemo(() => repositories.filter((repo) => `${repo.name} ${repo.description}`.toLowerCase().includes(query.toLowerCase())), [query])

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">◈</span><span>cni / packages</span></div>
      <div className="workspace"><span className="workspace-dot" /> Neopilot Engineering <span className="chevron">⌄</span></div>
      <nav className="nav" aria-label="Package registry navigation">
        {['Repositories', 'Members', 'Audit log'].map((tab) => <button className={activeTab === tab ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab(tab)} key={tab}><span className="nav-icon">{tab === 'Repositories' ? '▦' : tab === 'Members' ? '♧' : '◷'}</span>{tab}</button>)}
      </nav>
      <div className="sidebar-bottom"><div className="usage-label"><span>Storage</span><span>2.04 / 10 GB</span></div><div className="progress"><span /></div><button className="help">? <span>Registry docs</span><span>↗</span></button><div className="profile"><div className="avatar">AK</div><div><strong>Alex Kim</strong><small>Owner</small></div><span className="more">•••</span></div></div>
    </aside>
    <section className="content">
      <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>Packages</strong></div><div className="top-actions"><span className="status"><i /> Registry operational</span><button className="icon-button" aria-label="Notifications">♢</button><button className="icon-button" aria-label="Settings">⚙</button></div></header>
      <div className="page-head"><div><p className="eyebrow">TEAM REGISTRY</p><h1>Packages</h1><p className="subtitle">A single place to manage your Docker images and decide who can access them.</p></div><button className="primary" onClick={() => setShowCreate(true)}>＋ Register repository</button></div>
      <div className="stats"><div><span>Total repositories</span><strong>12</strong><em>+3 this month</em></div><div><span>Images pushed</span><strong>148</strong><em>+21 this month</em></div><div><span>Storage used</span><strong>2.04 GB</strong><em>20% of workspace limit</em></div><div><span>Team members</span><strong>8</strong><em>3 maintainers</em></div></div>
      <div className="toolbar"><div className="tabs">{['Repositories', 'Recent activity'].map((tab) => <button className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search repositories" /></label><button className="filter">Filter <span>⌄</span></button></div>
      {activeTab === 'Recent activity' ? <Activity /> : <div className="repo-grid">{filtered.map((repo) => <article className="repo-card" key={repo.name}><div className="card-top"><div className={`repo-icon ${repo.color}`}>▦</div><span className={repo.visibility === 'Public' ? 'visibility public' : 'visibility'}>{repo.visibility === 'Public' ? '◉' : '●'} {repo.visibility}</span></div><h2>{repo.name}</h2><p>{repo.description}</p><div className="repo-meta"><span><b>{repo.tags}</b> tags</span><span>{repo.size}</span><span>{repo.updated}</span></div><div className="card-footer"><code>docker pull registry.cni.dev/{repo.name}</code><button aria-label={`More options for ${repo.name}`}>•••</button></div></article>)}<button className="add-card" onClick={() => setShowCreate(true)}><span>＋</span><strong>Register a repository</strong><small>Start pushing images to your team registry</small></button></div>}
      <section className="bottom-grid"><div className="panel"><div className="panel-head"><div><p className="eyebrow">QUICK START</p><h2>Push your first image</h2></div><span className="step-count">1 / 3</span></div><p>Authenticate your Docker client, then tag and push an image to any repository you have access to.</p><div className="command"><span>$</span><code>docker login registry.cni.dev</code><button onClick={() => navigator.clipboard?.writeText('docker login registry.cni.dev')}>Copy</button></div><a href="#docs">View registry documentation <span>↗</span></a></div><div className="panel activity-panel"><div className="panel-head"><div><p className="eyebrow">AUDIT LOG</p><h2>Recent activity</h2></div><button className="text-button" onClick={() => setActiveTab('Recent activity')}>View all ↗</button></div>{activities.map(([person, action, target, time]) => <div className="activity" key={`${person}-${target}`}><div className="avatar small">{person.slice(0, 2).toUpperCase()}</div><p><strong>{person}</strong> {action}<br /><code>{target}</code></p><time>{time}</time></div>)}</div></section>
    </section>
    {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCreate(false)}>×</button><p className="eyebrow">NEW REPOSITORY</p><h2>Register a repository</h2><p>Create a private image repository for your team. You can change visibility later.</p><label>Repository name<input placeholder="platform/payments" autoFocus /></label><label>Description <span className="muted">(optional)</span><input placeholder="What will this image be used for?" /></label><div className="visibility-choice"><button className="choice selected"><b>● Private</b><small>Only workspace members can pull images.</small></button><button className="choice"><b>◉ Public</b><small>Anyone can pull. Push access stays restricted.</small></button></div><div className="modal-actions"><button className="secondary" onClick={() => setShowCreate(false)}>Cancel</button><button className="primary" onClick={() => setShowCreate(false)}>Create repository</button></div></div></div>}
  </main>
}

function Activity() { return <div className="activity-list">{activities.concat(activities).map(([person, action, target, time], index) => <div className="activity-row" key={`${target}-${index}`}><div className="avatar small">{person.slice(0, 2).toUpperCase()}</div><p><strong>{person}</strong> {action} <code>{target}</code></p><time>{time}</time></div>)}</div> }
