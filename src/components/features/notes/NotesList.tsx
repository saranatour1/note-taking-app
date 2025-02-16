"use client";
import { FunctionReturnType } from "convex/server";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
	notes: FunctionReturnType<typeof api.notes.index.viewer>;
}
export const NotesList = ({ notes }: Props) => {
	const pathname = usePathname();
	return (
		<ScrollArea className="w-full !flex !flex-col !items-start !gap-050 h-full overflow-y-auto max-h-[calc(819px-185px)] snap-y snap-mandatory ">
			{notes &&
				notes.length > 0 &&
				notes.map((note) => (
					<Link
						href={`/notes/${note?._id}`}
						className={cn([
							"w-full p-200 flex flex-col items-start gap-150 rounded-150",
							pathname.includes(note?._id.toString() ?? "")
								? "bg-neutral-100"
								: "bg-white",
						])}
						key={note?._id}
					>
						<span className="sans-text-preset-3 text-neutral-950 font-semibold">
							{note?.title}
						</span>
						{note?.tags && (
							<div className="w-full flex items-start gap-[4px]">
								{note.tags.slice(0, 2).map((tag) => (
									<span
										key={tag?._id}
										className="flex bg-neutral-200 py-[2px] px-[6px] gap-[4px] rounded-4 items-center justify-center sans-text-preset-6 text-neutral-950"
									>
										{tag?.title}
									</span>
								))}
							</div>
						)}
						<span className="sans-text-preset-6 text-neutral-700">
							{formatDate(note?._creationTime ?? 0)}
						</span>
						<hr className="w-full text-neutral-200" />
					</Link>
				))}
		</ScrollArea>
	);
};

export function formatDate(date: string | number | Date) {
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(date));
}
