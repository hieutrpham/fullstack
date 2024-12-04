import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Note from './models/note.js'
import mongoose from 'mongoose'

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}

const Notes = mongoose.model('Note', Note)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/', (request, response) => {
    response.send('<h1>Hellos world</h1>')
})

app.get('/api/notes', (request, response) => {
  Notes.find({}).then(notes => {response.json(notes)})
})

app.get('/api/notes/:id', (request, response, next) => {  
  Notes.findById(request.params.id).then(note => {
    if (note) {response.json(note)}
    else {response.status(404).end()}
  })
  .catch(err => next(err))
})

app.delete('/api/notes/:id', (request, response) => {
  Notes.findByIdAndDelete(request.params.id)
    .then(result => {response.status(204).end()})
    .catch(err => next(err))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  
  const note = new Notes({
    content: body.content,
    important: body.important || false
  })

  note.save().then(note => {
    console.log('note saved');
    response.json(note)
  })
  .catch(err => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  Notes.findByIdAndUpdate(request.params.id, 
      {content, important}, { new: true, runValidators:true, context: 'query' })
    .then(updatedNote => {response.json(updatedNote)})
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)
  
const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})