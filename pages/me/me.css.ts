import { style } from '@vanilla-extract/css'
import { tokens } from '@styles/theme'

export const aboutPage = style({
  maxWidth: '800px',
  margin: '0 auto',
  padding: `0 ${tokens.space.md}`,
})

export const header = style({
  textAlign: 'center',
  marginBottom: tokens.space['2xl'],
})

export const socialLinks = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})

export const intro = style({
  fontSize: tokens.fonts.size.lg,
  lineHeight: '1.6',
  marginBottom: tokens.space.xl,
  color: tokens.colors.neutral,
})

// Experience Styles
export const experienceList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space['2xl'],
})

export const experienceItem = style({
  borderLeft: `3px solid ${tokens.colors.primary}`,
  paddingLeft: tokens.space.lg,
  paddingBottom: tokens.space.lg,
})

export const experienceHeader = style({
  marginBottom: tokens.space.md,
})

export const company = style({
  fontSize: tokens.fonts.size.md,
  fontWeight: 600,
  color: tokens.colors.primary,
  display: 'block',
  marginTop: tokens.space.xs,
})

export const period = style({
  fontSize: tokens.fonts.size.sm,
  color: tokens.colors.variants.neutral.light,
  fontStyle: 'italic',
  display: 'block',
  marginTop: tokens.space.xs,
})

export const description = style({
  listStyle: 'disc',
  paddingLeft: tokens.space.lg,
  marginBottom: tokens.space.md,
})

export const technologies = style({
  marginTop: tokens.space.md,
})

export const techTags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.space.xs,
  marginTop: tokens.space.xs,
})

export const techTag = style({
  backgroundColor: tokens.colors.variants.primary.light,
  color: tokens.colors.variants.primary.dark,
  padding: `${tokens.space.xs} ${tokens.space.sm}`,
  borderRadius: tokens.space.sm,
  fontSize: tokens.fonts.size.sm,
  fontWeight: 500,
})

// Education Styles
export const educationList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.xl,
})

export const educationItem = style({
  borderLeft: `3px solid ${tokens.colors.secondary}`,
  paddingLeft: tokens.space.lg,
})

export const educationHeader = style({
  marginBottom: tokens.space.md,
})

export const institution = style({
  fontSize: tokens.fonts.size.md,
  fontWeight: 600,
  color: tokens.colors.secondary,
  display: 'block',
  marginTop: tokens.space.xs,
})

// Skills Section
export const skillsSection = style({
  gap: tokens.space['2xl'],
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
})

export const skillsColumn = style({
  flex: 2,
})

export const languagesColumn = style({
  flex: 1,
})

export const skillsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: tokens.space.sm,
})

export const skillTag = style({
  backgroundColor: tokens.colors.variants.accent.light,
  color: tokens.colors.variants.accent.dark,
  padding: `${tokens.space.sm} ${tokens.space.md}`,
  borderRadius: tokens.space.sm,
  fontSize: tokens.fonts.size.sm,
  fontWeight: 600,
  textAlign: 'center',
  border: `2px solid ${tokens.colors.accent}`,
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: tokens.colors.accent,
    color: tokens.colors.background,
    transform: 'translateY(-2px)',
  },
})

export const languagesList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.md,
})

export const languageItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${tokens.space.sm} ${tokens.space.md}`,
  backgroundColor: tokens.colors.variants.background.light,
  borderRadius: tokens.space.sm,
  border: `1px solid ${tokens.colors.variants.neutral.light}`,
})

export const language = style({
  fontWeight: 600,
  color: tokens.colors.neutral,
})

export const proficiency = style({
  fontSize: tokens.fonts.size.sm,
  color: tokens.colors.variants.neutral.light,
  fontStyle: 'italic',
})

// Contact Section
export const contact = style({
  textAlign: 'center',
  backgroundColor: tokens.colors.variants.background.light,
  padding: tokens.space.xl,
  borderRadius: tokens.space.md,
  border: `2px solid ${tokens.colors.variants.primary.light}`,
})

export const contactInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.md,
  marginTop: tokens.space.lg,
  alignItems: 'center',
})

export const contactLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.space.sm,
  color: tokens.colors.primary,
  textDecoration: 'none',
  fontSize: tokens.fonts.size.md,
  fontWeight: 500,
  padding: `${tokens.space.sm} ${tokens.space.lg}`,
  backgroundColor: tokens.colors.variants.primary.light,
  borderRadius: tokens.space.sm,
  border: `2px solid ${tokens.colors.primary}`,
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: tokens.colors.primary,
    color: tokens.colors.background,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
  },
})

export default {
  aboutPage,
  header,
  socialLinks,
  intro,
  experienceList,
  experienceItem,
  experienceHeader,
  company,
  period,
  description,
  technologies,
  techTags,
  techTag,
  educationList,
  educationItem,
  educationHeader,
  institution,
  skillsSection,
  skillsColumn,
  languagesColumn,
  skillsGrid,
  skillTag,
  languagesList,
  languageItem,
  language,
  proficiency,
  contact,
  contactInfo,
  contactLink,
}
