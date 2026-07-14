import supabase from '../supabase/client'

const BUCKET = 'products'

export async function uploadImage(file) {
  /* obtiene un nombre único */
  //const fileName = `${crypto.randomUUID()}-${file.name}`
  // para evitar caracteres raros y espacios en los nombres
  const extension = file.name.split('.').pop()

  const fileName = `${crypto.randomUUID()}.${extension}`
  /* lo sube al bucket */
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file)
  if (error) { throw error }
  /* obtiene la URL pública */
  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName)

  return data.publicUrl
}

/*export async function deleteImage(imageUrl) {
    console.log('=== deleteImage ===')
  console.log(imageUrl)

  if (!imageUrl) return
  //const fileName = imageUrl.split('/').pop()
  const fileName = new URL(imageUrl).pathname.split('/').pop()

  console.log(fileName)

  const { data, error } = await supabase
          .storage.from(BUCKET).remove([fileName])

  console.log('data:', data)
  console.log('error:', error)

  if (error) { throw error }
}*/

export async function deleteImage(imageUrl) {

  const fileName = decodeURIComponent(
    new URL(imageUrl).pathname.split('/').pop()
  )

  console.log(fileName)

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .remove([fileName])

  console.log(data)
  console.log(error)

  if (error) throw error
}

/*export async function replaceImage(oldUrl, newFile) {
  if (oldUrl) { await deleteImage(oldUrl) }

  return await uploadImage(newFile)
}*/

/*export async function replaceImage(oldUrl, newFile) {
  if (!newFile) { return oldUrl }
  if (oldUrl) { await deleteImage(oldUrl) }
  return await uploadImage(newFile)
}*/
/* para evitar borra la imagen antigua en caso de que falle la
    subida de la nueva */
export async function replaceImage(oldUrl, newFile) {
  if (!newFile) { return oldUrl }
  const newUrl = await uploadImage(newFile)
  if (oldUrl) { await deleteImage(oldUrl) }
  return newUrl
}