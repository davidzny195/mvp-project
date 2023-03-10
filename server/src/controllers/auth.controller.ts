import { Request, Response } from 'express';
import { authService } from '../services';

interface SessionRequest extends Request {
  session: any;
}

export default {
  login: async (req: SessionRequest, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      req.session.userId = result.user_id;
      res
        .status(200)
        .send({ success: true, message: 'Successfully logged In', ...result });
    } catch (error) {
      res.status(400).send({ success: false, error: error.message });
    }
  },

  signup: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;
      const user = await authService.signup(username, email, password);
      res.status(201).send({ success: true, user });
    } catch (error) {
      res.status(400).send({ success: false, error: error.message });
    }
  },
};
