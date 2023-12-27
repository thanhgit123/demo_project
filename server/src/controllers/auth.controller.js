async function signup(req, res) {
  try {
    const { user_name, email, password } = req.body;
    const hashedPassword = await argon.hash(password);
    const newId = await addUser(user_name, hashedPassword, email);
    if (!newId) {
      return res.status(500).json({
        message: "Server loi",
      });
    }
    res.status(201).json({
      message: "Dang ky thanh cong",
    });
  } catch (error) {
    console.log(error);
  }
}
