import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { tags, usersToNotes, notes, notesToTags, tagsToUsers } from './notes/tables';
 
const schema = defineSchema({
  ...authTables,
  // Your other tables...
  tags,
  usersToNotes,
  notes,
  notesToTags,
  tagsToUsers,
});
 
export default schema;