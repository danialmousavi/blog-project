'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import Image from 'next/image'

const banners = [
  '/banners/banner-1.jpg',
  '/banners/banner-2.jpg',
  '/banners/banner-3.jpg',
]

export default function BannerSlider() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="rounded-2xl overflow-hidden"
      >
        {banners.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[220px] md:h-[340px]">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* overlay خیلی ملایم */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
