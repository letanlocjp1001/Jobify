import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validator: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'lastName',
  },
  location: {
    type: String,
    trim: true,
    // maxlength:20,
    default: 'my city',
  },
})

// Dùng cho trường hợp đổi mật khẩu, khi mật khẩu không thay đổi thì nó ko mã hóa lại, mật khẩu thay đổi thì nó sẽ mã hóa
UserSchema.pre('save', function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified('password')) return
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = function (candidatePassword) {
  const isMatch = bcrypt.compareSync(candidatePassword, this.password)
  return isMatch // Trả về giá trị True và False
}

export default mongoose.model('User', UserSchema)
