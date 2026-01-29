import Image from "next/image"

function TeamCard({
  name,
  role,
  image,
}: {
  name: string
  role: string
  image: string
}) {
  return (
    <div className="text-center">
      <div className="relative mx-auto mb-4 h-40 w-40 rounded-full overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  )
}
export default TeamCard