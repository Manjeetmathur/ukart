import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import { Admin } from "../model/admin.model.js";
import { Address } from "../model/address.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword, role } = req.body;
  try {
    if (
      [fullName, email, password, confirmPassword].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new ApiError(409, "user is already exist ... ");
    }

    if (password !== confirmPassword) {
      throw new ApiError(401, "password doesn't match . . .")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const profileLocalPath = req.file?.path;

    const profile = await uploadOnCloudinary(profileLocalPath);

    const user = await User.create({
      fullname: fullName,
      profile: profile?.url || " ",
      email,
      password: hashPassword,
      address: null
    });

    if (role === 'admin') {
      var admin = await Admin.create({
        fullname: fullName,
        profile: profile?.url || " ",
        email,
        password: hashPassword,
        address:null
      })
    }

    const createdUser = await User.findById(user._id).select(
      "-password"
    );

    if (!createdUser) {
      throw new ApiError(500, " Something went wrong while requesting the user");
    }

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      createdUser,
      role: admin ? 'admin' : null
    });

  } catch (error) {
    res.json({
      message: error.message
    })
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      throw new ApiError(402, "Required email or password. . .")
    }
    const admin = await Admin.findOne({ email })

    const user = await User.findOne({ email })

    if (!user) {
      throw new ApiError(404, "User not Found . . .")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new ApiError(404, "Password is not valid . . .")
    }
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET,)

    const tokenOption = {
      // domain : 'github',
      secure: true,
      httpOnly: true,
      sameSite: "none",
      // crossSite : 'true'
    }

    const loggedInUser = {
      email: user.email,
      userId: user._id,
      fullName: user.fullname
    }

    if (admin) {
      return res.cookie('token', token, tokenOption).json({
        message: "User logged in successfully",
        success: true,
        loggedInUser,
        role: 'admin'
      })
    }
    return res.cookie('token', token, tokenOption).json({
      message: "User logged in successfully",
      success: true,
      loggedInUser
    })

  } catch (error) {
    res.json({
      message: error.message
    })
  }
})

const logout = asyncHandler(async (req, res) => {
  try {
    let user = req.user
    return res.clearCookie('token').json({
      success: true,
      message: "user logged out successfully . . . ",
      user
    })
  } catch (error) {
    res.status(402).json({
      message: error.message
    })
  }
})

const makeUserAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  console.log(email)
  try {
    const user = await User.findOne({ email })

    const hashPassword = await bcrypt.hash(password, 10)
    const admin = await Admin.create({
      fullname: user.fullname,
      email: user.email,
      password: hashPassword,
      profile: user.profile,
    })

    res.status(200).json({
      admin,
      success: true
    })

  } catch (error) {
    res.status(402).json({
      message: error.message
    })
  }
})
const addAddress = asyncHandler(async (req, res) => {
  const { address } = req.body
  // console.log(address)
  try {
    const user = req.user
    const add = await Address.create(address)
    user.address.push(add)
    await user.save()
    res.status(200).json({
      message: "adress updated",
      success: true
    })

  } catch (error) {
    res.json({
      message: error.message,
    })
  }
})
const deleteAddress = asyncHandler(async (req, res) => {
  const  {addressId}  = req.params
  try {
    const user = req.user
    if (!addressId) {
      throw new Error("Address is not valid")
    }
    const add = await Address.findById(addressId)
    if (!add) {
      throw new Error("Address is not valid")

    }
    await Address.findByIdAndDelete(addressId)
    user.address = user.address.filter(item => item.id !== addressId)
    await user.save()
    res.status(200).json({
      message: "adress delete",
      success: true
    })

  } catch (error) {
    res.json({
      message: error.message,
    })
  }
})
const getAddress = asyncHandler(async (req, res) => {
  const  {id}  = req.params
  try {

//    let addressId=id
    console.log(id)
    const user = req.user
    if (!id) {
      throw new Error("Address is not valid")
    }
    const add = await Address.findById(id)
    if (!add) {
      throw new Error("Address is not valid")
    }
    console.log(add)
    res.status(200).json({
      message: "adress fetched",
      success: true,
      add
    })

  } catch (error) {
    res.json({
      message: error.message,
    })
  }
})
const updateAddress = asyncHandler(async (req, res) => {
  const { addressId, address } = req.body
  console.log(address,addressId)
  try {
    const user = req.user
    if (!addressId) {
      throw new Error("Address is not valid")
    }
    const add = await Address.findById(addressId)
    console.log(add)
    if (!add) {
      throw new Error("Address is not valid")
    }
    const newad = await Address.findByIdAndUpdate(addressId,
      {
        $set: {
          state: address?.state ? address.state : add.state,
          district: address?.district ?address?.district :add.district,
          area: address?.area ? address?.area : add.area,
          pincode: address?.pincode ?address?.pincode: add.pincode,
        },
      }, {
      new: true
    },
    )
    console.log(newad)
    res.status(200).json({
      message: "adress updated",
      success: true
    })

  } catch (error) {
    res.json({
      message: error.message,
    })
  }
})
export const phoneNo = asyncHandler(async (req, res) => {
  const { phone } = req.body

  try {
    const user = req.user

    await User.findByIdAndUpdate(user._id, {
      $set: {
        phone
      },

    }, { new: true })
    res.status(200).json({
      message: "phone updated",
      success: true
    })

  } catch (error) {
    res.json({
      message: error.message,
    })
  }
})

const getAllUserDetails = asyncHandler(async (req, res) => {
 
 const  users =  (await User.find().populate({ path: 'order' }).populate({ path: 'cart' }).populate({ path: 'address' }))

  res.status(200).json({
    success: true,
    users,
  })
})
const getUserDetails = asyncHandler(async (req, res) => {
  let user = req.user
  const email = user.email
  user = await User.findOne({ email }).populate({ path: 'order' }).populate({ path: 'cart' }).populate({ path: 'address' })
  let admin = await Admin.findOne({ email })

  res.status(200).json({
    success: true,
    user,
    admin
  })
})


export { registerUser, getAddress,login, logout, getUserDetails, makeUserAdmin, addAddress ,updateAddress,deleteAddress,getAllUserDetails};
