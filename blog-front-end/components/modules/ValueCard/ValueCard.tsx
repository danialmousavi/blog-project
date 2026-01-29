function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-6 hover:shadow-sm transition">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        {title}
      </h3>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        {text}
      </p>
    </div>
  )
}
export default ValueCard