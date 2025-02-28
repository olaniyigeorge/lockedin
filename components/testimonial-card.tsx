


interface iTestimonial {
    index: number
    name: string
    text: string
}

export default function TestimonialCard(props: iTestimonial) {
    const { index, name, text} = props
    return (
      <div key={index} className="max-w-md p-6 bg-gray-100 rounded-lg shadow">
        <p className="text-gray-700">"{text}"</p>
        <h4 className="w-full mt-4 font-semibold float-right">{name}</h4>
      </div>
    )
}