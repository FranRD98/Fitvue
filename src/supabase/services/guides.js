import { supabase } from '@/supabase/config'

// Crear guía
export async function createGuide(guideData) {
  const { error } = await supabase
    .from('guides')
    .insert([{ ...guideData }])

  if (error) throw error
}

// Obtener todas las guías
export async function getGuides() {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .order('created_at', { ascending: false }) // Solo si usas campo 'created'

  if (error) {
    console.error('Error al obtener guías:', error)
    return []
  }

  return data
}

// Obtener todas las guías publicadas
export async function getPublishedGuides() {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false }) // Solo si usas campo 'created'

  if (error) {
    console.error('Error al obtener guías:', error)
    return []
  }

  return data
}

// Obtener guía por id
export async function getGuidesById(guideId) {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('id', guideId)
    .single()

  if (error) {
    console.error('Error al obtener la guía:', error)
    return []
  }

  return data
}

// Crear nueva categoría
export async function createCategory(title) {
  const { data, error } = await supabase
    .from('guides_categories')
    .insert([{ title }])
    .select()

  if (error) throw error
  return data?.[0]
}

// Obtener categorías
export async function getCategories() {
  const { data, error } = await supabase
    .from('guides_categories')
    .select('*')

  if (error) {
    console.error('Error al obtener categorías:', error)
    return []
  }

  return data
}

// Obtener categorías publicas
// Obtener categorías que estén en uso por guías publicadas
export async function getPublishedGuideCategoriesInUse() {
  // 1. Obtener guías publicadas con su categoría
  const { data: guides, error: guideError } = await supabase
    .from('guides')
    .select('id_category')
    .eq('published', true)

  if (guideError) {
    console.error('Error al obtener guías publicadas:', guideError)
    return []
  }

  const categoryIds = [...new Set(guides.map(g => g.id_category))] // IDs únicos

  if (categoryIds.length === 0) return []

  // 2. Obtener solo las categorías que están en uso (no importa si están "publicadas" o no)
  const { data: categories, error: catError } = await supabase
    .from('guides_categories')
    .select('*')
    .in('id', categoryIds)

  if (catError) {
    console.error('Error al obtener categorías usadas por guías publicadas:', catError)
    return []
  }

  // 3. Agregar URLs públicas a los iconos
  const categoriesWithIcons = await Promise.all(
    categories.map(async (category) => {
      if (!category.icon_path) {
        category.icon_path = '/icons/default-icon.svg'
        return category
      }

      const { data: imageData, error: imageError } = await supabase
        .storage
        .from('fitvue')
        .getPublicUrl(category.icon_path)

      category.icon_path = imageError
        ? '/icons/default-icon.svg'
        : imageData.publicUrl

      return category
    })
  )

  return categoriesWithIcons
}

// Actualizar guía
export async function updateGuide(id, guideData) {
  const { id: _, created, ...cleanData } = guideData

  // Asegurar que el campo id_category sea numérico
  if (cleanData.id_category && typeof cleanData.id_category === 'string') {
    cleanData.id_category = parseInt(cleanData.id_category)
  }

  const { error } = await supabase
    .from('guides')
    .update(cleanData)
    .eq('id', id)

  if (error) throw error
}


// Eliminar guía
export async function deleteGuide(id) {
  const { error } = await supabase
    .from('guides')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Actualizar el icono
export async function updateGuideCategoryIcon(id, iconPath) {
  const { error } = await supabase
    .from('guides_categories')
    .update({ icon_path: iconPath })
    .eq('id', id)

  if (error) throw error
}