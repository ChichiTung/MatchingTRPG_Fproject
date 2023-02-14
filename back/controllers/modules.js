import modules from '../models/modules.js'

export const createModule = async (req, res) => {
  try {
    const result = await modules.create({
      name: req.body.name,
      gm: req.body.gm,
      living: req.body.living,
      image: req.file?.path || '',
      minTime: req.body.minTime,
      pl: req.body.pl,
      hashtag: req.body.hashtag,
      difficulty: req.body.difficulty,
      info: req.body.info,
      notice: req.body.notice,
      ccfoliaLink: req.body.ccfoliaLink,
      discordLink: req.body.discordLink
    })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      res.status(400).json({ success: false, messaage: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getLivingModules = async (req, res) => {
  try {
    const result = await modules.find({ living: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllModules = async (req, res) => {
  try {
    const result = await modules.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getModule = async (req, res) => {
  try {
    const result = await modules.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    // CastError: id 錯誤會報錯的訊息
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editModule = async (req, res) => {
  try {
    const result = await modules.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      // gm_id: req.body
      living: req.body.living,
      image: req.file?.path,
      minTime: req.body.minTime,
      pl: req.body.pl,
      difficulty: req.body.difficulty,
      info: req.body.info,
      notice: req.body.notice,
      ccfoliaLink: req.body.ccfoliaLink,
      discordLink: req.body.discordLink
    }, { new: true })
    // new: true, upsert ：如果找不到，直接新增一筆，默認關掉
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, messaage: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editModule = async (req, res) => {
  try {
    const result = await modules.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      gm: req.body.gm,
      living: req.body.living,
      image: req.file?.path || '',
      minTime: req.body.minTime,
      pl: req.body.pl,
      difficulty: req.body.difficulty,
      hashtag: req.body.hashtag,
      info: req.body.info,
      notice: req.body.notice,
      ccfoliaLink: req.body.ccfoliaLink,
      discordLink: req.body.discordLink
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
