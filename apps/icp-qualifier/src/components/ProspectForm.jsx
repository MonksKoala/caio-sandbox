import { useState } from 'react'
import { Send } from 'lucide-react'
import FieldGroup, { TextInput, UrlInput, Select, TextArea } from './FieldGroup.jsx'

const INDUSTRIES = ['SaaS', 'FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'Marketplace', 'DevTools', 'Cybersecurity', 'AI/ML', 'HRTech', 'Other']
const EMPLOYEE_COUNTS = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
const REVENUE_RANGES = ['Pre-revenue', '<$1M', '$1M-$5M', '$5M-$20M', '$20M-$50M', '$50M-$100M', '$100M+']
const FUNDING_STAGES = ['Bootstrapped', 'Seed', 'Series A', 'Series B', 'Series C+', 'Public', 'Unknown']
const URGENCY_LEVELS = ['Critical — blocking revenue', 'High — significant impact', 'Medium — noticeable drag', 'Low — nice to have']
const BUDGET_RANGES = ['<$10K/yr', '$10K-$50K/yr', '$50K-$100K/yr', '$100K-$500K/yr', '$500K+/yr', 'Unknown']
const DM_ACCESS = ['Direct (C-level contact)', 'Champion (internal sponsor)', 'Influencer only', 'Cold / No contact']
const TIMELINES = ['Immediate (0-30 days)', 'Short-term (1-3 months)', 'Medium-term (3-6 months)', 'Long-term (6-12 months)', 'No timeline']

const initialForm = {
  companyName: '',
  companyWebsite: '',
  industry: '',
  employeeCount: '',
  annualRevenue: '',
  fundingStage: '',
  techStack: '',
  existingSolutions: '',
  primaryPain: '',
  painUrgency: '',
  triggerEvent: '',
  budgetRange: '',
  decisionMakerAccess: '',
  buyingTimeline: '',
  additionalNotes: '',
}

export default function ProspectForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm)

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const canSubmit = form.companyName && form.industry && form.employeeCount &&
    form.annualRevenue && form.primaryPain && form.painUrgency &&
    form.budgetRange && form.decisionMakerAccess && form.buyingTimeline

  const handleSubmit = (e) => {
    e.preventDefault()
    if (canSubmit) onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-10">
      {/* Company Info */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-ink border-b border-ink/10 pb-2">
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldGroup label="Company Name" required>
            <TextInput
              value={form.companyName}
              onChange={update('companyName')}
              placeholder="Acme Corp"
            />
          </FieldGroup>
          <FieldGroup label="Website">
            <UrlInput
              value={form.companyWebsite}
              onChange={update('companyWebsite')}
              placeholder="https://acme.com"
            />
          </FieldGroup>
          <FieldGroup label="Industry" required>
            <Select
              options={INDUSTRIES}
              value={form.industry}
              onChange={update('industry')}
              placeholder="Select industry..."
            />
          </FieldGroup>
          <FieldGroup label="Employee Count" required>
            <Select
              options={EMPLOYEE_COUNTS}
              value={form.employeeCount}
              onChange={update('employeeCount')}
              placeholder="Select range..."
            />
          </FieldGroup>
          <FieldGroup label="Annual Revenue" required>
            <Select
              options={REVENUE_RANGES}
              value={form.annualRevenue}
              onChange={update('annualRevenue')}
              placeholder="Select range..."
            />
          </FieldGroup>
          <FieldGroup label="Funding Stage">
            <Select
              options={FUNDING_STAGES}
              value={form.fundingStage}
              onChange={update('fundingStage')}
              placeholder="Select stage..."
            />
          </FieldGroup>
        </div>
      </section>

      {/* Technical Profile */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-ink border-b border-ink/10 pb-2">
          Technical Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldGroup label="Current Tech Stack">
            <TextArea
              value={form.techStack}
              onChange={update('techStack')}
              placeholder="AWS, React, PostgreSQL, Salesforce..."
              maxLength={300}
            />
          </FieldGroup>
          <FieldGroup label="Existing Solutions">
            <TextArea
              value={form.existingSolutions}
              onChange={update('existingSolutions')}
              placeholder="What they currently use for the problem you solve..."
              maxLength={300}
            />
          </FieldGroup>
        </div>
      </section>

      {/* Pain & Intent */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-ink border-b border-ink/10 pb-2">
          Pain & Intent Signals
        </h3>
        <FieldGroup label="Primary Pain Point" required>
          <TextArea
            value={form.primaryPain}
            onChange={update('primaryPain')}
            placeholder="What core problem is this prospect experiencing?"
            maxLength={300}
          />
        </FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldGroup label="Pain Urgency" required>
            <Select
              options={URGENCY_LEVELS}
              value={form.painUrgency}
              onChange={update('painUrgency')}
              placeholder="How urgent?"
            />
          </FieldGroup>
          <FieldGroup label="Trigger Event">
            <TextArea
              value={form.triggerEvent}
              onChange={update('triggerEvent')}
              placeholder="Recent funding, new hire, competitor launch..."
              maxLength={200}
            />
          </FieldGroup>
        </div>
      </section>

      {/* Budget & Authority */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-ink border-b border-ink/10 pb-2">
          Budget & Authority
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FieldGroup label="Budget Range" required>
            <Select
              options={BUDGET_RANGES}
              value={form.budgetRange}
              onChange={update('budgetRange')}
              placeholder="Select range..."
            />
          </FieldGroup>
          <FieldGroup label="Decision Maker Access" required>
            <Select
              options={DM_ACCESS}
              value={form.decisionMakerAccess}
              onChange={update('decisionMakerAccess')}
              placeholder="Select access level..."
            />
          </FieldGroup>
          <FieldGroup label="Buying Timeline" required>
            <Select
              options={TIMELINES}
              value={form.buyingTimeline}
              onChange={update('buyingTimeline')}
              placeholder="Select timeline..."
            />
          </FieldGroup>
        </div>
      </section>

      {/* Additional Notes */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-ink border-b border-ink/10 pb-2">
          Additional Intel
        </h3>
        <FieldGroup label="Notes">
          <TextArea
            value={form.additionalNotes}
            onChange={update('additionalNotes')}
            placeholder="Any other observations, context, or intel about this prospect..."
            maxLength={500}
          />
        </FieldGroup>
      </section>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-magnetic w-full bg-signal text-offwhite font-heading font-bold text-sm uppercase tracking-widest py-4 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span className="btn-bg bg-ink" />
        <span className="relative z-10 flex items-center justify-center gap-3">
          <Send size={16} />
          Analyze Prospect
        </span>
      </button>
    </form>
  )
}
