import React, { useEffect, useState } from 'react'

function Onboarding({ spotId, step = -1, onNext }) {
  const [rect, setRect] = useState(null)
  // map step to element id
  const stepMap = {
    0: 'PersonalFormSpotlight',
    1: 'CreditFormSpotlight',
    2: 'PaymentsFormSpotlight',
    3: 'PurchasesFormSpotlight',
    4: 'AISectionSpotlight'
  }
  const targetId = stepMap[step] || null

  useEffect(() => {
    function calc() {
      if (!targetId) return setRect(null)
      const el = document.getElementById(targetId)
      if (!el) return setRect(null)
      const r = el.getBoundingClientRect()
      setRect(r)
    }

    calc()
    window.addEventListener('resize', calc)
    window.addEventListener('scroll', calc, true)
    const mo = new MutationObserver(calc)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { window.removeEventListener('resize', calc); window.removeEventListener('scroll', calc, true); mo.disconnect() }
  }, [targetId])

  // base overlay
  if (!targetId || !rect) {
    return (
      <div id="OnboardingDiv" onClick={() => onNext && onNext()} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 9999 }} />
    )
  }

  // spotlight: create 4 panels around rect so rect area is uncovered
  const { top, left, width, height } = rect
  const right = left + width
  const bottom = top + height

  const overlayStyle = { position: 'fixed', backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 2147483646, pointerEvents: 'auto' }

  // compute tooltip position but keep it inside viewport
  const tooltipWidth = 240
  const tooltipHeight = 96
  const spaceRight = window.innerWidth - right
  const spaceLeft = left
  let tooltipLeft = right + 12
  let tooltipTop = top

  // if there's not enough space on the right, try left
  if (spaceRight < tooltipWidth && spaceLeft > tooltipWidth) {
    tooltipLeft = Math.max(12, left - tooltipWidth - 12)
  }
  // if still bad vertically, clamp
  if (tooltipTop + tooltipHeight > window.innerHeight) {
    tooltipTop = Math.max(12, window.innerHeight - tooltipHeight - 12)
  }

  return (
    <>
    {/* /rounded corners */}
        {/* top */}
    <div style={{ ...overlayStyle, left: 0, top: 0, right: 0, height: top }} />
      {/* bottom */}
      <div onClick={() => onNext && onNext()} style={{ ...overlayStyle, left: 0, top: bottom, right: 0, bottom: 0 }} />
      {/* left */}
      <div onClick={() => onNext && onNext()} style={{ ...overlayStyle, left: 0, top: top, width: left, height }} />
      {/* right */}
      <div onClick={() => onNext && onNext()} style={{ ...overlayStyle, left: right, top: top, right: 0, height }} />
      {/* tiny tooltip near spotlighted element (position clamped) */}
      <div style={{ position: 'fixed', left: tooltipLeft, top: tooltipTop, width: tooltipWidth, zIndex: 2147483647, color: 'white' }}>
        <div style={{ background: 'rgba(0,0,0,0.78)', padding: 12, borderRadius: 8 }}>
          <div style={{ marginBottom: 6, fontWeight: 700 }}>Step {step + 1}</div>
          <div style={{ marginBottom: 10, fontSize: 13 }}>
            {step === 0 && 'Enter your personal information to get started.'}
            {step === 1 && 'Add a credit card to start making purchases.'}
            {step === 2 && 'Make payments to pay off your credit card debt.'}
            {step === 3 && 'Record your purchases made using credit cards.'}
            {step === 4 && 'Get AI-powered insights and recommendations.'}

          </div>
          <button onClick={(e) => { e.stopPropagation(); onNext && onNext() }} style={{ padding: '6px 10px', borderRadius: 6, border: 'none', background: 'white', color: '#111' }}>Next</button>
        </div>
      </div>
    </>
  )
}

export default Onboarding