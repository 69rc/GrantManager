# Design Guidelines: Grant Management Platform

## Design Approach

**Hybrid Strategy**: Reference-based landing page (Stripe + Notion inspired for trust and clarity) combined with Material Design system for application interfaces and dashboards. This balances the need for credible, trust-building marketing presence with functional, efficient administrative tools.

### Design Principles
1. **Trust First**: Professional, credible aesthetic that reassures users they're in safe hands
2. **Clarity Over Cleverness**: Clear pathways, obvious actions, transparent processes
3. **Accessibility as Standard**: Government-grade accessibility for inclusive grant access
4. **Progressive Disclosure**: Show complexity only when needed

---

## Typography

**Primary Font**: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400 weight
- Emphasis: 500 weight

**Scale**:
- Hero headline: text-5xl md:text-6xl lg:text-7xl
- Section headers: text-3xl md:text-4xl
- Subsections: text-2xl md:text-3xl
- Body large: text-lg md:text-xl
- Body standard: text-base
- Captions/labels: text-sm
- Fine print: text-xs

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, and 32

**Section Padding**:
- Mobile: py-12 px-4
- Desktop: py-20 md:py-24 lg:py-32, px-6 lg:px-8

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto
- Content sections: max-w-6xl mx-auto
- Forms & text: max-w-3xl mx-auto
- Dashboard tables: max-w-full with horizontal scroll on mobile

**Grid Patterns**:
- Feature cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Stats/metrics: grid-cols-2 md:grid-cols-4
- Application cards: grid-cols-1 gap-4 md:gap-6
- Admin tables: responsive table with overflow-x-auto

---

## Landing Page Structure

**1. Hero Section** (h-[600px] md:h-[700px])
- Full-width background image showing diverse community/people receiving support
- Centered content with semi-transparent backdrop blur
- Headline + supporting text + dual CTA (Apply Now primary, Learn More secondary)
- Trust indicators: "Over $5M distributed" • "500+ projects funded" • "Trusted since 2020"

**2. Grant Types Overview** (3-column grid)
- Card-based layout showcasing available grant categories
- Each card: icon, title, brief description, amount range, "Learn More" link
- Visual treatment: elevated cards with subtle shadows, hover lift effect

**3. How It Works** (4-step timeline)
- Horizontal timeline on desktop, vertical on mobile
- Steps: 1) Create Account → 2) Submit Application → 3) Review Process → 4) Receive Funding
- Icons for each step, connecting line between steps

**4. Success Stories** (2-column grid)
- Featured project cards with images
- Project name, amount received, brief impact statement, location
- "View All Projects" CTA

**5. Why Choose Us** (3-column feature grid)
- Fast Processing • Transparent Process • Expert Support
- Icons, headings, 2-3 sentence descriptions

**6. Statistics Bar** (4-column inline)
- Total Grants Awarded • Success Rate • Average Processing Time • Total Impact
- Large numbers with labels beneath

**7. FAQ Section** (accordion style)
- 6-8 common questions with expandable answers
- Clean, minimal accordion design

**8. Final CTA Section**
- Centered message: "Ready to Apply?"
- Primary CTA button + secondary contact option
- Background: subtle gradient or pattern

**9. Footer** (comprehensive)
- 4-column layout: About, Quick Links, Contact Info, Newsletter
- Social media links (WhatsApp, Facebook, Instagram, Twitter/X)
- Copyright and legal links

---

## Application Interface

**Form Design**:
- Single-column layout, max-w-3xl
- Clear section headings with progress indicator
- Input fields: p-3, rounded-lg, border-2 focus states
- Labels above inputs: text-sm font-medium mb-2
- Helper text below inputs: text-sm with muted treatment
- File upload: Drag-and-drop zone with browse fallback
- Validation: Inline error messages in contrasting treatment, icon indicators

**Application Status Cards**:
- Timeline visualization showing application journey
- Status badges: Pending (neutral), Under Review (info), Approved (success), Rejected (muted)
- Expandable sections for application details
- Action buttons contextual to status

---

## Admin Dashboard

