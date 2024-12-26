import { Search, SlidersHorizontal, X, Map } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from "@/components/ui/label"
import { SearchResults } from './SearchResults'
import { searchServices } from '@/services/search'
import { serviceCategories } from '@/data/categories'
import { Service } from '@/types/service'
import { useState, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/contexts/language-context'

interface FilterState {
  categories: string[]
  skills: string[]
  location: string
  budget: string
  availability: string
  experience: string
}

const initialFilterState: FilterState = {
  categories: [],
  skills: [],
  location: '',
  budget: '',
  availability: '',
  experience: ''
}

const locations = [
  'Algiers',
  'Oran',
  'Constantine',
  'Annaba',
  'Blida',
  'Setif',
  'Batna',
  'Djelfa',
  'Sidi Bel Abbes',
  'Biskra'
]

const experienceLevels = [
  { value: 'entry', label: '1-3 years' },
  { value: 'intermediate', label: '4-7 years' },
  { value: 'expert', label: '8+ years' }
]

const availabilityOptions = [
  { value: 'immediate', label: 'Immediate' },
  { value: 'today', label: 'Today' },
  { value: 'this_week', label: 'This Week' },
  { value: 'next_week', label: 'Next Week' }
]

export function SearchSection() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Service[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)
  const searchTimeout = useRef<NodeJS.Timeout>()

  const resetFilters = useCallback(() => {
    setFilters(initialFilterState)
  }, [])

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const toggleArrayFilter = useCallback(<K extends 'categories' | 'skills'>(
    key: K,
    value: string
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }))
  }, [])

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim() && filters.categories.length === 0) return

    setIsSearching(true)
    setHasSearched(true)
    try {
      const results = await searchServices(searchQuery, filters)
      setSearchResults(results.services)
      setTotalResults(results.total)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }, [searchQuery, filters])

  const activeFiltersCount = filters.categories.length + 
    filters.skills.length + 
    (filters.location ? 1 : 0) + 
    (filters.budget ? 1 : 0) + 
    (filters.availability ? 1 : 0) + 
    (filters.experience ? 1 : 0)

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Search Container */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="flex flex-col sm:flex-row p-2 gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('search.input.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="w-full pl-9 pr-20 h-11 bg-background"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSearchResults([])
                  setHasSearched(false)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-foreground text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:border-l sm:pl-2">
            <Button 
              variant="outline"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Map className="h-4 w-4" />
            </Button>

            <Button 
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(true)}
              className="hidden sm:inline-flex"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            <Button 
              onClick={handleSearch}
              className="flex-1 sm:flex-none gap-2"
              size="lg"
            >
              <Search className="h-4 w-4" />
              <span>{t('search.buttons.search')}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="sm:hidden flex gap-2 p-2 border-t">
          <Button 
            variant="outline"
            className="flex-1 gap-2"
          >
            <Map className="h-4 w-4" />
            <span>{t('search.buttons.viewmap')}</span>
          </Button>

          <Button 
            variant="outline"
            onClick={() => setShowFilters(true)}
            className="flex-1 gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>{t('search.buttons.filters')}</span>
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {category}
              <button
                onClick={() => toggleArrayFilter('categories', category)}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.location && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {filters.location}
              <button
                onClick={() => updateFilter('location', '')}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.budget && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {filters.budget === 'low' ? 'Under 2000 DA' :
               filters.budget === 'mid' ? '2000 - 5000 DA' :
               'Above 5000 DA'}
              <button
                onClick={() => updateFilter('budget', '')}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.availability && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {filters.availability}
              <button 
                onClick={() => updateFilter('availability', '')}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.experience && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {filters.experience}
              <button 
                onClick={() => updateFilter('experience', '')}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Search Results */}
      {hasSearched && (
        <div className="mt-8">
          <SearchResults
            results={searchResults}
            isLoading={isSearching}
            total={totalResults}
          />
        </div>
      )}

      {/* Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{t('search.filters.title')}</SheetTitle>
          </SheetHeader>
          
          <Accordion type="single" collapsible className="w-full">
            {/* Categories */}
            <AccordionItem value="categories">
              <AccordionTrigger>{t('search.filters.categories.title')}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {serviceCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={() => toggleArrayFilter('categories', category.id)}
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.translations[language]}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Budget */}
            <AccordionItem value="budget">
              <AccordionTrigger>{t('search.filters.budget.title')}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <RadioGroup
                    value={filters.budget}
                    onValueChange={(value) => updateFilter('budget', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="budget-low" />
                      <Label htmlFor="budget-low">{t('search.filters.budget.under')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mid" id="budget-mid" />
                      <Label htmlFor="budget-mid">{t('search.filters.budget.between')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="budget-high" />
                      <Label htmlFor="budget-high">{t('search.filters.budget.above')}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Experience Level */}
            <AccordionItem value="experience">
              <AccordionTrigger>{t('search.filters.experience.title')}</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={filters.experience}
                  onValueChange={(value) => updateFilter('experience', value)}
                >
                  {experienceLevels.map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={`exp-${value}`} />
                      <Label htmlFor={`exp-${value}`}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            {/* Availability */}
            <AccordionItem value="availability">
              <AccordionTrigger>{t('search.filters.availability.title')}</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={filters.availability}
                  onValueChange={(value) => updateFilter('availability', value)}
                >
                  {availabilityOptions.map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={`avail-${value}`} />
                      <Label htmlFor={`avail-${value}`}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={resetFilters}>
                {t('search.filters.buttons.reset')}
              </Button>
              <Button onClick={() => {
                setShowFilters(false)
                handleSearch()
              }}>
                {t('search.filters.buttons.show')}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
