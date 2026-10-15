/*
Prupose:
Set up all the routes/paths for our server

*/

const expresss = require("express")
const router = expresss.Router()
const NoteModels = require("../Models/NotesModel")

// Fill in the routes and methods below from the lab intructions

// In URL you will see localhost:8081/api/notes
router.post("/notes", async(request, response) => {

    // validation of the POST body
    if(!request.body.content){
        return response.status(400).send({
            message : "Notes content in the POST body connot be left empty"
        })
    }

    // if the content of the body exited
    try{
        const note = new NoteModels({
            noteTitle: request.body.content.noteTitle,
            noteDescription: request.body.content.noteDescription,
            priority: request.body.content.priority,
            dateAdded: request.body.content.dateAdded,
            dateUpdated: request.body.content.dateUpdated
        })

        const savedNote = await note.save()
        response.status(201).send(savedNote)

    } catch (error){
        response.status(500).send({
            message: error.message || "Some error ocurred while creating the nodefrom the database"
        })
    }
})

// Required homework: complete the remaining GET, PUT, and DELETE method routes here

// GET all notes from MongoDB
router.get("/notes", async (request, response) => {
    try {
        const notes = await NoteModels.find();
        response.status(200).send(notes);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

// GET a specific note using its ID
router.get("/notes/:noteId", async (request, response) => {
    try {
        // Find the note by its MongoDB ID
        const note = await NoteModels.findById(request.params.noteId);

        if (!note) {
            return response.status(404).send({
                message: "Note not found"
            });
        }

        // Return the matching note
        response.status(200).send(note);

    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

// PUT - Update a note using its ID
router.put("/notes/:noteId", async (request, response) => {
    try {
        // Make sure note content was provided
        if (!request.body.content) {
            return response.status(400).send({
                message: "Note content is required"
            });
        }

        // Update the existing note
        const updatedNote = await NoteModels.findByIdAndUpdate(
            request.params.noteId,
            {
                noteTitle: request.body.content.noteTitle,
                noteDescription: request.body.content.noteDescription,
                priority: request.body.content.priority,
                dateAdded: request.body.content.dateAdded,
                dateUpdated: request.body.content.dateUpdated
            },
            { new: true, runValidators: true }
        );

        // Check whether the note exists
        if (!updatedNote) {
            return response.status(404).send({
                message: "Note not found"
            });
        }

        // Return updated note
        response.status(200).send(updatedNote);

    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

// DELETE a note using its ID
router.delete("/notes/:noteId", async (request, response) => {
    try {
        // Find the note and delete it
        const deletedNote = await NoteModels.findByIdAndDelete(
            request.params.noteId
        );

        // Check if the note exists
        if (!deletedNote) {
            return response.status(404).send({
                message: "Note not found"
            });
        }

        // Confirm the note was deleted
        response.status(200).send({
            message: "Note deleted successfully",
            deletedNote: deletedNote
        });

    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

module.exports = router
    