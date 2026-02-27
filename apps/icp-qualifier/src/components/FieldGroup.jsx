export default function FieldGroup({ label, required, children }) {
  return (
    <div className="space-y-2">
      <label className="block font-mono text-xs uppercase tracking-widest text-ink/50">
        {label}
        {required && <span className="text-signal ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const baseInput = 'w-full bg-ink/5 border border-ink/15 rounded-xl px-5 py-3.5 text-ink font-heading text-sm placeholder:text-ink/25 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal/30 transition-colors'

export function TextInput({ ...props }) {
  return <input type="text" className={baseInput} {...props} />
}

export function UrlInput({ ...props }) {
  return <input type="url" className={baseInput} {...props} />
}

export function Select({ options, placeholder, ...props }) {
  return (
    <select className={`${baseInput} appearance-none cursor-pointer`} {...props}>
      <option value="">{placeholder || 'Select...'}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}

export function TextArea({ maxLength, ...props }) {
  return (
    <div className="relative">
      <textarea
        className={`${baseInput} resize-none min-h-[100px]`}
        maxLength={maxLength}
        {...props}
      />
      {maxLength && (
        <span className="absolute bottom-3 right-4 font-mono text-xs text-ink/20">
          {(props.value || '').length}/{maxLength}
        </span>
      )}
    </div>
  )
}
