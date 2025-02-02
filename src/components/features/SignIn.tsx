"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Logo } from "../ui/Logo";
import { Input, InputWithHideAndShow } from "../ui/Input";
import Link from "next/link";
import { Button } from "../ui/button";
import { Google } from "../icons/Google";

export function SignIn() {
	const { signIn } = useAuthActions();
	const [step, setStep] = useState<"signUp" | "signIn">("signIn");
	return (<form
			className="max-w-[540px] w-full bg-white p-600 flex flex-col justify-items-start gap-200 shadow-large border border-neutral-200 rounded-12"
			onSubmit={(event) => {
				event.preventDefault();
				const formData = new FormData(event.currentTarget);
				void signIn("password", formData);
			}}
		>
			<Logo className="mx-auto" />
			<hgroup className="w-full text-center flex flex-col items-center justify-center gap-8">
				<h1 className="sans-text-preset-1 font-bold text-neutral-950">
					Welcome to Note
				</h1>
				<p className="sans-text-preset-5 text-neutral-600">
					Please log in to continue
				</p>
			</hgroup>

			<div className="pt-24 w-full flex flex-col gap-200 justify-center">
				<label className="flex flex-col items-start gap-075">
					<span className="text-neutral-950 sans-text-preset-4 font-medium">
						Email Address
					</span>
					<Input name="email" placeholder="email@example.com" />
				</label>

				<label className="flex flex-col items-start gap-075">
					<span className="text-neutral-950 sans-text-preset-4 font-medium flex items-center justify-between w-full">
						Password
						<Link href={`/forgot`} className="text-neutral-600 underline">
							Forgot
						</Link>
					</span>

					<InputWithHideAndShow name="password" />
				</label>

				<input name="flow" type="hidden" value={step} />
			</div>
			<Button
				type="submit"
				variant={`primary`}
				className="bg-blue-500 text-white py-150 px-200 flex items-center justify-center sans-text-preset-3 h-[44px] hover:cursor-pointer"
			>
				{step === "signIn" ? "Login" : "Sign up"}
			</Button>

			<div className="flex pt-24 flex-col gap-16 border-t border-t-neutral-200 justify-center items-center">
				<span className="sans-text-preset-5 text-neutral-600">
					Or log in with:
				</span>
				<Button type="button" className="bg-white hover:bg-white py-200 px-150 flex items-center justify-center rounded-12 border border-neutral-300 w-full h-[48px] hover:cursor-pointer">
					<Google />
					<span className="px-16 text-neutral-950 text-preset-other-1 font-medium">
						Google
					</span>
				</Button>
			</div>
			<hr className="w-full border border-neutral-200 shadow-large" />

			<div className="flex items-center justify-center w-full sans-text-preset-5 text-neutral-600">
				No account yet?
				<button
				type="button"
					className="pl-025 sans-text-preset-5 hover:cursor-pointer"
					onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")}
				>
					Sign Up
				</button>
			</div>
		</form>
	);
}