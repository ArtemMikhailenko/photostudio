'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type Equipment = {
  id: string
  name: string
  category: string
  brand: string
  image: string
  description: string
  specs: {
    label: string
    value: string
  }[]
  price?: string
}

export default function EquipmentSection() {
  const t = useTranslations('equipment')
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const equipment: Equipment[] = [
    {
      id: '1',
      name: t('items.camera1.name'),
      category: 'cameras',
      brand: 'Canon',
      image: '/images/equipment-4x3.webp',
      description: t('items.camera1.description'),
      specs: [
        { label: t('specs.sensor'), value: 'Full Frame 45MP' },
        { label: t('specs.iso'), value: '100-51200' },
        { label: t('specs.video'), value: '8K 30fps' }
      ],
      price: '$3,899'
    },
    {
      id: '2',
      name: t('items.lens1.name'),
      category: 'lenses',
      brand: 'Canon',
      image: '/images/works-4x3.webp',
      description: t('items.lens1.description'),
      specs: [
        { label: t('specs.aperture'), value: 'f/2.8' },
        { label: t('specs.focal'), value: '24-70mm' },
        { label: t('specs.stabilization'), value: 'IS' }
      ],
      price: '$2,299'
    },
    {
      id: '3',
      name: t('items.light1.name'),
      category: 'lighting',
      brand: 'Godox',
      image: '/images/gallery-4x3.webp',
      description: t('items.light1.description'),
      specs: [
        { label: t('specs.power'), value: '600W' },
        { label: t('specs.modes'), value: 'TTL/Manual' },
        { label: t('specs.recycling'), value: '0.01-1.5s' }
      ],
      price: '$899'
    }
  ]

  const categories = [
    { key: 'all', label: t('categories.all') },
    { key: 'cameras', label: t('categories.cameras') },
    { key: 'lenses', label: t('categories.lenses') },
    { key: 'lighting', label: t('categories.lighting') }
  ]

  const filteredEquipment = activeCategory === 'all' 
    ? equipment 
    : equipment.filter(e => e.category === activeCategory)

  return (
    <section className="relative min-h-screen w-full overflow-hidden py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              {t('badge')}
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 drop-shadow-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 p-2 backdrop-blur-xl">
            {categories.map((category) => {
              const count = category.key === 'all' 
                ? equipment.length 
                : equipment.filter(e => e.category === category.key).length
              
              return (
                <button
                  key={category.key}
                  onClick={() => {
                    setActiveCategory(category.key)
                    setSelectedEquipment(null)
                  }}
                  className={`group relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category.key
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/60 hover:text-white/90 hover:bg-white/10'
                  }`}
                >
                  <span className="relative flex items-center gap-2">
                    {category.label}
                    <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                      activeCategory === category.key 
                        ? 'bg-white/20 text-white/90' 
                        : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                    }`}>
                      {count}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left Sidebar - Equipment List */}
          <div className="space-y-4 lg:col-span-1">
            {filteredEquipment.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedEquipment(item)}
                className={`group relative w-full overflow-hidden rounded-3xl border transition-all duration-500 cursor-pointer ${
                  selectedEquipment?.id === item.id
                    ? 'border-[var(--primary)]/60 bg-white/20 shadow-2xl shadow-[var(--primary)]/20'
                    : 'border-white/20 bg-white/10 hover:border-white/40 hover:bg-white/15'
                } backdrop-blur-xl`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-left">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                      {item.brand}
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {item.name}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className={`rounded-full p-2 transition-all duration-300 ${
                    selectedEquipment?.id === item.id
                      ? 'bg-[var(--primary)]/30 rotate-0'
                      : 'bg-white/10 -rotate-45 group-hover:rotate-0'
                  }`}>
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* Refresh/Moonish Button */}
                {selectedEquipment?.id === item.id && (
                  <div className="border-t border-white/10 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/20">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        REFRESH
                      </div>
                      <span className="text-xs text-white/60">Moonish</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Main Display */}
          <div className="lg:col-span-2">
            {selectedEquipment ? (
              <div className="relative overflow-hidden rounded-[3rem] border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-2xl">
                
                {/* Header Badge */}
                <div className="absolute left-8 top-8 z-20">
                  <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        {selectedEquipment.brand}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute right-8 top-8 z-20">
                  <div className="text-8xl font-black text-white/5">
                    {selectedEquipment.id.padStart(2, '0')}
                  </div>
                </div>

                {/* 3D Product Display with Glass Spheres */}
                <div className="relative mx-auto aspect-square max-w-lg">
                  {/* Background Spheres */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Large center sphere with product */}
                    <div className="relative h-full w-full animate-float">
                      {/* Glass sphere effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-50 blur-2xl" />
                      <div className="absolute inset-0 rounded-full border border-white/30 bg-white/5 backdrop-blur-3xl" />
                      
                      {/* Product Image */}
                      <div className="absolute inset-[15%] overflow-hidden rounded-3xl">
                        <Image
                          src={selectedEquipment.image}
                          alt={selectedEquipment.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Floating Info Badge */}
                      <div className="absolute bottom-[20%] left-[10%] z-10 rounded-2xl border border-white/30 bg-black/60 px-4 py-2 backdrop-blur-xl">
                        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
                          {categories.find(c => c.key === selectedEquipment.category)?.label}
                        </div>
                        <div className="text-lg font-bold text-white">
                          {selectedEquipment.price || 'Contact'}
                        </div>
                      </div>

                      {/* Floating Action Button */}
                      <div className="absolute bottom-[20%] right-[10%] z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-xl transition-transform hover:scale-110">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Small floating spheres */}
                    <div className="absolute left-[5%] top-[15%] h-24 w-24 animate-float-delayed rounded-full bg-gradient-to-br from-white/30 to-transparent opacity-60 blur-xl" />
                    <div className="absolute right-[10%] top-[25%] h-32 w-32 animate-float-slow rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-40 blur-2xl" />
                    <div className="absolute bottom-[20%] left-[15%] h-20 w-20 animate-float rounded-full bg-gradient-to-br from-white/25 to-transparent opacity-50 blur-xl" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-8 space-y-6">
                  {/* Title and Description */}
                  <div className="text-center">
                    <h2 className="mb-2 text-3xl font-bold text-white">
                      {selectedEquipment.name}
                    </h2>
                    <p className="text-sm leading-relaxed text-white/70">
                      {selectedEquipment.description}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {selectedEquipment.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-white/10"
                      >
                        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/50">
                          {spec.label}
                        </div>
                        <div className="text-sm font-bold text-white">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  
                </div>
              </div>
            ) : (
              // Placeholder when nothing selected
              <div className="flex h-full min-h-[600px] items-center justify-center rounded-[3rem] border border-dashed border-white/20 bg-white/5 backdrop-blur-sm">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="h-10 w-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-white/60">
                    {t('selectEquipment')}
                  </p>
                  <p className="text-sm text-white/40">
                    {t('selectEquipmentHint')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
