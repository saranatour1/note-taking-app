'use client'
import { ComponentProps, useState } from "react";

import { cn } from "@/lib/utils";
import { Shown } from "../icons/Shown";
import { Hidden } from "../icons/Hidden";

const Input = ({ className, type, ref, ...props }: ComponentProps<"input">) => {
	return (
		<input
			type={type}
			className={cn(
				"flex shadow-small w-full rounded-8 border border-neutral-300 px-200 py-150 gap-100 bg-white  text-neutral-500 sans-text-preset-5 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
};
Input.displayName = "Input";

const InputWithHideAndShow = ({ className, ref, ...props }: ComponentProps<"input">) =>{
	const [show, setShow] = useState(false)
	return (<div className="w-full relative">
		<Input className={className} ref={ref} type={show ? "text":"password"} {...props} />
		<button type="button" className="absolute right-0 top-0 transform translate-y-1/2 pe-200 hover:cursor-pointer" onClick={() => setShow(!show)}>
		{show ? <Shown />:<Hidden />}	
		</button>
	</div>)
}


export { Input, InputWithHideAndShow };
