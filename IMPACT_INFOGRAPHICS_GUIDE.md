# Impact Infographics with PDF Download

## Features Added

### Real-Time Impact Dashboard
- ✅ Live statistics display with 6 key metrics
- ✅ Real-time updates (simulated every 10 seconds)
- ✅ Visual indicators with icons and colors
- ✅ Trend indicators showing growth
- ✅ Live badge for real-time metrics
- ✅ Professional infographics design

### PDF Download Functionality
- ✅ One-click PDF generation
- ✅ Captures entire infographics section
- ✅ Includes header with date
- ✅ Includes footer with organization info
- ✅ High-quality export (2x scale)
- ✅ Auto-named with current date

## Impact Metrics Displayed

1. **Member Countries**: 17
   - Icon: Globe (Blue)
   - Trend: +2 this year

2. **Projects Executed**: 10
   - Icon: Handshake (Green)
   - Trend: +3 this quarter

3. **Trainings Completed**: 15
   - Icon: Chalkboard Teacher (Purple)
   - Trend: +5 this year

4. **Conferences Organized**: 5
   - Icon: Users (Amber)
   - Trend: +2 this year

5. **Youth Empowered**: 500+ (LIVE)
   - Icon: Users (Indigo)
   - Trend: Growing daily
   - Updates in real-time

6. **Partnerships Formed**: 25
   - Icon: Handshake (Pink)
   - Trend: +8 this year

## How It Works

### Real-Time Updates
```javascript
// Simulates real-time data updates
useEffect(() => {
  const interval = setInterval(() => {
    setImpactData(prev => ({
      ...prev,
      youthEmpowered: prev.youthEmpowered + Math.floor(Math.random() * 3)
    }))
  }, 10000) // Updates every 10 seconds
  
  return () => clearInterval(interval)
}, [])
```

### PDF Generation
```javascript
const downloadAsPDF = async () => {
  // 1. Capture infographics as canvas
  const canvas = await html2canvas(infographicsRef.current, {
    scale: 2,
    backgroundColor: '#ffffff'
  })
  
  // 2. Convert to PDF
  const pdf = new jsPDF({
    orientation: 'landscape',
    format: [canvas.width, canvas.height]
  })
  
  // 3. Add image and save
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
  pdf.save(`YANGG-Impact-Report-${date}.pdf`)
}
```

## Customization

### Update Impact Data
Edit the `impactData` state in `MonitorSection.jsx`:

```javascript
const [impactData, setImpactData] = useState({
  memberCountries: 17,
  projectsExecuted: 10,
  trainingsCompleted: 15,
  conferencesOrganized: 5,
  youthEmpowered: 500,
  partnershipsFormed: 25
})
```

### Connect to Real API
Replace the simulated updates with actual API calls:

```javascript
useEffect(() => {
  const fetchImpactData = async () => {
    const response = await fetch('/api/impact-stats')
    const data = await response.json()
    setImpactData(data)
  }
  
  fetchImpactData()
  const interval = setInterval(fetchImpactData, 30000) // Every 30 seconds
  
  return () => clearInterval(interval)
}, [])
```

### Add More Metrics
Add new stats to the `stats` array:

```javascript
{
  icon: <YourIcon className="w-8 h-8" />,
  value: impactData.yourMetric,
  label: "Your Metric Label",
  color: "bg-color-500",
  trend: "+X this period",
  isLive: false // Set to true for live indicator
}
```

## Styling

### Colors Used
- Blue: `bg-blue-500` - Member Countries
- Green: `bg-green-500` - Projects
- Purple: `bg-purple-500` - Trainings
- Amber: `bg-amber-500` - Conferences
- Indigo: `bg-indigo-500` - Youth Empowered
- Pink: `bg-pink-500` - Partnerships

### Card Design
- Border: 2px solid #f0c630 (brand gold)
- Background: Gradient from gray-50 to gray-100
- Hover: Shadow lift effect
- Icons: Circular colored backgrounds

## PDF Output

### Includes:
- Header with "YANGG Impact Dashboard" title
- Current date timestamp
- All 6 impact metrics with icons and values
- Trend indicators
- Footer with organization description
- Website URL

### File Naming:
`YANGG-Impact-Report-YYYY-MM-DD.pdf`

Example: `YANGG-Impact-Report-2026-04-08.pdf`

## Dependencies

### Installed Packages:
```json
{
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.1"
}
```

### Usage:
- `html2canvas`: Captures DOM elements as images
- `jspdf`: Generates PDF documents

## Features

### Visual Indicators
- ✅ Live badge with pulsing red dot
- ✅ Trend arrows showing growth
- ✅ Color-coded metrics
- ✅ Hover effects on cards
- ✅ Responsive grid layout

### User Experience
- ✅ One-click download
- ✅ Loading state during PDF generation
- ✅ Error handling with user feedback
- ✅ Mobile-responsive design
- ✅ Dark mode support

## Future Enhancements

### Potential Additions:
1. **Charts & Graphs**
   - Add line charts for trends
   - Pie charts for distribution
   - Bar charts for comparisons

2. **Time Range Selector**
   - Filter by month/quarter/year
   - Compare different periods
   - Historical data view

3. **Export Options**
   - Export as PNG image
   - Export as Excel/CSV
   - Email report directly

4. **Interactive Features**
   - Click metrics for details
   - Drill-down into specific data
   - Filter by country/region

5. **Admin Dashboard**
   - Update metrics from CMS
   - Schedule automatic reports
   - Set target goals

## Integration with CMS

### Create Impact Stats Table in Supabase:

```sql
CREATE TABLE impact_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_countries INTEGER DEFAULT 17,
  projects_executed INTEGER DEFAULT 10,
  trainings_completed INTEGER DEFAULT 15,
  conferences_organized INTEGER DEFAULT 5,
  youth_empowered INTEGER DEFAULT 500,
  partnerships_formed INTEGER DEFAULT 25,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE impact_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read on impact_stats"
  ON impact_stats FOR SELECT
  USING (true);

-- Allow authenticated update
CREATE POLICY "Allow authenticated update on impact_stats"
  ON impact_stats FOR UPDATE
  TO authenticated
  USING (true);
```

### Fetch from Database:

```javascript
import { supabase } from '../lib/supabase'

useEffect(() => {
  const fetchImpactData = async () => {
    const { data, error } = await supabase
      .from('impact_stats')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()
    
    if (!error && data) {
      setImpactData(data)
    }
  }
  
  fetchImpactData()
}, [])
```

## Summary

Your impact section now features:
- Real-time statistics dashboard
- Professional infographics design
- One-click PDF download
- Live data updates
- Mobile-responsive layout
- Dark mode support
- Ready for API integration

Users can download a professional impact report PDF with current statistics at any time!
