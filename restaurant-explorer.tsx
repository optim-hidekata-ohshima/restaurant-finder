"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { MapPin, Search, Star, Clock, DollarSign } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"

export default function Component() {
  const restaurants = [
    {
      id: 1,
      name: "Bella Vista Italian",
      category: "Italian",
      rating: 4.8,
      location: "Downtown",
      price: "$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Italian",
      deliveryTime: "25-35 min",
      description: "Authentic Italian cuisine with fresh pasta and wood-fired pizza",
      featured: true,
    },
    {
      id: 2,
      name: "Sakura Sushi Bar",
      category: "Japanese",
      rating: 4.9,
      location: "Midtown",
      price: "$$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Japanese",
      deliveryTime: "30-40 min",
      description: "Premium sushi and sashimi with traditional Japanese ambiance",
      featured: true,
    },
    {
      id: 3,
      name: "Taco Libre",
      category: "Mexican",
      rating: 4.5,
      location: "Westside",
      price: "$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Mexican",
      deliveryTime: "20-30 min",
      description: "Vibrant Mexican street food and craft cocktails",
      featured: false,
    },
    {
      id: 4,
      name: "The Burger Joint",
      category: "American",
      rating: 4.3,
      location: "Downtown",
      price: "$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "American",
      deliveryTime: "15-25 min",
      description: "Gourmet burgers and craft beer in a casual setting",
      featured: false,
    },
    {
      id: 5,
      name: "Spice Garden",
      category: "Indian",
      rating: 4.6,
      location: "Eastside",
      price: "$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Indian",
      deliveryTime: "35-45 min",
      description: "Aromatic Indian curries and tandoor specialties",
      featured: false,
    },
    {
      id: 6,
      name: "Le Petit Bistro",
      category: "French",
      rating: 4.7,
      location: "Uptown",
      price: "$$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "French",
      deliveryTime: "40-50 min",
      description: "Classic French cuisine in an intimate bistro setting",
      featured: true,
    },
    {
      id: 7,
      name: "Dragon Palace",
      category: "Chinese",
      rating: 4.4,
      location: "Chinatown",
      price: "$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Chinese",
      deliveryTime: "25-35 min",
      description: "Traditional Chinese dishes and dim sum",
      featured: false,
    },
    {
      id: 8,
      name: "Mediterranean Breeze",
      category: "Mediterranean",
      rating: 4.5,
      location: "Midtown",
      price: "$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Mediterranean",
      deliveryTime: "30-40 min",
      description: "Fresh Mediterranean flavors with healthy options",
      featured: false,
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [minRating, setMinRating] = useState("")
  const [priceRange, setPriceRange] = useState("")

  const categories = [...new Set(restaurants.map((r) => r.category))]
  const locations = [...new Set(restaurants.map((r) => r.location))]

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleLocationChange = (location, checked) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location])
    } else {
      setSelectedLocations(selectedLocations.filter((l) => l !== location))
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedLocations([])
    setMinRating("")
    setPriceRange("")
  }

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      // Search term filter
      if (
        searchTerm &&
        !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !restaurant.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(restaurant.category)) {
        return false
      }

      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(restaurant.location)) {
        return false
      }

      // Rating filter
      if (minRating && restaurant.rating < Number.parseFloat(minRating)) {
        return false
      }

      // Price filter
      if (priceRange && restaurant.price !== priceRange) {
        return false
      }

      return true
    })
  }, [searchTerm, selectedCategories, selectedLocations, minRating, priceRange])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-bold">RestaurantFinder</h1>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search restaurants, cuisines, or dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Category</Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                          />
                          <Label htmlFor={category} className="text-sm font-normal">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Location Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Location</Label>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={location}
                            checked={selectedLocations.includes(location)}
                            onCheckedChange={(checked) => handleLocationChange(location, checked)}
                          />
                          <Label htmlFor={location} className="text-sm font-normal">
                            {location}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Rating Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
                    <Select value={minRating} onValueChange={setMinRating}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any rating</SelectItem>
                        <SelectItem value="4.0">4.0+ stars</SelectItem>
                        <SelectItem value="4.5">4.5+ stars</SelectItem>
                        <SelectItem value="4.8">4.8+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Price Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any price</SelectItem>
                        <SelectItem value="$">$ - Budget friendly</SelectItem>
                        <SelectItem value="$$">$$ - Moderate</SelectItem>
                        <SelectItem value="$$$">$$$ - Expensive</SelectItem>
                        <SelectItem value="$$$$">$$$$ - Very expensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Restaurant Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Restaurants</h2>
                <p className="text-muted-foreground">
                  {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    {restaurant.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg leading-tight">{restaurant.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{restaurant.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{restaurant.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{restaurant.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{restaurant.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Badge variant="secondary" className="text-xs">
                          {restaurant.category}
                        </Badge>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or clearing some filters
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
