import { Content } from "@/components/features/notes/Content";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

interface Props {
	params: Promise<{ noteId: string }>;
}
// Todo: use Preloaded query here
export default async function Page({ params }: Props) {
	const noteId = (await params).noteId;
	const noteData = await preloadQuery(
		api.notes.index.viewNote,
		{ noteId: noteId },
		{ token: await convexAuthNextjsToken() }
	);
	return <Content noteId={noteId} noteData={noteData}/>;
}
