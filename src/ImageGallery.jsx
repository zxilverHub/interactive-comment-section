import React from 'react'
import jul from './images/avatars/image-juliusomo.png'
import amy from './images/avatars/image-amyrobson.png'
import ram from './images/avatars/image-ramsesmiron.png'
import max from './images/avatars/image-maxblagun.png'
import dave from './images/avatars/silverdave.png'

function ImageGallery({ username }) {
    switch(username){
        case 'juliusomo':
            return <img src={ jul } alt="Avatar" className='comment-avatar' />
        case 'amyrobson':
            return <img src={ amy } alt='Avatar' className='comment-avatar' />
        case 'maxblagun':
            return <img src={ max } alt="Avatar" className='comment-avatar' />
        case 'ramsesmiron':
            return <img src={ ram } alt="Avatar" className='comment-avatar' />
        case 'silverdave':
            return <img src={ dave } alt="Avatar" className='comment-avatar dave' />
        default:
            return <img alt='Avatar' />
    }
}

export default ImageGallery