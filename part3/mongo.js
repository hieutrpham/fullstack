const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const dbName = 'noteApp'

const url =
  `mongodb+srv://hieutrungpham91:${password}@fullstack.rmyg1.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'test note',
//   important: false,
// })


// note.save().then(result => {
//     console.log('note saved!', result)
//     mongoose.connection.close()
//   })

Note.find({important: true}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
