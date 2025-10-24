import React, { useState, useEffect, useCallback } from 'react'
import './Gallery.css'

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1400&q=80&auto=format&fit=crop', alt: 'Mountains' },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80&auto=format&fit=crop', alt: 'Forest' },
  { src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1400&q=80&auto=format&fit=crop', alt: 'Desert' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80&auto=format&fit=crop', alt: 'Beach' },
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80&auto=format&fit=crop', alt: 'City' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80&auto=format&fit=crop', alt: 'Valley' },
  { src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1400&q=80&auto=format&fit=crop', alt: 'Stars' },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80&auto=format&fit=crop', alt: 'Canyon' }
]

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const openAt = (i) => {
    setIndex(i)
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % IMAGES.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length), [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, next, prev])

  // prevent background scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <div className="gallery-root">
      <div className="grid">
        {IMAGES.map((img, i) => (
          <button
            key={i}
            className="thumb"
            onClick={() => openAt(i)}
            aria-label={`Open ${img.alt}`}
          >
            <img src={`${img.src}&w=800`} alt={img.alt} loading="lazy" />
            <div className="overlay">
              <span className="zoom">View</span>
            </div>
          </button>
        ))}
      </div>

      {isOpen && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="lb-close" onClick={close} aria-label="Close">✕</button>
          <button className="lb-nav lb-prev" onClick={prev} aria-label="Previous">‹</button>
          <div className="lb-stage">
            <img src={`${IMAGES[index].src}&w=1600`} alt={IMAGES[index].alt} />
            <div className="lb-caption">{IMAGES[index].alt} — {index + 1}/{IMAGES.length}</div>
          </div>
          <button className="lb-nav lb-next" onClick={next} aria-label="Next">›</button>
        </div>
      )}
    </div>
  )
}
