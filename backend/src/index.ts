import app from 'lib/createServer'

app.listen(3000, () => {
  console.log('...setting up local environment')
  console.log(`🚀 Server ready at: http://localhost:3000`)
})