**Layout**: Sidebar navigation (240px fixed) + main content area

**Navigation**:
- Logo + organization name at top
- Menu items with icons: Dashboard, Applications, Users, Analytics, Settings
- User profile section at bottom with logout

**Dashboard Cards**:
- Metrics grid at top (2x2 on mobile, 4-column on desktop)
- Large number + trend indicator + label
- Charts section using Chart.js with clean, minimal styling

**Data Tables**:
- Sticky header row
- Alternating row backgrounds for readability
- Action column with icon buttons
- Filter and search bar above table
- Pagination controls below
- Status badges as colored pills

**Filter Panel**:
- Collapsible on mobile, fixed on desktop
- Checkbox groups for status, grant type
- Date range picker
- "Apply Filters" + "Clear All" buttons

---

## Communication Components

**Chat Widget**:
- Fixed bottom-right position (bottom-4 right-4)
- Circular trigger button with notification badge
- Expandable panel: w-80 md:w-96, h-96 md:h-[500px]
- Message bubbles: user (aligned right), admin (aligned left)
- Input field with send button at bottom
- Timestamp display on messages

**Contact Section**:
- 2-column layout (desktop): Form left, contact info + map right
- Contact cards for each method: WhatsApp, Email, Social Media
- Cards with icons, labels, and click-to-action
- Operating hours display
- Response time expectation: "We typically respond within 24 hours"

---

## Component Library

**Buttons**:
- Primary: Solid fill, rounded-lg, px-6 py-3, font-medium
- Secondary: Outline style, same padding
- Ghost: Text only with subtle hover
- Icon buttons: Square, p-2, rounded-md
- Size variants: sm (px-4 py-2), base (px-6 py-3), lg (px-8 py-4)

**Cards**:
- Elevated: shadow-md hover:shadow-lg, rounded-xl
- Bordered: border-2, rounded-xl
- Padding: p-6 md:p-8

**Badges/Pills**:
- Rounded-full, px-3 py-1, text-xs font-medium
- Status-specific treatments

**Modals**:
- Centered overlay with backdrop blur
- max-w-md to max-w-2xl depending on content
- Header with title + close button
- Content area with p-6
- Footer with action buttons

**Toasts**:
- Fixed top-right position
- Auto-dismiss after 5 seconds
- Icon + message + close button
- Slide-in animation

**Loading States**:
- Spinner: Circular, size-6 for buttons, size-12 for page loads
- Skeleton screens for data tables and cards
- Progress bars for file uploads (h-2, rounded-full)

**Form Controls**:
- Text inputs: h-12, px-4, rounded-lg, border-2
- Textareas: min-h-32, p-4
- Selects: Same styling as text inputs with dropdown icon
- Checkboxes/radios: size-5, rounded corners
- Toggle switches for settings (w-11 h-6)

---

## Images

**Hero Image**: 
Full-width background showing diverse individuals or community members engaged in productive activities (small business, education, community projects). Should convey hope, empowerment, and diversity. Professional photography style, bright and welcoming.

**Success Story Cards**: 
Square or 16:9 ratio images showing completed projects or beneficiaries. Real photography preferred over stock imagery to build authenticity.

**About/Team Section**: 
Professional headshots or candid team photos showing approachability and professionalism.

**Icon Library**: Use Heroicons (outline for default state, solid for active/selected)

---

## Accessibility Standards

- WCAG 2.1 AA minimum compliance
- Contrast ratios: 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation for all interactive elements
- Focus indicators: 2px outline with offset
- Screen reader labels on icon-only buttons
- Form field labels always visible (no placeholder-only)
- Skip navigation link for keyboard users
- Semantic HTML throughout (nav, main, section, article, aside)

---

## Animations

**Use Sparingly**:
- Hero section: Subtle fade-up on load (500ms ease-out)
- Card hovers: transform scale(1.02) and shadow transition (200ms)
- Page transitions: Fade only (300ms)
- Toast/modal enter/exit: Slide and fade (250ms)
- No parallax scrolling, no scroll-triggered animations
- Loading spinners only