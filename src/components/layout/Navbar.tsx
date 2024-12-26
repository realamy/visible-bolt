import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useNavigation } from '@/contexts/navigation-context'
import { cn } from '@/lib/utils'
import { LogoWithEyeIteration } from "@/components/Logo/Logo"
import { useTranslation } from "react-i18next"
import { 
  Search, 
  LogIn, 
  UserPlus, 
  User, 
  Settings, 
  Briefcase, 
  LogOut,
  Mail,
  Command,
  UserCircle
} from 'lucide-react'
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { LayoutDashboard, MessageSquare, HelpCircle, MessageCircle } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { LanguageCode } from '@/data/categories'

const UserDropdownContent = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth()
  const { language, setLanguage } = useLanguage();

  // Available languages
  const languages = [
    { code: 'en' as LanguageCode, name: 'English' },
    { code: 'fr' as LanguageCode, name: 'Français' },
    { code: 'ar' as LanguageCode, name: 'العربية', dir: 'rtl' }
  ];

  return (
    <DropdownMenuContent 
      align="end" 
      side="bottom"
      sideOffset={8}
      className="w-[320px] p-0 space-y-1 data-[side=bottom]:translate-x-0"
    >
      {/* User Profile Section */}
      <div className="p-3">
        <div className="">
          <DropdownMenuItem className="bg-transparent hover:transparent flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {isAuthenticated ? (
              <Avatar className="h-11 w-11">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                <UserCircle className="w-7 h-7 text-primary" />
              </div>
            )}
            <div className="ml-3 overflow-hidden">
              <p className="text-[15px] font-medium leading-none truncate">
                {user?.name || t('nav.guest')}
              </p>
              <p className="text-sm text-muted-foreground truncate mt-1.5">
                {user?.email || t('nav.signintoaccess')}
              </p>
            </div>
          </DropdownMenuItem>
        </div>
      </div>

      <DropdownMenuSeparator className="my-1" />

      {/* Main Menu Items */}
      <div className="px-2 py-1.5 space-y-0.5">
        {user ? (
          <>
            <DropdownMenuItem asChild className="p-0">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-3 px-3 py-2.5 w-full cursor-pointer"
              >
                <LayoutDashboard className="h-[18px] w-[18px]" />
                <span className="text-[15px]">{t('nav.dashboard')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <Link 
                to="/messages" 
                className="flex items-center gap-3 px-3 py-2.5 w-full cursor-pointer"
              >
                <MessageSquare className="h-[18px] w-[18px]" />
                <span className="text-[15px]">{t('nav.messages')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <Link 
                to="/settings" 
                className="flex items-center gap-3 px-3 py-2.5 w-full cursor-pointer"
              >
                <Settings className="h-[18px] w-[18px]" />
                <span className="text-[15px]">{t('nav.settings')}</span>
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild className="p-0">
              <Link 
                to="/signin" 
                className="flex items-center gap-3 px-3 py-2.5 w-full cursor-pointer"
              >
                <LogIn className="h-[18px] w-[18px]" />
                <span className="text-[15px]">{t('nav.signin')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <Link 
                to="/signup" 
                className="flex items-center gap-3 px-3 py-2.5 w-full cursor-pointer"
              >
                <UserPlus className="h-[18px] w-[18px]" />
                <span className="text-[15px]">{t('nav.signup')}</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </div>

      <DropdownMenuSeparator className="my-1" />

      {/* Language Switcher */}
      <div className="px-3 py-2">
        <p className="text-sm font-medium text-muted-foreground mb-2">{t('menu.language.title')}</p>
        <div className="grid grid-cols-3 gap-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                language === lang.code && "bg-primary text-primary-foreground"
              )}
              onClick={() => setLanguage(lang.code)}
            >
              <span className="text-[13px]">{lang.name}</span>
            </Button>
          ))}
        </div>
      </div>
      <DropdownMenuSeparator className="my-1" />

      {/* Footer Menu Items */}
      <div className="px-2 py-1.5 space-y-0.5">
        <DropdownMenuItem asChild className="p-0">
          <Link 
            to="/help" 
            className="flex items-center gap-3 px-3 py-2.5 w-full cursor-pointer"
          >
            <HelpCircle className="h-[18px] w-[18px]" />
            <span className="text-[15px]">{t('nav.helpandsupport')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="p-0">
          <Link 
            to="/feedback" 
            className="flex items-center gap-3 px-3 py-2.5 w-full cursor-pointer"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
            <span className="text-[15px]">{t('nav.feedback')}</span>
          </Link>
        </DropdownMenuItem>
        {user && (
          <DropdownMenuItem 
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer text-red-600 dark:text-red-400 hover:!text-red-700 dark:hover:!text-red-300"
            onClick={logout}
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span className="text-[15px]">{t('nav.signout')}</span>
          </DropdownMenuItem>
        )}
      </div>
    </DropdownMenuContent>
  );
};

