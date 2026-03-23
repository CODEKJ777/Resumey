# Resume Templates & PDF Export Implementation

## 🎯 Overview

This implementation provides a complete resume template system with professional PDF export functionality for React applications. The system is designed to work with JSON resume data and provides multiple professional templates optimized for A4 paper size.

## 🚀 Features

### 📄 Professional Templates
- **Modern Professional** - Clean, contemporary design with blue accents
- **Classic Professional** - Traditional, formal layout with serif fonts
- **Minimal Clean** - Simple, elegant design with minimal styling
- **Creative Designer** - Modern, visually appealing with creative elements
- **Executive Professional** - Formal, sophisticated layout for senior roles

### 🔧 Technical Features
- **A4 Paper Optimization** - All templates designed for standard A4 size (210mm × 297mm)
- **Print-Ready CSS** - Special media queries for high-quality printing
- **Dynamic Data Binding** - Templates automatically populate with JSON data
- **Page Break Management** - Proper handling of multi-page resumes
- **Cross-Browser Compatible** - Works in all modern browsers

### 📤 Export Options
- **PDF Export** - High-quality PDF generation using browser print dialog
- **HTML Export** - Download as self-contained HTML file
- **Text Export** - ATS-friendly plain text format

## 🏗️ Architecture

### File Structure
```
lib/
├── templates/
│   └── resume-templates.tsx    # Template definitions and styles
├── export/
│   ├── index.ts               # Main export system
│   └── pdf-export.ts          # PDF export functionality
components/
└── template-selector.tsx      # Template selection UI
```

### Core Components

#### 1. Template System (`lib/templates/resume-templates.tsx`)
```typescript
export const RESUME_TEMPLATES = {
  MODERN: {
    name: 'Modern Professional',
    component: ModernTemplate,
    styles: ModernStyles
  },
  // ... other templates
}
```

#### 2. PDF Export (`lib/export/pdf-export.ts`)
```typescript
export class PDFExporter {
  async exportToPDF(): Promise<void> {
    // Opens print dialog with formatted resume
  }
}
```

#### 3. Template Selector (`components/template-selector.tsx`)
```typescript
export function TemplateSelector({ resumeData }: TemplateSelectorProps) {
  // UI for selecting and previewing templates
}
```

## 📋 Implementation Guide

### Step 1: Install Dependencies (Optional)

For advanced PDF export capabilities, you can install additional libraries:

```bash
# For canvas-based PDF generation
npm install html2canvas

# For direct PDF generation
npm install jspdf
```

### Step 2: Use the Template System

```typescript
import { RESUME_TEMPLATES } from '@/lib/templates/resume-templates'
import { TemplateSelector } from '@/components/template-selector'

// In your component
function ResumeEditor({ resumeData }) {
  return (
    <TemplateSelector resumeData={resumeData} />
  )
}
```

### Step 3: Export Functionality

```typescript
import { PDFExporter } from '@/lib/export/pdf-export'

// Export to PDF
const exporter = new PDFExporter(resumeData)
await exporter.exportToPDF()
```

## 🎨 Template Customization

### Adding New Templates

1. **Create Template Component**:
```typescript
function CustomTemplate({ data }: { data: ResumeFormData }) {
  return (
    <div className="custom-template">
      {/* Your template JSX */}
    </div>
  )
}
```

2. **Define Styles**:
```typescript
export const CustomStyles = `
.custom-template {
  /* Your CSS styles */
  font-family: 'Arial', sans-serif;
  max-width: 210mm;
  /* ... */
}
```

3. **Add to Template Registry**:
```typescript
export const RESUME_TEMPLATES = {
  // ... existing templates
  CUSTOM: {
    name: 'Custom Template',
    component: CustomTemplate,
    styles: CustomStyles
  }
}
```

### CSS Guidelines

#### A4 Paper Dimensions
- **Width**: 210mm
- **Height**: 297mm
- **Margins**: 15mm (recommended)

#### Print Optimization
```css
@media print {
  body {
    size: A4;
    margin: 0;
    padding: 10mm;
  }
  
  /* Smaller fonts for printing */
  .name { font-size: 20pt; }
  .section-title { font-size: 12pt; }
}
```

#### Page Break Management
```css
.resume-section {
  page-break-inside: avoid;
}

