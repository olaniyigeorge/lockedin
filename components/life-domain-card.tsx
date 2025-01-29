import Link from "next/link";


// TODO Update iLifeDomain to include owner's id
export interface iLifeDomain{
    _id: string;
    name: string;
    description: string;
}




export default function LifeDomainCard(lfd: iLifeDomain) {


    return (
        <div className=" w-full h-full flex flex-col flex-1 shadow shadow-slate-300 bg-slate-100 p-2  hover:border-purple-500 rounded-lg">
            <h1 className="font-medium hover:text-green-600  w-fit ">
                        <Link href={`/life-domains/${lfd._id}`}>
                        {lfd.name}
                        </Link>
            </h1>
            <span className="text-sm font-light">{lfd.description}</span>
        </div>
    )
}

