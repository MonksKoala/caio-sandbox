function escape(val) {
    if (val == null) return ''
    const str = String(val)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
    }
    return str
}

function formatDate(iso) {
    return new Date(iso).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function exportToCSV(history) {
    if (!history || history.length === 0) return

    const headers = [
        'Company',
        'Industry',
        'Employees',
        'Revenue',
        'Funding',
        'Budget',
        'DM Access',
        'Timeline',
        'Score',
        'Verdict',
        'Tier',
        'Strengths',
        'Risks',
        'Top Recommendation',
        'Scored At',
    ]

    const rows = history.map(({ prospect: p, result: r, scoredAt }) => [
        escape(p.companyName),
        escape(p.industry),
        escape(p.employeeCount),
        escape(p.annualRevenue),
        escape(p.fundingStage),
        escape(p.budgetRange),
        escape(p.decisionMakerAccess),
        escape(p.buyingTimeline),
        escape(r.score),
        escape(r.verdict),
        escape(r.qualificationTier),
        escape((r.strengths || []).join(' | ')),
        escape((r.risks || []).join(' | ')),
        escape((r.recommendations || [])[0] || ''),
        escape(formatDate(scoredAt)),
    ])

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `icp-scores-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()

    setTimeout(() => URL.revokeObjectURL(url), 1000)
}
