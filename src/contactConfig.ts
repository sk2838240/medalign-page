export const contactConfig = {
  businessPhone: '',
  leadRecipientEmail: 'sourabhsearchmodifiers@gmail.com',
} as const

export const hasBusinessPhone = contactConfig.businessPhone.trim().length > 0

export const telHref = hasBusinessPhone
  ? `tel:${contactConfig.businessPhone.replace(/[^\d+]/g, '')}`
  : ''

export const whatsappHref = hasBusinessPhone
  ? `https://wa.me/${contactConfig.businessPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
      'Hi MedAlign, I would like to learn more about clinic partnership opportunities.',
    )}`
  : ''
