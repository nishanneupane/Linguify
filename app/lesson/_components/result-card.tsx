import { cn } from "@/lib/utils";
import { InfinityIcon } from "lucide-react";
import Image from "next/image";

type Props = {
    value: number;
    variant: "points" | "hearts";
    isPro?: boolean
}

const ResultCard = ({ value, variant, isPro }: Props) => {
    const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg"
    return (
        <div className={
            cn("rounded-2xl border-2 w-full",
                variant === "points" && "bg-orange-400 border-orange-400",
                variant === "hearts" && "bg-rose-500 border-rose-500",
            )
        }>
            <div className={
                cn("p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
                    variant === "hearts" && "bg-rose-500",
                    variant === "points" && "bg-orange-500",
                )
            }>
                {
                    variant === "hearts" ? "Hearts Left" : "Total XP"
                }
            </div>
            <div className={
                cn("rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
                    variant === "hearts" && "text-rose-500",
                    variant === "points" && "text-orange-400",
                )
            }>
                <Image
                    src={imageSrc}
                    alt="Icon"
                    height={30}
                    width={30}
                    className="mr-1.5"
                />
                {
                    isPro ? (
                        <InfinityIcon className="h-5 w-5 text-rose-500 font-bold" />
                    ) : (
                        <p>
                            {value}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default ResultCard