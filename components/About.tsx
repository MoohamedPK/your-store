import React from 'react'

const About = () => {
  return (
    <section className='h-[60dvh] flex flex-col justify-center items-center space-y-6'>
        <div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight mb-4 text-center px-3'>Modern Finds, Timeless Taste — Shop with Intention</h1>
        </div>

        <div>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto tracking-wide text-center'>Explore a curated collection where quality meets style. Discover essential pieces designed for your everyday life, built to last beyond the season.</p>
        </div>
    </section>
  )
}

export default About