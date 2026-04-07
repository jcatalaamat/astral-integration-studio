export const contactContent = {
  hero: {
    title: 'Contact',
    subtitle: 'Start a conversation.',
    description: 'Request a Digital Realignment Review or reach out about collaboration.'
  },
  form: {
    headline: 'Get in Touch',
    description: 'Tell us:',
    prompts: [
      'what your work is',
      'where clarity feels missing',
      "what you're hoping to resolve"
    ],
    note: 'We respond directly and thoughtfully.',
    reasons: [
      { value: 'review', label: 'Digital Realignment Review' },
      { value: 'collaboration', label: 'Studio Collaboration' },
      { value: 'careers', label: 'Careers & Roles' },
      { value: 'other', label: 'Other' }
    ],
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Your name'
      },
      email: {
        label: 'Email',
        placeholder: 'your@email.com'
      },
      reason: {
        label: 'Reason for reaching out',
        placeholder: 'Select a reason'
      },
      message: {
        label: 'Message',
        placeholder: 'What is your work? Where does clarity feel missing?'
      }
    },
    submit: 'Send Message',
    sending: 'Sending...',
    success: {
      title: 'Message received',
      description: "We'll respond within 24-48 hours.",
      note: 'Check your inbox for a reply from hello@astralintegration.studio'
    }
  }
};
