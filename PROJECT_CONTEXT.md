# Lifeline AI - Emergency First Aid Assistant

## Project Overview
Lifeline AI is a progressive web application (PWA) designed as an AI-powered conversational agent for emergency situations. The application provides real-time voice guidance and step-by-step instructions to help users navigate medical emergencies until professional help arrives.

## Target Users
- **Primary**: Everyday people experiencing or witnessing medical emergencies
- **Secondary**: Caregivers, parents, elderly individuals, people with disabilities
- **Tertiary**: First aid trainers, community health workers

## Core Features

### 1. Conversational Emergency Interface
- **Chat-based interaction** with AI assistant
- **Voice-first design** with text backup
- **Real-time emergency timer** and status tracking
- **Urgency-coded responses** (Critical, High, Medium, Low)
- **Quick response buttons** for limited dexterity situations

### 2. Accessibility & Inclusivity
- **Mobile-first responsive design** optimized for all screen sizes
- **Progressive Web App** with offline capabilities
- **Multi-language support** (10+ languages with voice synthesis)
- **Comprehensive accessibility panel**:
  - Adjustable font sizes (14px-28px)
  - High contrast mode
  - Reduced motion settings
  - Large touch targets for motor difficulties
  - Voice-first mode prioritization

### 3. Emergency-Optimized UX
- **Large, rounded buttons** (minimum 44px touch targets)
- **Color-coded urgency system**:
  - 🚨 Critical (Red) - Life-threatening situations
  - ⚠️ High (Orange) - Urgent medical attention needed
  - ℹ️ Medium (Blue) - Guidance and instructions
  - 💬 Low (Green) - General information and reassurance
- **Persistent 911 call button** always accessible
- **Auto-scroll and focus management** for hands-free use

## Technical Architecture

### Frontend Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **Shadcn/ui** component library
- **Lucide React** for consistent iconography

### Progressive Web App Features
- **Service Worker** for offline functionality
- **Web App Manifest** with emergency shortcuts
- **Background sync** for emergency protocol updates
- **IndexedDB** for offline data storage
- **Push notifications** for emergency alerts (future)

### Responsive Design System
- **Mobile-first approach** (320px+)
- **Breakpoints**:
  - Mobile: 320px - 639px
  - Tablet: 640px - 1023px
  - Desktop: 1024px+
- **Container queries** for component-level responsiveness
- **Flexible typography** scaling with viewport
- **Touch-optimized interactions** for mobile devices

### Accessibility Standards
- **WCAG 2.1 AA compliance**
- **Screen reader optimization** with proper ARIA labels
- **Keyboard navigation** support
- **High contrast ratios** (7:1 preferred, 4.5:1 minimum)
- **Focus indicators** for all interactive elements
- **Reduced motion** support for vestibular disorders

## UX Research Insights

### Emergency Interface Design Principles
1. **Cognitive Load Reduction**: Simple, clear instructions with minimal decision points
2. **Motor Accessibility**: Large touch targets for users with shaking hands or limited dexterity
3. **Visual Hierarchy**: Clear urgency indicators and consistent color coding
4. **Voice-First Design**: Audio instructions with visual confirmation
5. **Error Recovery**: Clear states and easy restart options

### Stress-Reduction Features
- **Calming color palette**: Medical blue/white/grey theme
- **Breathing animations**: Subtle pulsing effects for anxiety reduction
- **Reassuring language**: Positive, supportive messaging throughout
- **Progress indicators**: Clear sense of advancement through emergency steps

## Component Architecture

### Core Components
- `ChatPage`: Main conversational interface
- `AccessibilityPanel`: Comprehensive accessibility controls
- `LanguageModal`: Multi-language selection with voice previews
- `EmergencyHeader`: Persistent emergency status and controls
- `VoiceControls`: Audio input/output management

### UI Components (Shadcn/ui)
- Button, Card, Dialog, Textarea, Slider, Switch
- All components customized for emergency use cases
- Responsive variants for different screen sizes

## Development Guidelines

### Code Standards
- **TypeScript strict mode** enabled
- **ESLint + Prettier** for code formatting
- **Component composition** over inheritance
- **Custom hooks** for reusable logic
- **Error boundaries** for graceful failure handling

### Performance Optimization
- **Code splitting** by route
- **Image optimization** with Next.js Image component
- **Font optimization** with Google Fonts
- **Bundle analysis** for size monitoring
- **Lazy loading** for non-critical components

### Testing Strategy
- **Unit tests** for utility functions
- **Integration tests** for user flows
- **Accessibility testing** with axe-core
- **Performance testing** with Lighthouse
- **Cross-browser testing** on major platforms

## Future Roadmap

### Phase 1 (Current)
- ✅ Responsive conversational interface
- ✅ Accessibility features
- ✅ PWA functionality
- ✅ Multi-language support

### Phase 2 (Next)
- 🔄 **Murf AI integration** for voice synthesis
- 🔄 **Web Speech API** for voice recognition
- 🔄 **Geolocation services** for emergency routing
- 🔄 **Medical protocol database** with comprehensive procedures

### Phase 3 (Future)
- 📋 **Offline emergency protocols** with IndexedDB
- 📋 **Push notifications** for emergency alerts
- 📋 **Integration with emergency services** APIs
- 📋 **Admin dashboard** for protocol management
- 📋 **Analytics and reporting** for effectiveness tracking

## Integration Points

### Voice Technology
- **Murf AI**: Natural voice synthesis in multiple languages
- **Web Speech API**: Browser-native speech recognition
- **Audio processing**: Real-time voice analysis and feedback

### Emergency Services
- **Location services**: GPS integration for emergency routing
- **Emergency APIs**: Integration with local emergency services
- **Medical databases**: Access to verified emergency protocols

### Accessibility Tools
- **Screen readers**: Enhanced compatibility with NVDA, JAWS, VoiceOver
- **Voice control**: Integration with Dragon NaturallySpeaking
- **Switch navigation**: Support for assistive input devices

## Deployment & Infrastructure

### Hosting
- **Vercel** for frontend deployment
- **Edge functions** for API routes
- **CDN optimization** for global performance

### Monitoring
- **Error tracking** with Sentry
- **Performance monitoring** with Vercel Analytics
- **User feedback** collection and analysis

### Security
- **HTTPS enforcement** for all connections
- **Content Security Policy** headers
- **Data privacy** compliance (GDPR, HIPAA considerations)

This context provides comprehensive understanding of Lifeline AI's purpose, technical implementation, and future direction for development teams and AI assistants working on the project.
