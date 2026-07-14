import supabase from '../supabase/client'

export async function uploadImage(file) {
    /* obtiene un nombre único */
  const fileName = `${crypto.randomUUID()}-${file.name}`

  /* lo sube al bucket */
  const { error } = await supabase.storage
    .from('products')
    .upload(fileName, file)

  if (error) { throw error }

  /* obtiene la URL pública */
  const { data } = supabase.storage
    .from('products')
    .getPublicUrl(fileName)

  return data.publicUrl
}