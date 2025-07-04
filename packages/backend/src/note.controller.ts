// packages/backend/src/note.controller.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newNote = await prisma.note.create({
      data: { title, content },
    });
    res.status(201).json(newNote); // 201: Created
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note',
      errorDetails: error,
     });
  }
};

// READ (todas as notas)
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findMany();
    res.status(200).json(notes); // 200: OK
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

// UPDATE
export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content, completed } = req.body;
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { title, content, completed },
        });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(404).json({ error: 'Note not found or failed to update' });
    }
};

// DELETE
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.note.delete({
            where: { id },
        });
        res.status(204).send(); // 204: No Content
    } catch (error) {
        res.status(404).json({ error: 'Note not found or failed to delete' });
    }
};