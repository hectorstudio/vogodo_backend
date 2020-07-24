const User = require('../models/userModel');
const utils = require('../utils/index');
const httpStatus = require('http-status');

/**
 * Get user
 * @public
 */
exports.getUser = async (req, res) => {
  const user = await User.getUser(req.params.id);
  if (user) {
    user.password = ''; // clear password
    return res.json({ user });
  } else {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

/**
 * Update User
 * @public
 */
exports.updateUser = async (req, res) => {
  const user = req.body;
  const result = await User.updateUser(req.params.id, user);
  if (result) {
     return true;
  } else {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}

/**
 * Proceed Payment
 * @param {*} req 
 * @param {*} res 
 */
exports.proceedPayment = async (req, res) => {
  const transactionInfo = req.body;
  console.log(transactionInfo);
  const result = await User.updatePayment(req.params.id, transactionInfo);
  console.log(result);
  if (result) {
    return true;
  } else {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}

 /**
  * Add a new User
  */
 exports.addNewUser = async (req, res) => {
   const userInfo = req.body;
   const is_exist = await User.checkDuplicateEmail(userInfo.emailAddress);
   if (!is_exist) {
    const res1 = await User.addNewUser(userInfo);
    if (res1) {
     const result = await User.findAndGenerateToken(userInfo.emailAddress, userInfo.password);
     if (result.error) {
       return res.status(result.error).json({ error: result.msg || '' });
     }
     const { user, accessToken } = result;
 
     const token = utils.generateTokenResponse(user, accessToken);
     return res.json({ token, user });
    } else {
       return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
   }
 }
 

 /**
  * Add a new User
  */
 exports.addSocialAccount = async (req, res) => {
  const userInfo = req.body;
  const is_exist = await User.checkDuplicateSocialID(userInfo.userID, userInfo.type);
  if (!is_exist) {
   const res1 = await User.addSocialAccount({...userInfo, firstName: userInfo.name.split(" ")[0], lastName: userInfo.name.split(" ")[1]});
   if (res1) {
    const result = await User.findAndGenerateToken(userInfo.userID, "");
    if (result.error) {
      return res.status(result.error).json({ error: result.msg || '' });
    }
    const { user, accessToken } = result;

    const token = utils.generateTokenResponse(user, accessToken);
    return res.json({ token, user });
   } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
   }
  } else {    
    const result = await User.findAndGenerateToken(userInfo.userID, "");
    if (result.error) {
      return res.status(result.error).json({ error: result.msg || '' });
    }
    const { user, accessToken } = result;

    const token = utils.generateTokenResponse(user, accessToken);
    return res.json({ token, user });
  }
}

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const result = await User.findAndGenerateToken(emailAddress, password);
    if (result.error) {
      return res.status(result.error).json({ error: result.msg || '' });
    }

    const { user, accessToken } = result;

    const token = utils.generateTokenResponse(user, accessToken);
    return res.json({ token, user });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

