import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: 'For Clients',
      links: [
        { name: 'Find Freelancers', href: '/freelancers' },
        { name: 'Post Project', href: '/post-project' },
        { name: 'Project Success Stories', href: '/success-stories' },
        { name: 'Enterprise Solutions', href: '/enterprise' },
      ],
    },
    {
      title: 'For Freelancers',
      links: [
        { name: 'Find Work', href: '/find-work' },
        { name: 'Create Profile', href: '/create-profile' },
        { name: 'Success Stories', href: '/freelancer-stories' },
        { name: 'Resources', href: '/resources' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'How it Works', href: '/how-it-works' },
        { name: 'Security', href: '/security' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Trust & Safety', href: '/trust' },
      ],
    },
  ]

  return (
    <footer className="border-t bg-card">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-sm font-semibold tracking-wider text-foreground uppercase">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-8 border-t md:flex-row">
          <div className="flex items-center order-2 space-x-6 md:order-1">
            <span className="text-sm text-muted-foreground">
              {currentYear} Visible. All rights reserved.
            </span>
          </div>

          <div className="flex items-center justify-center space-x-4 order-1 md:order-2">
            <Button variant="ghost" size="icon">
              <Facebook className="w-4 h-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="w-4 h-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
