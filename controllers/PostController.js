import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).send('error')
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndUpdate({
      _id: postId,
    }, {
      $inc: {
        views: 1
      }
    }, {
      returnDocument: 'after',
    }, 
    (error, doc) => {
      if (error) {
        console.log(error)
        return res.status(500).json({
          message: 'Cant return post'
        })
      }

      if (!doc) {
        return res.status(404).json({
          message: 'Cant find the post'
        })
      }

      res.json(doc)
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Cant create a post'
    })
  }
}

export const remove = async (req, res) => {
  const postId = req.params.id

  PostModel.findOneAndDelete({
    _id: postId, 
  }, (err, doc) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        message: 'Cant find post'
      })
    }

    if (!doc) {
      return res.status(404).json({
        message: 'Cant find post'
      })
    }

    res.json({
      success: true
    })
  })
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    })

    const post = await doc.save()

    res.json(post)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Cant create a post'
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    await PostModel.updateOne({
      _id: postId
    }, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      tags: req.body.tags
    })
    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: 'Cant update'
    })
  }
}