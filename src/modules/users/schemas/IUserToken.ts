import { ObjectId } from 'mongodb';

interface IUserToken {
  id: ObjectId;
  user_id: string;
  token: string;
}

export { IUserToken };
