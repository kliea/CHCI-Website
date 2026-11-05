'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export function ProjectsSection() {
  return (
    <section
      
      className="relative overflow-hidden bg-linear-to-b from-white via-blue-50/40 to-white"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 -left-30 w-75 h-75 bg-[#3A7CC3]/12 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-30 w-65 h-65 bg-[#0A3D91]/12 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(#0A3D91_1px,transparent_1px),linear-gradient(90deg,#0A3D91_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      <div id="projects" className="mx-auto max-w-2xl px-4 md:px-6 text-center space-y-8 relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="inline-block">
          <span  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
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
          Transforming ideas into reality through cutting-edge technology, research, and
          human-centered design that shapes the future
        </p>

        <div className="pt-8">
          <a href="https://vlrc.vercel.app/projects" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Explore Projects
              <ExternalLink className="h-5 w-5" />
            </Button>
          </a>
        </div>

        <div className="pt-16 space-y-6">
          <div className="h-px bg-linear-to-r from-transparent via-primary/35 to-transparent"></div>
          <p className="text-xs text-secondary tracking-widest uppercase">
            Advancing Technology & Research
          </p>
        </div>
      </div>
    </section>
  )
}
