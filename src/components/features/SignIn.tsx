"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Input, InputWithHideAndShow } from "../ui/Input";
import Link from "next/link";
import { Button } from "../ui/button";
import { Google } from "../icons/Google";
import { FormLayout } from "../layouts/FormLayout";
import { InfoCircle } from "../icons/InfoCircle";

export function SignInPage() {
	const { signIn } = useAuthActions();
	const [step, setStep] = useState<"signUp" | "signIn">("signIn");
	return (
		<FormLayout
			title={step === "signIn" ? "Welcome to Note" : "Create Your Account"}
			description={
				step === "signIn"
					? "Please log in to continue"
					: "Sign up to start organizing your notes and boost your productivity."
			}
			ButtonTitle={step == "signIn" ? "Login" : "Sign Up"}
			afterChildren={
				<>
					<div className="flex pt-24 flex-col gap-16 border-t border-t-neutral-200 justify-center items-center">
						<span className="sans-text-preset-5 text-neutral-600">
							Or log in with:
						</span>
						<Button
							onClick={() =>
								void signIn("google", { redirectTo: "/dashboard" })
							}
							type="button"
							className="bg-white hover:bg-white py-200 px-150 flex items-center justify-center rounded-12 border border-neutral-300 w-full h-[48px] hover:cursor-pointer"
						>
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
							className="pl-025 sans-text-preset-5 hover:cursor-pointer text-neutral-950"
							onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")}
						>
							Sign Up
						</button>
					</div>
				</>
			}
			onSubmit={(event) => {
				event.preventDefault();
				const formData = new FormData(event.currentTarget);
				void signIn("password", formData);
			}}
		>
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
						{step === "signIn" && (
							<Link href={`/forgot`} className="text-neutral-600 underline">
								Forgot
							</Link>
						)}
					</span>

					<InputWithHideAndShow name="password" />
					{step === "signUp" && (
						<div className="flex items-center justify-start">
							<InfoCircle />
							<span className="text-neutral-600 sans-text-preset-6">
								At least 8 characters
							</span>
						</div>
					)}
				</label>

				<input name="flow" type="hidden" value={step} />
			</div>
		</FormLayout>
	);
}