const SearchDialog = () => {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{t('nav.searchdialog.title')}</DialogTitle>
        <DialogDescription>
          {t('nav.searchdialog.description')}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder={t('nav.searchdialog.placeholder')} 
          />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
        {/* Categories */}
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(t('nav.searchDialog.categories', { returnObjects: true })).map(([key, label]) => (
            <Button key={key} variant="outline" className="justify-start">
              {label}
            </Button>
          ))}
        </div>
        {/* Results or Trending */}
        {query ? (
          <div className="space-y-4">
            {/* Add search results here */}
            <p className="text-sm text-muted-foreground">{t('nav.searchdialog.noresults')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">{t('nav.searchdialog.trending')}</h4>
              {/* Add trending searches */}
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">{t('nav.searchdialog.recent')}</h4>
              {/* Add recent searches */}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  )
}

const Navbar = () => {
  const { isMobileMenuOpen } = useNavigation()
  const { isAuthenticated, user, login } = useAuth()
  const { t } = useTranslation()

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      isMobileMenuOpen ? "hidden md:block" : "block"
    )}>
      <div className="container flex h-16 items-center overflow-visible">
        {/* Logo and Mobile Nav */}
        <div className="flex items-center flex-1 md:flex-initial">
          <LogoWithEyeIteration />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex mx-6 flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/discover" 
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      "hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      "active:scale-[0.98] active:transition-none"
                    )}
                  >
                    {t('nav.discover')}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/services" 
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      "hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      "active:scale-[0.98] active:transition-none"
                    )}
                  >
                    {t('nav.services')}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/freelancers" 
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      "hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      "active:scale-[0.98] active:transition-none"
                    )}
                  >
                    {t('professionals')}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Authenticated-only Links */}
              {isAuthenticated && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link 
                        to="/dashboard" 
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                          "hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          "active:scale-[0.98] active:transition-none"
                        )}
                      >
                        {t('nav.dashboard')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link 
                        to="/my-projects" 
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                          "hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          "active:scale-[0.98] active:transition-none"
                        )}
                      >
                        {t('nav.myprojects')}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link 
                        to="/messages" 
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors relative",
                          "hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          "active:scale-[0.98] active:transition-none"
                        )}
                      >
                        {t('nav.messages')}
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search Bar */}
          {/* Auth Buttons */}
          {isAuthenticated ? (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-[180px] xl:w-[250px] justify-start text-muted-foreground hover:bg-muted transition-colors truncate"
                  >
                    <Search className="h-4 w-4 min-w-[16px] mr-2" />
                    <span className="hidden xl:inline-block truncate">{t('nav.searchplaceholder')}</span>
                    <span className="xl:hidden">{t('nav.search')}</span>
                    <span className="hidden xl:inline-flex ml-auto text-xs text-muted-foreground/50">⌘K</span>
                  </Button>
                </DialogTrigger>
                <SearchDialog />
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative h-10 w-10 rounded-full ring-offset-background transition-colors hover:bg-muted"
                  >
                    {isAuthenticated ? (
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                        <UserCircle className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                    <span className="sr-only">{t('nav.usermenu')}</span>
                  </Button>
                </DropdownMenuTrigger>
                <UserDropdownContent />
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="hover:bg-muted transition-colors whitespace-nowrap"
                onClick={()=>login('', '')}
              >
                {t('nav.signin')}
              </Button>
              <Link 
                to="/signup" 
                className="hidden md:inline-flex h-10 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">{t('nav.getstarted')}</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2 ml-auto relative">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="hover:bg-muted transition-colors rounded-full"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">{t('nav.search')}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('nav.search')}</DialogTitle>
                <DialogDescription>
                  {t('nav.searchdescription')}
                </DialogDescription>
              </DialogHeader>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  type="text"
                  placeholder={t('nav.searchplaceholder')} 
                />
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full ring-offset-background transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:bg-muted"
              >
                {isAuthenticated ? (
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                    <UserCircle className="w-6 h-6 text-primary" />
                  </div>
                )}
                <span className="sr-only">{t('nav.usermenu')}</span>
              </Button>
            </DropdownMenuTrigger>
            <UserDropdownContent />
          </DropdownMenu>

          {!isAuthenticated && (
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              <Link to="/signup" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">{t('nav.getstarted')}</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
