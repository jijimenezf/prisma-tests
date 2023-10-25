import app from 'lib/createServer'

app.listen(3000, () => {
  console.log('...setting up local environment')
  console.log('and waiting for everyting is working as expected')
  console.log(`🚀 Server ready at: http://localhost:3000`)
})
