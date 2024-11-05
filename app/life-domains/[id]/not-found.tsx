
export default async function NotFound({ params }: { params: { id: string } }) {

    return (
        <div className="">
            Life Domain with id {params.id} not found
        </div>
    )
}