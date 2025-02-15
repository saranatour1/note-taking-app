'use server'

import { fetchMutation } from "convex/nextjs"
import { Id } from "../../convex/_generated/dataModel"
import { api } from "../../convex/_generated/api"
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server"
import { revalidatePath } from "next/cache"

type NoteToUpdate = {title:string, description:string, tags:string[],noteId:Id<"notes">|undefined}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function saveNote({title, tags,description, noteId}:NoteToUpdate){
if(!noteId) return;
  await fetchMutation(api.notes.index.update,{
    noteId:noteId,
    note:{
      noteData:{
        description:description,
        title:title,
        isArchived:false
      }
    }
  },{token:await convexAuthNextjsToken()})

  revalidatePath(`/notes/${noteId}`)
// update tags here
}
