import { Component, HostListener, OnDestroy, signal } from '@angular/core';

type Technology = {
  label: string;
  tone: 'amber' | 'sage' | 'ink';
};

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
};

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnDestroy {
  protected readonly linkedinUrl = 'https://www.linkedin.com/in/vinoth-kumar-sangili/';
  protected readonly githubUrl = 'https://github.com/vinothkumar1010';

  protected readonly experiences: Experience[] = [
    {
      company: 'NRG Energy',
      role: 'Web Programmer Analyst III · Senior Frontend Engineer',
      period: 'July 2022 — Present',
      location: 'Houston, Texas',
      summary: 'Architecting and delivering customer-facing platforms for more than two million energy customers.',
      highlights: [
        'Built 50+ reusable React components and Storybook standards for scalable, consistent product delivery.',
        'Developed white-label Next.js experiences shared across multiple Reliant brands while preserving brand-specific journeys.',
        'Led code reviews, frontend standards, mentorship, controlled ConfigCat rollouts, performance work, and AWS delivery.',
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Storybook', 'AWS', 'Jest'],
    },
    {
      company: 'Fidelity Investments',
      role: 'Principal Software Engineer',
      period: 'May 2021 — July 2022',
      location: 'Remote · United States',
      summary: 'Led a four-person squad modernizing Fidelity’s legacy Portfolio Summary experience.',
      highlights: [
        'Owned frontend architecture, technical delivery, requirements, task allocation, code quality, and team mentoring.',
        'Built reusable Angular and Lit components plus Express and GraphQL services used across web and mobile experiences.',
        'Partnered with product, design, mobile, platform, AI, and Adobe teams to deliver personalized portfolio capabilities.',
      ],
      technologies: ['Angular', 'Lit', 'GraphQL', 'Express', 'AWS', 'Nx'],
    },
    {
      company: 'HCL Technologies / HCL America Inc.',
      role: 'Lead Engineer',
      period: 'August 2012 — May 2021',
      location: 'Chennai, India · Houston, Texas',
      summary: 'Led frontend delivery across Reliant Energy customer portals and conversational experiences.',
      highlights: [
        'Built React experiences for AI and Google Home customer journeys using Dialogflow and backend Java services.',
        'Modernized customer profile, billing, energy usage, and product-management experiences with AngularJS and REST APIs.',
        'Helped migrate legacy adaptive interfaces into responsive applications for desktop and mobile customers.',
      ],
      technologies: ['React', 'AngularJS', 'JavaScript', 'Dialogflow', 'Java', 'REST'],
    },
    {
      company: 'Infowave Knowledgeware Pvt Ltd',
      role: 'Programmer',
      period: 'April 2011 — July 2012',
      location: 'Chennai, India',
      summary: 'Developed cloud applications and APIs supporting storage, identity, analytics, and mobile integrations.',
      highlights: [],
      technologies: ['PHP', 'PostgreSQL', 'JavaScript', 'jQuery', 'AJAX', 'AWS'],
    },
    {
      company: 'Grantham',
      role: 'Software Programmer',
      period: 'July 2010 — March 2011',
      location: 'Chennai, India',
      summary: 'Developed healthcare applications for patient records, appointments, access control, and data exchange.',
      highlights: [],
      technologies: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'HTML', 'CSS'],
    },
    {
      company: 'Neemtec Solutions Pvt Ltd',
      role: 'Programmer',
      period: 'October 2009 — July 2010',
      location: 'Thirunelveli, India',
      summary: 'Built e-learning capabilities for profiles, scheduling, matching, ratings, and recommendations.',
      highlights: [],
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    },
  ];

  protected readonly technologies: Technology[] = [
    { label: 'React', tone: 'amber' },
    { label: 'TypeScript', tone: 'ink' },
    { label: 'Angular', tone: 'sage' },
    { label: 'Next.js', tone: 'amber' },
    { label: 'D3', tone: 'ink' },
    { label: 'AWS', tone: 'sage' },
  ];

  protected readonly activeTechnology = signal('React');
  protected readonly menuOpen = signal(false);
  protected readonly stickyNavVisible = signal(false);
  private technologyIndex = 0;
  private rotationTimer?: ReturnType<typeof setInterval>;
  private typingTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    if (
      typeof window !== 'undefined' &&
      (typeof window.matchMedia !== 'function' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      this.rotationTimer = setInterval(() => this.rotateTechnology(), 2800);
    }
  }

  @HostListener('document:pointermove', ['$event'])
  protected handlePointerMove(event: PointerEvent): void {
    if (typeof document === 'undefined' || event.pointerType === 'touch') return;

    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    const root = document.documentElement;
    root.style.setProperty('--pointer-x', `${event.clientX}px`);
    root.style.setProperty('--pointer-y', `${event.clientY}px`);
    root.style.setProperty('--drift-x', `${(x - 0.5) * 24}px`);
    root.style.setProperty('--drift-y', `${(y - 0.5) * 18}px`);
  }

  @HostListener('window:scroll')
  protected handleWindowScroll(): void {
    if (typeof window === 'undefined') return;
    this.stickyNavVisible.set(window.scrollY > window.innerHeight * 0.62);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  private rotateTechnology(): void {
    this.technologyIndex = (this.technologyIndex + 1) % this.technologies.length;
    const target = this.technologies[this.technologyIndex].label;
    let current = this.activeTechnology();

    const typeNextLetter = (index = 0): void => {
      if (index >= target.length) return;
      this.activeTechnology.set(target.slice(0, index + 1));
      this.typingTimer = setTimeout(() => typeNextLetter(index + 1), 95);
    };

    const eraseNextLetter = (): void => {
      if (current.length === 0) {
        this.typingTimer = setTimeout(() => typeNextLetter(), 160);
        return;
      }

      current = current.slice(0, -1);
      this.activeTechnology.set(current);
      this.typingTimer = setTimeout(eraseNextLetter, 45);
    };

    if (this.typingTimer) clearTimeout(this.typingTimer);
    eraseNextLetter();
  }

  ngOnDestroy(): void {
    if (this.rotationTimer) clearInterval(this.rotationTimer);
    if (this.typingTimer) clearTimeout(this.typingTimer);
  }
}
