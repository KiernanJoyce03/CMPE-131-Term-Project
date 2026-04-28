import { useState, useEffect, forwardRef } from "react"
import "./BookCard.css"

const PAGE_SHADES = [
  [251,247,239],[245,241,232],[253,249,242],[241,237,228],
  [249,245,237],[246,242,233],[252,248,240],[243,239,230],
  [250,246,238],[247,243,234],[254,250,243],[244,240,231],
]

function tryGetColor(img) {
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 60
    canvas.height = 90
    const ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0, 60, 90)
    const data = ctx.getImageData(0, 0, 60, 90).data
    let r = 0, g = 0, b = 0, n = 0
    for (let i = 0; i < data.length; i += 12) {
      r += data[i]; g += data[i + 1]; b += data[i + 2]; n++
    }
    return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) }
  } catch {
    return { r: 70, g: 65, b: 60 }
  }
}

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b
const dk  = (r, g, b, a) => `rgb(${Math.max(0,r-a)},${Math.max(0,g-a)},${Math.max(0,b-a)})`
const lt  = (r, g, b, a) => `rgb(${Math.min(255,r+a)},${Math.min(255,g+a)},${Math.min(255,b+a)})`

function buildColors(r, g, b) {
  const l = lum(r, g, b)
  return {
    spine:       dk(r, g, b, 42),
    edge:        dk(r, g, b, 30),
    back:        dk(r, g, b, 18),
    hinge:       dk(r, g, b, 48),
    spineFront:  dk(r, g, b, 42),
    coverInside: lt(r, g, b, 42),
    spineText:   l < 132 ? "rgba(255,255,255,0.85)" : dk(r, g, b, 85),
  }
}

const DEFAULT_COLORS = buildColors(70, 65, 60)

function squiggleSVG(seed) {
  const VW = 100, VH = 280
  const rng = (n) => {
    const s = Math.sin(seed * 9301 + n * 49297 + 233) * 10000
    return s - Math.floor(s)
  }
  const wLine = (sx, sy, w, sw, s) => {
    const steps = Math.ceil(w / 4)
    let d = `M ${sx.toFixed(1)} ${sy.toFixed(1)}`
    for (let j = 1; j <= steps; j++) {
      const px = sx + (j / steps) * w
      const py = sy + (rng(s * 31 + j * 7) - 0.5) * 1.5
      d += ` L ${px.toFixed(1)} ${py.toFixed(1)}`
    }
    return `<path d="${d}" stroke="rgba(28,20,10,0.28)" stroke-width="${sw}" fill="none" stroke-linecap="round"/>`
  }
  const padX = 8, padY = 14, lh = 10.5
  let paths = "", y = padY, li = 0
  paths += wLine(padX + rng(0) * 5, y, (VW - padX * 2) * (0.35 + rng(1) * 0.3), 2.1, li)
  y += lh * 2.1; li++
  while (y < VH - padY - lh) {
    if (li % 8 === 0 && li > 1) y += lh * 0.65
    const isLastInPara = li % 8 === 7
    const lineW = isLastInPara
      ? (VW - padX * 2) * (0.15 + rng(li * 7) * 0.38)
      : (VW - padX * 2) * (0.78 + rng(li * 7) * 0.19)
    paths += wLine(padX, y, lineW, 1.2, li)
    y += lh; li++
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VW} ${VH}" preserveAspectRatio="xMidYMid meet">${paths}</svg>`
}

const BookCard = forwardRef(function BookCard(
  { title, author, coverUrl, seed = 1, shiftX = 0, onMouseEnter, onMouseLeave, onClick },
  ref
) {
  const [colors, setColors] = useState(DEFAULT_COLORS)
  const [imgSrc, setImgSrc] = useState("")

  useEffect(() => {
    if (!coverUrl) return
    const apply = (img) => {
      setImgSrc(img.src)
      const { r, g, b } = tryGetColor(img)
      setColors(buildColors(r, g, b))
    }
    const corsLoader = new Image()
    corsLoader.crossOrigin = "anonymous"
    corsLoader.onload = () => apply(corsLoader)
    corsLoader.onerror = () => {
      const plainLoader = new Image()
      plainLoader.onload = () => apply(plainLoader)
      plainLoader.onerror = () => setImgSrc(coverUrl)
      plainLoader.src = coverUrl
    }
    corsLoader.src = coverUrl
  }, [coverUrl])

  return (
    <div
      ref={ref}
      className="book-scene"
      style={{ transform: shiftX ? `translateX(${shiftX}px)` : undefined }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="book-shell">
        <div className="book-back" style={{ background: colors.back }} />
        {PAGE_SHADES.map(([pr, pg, pb], i) => {
          const total = 12, halfT = 15
          const z  = -halfT + 1 + (i / (total - 1)) * (halfT * 2 - 2)
          const oh = 1 + (i % 4) * 0.55
          const hN = (i % 3) * 0.3
          const tN = (i % 2) * 0.15
          return (
            <div key={i} style={{
              position: "absolute", width: `${148 + oh}px`, height: `${210 - hN}px`,
              top: `${1 + tN}px`, left: 0, background: `rgb(${pr},${pg},${pb})`,
              transform: `translateZ(${z}px)`, borderRight: "0.5px solid rgba(0,0,0,0.055)",
              borderTop: "0.5px solid rgba(0,0,0,0.03)", borderBottom: "0.5px solid rgba(0,0,0,0.03)",
            }} />
          )
        })}
        <div className="book-spine" style={{ background: colors.spine }}>
          <div className="spine-texture" />
          <span className="spine-title" style={{ color: colors.spineText }}>{title}</span>
        </div>
        <div className="book-top"    style={{ background: colors.edge }} />
        <div className="book-bottom" style={{ background: colors.edge }} />
        <div className="spine-front" style={{ background: colors.spineFront }} />
        <div className="inner-spread">
          <div className="spread-left"  dangerouslySetInnerHTML={{ __html: squiggleSVG(seed * 3.7) }} />
          <div className="spread-right" dangerouslySetInnerHTML={{ __html: squiggleSVG(seed * 7.3 + 1.1) }} />
          <div className="spread-fold" />
          <div className="spread-top-shade" />
          <div className="spread-bottom-shade" />
        </div>
        <div className="cover-wrap">
          <div className="cover-hinge" style={{ background: colors.hinge }} />
          <div className="book-face">
            {imgSrc && <img src={imgSrc} alt={title} />}
          </div>
          <div className="cover-edge-right" style={{ background: colors.edge }} />
          <div
            className="cover-inside"
            style={{ background: colors.coverInside }}
            dangerouslySetInnerHTML={{ __html: squiggleSVG(seed * 1.9 + 5) }}
          />
        </div>
      </div>
      <div className="book-shadow" />
      <div className="book-label">{title}</div>
      <div className="book-author-label">{author}</div>
      <div className="open-hint">click to view</div>
    </div>
  )
})

export default BookCard
