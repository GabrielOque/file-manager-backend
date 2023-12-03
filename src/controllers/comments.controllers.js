import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const commentsFound = await Comment.find({ file: id });
    return res.send(commentsFound);
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};

export const createComment = async (req, res) => {
  const { file, author, description } = req.body;
  try {
    const newComment = new Comment({
      file,
      author,
      description,
    });

    const commentCreated = await newComment.save();

    return res.send(commentCreated);
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};
