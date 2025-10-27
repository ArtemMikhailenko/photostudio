'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type Project = {
  id: string
  title: string
  category: string
  image: string
  description: string
}

export default function PortfolioSection() {
  const t = useTranslations('portfolio')
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const projects: Project[] = [
    {
      id: '1',
      title: t('projects.project1.title'),
      category: 'portrait',
      image: '/images/gallery-4x3.webp',
      description: t('projects.project1.description')
    },
    {
      id: '2',
      title: t('projects.project2.title'),
      category: 'commercial',
      image: '/images/works-4x3.webp',
      description: t('projects.project2.description')
    },
    {
      id: '3',
      title: t('projects.project3.title'),
      category: 'family',
      image: '/images/equipment-4x3.webp',
      description: t('projects.project3.description')
    },
    {
      id: '4',
      title: t('projects.project4.title'),
      category: 'portrait',
      image: '/images/gallery-4x3.webp',
      description: t('projects.project4.description')
    },
    {
      id: '5',
      title: t('projects.project5.title'),
      category: 'commercial',
      image: '/images/works-4x3.webp',
      description: t('projects.project5.description')
    },
    {
      id: '6',
      title: t('projects.project6.title'),
      category: 'family',
      image: '/images/equipment-4x3.webp',
      description: t('projects.project6.description')
    }
  ]

  const filters = [
    { key: 'all', label: t('filters.all') },
    { key: 'portrait', label: t('filters.portrait') },
    { key: 'commercial', label: t('filters.commercial') },
    { key: 'family', label: t('filters.family') }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto w-full ">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1E1E1E] sm:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#4B4B4B]">
            {t('subtitle')}
          </p>
        </div>

        {/* Filter Bar - Dark Theme like reference */}
        <div className="relative mb-12">
          {/* Dark glass container */}
          <div className="relative overflow-hidden  border border-white/10  backdrop-blur-sm shadow-2xl">
            <div className="flex items-center justify-between p-4 gap-4">
              {/* Left side - Filter icon */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                  <svg className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                
                {/* Filters */}
                <div className="flex items-center gap-2">
                  {filters.map((filter) => {
                    const isActive = activeFilter === filter.key
                    const projectCount = filter.key === 'all' 
                      ? projects.length 
                      : projects.filter(p => p.category === filter.key).length
                    
                    return (
                      <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                        className={`group relative px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-white/60 hover:text-white/90 hover:bg-white/10'
                        }`}
                      >
                        {/* Active background glow */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--primary)]/20 to-transparent opacity-50" />
                        )}
                        
                        <span className="relative flex items-center gap-2">
                          {filter.label}
                          {/* Count badge */}
                          <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                            isActive 
                              ? 'bg-white/20 text-white/90' 
                              : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60'
                          }`}>
                            {projectCount}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right side - View toggle */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-white/10 backdrop-blur-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/10'
                  }`}
                  title="Grid view"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/10'
                  }`}
                  title="List view"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Bottom subtle line */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        {/* Glassmorphism Container */}
        <div className="relative overflow-hidden  border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/2 p-8 shadow-2xl backdrop-blur-sm sm:p-12">
          {/* Inner glow effect */}
          {/* <div className="pointer-events-none absolute inset-0  bg-gradient-to-tr from-[#C29B72]/5 via-transparent to-white/10" /> */}

          {/* Projects Grid or List */}
          <div className={`relative z-10 ${viewMode === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-6'}`}>
            {filteredProjects.map((project, index) => (
              viewMode === 'grid' ? (
                // Grid View with Flip Effect
                <div
                  key={project.id}
                  className="group perspective-1000"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    perspective: '1000px'
                  }}
                >
                  {/* Card Container with 3D flip */}
                  <div className="relative aspect-square w-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                    
                    {/* Front Side - Image with Title */}
                    <div className="absolute inset-0 backface-hidden overflow-hidden shadow-lg">
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        
                        {/* Bottom gradient for title */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        
                        {/* Title on front */}
                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <h3 className="text-2xl font-bold text-white drop-shadow-2xl">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Back Side - Image with Title and Description */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 overflow-hidden shadow-2xl">
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover brightness-75"
                        />
                        
                        {/* Dark overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
                        
                        {/* Content on back */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                          {/* Category badge */}
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/40 text-xs font-semibold text-white/90 uppercase tracking-wider">
                              {filters.find(f => f.key === project.category)?.label}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-3xl font-bold text-white mb-4">
                            {project.title}
                          </h3>
                          
                          {/* Decorative line */}
                          <div className="h-0.5 w-20 bg-gradient-to-r from-[var(--primary)] to-white/50 mb-4" />
                          
                          {/* Description */}
                          <p className="text-sm text-white/90 leading-relaxed">
                            {project.description}
                          </p>
                          
                          {/* Icon */}
                          <div className="absolute top-6 right-6">
                            <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                              <svg 
                                className="h-5 w-5 text-white" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // List View - Enhanced Animation
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg transition-all duration-500 hover:border-[var(--primary)]/30 hover:bg-black/50 hover:shadow-2xl hover:shadow-[var(--primary)]/10 animate-slideIn"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Animated gradient border on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[var(--primary)]/0 via-[var(--primary)]/20 to-[var(--primary)]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  
                  <div className="relative flex flex-col md:flex-row items-center gap-6 p-6">
                    {/* Thumbnail with tilt effect */}
                    <div className="relative w-full md:w-56 h-56 flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-2 group-hover:shadow-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/0 to-black/0 transition-all duration-500 group-hover:from-[var(--primary)]/20 group-hover:to-black/30" />
                      
                      {/* Play/View icon on thumbnail */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-md border border-white/40 scale-75 transition-transform duration-500 group-hover:scale-100">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content with staggered animation */}
                    <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
                      <div className="flex-1">
                        {/* Category badge with slide effect */}
                        <div className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white/70 uppercase tracking-wider transition-all duration-300 group-hover:bg-[var(--primary)]/20 group-hover:text-[var(--primary)] group-hover:scale-105">
                          {filters.find(f => f.key === project.category)?.label}
                        </div>
                        
                        {/* Title with gradient on hover */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 transition-all duration-300 group-hover:translate-x-2">
                          <span className="bg-gradient-to-r from-white to-white bg-clip-text transition-all duration-300 group-hover:from-[var(--primary)] group-hover:to-white">
                            {project.title}
                          </span>
                        </h3>
                        
                        {/* Decorative line that grows */}
                        <div className="h-0.5 w-0 bg-gradient-to-r from-[var(--primary)] to-white/30 transition-all duration-500 group-hover:w-32 mb-3" />
                        
                        {/* Description with fade-in */}
                        <p className="text-sm md:text-base text-white/70 leading-relaxed transition-all duration-300 group-hover:text-white/90">
                          {project.description}
                        </p>
                      </div>
                      
                      {/* Action button with rotation */}
                      <div className="flex-shrink-0">
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-500 group-hover:bg-[var(--primary)]/20 group-hover:border-[var(--primary)]/40 group-hover:scale-110 group-hover:rotate-12">
                          <svg 
                            className="h-6 w-6 text-white transition-transform duration-500 group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-[#4B4B4B]">{t('noProjects')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
