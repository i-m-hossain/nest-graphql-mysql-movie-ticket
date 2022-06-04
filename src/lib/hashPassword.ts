import * as bcrypt from 'bcrypt';

const hashPassword = async (password): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export default hashPassword;
