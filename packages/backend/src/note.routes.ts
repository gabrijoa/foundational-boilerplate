// packages/backend/src/note.routes.ts
import { Router } from 'express';
import { createNote, getAllNotes, updateNote, deleteNote } from './note.controller';

const router = Router();

router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;