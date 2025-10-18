import React from 'react'
import './App.css'
import DataSection from './Components/DataSection'
import AISection from './Components/AISection'
import { PanelGroup } from 'react-resizable-panels'
import { Panel } from 'react-resizable-panels'
import { PanelResizeHandle } from 'react-resizable-panels'

const App = () => {
    return (
        <div id='AppDiv'>
            <PanelGroup direction="horizontal">
                <Panel minSize={30}>
                    <DataSection />
                </Panel>
                <PanelResizeHandle className={"ResizeHandleOuter"}>
                    <div className={"ResizeHandleInner"}>   
                        <svg className={"Icon"} viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
                            />
                        </svg>
                    </div>
                </PanelResizeHandle>
                <Panel minSize={30}>
                    <AISection />
                </Panel>
            </PanelGroup>
        </div>
    )
}

export default App