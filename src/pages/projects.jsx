'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

const CHCI_PROJECTS_URL =
  'https://www.ccis-research.online/api/projects/by-affiliation?affiliation=CHCI%20Researcher'
const REGISTRY_URL = 'https://www.ccis-research.online/projects'

function formatLeader(researcher) {
  if (!researcher) return 'CHCI Researcher'

  const name = [researcher.firstName, researcher.middleInitial, researcher.lastName]
    .filter(Boolean)
    .join(' ')
  const title = (researcher.title || '').trim()

  if (/^dr\.?$/i.test(title)) return `Dr. ${name}`
  if (/prof/i.test(title) && /msc/i.test(title)) return `Prof. ${name}, MSc.`
  if (title) return `${title} ${name}`.trim()
  return name
}

export function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProjects() {
      try {
        const response = await fetch(CHCI_PROJECTS_URL, { signal: controller.signal })
        if (!response.ok) throw new Error('CHCI projects request failed')

        const data = await response.json()
        setProjects(Array.isArray(data.projects) ? data.projects : [])
        setStatus('ready')
      } catch (error) {
        if (error.name === 'AbortError') return
        setStatus('error')
      }
    }

    loadProjects()
    return () => controller.abort()
  }, [])

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-blue-50/40 to-white">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 -left-30 w-75 h-75 bg-[#3A7CC3]/12 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-30 w-65 h-65 bg-[#0A3D91]/12 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(#0A3D91_1px,transparent_1px),linear-gradient(90deg,#0A3D91_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      <div
        id="projects"
        className="mx-auto max-w-5xl px-4 md:px-6 py-24 relative z-10 min-h-screen flex flex-col items-center justify-center text-center space-y-8"
      >
        <div className="inline-block">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            What We're Building
          </span>
        </div>

        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-balance text-foreground">
            Where
            <br />
            <span className="bg-linear-to-r from-primary via-secondary to-primary/75 bg-clip-text text-transparent">
              Innovation Lives
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Research projects led by CHCI researchers, listed from the CCIS research registry.
        </p>

        <div className="w-full text-left">
          {status === 'loading' && (
            <p className="text-center text-sm text-muted-foreground">Loading CHCI projects…</p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-muted-foreground">
              CHCI projects could not be loaded. The full registry is still available below.
            </p>
          )}
          {status === 'ready' && projects.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No CHCI-led projects are listed yet.
            </p>
          )}
          {status === 'ready' && projects.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={`${REGISTRY_URL}/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-primary/15 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {project.status || 'Listed'}
                    </span>
                    {project.fundingAgency && (
                      <span className="rounded-full border border-primary/15 px-3 py-1 text-xs font-medium text-muted-foreground">
                        {project.fundingAgency}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold leading-snug text-foreground group-hover:text-primary">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm font-medium text-foreground/80">
                    {formatLeader(project.leadResearcher)}
                  </p>
                  {project.abstract && (
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                      {project.abstract}
                    </p>
                  )}
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    View project
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <a href={CHCI_PROJECTS_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Explore Projects
              <ExternalLink className="h-5 w-5" />
            </Button>
          </a>
        </div>

        <div className="pt-8 space-y-6">
          <div className="h-px bg-linear-to-r from-transparent via-primary/35 to-transparent"></div>
          <p className="text-xs text-secondary tracking-widest uppercase">
            Advancing Technology & Research
          </p>
        </div>
      </div>
    </section>
  )
}
