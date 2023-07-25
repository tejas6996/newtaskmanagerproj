const Task = require('../models/Task')
const User = require('../models/User')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllTask = async (req, res) => {
    // Get all notes from MongoDB
    const tasks = await Task.find().lean()

    // If no notes 
    if (!tasks?.length) {
        return res.status(400).json({ message: 'No tasks found' })
    }

    // Add email to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const tasksWithUser = await Promise.all(tasks.map(async (task) => {
        const user = await User.findById(task.user).lean().exec()
        return { ...task, email: user.email }
    }))

    res.json(tasksWithUser)
}

// @desc Create new note
// @route POST /notes
// @access Private
const createNewTask = async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Task.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate task title' })
    }

    // Create and store the new user 
    const task = await Task.create({ user, title, text })

    if (task) { // Created 
        return res.status(201).json({ message: 'New task created' })
    } else {
        return res.status(400).json({ message: 'Invalid task data received' })
    }

}

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateTask = async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const task = await Task.findById(id).exec()

    if (!task) {
        return res.status(400).json({ message: 'Task not found' })
    }

    // Check for duplicate title
    const duplicate = await Task.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate task title' })
    }

    task.user = user
    task.title = title
    task.text = text
    task.completed = completed

    const updatedTask = await task.save()

    res.json(`'${updatedTask.title}' updated`)
}

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteTask = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Task ID required' })
    }

    // Confirm note exists to delete 
    const task = await Task.findById(id).exec()

    if (!task) {
        return res.status(400).json({ message: 'task not found' })
    }

    const result = await task.deleteOne()

    const reply = `task '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllTask,
    createNewTask,
    updateTask,
    deleteTask
}