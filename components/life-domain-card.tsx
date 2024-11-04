import Link from "next/link";

interface iLifeDomain{
    _id: string;
    name: string;
    description: string;
}




export default function LifeDomainCard(lfd: iLifeDomain) {


    return (
        <div className=" w-full h-full flex flex-col flex-1 shadow shadow-slate-300 bg-slate-100 p-2  hover:border-purple-500 rounded-lg">
            <h1 className="font-bold hover:text-green-600  w-fit ">
                        <Link href={`/life-domains/${lfd._id}`}>
                        {lfd.name}
                        </Link>
            </h1>
            <span className="text-sm font-light">{lfd.description}</span>
        </div>
    )
}

