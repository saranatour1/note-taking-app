"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SideBarLinks } from "../ui/SideBarLinks";
import { TagIcon } from "../icons/TagIcon";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
	preloadedTags: Preloaded<typeof api.notes.tags.viewer>;
}

export const Tags = ({ preloadedTags }: Props) => {
	const data = usePreloadedQuery(preloadedTags);
	return (
		<>
			{data.length > 0 && (
				<p className="sans-text-preset-4 text-neutral-500 text-left w-full">Tags</p>
			)}{" "}
			<ScrollArea className="w-full flex flex-col h-[calc(100%-340px)]">
			{data.map((tag) => (
				<SideBarLinks
					key={tag?._id}
					title={tag?.title ?? ""}
					href={""}
					icon={<TagIcon />}
				/>
			))}
			</ScrollArea>
		</>
	);
};
