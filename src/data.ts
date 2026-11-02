export type ProjectKind = 'Work, rebuilt' | 'Client project' | 'Personal project';

export interface Shot {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  kind: ProjectKind;
  origin: string;
  summary: string;
  highlights: string[];
  skills: string[];
  repo: string;
  /** Private repos show a note instead of a link. */
  privateRepo?: boolean;
  /** The first shot is the thumbnail; all of them open in the lightbox. */
  shots: Shot[];
  /** Diagrams are shown whole; screenshots fill the frame from the top. */
  fit?: 'contain';
  stat?: { value: string; label: string };
}

const github = (name: string) => `https://github.com/chasemoses/${name}`;

export const projects: Project[] = [
  {
    id: 'pkm',
    title: 'PKM Agent Dashboard',
    kind: 'Personal project',
    origin: 'What I use every day · self-hosted on my home lab · 256 commits, 43 pull requests',
    summary:
      'The control plane for my AI agents: a task board, shared memory and docs, scheduled jobs, and a live graph of everything they’re doing. Agents plan, build, and review work through it; I approve every plan and merge every change.',
    highlights: [
      'A separate reviewer agent checks evidence against every acceptance criterion and escalates to me after two failures',
      'A plain-code poller dispatches tasks and scheduled jobs, so an idle system costs no model usage',
      'Packaged as an installable kit for Windows, Mac, Linux, and Proxmox, with backups and rollback-safe upgrades',
    ],
    skills: ['AI agents', 'Agent orchestration', 'MCP', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Proxmox'],
    repo: github('PKM-dashboard'),
    privateRepo: true,
    shots: [
      { src: 'images/pkm-board.png', alt: 'Task board with inbox, planning, waiting on you, in progress, review, and done columns' },
      { src: 'images/pkm-graph.png', alt: 'Live graph of projects, tasks, docs, and the agents working on them' },
      { src: 'images/pkm-review.png', alt: 'A reviewer agent failing a pull request with specific findings and independently run checks' },
      { src: 'images/pkm-direction.png', alt: 'After two failed reviews, the task escalates to me and I narrow the fix' },
    ],
    stat: { value: '8', label: 'AI agents on the board' },
  },
  {
    id: 'documents',
    title: 'Versioned Document Attachments',
    kind: 'Work, rebuilt',
    origin: 'Rebuilt from a document management system I designed and built at FileOnQ',
    summary:
      'Attach warranties, manuals, and photos to campus equipment, with full version history, safe content checks, and an audit trail of every change.',
    highlights: [
      'Uploads are checked by their actual content, so a renamed .exe is rejected',
      'Two people uploading at the same moment can’t overwrite each other',
      'Removing a document is a soft delete with a required reason, and can be undone',
    ],
    skills: ['C#', 'Blazor', 'Entity Framework Core', 'SQL Server', 'ASP.NET Core', 'Secure file handling', 'Concurrency', 'xUnit'],
    repo: github('VersionedDocuments'),
    shots: [{ src: 'images/versioned-documents.jpg', alt: 'Equipment documents with version history and an audit log' }],
    stat: { value: '23', label: 'automated tests' },
  },
  {
    id: 'exports',
    title: 'Background Report Exports',
    kind: 'Work, rebuilt',
    origin: 'Rebuilt from background download processing I built at FileOnQ',
    summary:
      'Large exports move out of the web request. The page responds immediately while a hosted worker builds the file and reports live progress.',
    highlights: [
      'The queue lives in SQL Server, so a restart mid-export resumes instead of losing work',
      'Temporary failures retry with backoff, and users can cancel at any point',
      'Only the person who requested a file can download it',
    ],
    skills: ['C#', 'ASP.NET Core', 'Hosted services', 'Blazor', 'Entity Framework Core', 'SQL Server', 'Concurrency', 'Authorization', 'xUnit'],
    repo: github('BackgroundExports'),
    shots: [{ src: 'images/background-exports.jpg', alt: 'Exports running, retrying, and finished with live progress bars' }],
    stat: { value: '18', label: 'automated tests' },
  },
  {
    id: 'indexes',
    title: 'Filtered Indexes for a Slow Import',
    kind: 'Work, rebuilt',
    origin: 'Reproduces a performance fix I made at FileOnQ',
    summary:
      'A bulk import was slow because SQL Server maintained seven index entries for every row, mostly for empty values. Filtered indexes fixed it.',
    highlights: [
      'Index entries per inserted row fell from 7.00 to 0.20; import time fell 77%',
      'Actual execution plans confirm searches still use the indexes',
      'The cases that get worse are measured too, so the trade-off is a decision',
    ],
    skills: ['SQL Server', 'Indexing', 'Execution plans', 'Performance', 'C#', 'ADO.NET', 'Technical writing'],
    repo: github('EavFilteredIndexes'),
    shots: [{ src: 'images/filtered-indexes.png', alt: 'Bar charts: index entries per row fell 97 percent and import time fell 77 percent' }],
    fit: 'contain',
    stat: { value: '−97%', label: 'index entries' },
  },
  {
    id: 'race',
    title: 'Race Checkpoint Tracker',
    kind: 'Work, rebuilt',
    origin: 'Rebuilt from a Python app I wrote for the City of Rexburg',
    summary:
      'Volunteers type bib numbers at checkpoints, and the app turns those entries into live results for point-to-point and multi-lap courses.',
    highlights: [
      'Works out which lap each crossing belongs to and ignores double taps',
      'Flags finishers who missed a checkpoint for review instead of disqualifying them',
      'Browser testing caught a time-zone bug every unit test missed',
    ],
    skills: ['Angular', 'TypeScript', 'RxJS', 'ASP.NET Core', 'REST APIs', 'Entity Framework Core', 'SQL Server', 'xUnit'],
    repo: github('RaceCheckpointTracker'),
    shots: [{ src: 'images/race-tracker.jpg', alt: 'Race leaderboard with places, division places, pace, and review flags' }],
    stat: { value: '24', label: 'automated tests' },
  },
  {
    id: 'wisdom',
    title: 'Wisdom in Learning',
    kind: 'Client project',
    origin: 'Sole developer for a company teaching students in China · built 2023, rewritten 2024',
    summary:
      'Student management on Windows, Android, and iOS: students and families, class levels, payments, and invoice history, behind a REST API.',
    highlights: [
      'The 2024 rewrite moved the UI into shared Blazor components hosted in .NET MAUI',
      'One codebase gives a desktop sidebar and a mobile tab bar',
      'The README is candid about what I’d do differently today',
    ],
    skills: ['.NET MAUI', 'Blazor', 'ASP.NET Core', 'REST APIs', 'Entity Framework Core', 'SQL Server', 'Clean Architecture', 'MediatR'],
    repo: github('WisdomInLearningCopy'),
    shots: [
      { src: 'images/wisdom-in-learning.png', alt: 'Two phone screens: student list and student details' },
      { src: 'images/wisdom-students.jpg', alt: 'Student list on Android' },
      { src: 'images/wisdom-detail.jpg', alt: 'Student details on Android' },
    ],
    stat: { value: '3', label: 'platforms, one codebase' },
  },
  {
    id: 'home',
    title: 'Home Management System',
    kind: 'Personal project',
    origin: 'A self-hosted chore app for my family · in active development',
    summary:
      'Kids ages 3–8 sign in by tapping pictures and work from a picture-based board; parents approve finished chores from their phones in real time.',
    highlights: [
      'Planned and built in verified phases with AI assistance; the plans are in the repo',
      'A feasibility spike deliberately said no to fingerprint sign-in for kids',
      'Notifications survive a phone in a pocket with a custom reconnect policy',
    ],
    skills: ['AI agents', '.NET MAUI', 'ASP.NET Core', 'SignalR', 'Entity Framework Core', 'PostgreSQL', 'Docker', 'JWT', 'MediatR'],
    repo: github('HomeManagementSystem'),
    shots: [{ src: 'images/home-management.png', alt: 'Diagram of the chore approval loop from picture sign-in to parent approval' }],
    fit: 'contain',
    stat: { value: '74', label: 'commits of phased work' },
  },
];

/** Sum of the four test suites (VersionedDocuments 23, BackgroundExports 18, EavFilteredIndexes 6, RaceCheckpointTracker 24). */
export const totalTests = 71;

export const background = [
  { label: 'Now', text: 'Software Developer at FileOnQ since 2024: full-stack C#/.NET, Blazor, Entity Framework Core, and SQL Server, in two-week sprints.' },
  { label: 'Before', text: 'IT Support Technician at the City of Rexburg; Tier 2 technical support at M9 Creations.' },
  { label: 'Education', text: 'B.S. Computer Software Engineering, Brigham Young University–Idaho, 2023.' },
  { label: 'AI tools', text: 'GitHub Copilot daily at work; Claude Code for these projects. Each README notes how AI was used and what I checked myself.' },
];

export const contact = {
  email: 'chsmoses@outlook.com',
  linkedin: 'https://linkedin.com/in/chase-moses',
  github: 'https://github.com/chasemoses',
  pdf: 'Chase-Moses-Portfolio.pdf',
};

// ---------- How I work with AI ----------

export interface LoopStep {
  title: string;
  text: string;
  /** A step where a person, not an agent, makes the call. */
  gate?: string;
}

export const loop: LoopStep[] = [
  { title: 'Capture', text: 'A task lands on the board, from me or from my assistant agent in chat. Ideas I only want to remember wait in an inbox until I act on them.' },
  { title: 'Plan', text: 'The builder agent writes a plan with acceptance criteria.', gate: 'I approve the plan before any work starts.' },
  { title: 'Build', text: 'Work happens on a branch in a separate worktree and comes back as a pull request with test evidence and a plain-language “How it works.”' },
  { title: 'Review', text: 'A separate reviewer agent checks the evidence against every acceptance criterion. It can’t fix the work itself, and two failed reviews escalate to me.' },
  { title: 'Ship', text: 'Merging deploys automatically through a self-hosted runner, and rolls back if the new version isn’t healthy.', gate: 'I merge. Nothing ships without me.' },
  { title: 'Improve', text: 'When the loop fails, I fix the loop, not just the output: a new rule in the agents’ instructions and a test that keeps it there.' },
];

export interface Lesson {
  happened: string;
  changed: string;
}

/** Real incidents from the PKM Dashboard's history, and the rule each one produced. */
export const lessons: Lesson[] = [
  {
    happened: 'An agent edited a live checkout instead of opening a pull request, and the reviewer passed it because the content was right.',
    changed: 'Repo changes must arrive as a pull request from a separate worktree. The reviewer now fails any work without one.',
  },
  {
    happened: 'Scheduled flight-price checks failed silently for seven weeks after their routes changed, and every run still looked successful.',
    changed: 'One job checks every active route, and agents report failed runs, so a failure shows red on the Jobs page with its reason.',
  },
  {
    happened: 'A task was marked blocked with the real reason buried at the bottom of a long result document.',
    changed: 'The API refuses to block a task without a reason, and the reason appears right in the activity log.',
  },
  {
    happened: 'Hitting a usage limit burned through all three retries in a minute and blocked the task.',
    changed: 'The poller reads the provider’s reset time, waits it out, and resumes the work instead of failing it.',
  },
];

export const practices = [
  {
    title: 'At work',
    text: 'GitHub Copilot every day. For larger changes I write a design proposal with an AI assistant and review it before any code is written. An AI-assisted investigation found the bottleneck behind my filtered-index fix, and I’ve written guidance for our developers on where AI helps and where its output needs checking.',
  },
  {
    title: 'Phased planning',
    text: 'Home Management System was built in research, plan, check, execute, and verify phases with specialized agents. Every plan and verification report is kept in the repository.',
  },
  {
    title: 'Cost and reliability',
    text: 'Routine jobs run as plain scripts with no model calls, and an idle system costs nothing. When an agent setup quietly died after hitting a usage cap, I rebuilt its job as a lightweight script so it couldn’t happen again.',
  },
  {
    title: 'No lock-in',
    text: 'The dashboard knows nothing about any single AI tool. Agents running in OpenClaw, Claude Code, or Codex connect through the same API, so changing providers doesn’t mean rebuilding.',
  },
];

/** The task shown as a worked example in the AI section. */
export const example = {
  title: 'One task, start to finish',
  text: 'Upgrading the agent kit to 0.1.1: the reviewer failed the pull request twice, the second time because a regression test didn’t reproduce the real production failure. The task escalated to me, I narrowed the fix to the two missing tests, and it passed the next review.',
  shots: [
    { src: 'images/pkm-review.png', alt: 'Review round 2 failed, with findings and independently run checks' },
    { src: 'images/pkm-direction.png', alt: 'Escalation to me, my direction, and the builder’s follow-up result' },
  ],
};
