import { ComponentProps, ReactNode } from "react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/button";

interface FormProps extends ComponentProps<"form"> {
	children: ReactNode;
	title: string;
	description: string;
	ButtonTitle:string;
  afterChildren?:ReactNode;
}

export const FormLayout = ({
	title,
	description,
	children,
	ButtonTitle,
  afterChildren,
	ref,
	...props
}: FormProps) => {
	return (
		<form
			ref={ref}
			{...props}
			className="max-w-[540px] w-full bg-white p-600 flex flex-col justify-items-start gap-200 shadow-large border border-neutral-200 rounded-12"
		>
			<Logo className="mx-auto" />
			<hgroup className="w-full text-center flex flex-col items-center justify-center gap-8">
				<h1 className="sans-text-preset-1 font-bold text-neutral-950">
					{title}
				</h1>
				<p className="sans-text-preset-5 text-neutral-600">{description}</p>
			</hgroup>

			{children}

			<Button
				type="submit"
				variant={`primary`}
				className="bg-blue-500 text-white py-150 px-200 flex items-center justify-center sans-text-preset-3 h-[44px] hover:cursor-pointer"
			>
				{ButtonTitle}
			</Button>
      {afterChildren}
		</form>
	);
};
