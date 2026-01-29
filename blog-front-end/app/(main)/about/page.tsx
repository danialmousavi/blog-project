import TeamCard from '@/components/modules/TeamCard/TeamCard'
import ValueCard from '@/components/modules/ValueCard/ValueCard'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="mb-20 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            درباره ما
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            ما یک وبلاگ تخصصی در حوزه برنامه‌نویسی و توسعه وب هستیم که با هدف
            اشتراک دانش، تجربه و محتوای باکیفیت شکل گرفته‌ایم. تمرکز ما روی
            تکنولوژی‌های مدرن و کاربردی است.
          </p>
        </div>

        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/images/fifith.avif"
            alt="About us"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Mission */}
      <section className="mb-20">
        <h2 className="section-title">ماموریت ما</h2>
        <p className="section-text">
          ماموریت ما تولید محتوایی ساده، کاربردی و به‌روز است که به توسعه‌دهندگان
          کمک کند مهارت‌های خود را ارتقا دهند و تصمیم‌های فنی بهتری بگیرند.
        </p>
      </section>

      {/* Values */}
      <section className="mb-20">
        <h2 className="section-title">ارزش‌های ما</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ValueCard
            title="کیفیت محتوا"
            text="هر مقاله با دقت، تحقیق و تجربه عملی نوشته می‌شود."
          />
          <ValueCard
            title="سادگی"
            text="پیچیده‌ترین مفاهیم را به ساده‌ترین شکل توضیح می‌دهیم."
          />
          <ValueCard
            title="یادگیری مداوم"
            text="همیشه در حال یادگیری و به‌روز ماندن هستیم."
          />
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="section-title">تیم ما</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <TeamCard
            name="ماری"
            role="content Creator"
            image="/images/first.avif"
          />
          <TeamCard
            name="دانیال"
            role="forntend Developer"
            image="/images/second.avif"
          />
          <TeamCard
            name="نیما"
            role="UI Designer"
            image="/images/forth.webp"
          />
        </div>
      </section>
    </main>
  )
}
