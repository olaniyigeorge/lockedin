interface iPrice {
    name: string
    price: number
    features: string[]
}

export default function PriceCard(props: iPrice) {
    const {name, price, features } = {...props}
    return (
        <div className="max-w-sm py-8 px-6 flex flex-col justify-between bg-white rounded-lg shadow border-2 hover:border-orange-500">
            <h3 className="text-xl black_green_gradient font-semibold">{name}</h3>
            <span className="w-full justify-center flex items-baseline">
                <p className="mt-2 text-3xl text-black font-extrabold">${price}</p>
                <p className="mt-2 text-2xl text-gray-700 font-medium">/month</p>
            </span>
            
            <ul className="mt-4 text-start">
                {features.map((f, i) => <li key={i}>✔ {f}</li>)}
            </ul>

            <button className="mt-6 px-6 py-3 orange_gradient_bg font-bold text-white rounded-full hover:scale-[105%]">
                Get {name}
            </button>
        </div>
    )
}