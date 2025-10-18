import React, { useMemo, useState, useEffect } from 'react'
import { Chart } from 'react-charts'

function ChartWidget() {
    const [type, setType] = useState('purchases') // 'purchases' or 'payments'
    const [refresh, setRefresh] = useState(0)

    // read the selected data from localStorage and convert to react-charts series
    const series = useMemo(() => {
        const key = type === 'purchases' ? 'purchases' : 'payments'
        const items = JSON.parse(localStorage.getItem(key)) || []

        // sort ascending by date
        items.sort((a, b) => new Date(a.date) - new Date(b.date))

        const data = items
            .filter(it => it && it.date)
            .map(it => ({ primary: new Date(it.date), secondary: Number(it.amount || it.total || 0) }))

        return [
            {
                label: type === 'purchases' ? 'Purchases' : 'Payments',
                data
            }
        ]
    }, [type, refresh])

    const primaryAxis = useMemo(() => ({
        getValue: d => d.primary,
        scaleType: 'time'
    }), [])

    const secondaryAxes = useMemo(() => ([{ getValue: d => d.secondary, elementType: 'line' }]), [])

    useEffect(() => {
        // simple listener for a custom event so other components can dispatch when they update data
        const handler = () => setRefresh(r => r + 1)
        window.addEventListener('data-updated', handler)
        return () => window.removeEventListener('data-updated', handler)
    }, [])

    const options = useMemo(() => ({ data: series, primaryAxis, secondaryAxes }), [series, primaryAxis, secondaryAxes])

    return (
        <div style={{ padding: '8px', minWidth: 300 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <label htmlFor="chart-type">Show:</label>
                <select id="chart-type" value={type} onChange={e => setType(e.target.value)}>
                    <option value="purchases">Purchases</option>
                    <option value="payments">Payments</option>
                </select>
                <button onClick={() => setRefresh(r => r + 1)}>Refresh</button>
            </div>

            <div style={{ width: '100%', height: '280px' }}>
                {series[0].data.length === 0 ? (
                    <div style={{ color: 'var(--muted)' }}>{type === 'purchases' ? 'No purchases data yet.' : 'No payments data yet.'}</div>
                ) : (
                    <Chart options={options} />
                )}
            </div>
        </div>
    )
}

export default ChartWidget