.experience-item {
  page-break-inside: avoid;
}
```

## 📱 Usage Examples

### Basic Template Selection
```typescript
import { TemplateSelector } from '@/components/template-selector'

function ResumeApp() {
  const resumeData = {
    personalInfo: {
      fullName: "John Doe",
      email: "john@example.com",
      // ... other fields
    },
    experience: [
      {
        position: "Software Engineer",
        company: "Tech Company",
        // ... other fields
      }
    ]
    // ... other resume data
  }

  return <TemplateSelector resumeData={resumeData} />
}
```

### Programmatic Template Switching
```typescript
import { RESUME_TEMPLATES } from '@/lib/templates/resume-templates'

const template = RESUME_TEMPLATES.MODERN
const TemplateComponent = template.component
const styles = template.styles
```

### Custom Export Function
```typescript
async function exportResume(resumeData, templateType) {
  const exporter = new PDFExporter(resumeData)
  await exporter.exportToPDF()
}
```

## 🔧 Advanced Configuration

### Custom PDF Export Libraries

#### Using html2canvas
```typescript
import html2canvas from 'html2canvas'

const canvas = await html2canvas(element, {
  scale: 2,
  useCORS: true,
  allowTaint: false
})

const img = canvas.toDataURL('image/png')
// Convert to PDF...
```

#### Using jsPDF
```typescript
import jsPDF from 'jspdf'

const doc = new jsPDF()
doc.html(element)
doc.save('resume.pdf')
```

### Template Data Structure

The templates expect the following data structure:

```typescript
interface ResumeFormData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary?: string
  }
  objective?: string
  experience: Array<{
    position: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    degree: string
    field: string
    school: string
    startYear: string
    endYear: string
  }>
  skills: string[]
  projects?: Array<{
    title: string
    description: string
    technologies?: string
  }>
  certificates?: Array<{
    name: string
    issuer: string
    date: string
  }>
  achievements?: Array<{
    title: string
    description: string
  }>
  languages?: Array<{
    name: string
    level: string
  } | string>
}
```

## 🎯 Best Practices

### 1. Performance Optimization
- Use `page-break-inside: avoid` for important sections
- Optimize CSS for print media
- Minimize external dependencies

### 2. Accessibility
- Use semantic HTML elements
- Provide alt text for images
- Ensure proper color contrast

### 3. Browser Compatibility
- Test in multiple browsers
- Provide fallbacks for older browsers
- Use standard CSS properties

### 4. ATS Optimization
- Use standard section headers
- Avoid complex layouts
- Provide text export option

## 🐛 Troubleshooting

### Common Issues

#### PDF Export Not Working
- Check if popups are allowed
- Verify browser print dialog settings
- Ensure CSS is properly loaded

#### Template Not Displaying Correctly
- Check CSS syntax
- Verify data structure
- Ensure template component is properly imported

#### Page Break Issues
- Add `page-break-inside: avoid` to sections
- Check content height
- Adjust margins and padding

### Debug Mode

Enable console logging for debugging:
```typescript
console.log('Template data:', resumeData)
console.log('Selected template:', selectedTemplate)
```

## 📚 Additional Resources

- [CSS Print Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print)
- [A4 Paper Specifications](https://en.wikipedia.org/wiki/A4_paper)
- [ATS Resume Guidelines](https://www.indeed.com/career-advice/resume/ats-compliant)
- [Browser Print API](https://developer.mozilla.org/en-US/docs/Web/API/Window/print)

## 🤝 Contributing

To add new templates or improve existing ones:

1. Follow the established naming conventions
2. Ensure A4 paper optimization
3. Test print functionality
4. Update documentation

## 📄 License

This implementation is provided as-is for educational and commercial use. Feel free to modify and distribute according to your project needs.
