import { Content } from "@/components/features/notes/Content"

interface Props {
  params:Promise<{noteId:string}>
}
// Todo: use Preloaded query here
export default async function Page({params}:Props){
  const noteId = (await params).noteId
  return <Content noteId={noteId}/>
}