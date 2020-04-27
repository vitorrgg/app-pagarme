exports.post = ({ admin }, req, res) => {
  // force new ecomAuth setup with Firestore instance
  // update tokens service will be auto started
  require('@ecomplus/application-sdk').setup(null, false, admin.firestore())
    .then(appSdk => {
      res.sendStatus(200)
    }).catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
}
