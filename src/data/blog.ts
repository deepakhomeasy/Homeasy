// src/data/blog.ts
import { BlogPost, BlogCategory } from '../types';

export const blogCategories: BlogCategory[] = [
  { id: 'automation', name: 'Automation', icon: '⚙️' },
  { id: 'security', name: 'Security', icon: '🔒' },
  { id: 'energy', name: 'Energy Saving', icon: '⚡' },
  { id: 'installation', name: 'Installation', icon: '🔧' },
  { id: 'trends', name: 'Trends', icon: '📈' },
  { id: 'guides', name: 'Guides', icon: '📖' },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Smart Home Automation in India 2024',
    slug: 'ultimate-guide-smart-home-automation-india-2024',
    category: 'guides',
    excerpt: 'Learn everything you need to know about setting up a smart home in India, from planning to installation and maintenance.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    content: `## Introduction to Smart Home Automation

Smart home automation has revolutionized the way we live. From controlling lights with your voice to managing security from anywhere in the world, the possibilities are endless.

## Benefits of Smart Home Automation

### Energy Efficiency
Smart thermostats and lighting systems can reduce your energy consumption by up to 30%. Automated scheduling ensures you're not wasting power on empty rooms.

### Enhanced Security
Real-time monitoring, smart locks, and automated alerts give you peace of mind whether you're at home or away.

- Monitor CCTV feeds remotely
- Receive instant notifications of suspicious activity
- Control door locks from your smartphone
- Schedule lights to simulate occupancy when away

### Convenience & Comfort
Control everything from a single app or voice command. Adjust temperature, lighting, and entertainment systems with ease.

## Getting Started with Smart Home Automation

### Step 1: Assess Your Needs
Determine which aspects of your home you want to automate first. Start with security and lighting, then expand.

### Step 2: Choose the Right Platform
Select a system that offers local control (works without internet) and is Indian power grid compatible.

### Step 3: Professional Installation
Work with certified installers to ensure proper setup and integration of all devices.

## Conclusion

Smart home automation is no longer a luxury—it's a practical investment in your home's efficiency, security, and comfort.`,
    author: 'Rahul Sharma',
    authorBio: 'Smart home expert with 8+ years in IoT automation.',
    publishedAt: new Date('2024-01-15').toISOString(),
    readTime: 12,
    views: 5240,
    likes: 342,
    tags: ['Smart Home', 'Automation', 'Guide', 'Installation'],
  },
  {
    id: '2',
    title: '10 Ways Smart Lighting Reduces Electricity Bills by 40%',
    slug: 'smart-lighting-reduces-electricity-bills',
    category: 'energy',
    excerpt: 'Discover how smart lighting systems can dramatically reduce your electricity costs while improving home ambiance.',
    image: 'https://images.unsplash.com/photo-1585773980519-dd1f609ca894?w=800&h=400&fit=crop',
    content: `## Energy Crisis: Why Smart Lighting Matters

Traditional lighting accounts for 15-20% of home electricity bills. Smart lighting can cut this in half through intelligent automation and efficiency.

## 10 Ways to Save with Smart Lighting

### 1. Automated Scheduling
Program lights to turn off automatically when no motion is detected. Reduce standby power consumption.

### 2. Brightness Optimization
Adjust lighting based on natural daylight, reducing reliance on artificial lights during the day.

- Morning: 80% brightness for energy boost
- Afternoon: Minimal artificial light (use daylight)
- Evening: Warm 2700K for relaxation

### 3. Occupancy Sensors
Lights turn off instantly when a room is empty—no more forgotten lights burning energy.

### 4. Smart Scheduling
Set different lighting profiles for weekdays vs. weekends, matching your actual usage patterns.

### 5. Color Temperature Adjustment
Cooler lights (5000K) boost alertness; warm lights (2700K) prepare for sleep—improving natural sleep cycles.

## Real-World Results

Users report saving ₹2,000-5,000 annually on lighting alone, with faster ROI during summer months.

## Implementation Strategy

Start with high-traffic areas (living room, kitchen) for maximum impact. Expand gradually to bedrooms and hallways.`,
    author: 'Priya Menon',
    authorBio: 'Energy efficiency consultant specializing in residential IoT.',
    publishedAt: new Date('2024-01-10').toISOString(),
    readTime: 8,
    views: 3890,
    likes: 267,
    tags: ['Energy Saving', 'Lighting', 'Cost Reduction', 'Tips'],
  },
  {
    id: '3',
    title: 'Smart Security Systems: Protecting Your Home While You Travel',
    slug: 'smart-security-systems-protect-home-travel',
    category: 'security',
    excerpt: 'Complete guide to securing your home with smart locks, CCTV, and automated alerts while you\'re away.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop',
    content: `## Security at Your Fingertips

Peace of mind while traveling means real-time monitoring of your home from anywhere in the world.

## Essential Smart Security Components

### Smart Door Locks
- Biometric access (fingerprint)
- PIN-based entry for guests
- Time-limited access codes
- Audit logs of all entries

### CCTV Systems with AI
Modern CCTV goes beyond recording—AI detects unusual behavior and alerts you instantly.

### Motion Sensors
Detect intrusions and trigger automatic alerts, lights, and siren systems.

## Implementation Checklist

- Install smart locks on main entrances
- Set up 4K CCTV with night vision
- Configure motion sensors in vulnerable areas
- Enable two-factor authentication on all accounts
- Create guest access profiles with time limits
- Set up automated alerts on your phone

## Conclusion

A comprehensive smart security system costs less than traditional burglar alarms but offers infinitely better coverage and control.`,
    author: 'Arjun Verma',
    authorBio: 'Security systems integrator with 12+ years experience.',
    publishedAt: new Date('2024-01-05').toISOString(),
    readTime: 10,
    views: 4120,
    likes: 312,
    tags: ['Security', 'Smart Locks', 'CCTV', 'Travel'],
  },
  {
    id: '4',
    title: 'Why Local Control Matters: The Future of Smart Homes',
    slug: 'local-control-future-smart-homes',
    category: 'trends',
    excerpt: 'Understand why offline-first smart home systems are becoming the gold standard for security and reliability.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
    content: `## The Cloud vs. Local Control Debate

Cloud-dependent systems are vulnerable to outages and privacy breaches. Local control is the future.

## Benefits of Local Control

### 1. Zero Latency
Commands execute instantly—no waiting for cloud servers.

### 2. Privacy First
Your data never leaves your home. Complete control over who accesses what information.

### 3. Offline Reliability
When internet goes down, your smart home still works perfectly.

### 4. Faster Response Times
Security systems activate within milliseconds, not seconds.

## The Homeasy Advantage

Our Elite Hub processes all commands locally while maintaining secure cloud backup for remote access.

## Why This Matters

In India's variable internet environment, local control isn't a luxury—it's essential.`,
    author: 'Vikram Singh',
    authorBio: 'IoT architect focusing on edge computing and local networks.',
    publishedAt: new Date('2023-12-28').toISOString(),
    readTime: 7,
    views: 2890,
    likes: 198,
    tags: ['Technology', 'Local Control', 'Privacy', 'Trends'],
  },
  {
    id: '5',
    title: 'Indian Power Grids & Smart Homes: Handling 180V-280V Fluctuations',
    slug: 'indian-power-grids-smart-homes-voltage',
    category: 'installation',
    excerpt: 'How to design smart home systems that thrive in India\'s challenging power environment.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=400&fit=crop',
    content: `## The Indian Power Challenge

Voltage fluctuations between 180V-280V are common in India, destroying unprotected electronics regularly.

## Smart Home Solutions for Indian Conditions

### Surge Protection
Multi-layer protection with physical capacitors, not just MOVs (metal oxide varistors).

### Voltage Stabilization
Built-in stabilizers automatically adjust to supply voltage fluctuations.

### Generator Compatibility
Seamless switching between mains and generator without device resets.

## Homeasy's Approach

Our hardware includes:
- 180V-280V rated components
- Physical capacitor banks for energy buffering
- Automatic surge detection and isolation
- Generator transition logic

## Why Regular Smart Homes Fail in India

Most imported smart home devices expect stable 220V ±5% environments. They fail spectacularly in Indian conditions.

## Implementation

Work with certified installers who understand local electrical standards and can properly ground and stabilize systems.`,
    author: 'Dr. Rajesh Kumar',
    authorBio: 'Electrical engineer specializing in power systems for IoT.',
    publishedAt: new Date('2023-12-20').toISOString(),
    readTime: 9,
    views: 3450,
    likes: 254,
    tags: ['Installation', 'Power', 'Hardware', 'India'],
  },
  {
    id: '6',
    title: 'DIY Smart Home: What You Can Install Yourself vs. When to Hire Professionals',
    slug: 'diy-smart-home-professional-installation',
    category: 'installation',
    excerpt: 'Know which smart home components you can safely install yourself and which require professional expertise.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=400&fit=crop',
    content: `## DIY vs. Professional: Making the Right Choice

Not all smart home installations are created equal. Some require expertise; others are straightforward.

## Safe DIY Installations

### Smart Plugs
Just plug and pair—zero complexity.

### Wireless Sensors
Motion, temperature, humidity sensors are wireless and battery-powered.

### Voice Speakers
Unbox, connect to WiFi, and start using.

## Requires Professional Installation

### Wired Smart Switches
Involves electrical wiring—risk of shock or fire if done incorrectly.

### Smart Curtain Motors
Requires structural assessment and wall mounting expertise.

### Central Hub Integration
Coordinating multiple systems requires network knowledge.

## Cost-Benefit Analysis

DIY saves labor costs but risks equipment damage. Professional installation costs ₹10,000-30,000 but ensures warranty and safety.

## Recommendation

Start with DIY wireless sensors, then hire professionals for integrated systems and wired components.`,
    author: 'Anjali Desai',
    authorBio: 'Smart home consultant and professional installer.',
    publishedAt: new Date('2023-12-15').toISOString(),
    readTime: 8,
    views: 2650,
    likes: 189,
    tags: ['Installation', 'DIY', 'Tips', 'Safety'],
  },
];