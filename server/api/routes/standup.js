/* eslint-disable linebreak-style */
/* eslint-disable indent */
const mongoose = require('mongoose')
const Standup = require('../../models/standup')

module.exports = function (router) {
	// GET: the 12 newest stand-up meeting notes
	router.get('/standup', function (req, res) {
    Standup.find()
    .sort({'createdOn': 1})
    .exec()
    .then(docs => res.status(200)
      .json(docs))
      .catch(err => res.status(500)
      .json({
        message: 'Error finding standup meeting notes',
        error: err
      }))
	})

  //Getting team members by ID
  router.get('/standup/:teamMemberId', function(req, res){
    const qry = {
      _teamMemberId: mongoose.Types.ObjectId(req.params.teamMemberId)
    }
    Standup.find(qry)
    .sort({'createdOn': 1})
    .exec()
    .then(docs => res.status(200)
      .json(docs))
    .catch(err => res.status(500)
      .json({
        message: 'Error finding standup notes for team member Id',
        error:err
      }))
  })

	// POST: Get new meeting note document...
	router.post('/standup', function (req, res) {
		let note = new Standup(req.body)
		note.save(function (err, note) {
			if (err) {
        console.log(err);
				return res.status(400).json(err);
			}
			res.status(200).json(note)
		})
	})
}