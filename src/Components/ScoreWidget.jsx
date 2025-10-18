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
          <Button variant="success">
            Score: {score}
          </Button>
      }
    </div>
  )
}

export default ScoreWidget
