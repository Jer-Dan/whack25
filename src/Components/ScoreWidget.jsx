import React from 'react'
import { Button } from 'react-bootstrap'

function ScoreWidget({ score }) {
  return (
    <div>
        {/* The button just acts as a sign with border   */}
      {
        score === null
        ?
          null
        :
        // Change color depending on score value
        <Button variant={score > 80 ? "success" : score > 50 ? "warning" : "danger"} style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
          Score: {score}
        </Button>
      }
    </div>
  )
}

export default ScoreWidget
