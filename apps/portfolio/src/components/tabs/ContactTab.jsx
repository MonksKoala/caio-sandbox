import { Mail, Linkedin, Github, Calendar, ArrowRight, ExternalLink } from 'lucide-react'
import { CONTACT, HERO } from '../../data/content.js'

const links = [
  { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Linkedin, label: 'LinkedIn', href: CONTACT.linkedin },
  { icon: Github, label: 'GitHub', href: CONTACT.github },
  { icon: Calendar, label: 'Book a Call', href: CONTACT.cal },
]

export default function ContactTab() {
  return (
    <div className="h-full tab-panel content-fade-mask p-4 md:p-6 flex flex-col">
      {/* Headline */}
      <div className="mb-6 md:mb-8">
        <h2 className="font-drama italic text-2xl md:text-3xl text-ink mb-2">
          Let's talk.
        </h2>
        <p className="font-heading text-sm text-ink/50 max-w-sm">
          Ready to automate something painful? I'd love to hear about your project and see if we're a good fit.
        </p>
      </div>

      {/* Primary CTA */}
      <a
        href={CONTACT.cal}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-magnetic inline-flex items-center gap-2 bg-signal text-offwhite font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full w-fit mb-6 md:mb-8"
      >
        <span className="btn-bg bg-ink" />
        <span className="relative z-10 flex items-center gap-2">
          Let's Connect
          <ArrowRight size={14} />
        </span>
      </a>

      {/* Contact links */}
      <div className="w-12 h-px bg-ink/10 mb-4" />
      <div className="space-y-3">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link flex items-center gap-3 group"
          >
            <link.icon size={16} className="text-ink/30 group-hover:text-signal transition-colors" />
            <span className="font-mono text-xs text-ink/50 group-hover:text-ink transition-colors">
              {link.label}
            </span>
            <ExternalLink size={10} className="text-ink/15 group-hover:text-ink/30 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  )
}
