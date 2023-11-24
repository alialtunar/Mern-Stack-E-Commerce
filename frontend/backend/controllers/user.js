const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const nodemailer = require("nodemailer");


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    


    if (!user) {
      return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı" });
    }
       
    const comparePassword = await bcrypt.compare(password, user.password);
     console.log(password , user.password +"pass");


    if (!comparePassword) {
      return res.status(500).json({ message: "Yanlış şifre girdiniz" });
    }

    const token = jwt.sign({ id: user._id }, "SECRETTOKEN", {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };

    res.status(200).cookie("token", token, cookieOptions).json({
      user,
      token,
    });
    
  } catch (error) {
    console.error(error); // Hata consola yazdırılır
    res.status(500).json({ message: "Sunucu hatası" });
  }
};


const register = async (req, res) => {
  try {
    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 130,
      crop: "scale"
    }, function (error, result) {
      console.log(result);
    });

    const { email, name, password } = req.body;

    // 1. findOne kullanımını düzeltin (küçük harfle başlamalı)
    const user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({ message: "Böyle bir kullanıcı zaten var" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    if (password.length < 6) {
      return res.status(500).json({ message: "Şifre 6 karakterden küçük olamaz" });
    }

    // 2. create kullanımını düzeltin (küçük harfle başlamalı)
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      avatar: {
        public_id: avatar.public_id,
        url: avatar.secure_url
      }
    });

    const token = jwt.sign({ id: newUser._id }, "SECRETTOKEN", { expiresIn: "1h" });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    };

    res.status(201).cookie("token", token, cookieOptions).json({
      newUser,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};



const logout = async (req, res) => {
const cookieOptions = {
  httpOnly: true,
  expires: new Date(Date.Now),
};

res.status(200).cookie("token", null, cookieOptions).json({
  message:"çıkış işlemi başarılı"
});
};


const forgotPassword = async (req, res) => {
  const user = await User.findOne({email:req.body.email});

  if(!user){
   res.status(404).json({message:"böyle bir kullanıcı yok"});
  }
   
   const resetToken = crypto.randomBytes(20).toString('hex');
    
   user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 
   user.resetPasswordExpire =Date.now() + 5 * 60* 1000;
   
   await user.save({validateBeforeSave:false});

   const passwordUrl = `${req.protocol}://localhost:3000/reset/${resetToken}`
    
   const message = `Şifreni Sifirlamak için kullanacağın token : ${passwordUrl}`

   try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'altunarali284@gmail.com',
        pass: 'zreoxfwrnwdsielo',
      },
    });
  
    const mailData = {
      from: 'altunarali284@gmail.com', // Gönderen adres
      to: req.body.email, // Alıcı adres
      subject: 'Şifre Sıfırlama',
      text: message, // E-posta içeriği
    };

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(error);
        // Hata durumunda işlemleri burada gerçekleştir
      } else {
        console.log('Email sent: ' + info.response);
        // Başarılı durumda işlemleri burada gerçekleştir
      }
    });

  res.status(200).json({message:"Mailinizi kontrol ediniz"});
    
   } catch (error) {
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

   await user.save({ validateBeforeSave: false });

   res.status(500).json({message:error.message})

   }

};

const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(500).json({ message: "Geçersiz token" });
    }

        const passwordHash = await bcrypt.hash(req.body.password, 10);
    user.password = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Kullanıcıyı kaydet
   const ress = await user.save();
   console.log( ress+"çalıştı");

    // Yeniden token oluştur ve kullanıcıya gönder
    const token = jwt.sign({ id: user._id }, "SECRETTOKEN", { expiresIn: "1h" });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };

    res
      .status(201)
      .cookie("token", token, cookieOptions)
      .json({
        user,
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

const userDetails = async (req,res,next) =>{
 const user = await User.findById(req.user.id);
  
   user ? res.status(200).json({user}) : res.status(404).json({message:"Kullanıcı bulunamadı" });
 
}


module.exports = { login ,register,forgotPassword,resetPassword,logout,userDetails};