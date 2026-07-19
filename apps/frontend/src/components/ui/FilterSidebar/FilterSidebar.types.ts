export interface CategoryItem {
  id: string
  name: string
  count: number
}

export interface FilterSidebarProps {
  categories: CategoryItem[]
  selectedId: string
  onSelect: (id: string) => void
  className?: string
  label?: string
}
