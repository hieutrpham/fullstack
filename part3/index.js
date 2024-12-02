import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Note from './models/note.js'
import mongoose from 'mongoose'

const Notes = mongoose.model('Note', Note)

const app = express()

app.use(express.json())
app.use(express.static('dist'))

app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/', (request, response) => {
    response.send('<h1>Hellos world</h1>')
})

app.get('/api/notes', (request, response) => {
  Notes.find({}).then(notes => {response.json(notes)})
})

app.get('/api/notes/:id', (request, response) => {
  Notes.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Notes({
    content: body.content,
    important: body.important || false
  })

  note.save().then(result => {
    console.log('note saved');
    response.json(note)
  })
})

app.use(unknownEndpoint)

  
const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})