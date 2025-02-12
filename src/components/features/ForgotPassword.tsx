"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Input, InputWithHideAndShow } from "../ui/Input";
import { FormLayout } from "../layouts/FormLayout";
import { InfoCircle } from "../icons/InfoCircle";

export const ForgotPassword = () => {
	const { signIn } = useAuthActions();
	const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
	return step === "forgot" ? (
		<FormLayout
			title="Forgotten your password?"
			description="Enter your email below, and we’ll send you a link to reset it."
			ButtonTitle="Send Reset Link"
			onSubmit={(event) => {
				event.preventDefault();
				const formData = new FormData(event.currentTarget);
				void signIn("password", formData).then(() =>{
					setStep({ email: formData.get("email") as string })
				}
				);
			}}
		>
			<label className="flex flex-col items-start gap-075 pt-24">
				<span className="text-neutral-950 sans-text-preset-4 font-medium">
					Email Address
				</span>
				<Input name="email" placeholder="email@example.com" />
			</label>
			<input name="flow" type="hidden" value="reset" />
		</FormLayout>
	) : (
		<FormLayout
			title="Reset Your Password"
			description="Choose a new password to secure your account."
			ButtonTitle="Reset Password"
			onSubmit={(event) => {
				event.preventDefault();
				const formData = new FormData(event.currentTarget);
				void signIn("password", formData);
			}}
		>
			<label className="flex flex-col items-start gap-075">
				<span className="text-neutral-950 sans-text-preset-4 font-medium flex items-center justify-between w-full">
					code
				</span>
				<Input name="code" placeholder="Code" type="text" />
			</label>
			<label className="flex flex-col items-start gap-075">
				<span className="text-neutral-950 sans-text-preset-4 font-medium flex items-center justify-between w-full">
					New Password
				</span>
				<InputWithHideAndShow />
				<div className="flex items-center justify-start">
					<InfoCircle />
					<span className="text-neutral-600 sans-text-preset-6">
						At least 8 characters
					</span>
				</div>
			</label>
			<input name="email" value={step.email} type="hidden" />
			<input name="flow" value="reset-verification" type="hidden" />
			<label className="flex flex-col items-start gap-075">
				<span className="text-neutral-950 sans-text-preset-4 font-medium flex items-center justify-between w-full">
					Confirm New Password
				</span>
				<InputWithHideAndShow name="newPassword" />
			</label>
		</FormLayout>
	);
};
