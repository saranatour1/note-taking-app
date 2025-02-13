"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SideBarLinks } from "../ui/SideBarLinks";
import { TagIcon } from "../icons/TagIcon";

interface Props {
	preloadedTags: Preloaded<typeof api.notes.tags.viewer>;
}

export const Tags = ({ preloadedTags }: Props) => {
	const data = usePreloadedQuery(preloadedTags);
	return (
		<>
			{data.length > 0 && (
				<p className="sans-text-preset-4 text-neutral-500 text-left">Tags</p>
			)}{" "}
			{data.map((tag) => (
				<SideBarLinks
					key={tag?._id}
					title={tag?.title ?? ""}
					href={""}
					icon={<TagIcon />}
				/>
			))}
		</>
	);
};
