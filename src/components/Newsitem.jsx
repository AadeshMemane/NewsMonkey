import React from 'react'

const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props
  return (
    <div className='my-3'>
      <div className='card' style={{ width: '18rem' }}>
        <img
          src={imageUrl}
          className='card-img-top'
          alt='...'
          style={{ height: '165px' }}
        />
        <div className='card-body'>
          <h5 className='card-title'>
            {title}
            <span
              className='position-absolute top-0 translate-middle badge rounded-pill bg-danger'
              style={{ left: '80%' }}
            >
              {source}{' '}
            </span>
          </h5>
          <p className='card-text'> {description}...</p>
          <a
            href={newsUrl}
            rel='noreferrer'
            target='_blank'
            className='btn btn-dark btn-sm'
          >
            Read More
          </a>
          <p className='card-text'>
            <small className='text-muted'>
              By {!author ? 'unknown author' : author} on{' '}
              {new Date(date).toUTCString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Newsitem
