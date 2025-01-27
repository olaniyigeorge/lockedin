"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/providers/auth-store-provider";
import { useRouter } from "next/navigation";


export interface iLifeDomain {
    _id?: string;
    name: string;
    description: string;
    owner: string;
}

export interface LifeDomainFormProps {
    type: "Create" | "Edit" | "Delete";
    lfd: iLifeDomain;
}

export default function LifeDomainForm(data: LifeDomainFormProps) {
    const { user } = useAuthStore((state) => state);
    const router = useRouter();

    if (!user!.id) {
        return <div>Not authenticated</div>;
    }
    const [lifeDomain, setLifeDomain] = useState<iLifeDomain>({
        name: data.lfd.name,
        description: data.lfd.description,
        owner: user!.id,
    });
    const [type, setType] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        setLifeDomain(data.lfd); // Reset form state when lfd changes
    }, [data.lfd]);

    const createLifeDomain = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/life-domains/`, {
                method: "POST",
                body: JSON.stringify({
                    owner: user!.id,
                    name: lifeDomain.name,
                    description: lifeDomain.description,
                }),
            });

            if (response.ok) {
                toast.success("Life Domain created");
                router.push('/life-domains');
            } else {
                toast.error(`Error ${response.status} while creating life domain`);
            }
        } catch (error) {
            toast.error(`Error while creating life domain`);
            console.log(error);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    const editLifeDomain = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/life-domains/${lifeDomain._id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: lifeDomain.name,
                    description: lifeDomain.description,
                }),
            });

            if (response.ok) {
                toast.success("Life Domain updated");
                router.push('/life-domains');
            } else {
                toast.error(`Error ${response.status} while updating life domain`);
            }
        } catch (error) {
            toast.error(`Error while updating life domain`);
            console.log(error);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl  font-extrabold">{data.type} Life Domain</h1>
            <form className="w-full text-gray-800 p-3 flex gap-2 flex-col border rounded-xl">
                <input
                    className="p-2 rounded-md"
                    type="text"
                    name="name"
                    value={lifeDomain.name}
                    onChange={(e) => setLifeDomain({ ...lifeDomain, name: e.target.value })}
                    placeholder={`${user?.username?.toLocaleUpperCase()},  what aspect of your life is this?`}
                />
                <input
                    className="p-2 rounded-md"
                    type="text"
                    hidden
                    name="owner"
                    value={lifeDomain.owner}
                    onChange={(e) => setLifeDomain({ ...lifeDomain, owner: e.target.value })}
                    placeholder={`Owner's id? ${user!.id}`}
                />
                <textarea
                    className="p-2 rounded-md"
                    name="description"
                    value={lifeDomain.description}
                    onChange={(e) => setLifeDomain({ ...lifeDomain, description: e.target.value })}
                    placeholder="Describe this aspect of your life and what you want to achieve. "
                />
                <button
                    type='submit'
                    disabled={submitting}
                    className='accent_btn'
                    onClick={(e) => {
                        if (data.type == "Create") {
                            createLifeDomain(e);
                            setType("creat");
                        }
                        else if (data.type == "Edit") {
                            editLifeDomain(e)
                            setType("edit")
                        }
                    }}
                >
                    {submitting ? `${type}ing...` : data.type}
                </button>
            </form>
        </div>
    );
}
