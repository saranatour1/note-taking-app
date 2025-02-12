import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { tags, usersToNotes, notes, notesToTags } from './notes/tables';
 
const schema = defineSchema({
  ...authTables,
  // Your other tables...
  tags,
  usersToNotes,
  notes,
  notesToTags
});
 
export default schema;