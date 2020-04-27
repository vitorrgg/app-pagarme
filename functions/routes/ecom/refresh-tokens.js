exports.post = ({ admin }, req, res) => {
  // force new ecomAuth setup with Firestore instance
  // update tokens service will be auto started
  process.env.ECOM_AUTH_DEBUG = 'true'
  require('@ecomplus/application-sdk').setup(null, false, admin.firestore())
    .then(appSdk => {
      res.status(204).send()
    }).catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
}
