import React, { useState, useEffect, useCallback } from 'react'
import './Gallery.css'

const IMAGES = [
  { src: 'https://drive.google.com/thumbnail?id=15kGz7uMWnDOJWla-dsWNvdFmQKHO1WCr&sz=w600', alt: 'Image 1' },
  { src: 'https://drive.google.com/thumbnail?id=1L7iHhsiXemXW9R0DHgJMUJ1U2nRNavIl&sz=w600', alt: 'Image 2' },
  { src: 'https://drive.google.com/thumbnail?id=1F3_RZBhpQnBAqgE9JjSGAS0NUWbldG76&sz=w600', alt: 'Image 3' },
  { src: 'https://drive.google.com/thumbnail?id=1fCpMe8Oy7E-ACZ-50cXsJqBZMqZNsQRw&sz=w600', alt: 'Image 4' },
  { src: 'https://drive.google.com/thumbnail?id=18WdU8dYIc4MEqIYlEbW7_f6ArqmAYTI9&sz=w600', alt: 'Image 5' },
  { src: 'https://drive.google.com/thumbnail?id=1yp62e_Hgeefkp8rHowy3EVhy-84gcWkN&sz=w1000', alt: 'Image 6' },
  { src: 'https://drive.google.com/thumbnail?id=1ecFO-W1Oumjv2Gc4Mn_3Ui9jbTkQqn9p&sz=w500', alt: 'Image 7' },
  { src: 'https://drive.google.com/thumbnail?id=19BZpl8Ibvf5S6kOEaKUAaS7E6RUKEBwT&sz=w1000', alt: 'Image 8' },
  { src: 'https://drive.google.com/thumbnail?id=1ph7d9n7MVUTVRLHNQ4SRiZRiw9ZxklvX&sz=w1000', alt: 'Image 9' },
  { src: 'https://drive.google.com/thumbnail?id=1sfOiFKzqx_47nUzNVsBuok-xmhlSHMwq&sz=w1000', alt: 'Image 10' },
  { src: 'https://drive.google.com/thumbnail?id=1lEkYrCZq6EPlddLlvavg5LEJaDr37uBt&sz=w1000', alt: 'Image 11' },
  { src: 'https://drive.google.com/thumbnail?id=1Hh-ISJAu5Nj667OrCzvxS9GMwZMONHjZ&sz=w1000', alt: 'Image 12' },
  { src: 'https://drive.google.com/thumbnail?id=1qli2Q6Fn7YuvYzFdGklFGIFy0cSkK_tO&sz=w1000', alt: 'Image 13' },
  { src: 'https://drive.google.com/thumbnail?id=1rC-gq_mwtapMZxO9GcGGq68y_AmqjSKb&sz=w1000', alt: 'Image 14' },
  { src: 'https://drive.google.com/thumbnail?id=1IZB4HezChXBXcQQ28yBK-fY1ZLmC1D4h&sz=w1000', alt: 'Image 15' },
  { src: 'https://drive.google.com/thumbnail?id=1GvknWy86mPNQAoqblkgwb-7zmZ9Me8gQ&sz=w1000', alt: 'Image 16' },
  { src: 'https://drive.google.com/thumbnail?id=12SIvfSTBGnJdmp1lOFzvGdc5jVxF9lWl&sz=w1000', alt: 'Image 17' },
  { src: 'https://drive.google.com/thumbnail?id=1fVZyjxZRroaUF7L_xHgFBWMztgIzKlls&sz=w1000', alt: 'Image 18' },
  { src: 'https://drive.google.com/thumbnail?id=1l5H4ShGuaUCl-RqGY4u9fNyhEFix4flP&sz=w1000', alt: 'Image 19' },
  { src: 'https://drive.google.com/thumbnail?id=15GfZfW-rM49juaeDbrESBk8uFDBN9j_z&sz=w1000', alt: 'Image 20' },
  { src: 'https://drive.google.com/thumbnail?id=1UJJbrPXbBgeG6XTNCZZBJwZmQQ1NpCCc&sz=w1000', alt: 'Image 21' },
  { src: 'https://drive.google.com/thumbnail?id=1pVoDSUtJ_psPd3y91QAvP1PNo25qMIJQ&sz=w1000', alt: 'Image 22' },
  { src: 'https://drive.google.com/thumbnail?id=1ES7UZzNMmoZ86nkfoYCBgWEEGdxcA9jo&sz=w1000', alt: 'Image 23' }
]

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const touchStartX = React.useRef(null)


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

  // touch handlers for mobile swipe support
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const endX = e.changedTouches[0]?.clientX ?? null
    if (endX == null) return
    const dx = endX - touchStartX.current
    const threshold = 50
    if (dx > threshold) {
      // swipe right -> previous
      prev()
    } else if (dx < -threshold) {
      // swipe left -> next
      next()
    }
    touchStartX.current = null
  }

  return (
    <div className="gallery-root">
      <div className="grid">
        {IMAGES.map((img, i) => (
          <button
            key={i}
            className="thumb"
            onClick={() => openAt(i)}
            aria-label={`Open ${img.alt}`}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - r.left
              const y = e.clientY - r.top
              e.currentTarget.style.setProperty('--mx', x + 'px')
              e.currentTarget.style.setProperty('--my', y + 'px')
            }}
            onMouseLeave={(e) => {
              // reset to center
              e.currentTarget.style.setProperty('--mx', '50%')
              e.currentTarget.style.setProperty('--my', '50%')
            }}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="overlay">
              <span className="zoom">View</span>
            </div>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            // clicking on backdrop closes
            if (e.target === e.currentTarget) close()
          }}
        >
          <button className="lb-close" onClick={close} aria-label="Close">✕</button>
          <button className="lb-nav lb-prev" onClick={prev} aria-label="Previous">‹</button>
          <div className="lb-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img src={IMAGES[index].src} alt={IMAGES[index].alt} />
            <div className="lb-caption">{IMAGES[index].alt} — {index + 1}/{IMAGES.length}</div>
          </div>
          <button className="lb-nav lb-next" onClick={next} aria-label="Next">›</button>
        </div>
      )}
    </div>
  )
}
