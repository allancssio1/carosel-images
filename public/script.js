const buttonLink = document.querySelector('#link-edit')
const userId = document.querySelector('#userId')
const containerImage = document.querySelector('#items')

if(buttonLink){

  buttonLink.addEventListener('click', event => {
    location.href = `/user/${userId.value}/edit`
  })
}

if(containerImage){

containerImage.addEventListener('wheel', event => {
    if(event.deltaY > 0) {
      event.target.scrollBy(300, 0)
    } else {
      event.target.scrollBy(-300, 0)
    }
  })
}

const removeOldPhoto = (event) => {
  const photoContainer = event.target.parentNode
  
  if(photoContainer.id) {
    const remoedPhotos = document.querySelector('input[name="removed_images"]')
    
    if(remoedPhotos) {
      remoedPhotos.value += `${photoContainer.id},`
    }
  }

  photoContainer.remove()
}