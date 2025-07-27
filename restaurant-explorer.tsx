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
      name: "ベラビスタ イタリアン",
      category: "イタリアン",
      rating: 4.8,
      location: "都心部",
      price: "$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "イタリアン",
      deliveryTime: "25-40分",
      description: "薪窯ピザと手打ちパスタが自慢の本格イタリア料理",
      featured: true,
    },
    {
      id: 2,
      name: "桜寿司バー",
      category: "和食",
      rating: 4.9,
      location: "中央区",
      price: "$$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "和食",
      deliveryTime: "30-40分",
      description: "伝統的な日本の雰囲気で味わう極上の寿司と刺身",
      featured: true,
    },
    {
      id: 3,
      name: "タコ・リブレ",
      category: "メキシカン",
      rating: 4.5,
      location: "西区",
      price: "$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "メキシカン",
      deliveryTime: "20-30分",
      description: "活気あふれるメキシカンストリートフードとクラフトカクテル",
      featured: false,
    },
    {
      id: 4,
      name: "ザ・バーガージョイント",
      category: "アメリカン",
      rating: 4.3,
      location: "都心部",
      price: "$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "アメリカン",
      deliveryTime: "15-25分",
      description: "カジュアルな雰囲気でグルメバーガーとクラフトビール",
      featured: false,
    },
    {
      id: 5,
      name: "スパイスガーデン",
      category: "インド料理",
      rating: 4.6,
      location: "東区",
      price: "$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "インド料理",
      deliveryTime: "35-45分",
      description: "香り豊かなインドカレーとタンドール料理の専門店",
      featured: false,
    },
    {
      id: 6,
      name: "ル・プティ・ビストロ",
      category: "フレンチ",
      rating: 4.7,
      location: "北区",
      price: "$$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "フレンチ",
      deliveryTime: "40-50分",
      description: "親密なビストロの雰囲気で楽しむ本格フランス料理",
      featured: true,
    },
    {
      id: 7,
      name: "龍宮殿",
      category: "中華料理",
      rating: 4.4,
      location: "中華街",
      price: "$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "中華料理",
      deliveryTime: "25-35分",
      description: "伝統的な中華料理と点心の老舗",
      featured: false,
    },
    {
      id: 8,
      name: "地中海の風",
      category: "地中海料理",
      rating: 4.5,
      location: "中央区",
      price: "$$$",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "地中海料理",
      deliveryTime: "30-40分",
      description: "新鮮な地中海の味覚とヘルシーなオプション",
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
      // 検索キーワードフィルター
      if (
        searchTerm &&
        !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !restaurant.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // カテゴリフィルター
      if (selectedCategories.length > 0 && !selectedCategories.includes(restaurant.category)) {
        return false
      }

      // エリアフィルター
      if (selectedLocations.length > 0 && !selectedLocations.includes(restaurant.location)) {
        return false
      }

      // 評価フィルター
      if (minRating && restaurant.rating < Number.parseFloat(minRating)) {
        return false
      }

      // 価格フィルター
      if (priceRange && restaurant.price !== priceRange) {
        return false
      }

      return true
    })
  }, [searchTerm, selectedCategories, selectedLocations, minRating, priceRange])

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-bold">レストラン検索</h1>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="レストラン、料理ジャンル、メニューを検索..."
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
          {/* フィルターサイドバー */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">絞り込み</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    すべてクリア
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* カテゴリフィルター */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">料理ジャンル</Label>
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

                  {/* エリアフィルター */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">エリア</Label>
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

                  {/* 評価フィルター */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">最低評価</Label>
                    <Select value={minRating} onValueChange={setMinRating}>
                      <SelectTrigger>
                        <SelectValue placeholder="評価を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">すべての評価</SelectItem>
                        <SelectItem value="4.0">4.0以上</SelectItem>
                        <SelectItem value="4.5">4.5以上</SelectItem>
                        <SelectItem value="4.8">4.8以上</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* 価格フィルター */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">価格帯</Label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="価格帯を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">すべての価格帯</SelectItem>
                        <SelectItem value="$">$ - リーズナブル</SelectItem>
                        <SelectItem value="$$">$$ - 普通</SelectItem>
                        <SelectItem value="$$$">$$$ - 高級</SelectItem>
                        <SelectItem value="$$$$">$$$$ - 最高級</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* レストラン一覧 */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">レストラン一覧</h2>
                <p className="text-muted-foreground">{filteredRestaurants.length}件のレストランが見つかりました</p>
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
                    {restaurant.featured && <Badge className="absolute top-2 left-2 bg-primary">おすすめ</Badge>}
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
                        <Button size="sm">詳細を見る</Button>
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
                <h3 className="text-lg font-semibold mb-2">レストランが見つかりませんでした</h3>
                <p className="text-muted-foreground mb-4">検索条件を調整するか、フィルターをクリアしてみてください</p>
                <Button onClick={clearFilters}>すべてのフィルターをクリア</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
